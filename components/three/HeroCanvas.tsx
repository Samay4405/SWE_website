"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import * as THREE from "three";

interface HeroCanvasProps {
  className?: string;
}

export function HeroCanvas({ className = "" }: HeroCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [shouldUseFallback, setShouldUseFallback] = useState(false);

  useEffect(() => {
    // 1. Check prefers-reduced-motion
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShouldUseFallback(true);
      return;
    }

    // 2. Check WebGL support
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) {
      setShouldUseFallback(true);
      return;
    }

    const container = mountRef.current;
    if (!container) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 80;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      container.appendChild(renderer.domElement);
    } catch {
      setShouldUseFallback(true);
      return;
    }

    // --- Nodes Generation ---
    const nodeCount = 45;
    const spread = 70;
    const positions = new Float32Array(nodeCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < nodeCount; i++) {
      positions[i * 3] = (Math.random() - 0.3) * spread; // slightly bias towards right side
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.7;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;

      velocities.push({
        x: (Math.random() - 0.5) * 0.04,
        y: (Math.random() - 0.5) * 0.04,
        z: (Math.random() - 0.5) * 0.02,
      });
    }

    // Points Geometry & Material
    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    // Node particle texture / color: Deep Violet (#4A3AFF)
    const pointsMaterial = new THREE.PointsMaterial({
      color: 0x4a3aff,
      size: 2.2,
      transparent: true,
      opacity: 0.85,
    });
    const points = new THREE.Points(pointsGeometry, pointsMaterial);
    scene.add(points);

    // Connecting Lines
    const maxDistance = 22;
    const linePositions = new Float32Array(nodeCount * nodeCount * 6);
    const lineColors = new Float32Array(nodeCount * nodeCount * 6);
    const linesGeometry = new THREE.BufferGeometry();
    linesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3)
    );
    linesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(lineColors, 3)
    );

    const linesMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.NormalBlending,
    });
    const lineMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(lineMesh);

    // --- Mouse Parallax ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX = (e.clientX / innerWidth - 0.5) * 6;
      mouseY = (e.clientY / innerHeight - 0.5) * 6;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // --- Resize Handler ---
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // --- Animation Loop ---
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth mouse lerp
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;
      scene.rotation.y = targetX * 0.08;
      scene.rotation.x = -targetY * 0.08;

      // Update node positions
      const posAttr = pointsGeometry.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      let vertexIndex = 0;
      let colorIndex = 0;

      for (let i = 0; i < nodeCount; i++) {
        // Drift
        posArray[i * 3] += velocities[i].x;
        posArray[i * 3 + 1] += velocities[i].y;
        posArray[i * 3 + 2] += velocities[i].z;

        // Bounce within boundaries
        const boundX = spread * 0.6;
        const boundY = spread * 0.45;
        if (posArray[i * 3] < -boundX || posArray[i * 3] > boundX) velocities[i].x *= -1;
        if (posArray[i * 3 + 1] < -boundY || posArray[i * 3 + 1] > boundY) velocities[i].y *= -1;

        // Check connections
        for (let j = i + 1; j < nodeCount; j++) {
          const dx = posArray[i * 3] - posArray[j * 3];
          const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
          const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < maxDistance) {
            // Line from i to j
            linePositions[vertexIndex++] = posArray[i * 3];
            linePositions[vertexIndex++] = posArray[i * 3 + 1];
            linePositions[vertexIndex++] = posArray[i * 3 + 2];

            linePositions[vertexIndex++] = posArray[j * 3];
            linePositions[vertexIndex++] = posArray[j * 3 + 1];
            linePositions[vertexIndex++] = posArray[j * 3 + 2];

            // Opacity & Color: Violet (0.29, 0.23, 1.0)
            const alpha = 1.0 - dist / maxDistance;
            lineColors[colorIndex++] = 0.29 * alpha;
            lineColors[colorIndex++] = 0.23 * alpha;
            lineColors[colorIndex++] = 1.0 * alpha;

            lineColors[colorIndex++] = 0.29 * alpha;
            lineColors[colorIndex++] = 0.23 * alpha;
            lineColors[colorIndex++] = 1.0 * alpha;
          }
        }
      }

      posAttr.needsUpdate = true;
      linesGeometry.setDrawRange(0, vertexIndex / 3);
      (linesGeometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      (linesGeometry.attributes.color as THREE.BufferAttribute).needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }

      pointsGeometry.dispose();
      pointsMaterial.dispose();
      linesGeometry.dispose();
      linesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  if (shouldUseFallback) {
    return (
      <div className={`absolute inset-0 pointer-events-none select-none ${className}`}>
        <Image
          src="/images/hero-fallback.svg"
          alt="Engineering constellation network"
          fill
          priority
          className="object-cover object-right md:object-center opacity-85"
        />
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
