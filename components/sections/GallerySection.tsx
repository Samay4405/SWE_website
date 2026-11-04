"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AccessibleGallery } from "@/components/gallery/AccessibleGallery";

export interface GalleryMasonryItem {
  id: string;
  img: string;
  width: number;
  height: number;
  title: string;
  alt: string;
  description?: string;
  url?: string;
}

export const galleryMasonryItems: GalleryMasonryItem[] = [
  {
    id: "20250919_171313",
    img: "/images/gallery/community/20250919_171313.jpg",
    width: 4000,
    height: 2252,
    title: "SWE Welcome Orientation",
    alt: "New collegiate recruits joining the Society of Women Engineers orientation seminar",
  },
  {
    id: "20250919_172551",
    img: "/images/gallery/community/20250919_172551.jpg",
    width: 2252,
    height: 4000,
    title: "Collegiate Networking",
    alt: "Students interacting and networking at the chapter mixer in Pune",
  },
  {
    id: "20250919_172605",
    img: "/images/gallery/community/20250919_172605.jpg",
    width: 2252,
    height: 4000,
    title: "Hands-on Technical Sprint",
    alt: "Engineering students collaborating during a hands-on technical workshop",
  },
  {
    id: "20250919_172728",
    img: "/images/gallery/community/20250919_172728.jpg",
    width: 4000,
    height: 2252,
    title: "Project Mentorship",
    alt: "Senior mentors reviewing project code and technical designs with collegiate members",
  },
  {
    id: "20260117_115651",
    img: "/images/gallery/community/20260117_115651.jpg",
    width: 3000,
    height: 4000,
    title: "Technovate Hackathon Launch",
    alt: "Participants coding during the flagship 24-hour Technovate hackathon",
  },
  {
    id: "20260929_163749",
    img: "/images/gallery/community/20260929_163749.jpg",
    width: 4080,
    height: 3060,
    title: "Technical Exhibition Stall",
    alt: "Society of Women Engineers project displays and student prototypes on campus",
  },
  {
    id: "GMC17012026_091857",
    img: "/images/gallery/community/GMC17012026_091857.jpg",
    width: 4080,
    height: 3060,
    title: "Annual Chapter Conclave",
    alt: "Collegiate members gathered for the annual chapter conclave and leadership talks",
  },
  {
    id: "IMG-20250801-WA0006",
    img: "/images/gallery/community/IMG-20250801-WA0006.jpg",
    width: 1233,
    height: 1280,
    title: "Community Outreach Team",
    alt: "SWE outreach committee volunteers preparing technical kits for Pune schools",
  },
  {
    id: "IMG-20250801-WA0017",
    img: "/images/gallery/community/IMG-20250801-WA0017.jpg",
    width: 1600,
    height: 1200,
    title: "Executive Board Planning",
    alt: "Core executive committee organizing calendar initiatives and guest speaker panels",
  },
  {
    id: "IMG-20250801-WA0089",
    img: "/images/gallery/community/IMG-20250801-WA0089.jpg",
    width: 3120,
    height: 4160,
    title: "Innovation Showcase",
    alt: "Collegiate engineers demonstrating working IoT hardware and cloud software",
  },
  {
    id: "IMG-20250807-WA0003",
    img: "/images/gallery/community/IMG-20250807-WA0003.jpg",
    width: 4160,
    height: 3120,
    title: "Peer Mentorship Circles",
    alt: "Study circles discussing computing algorithms and software interview preparation",
  },
  {
    id: "IMG_20260117_120339210_HDR_AE",
    img: "/images/gallery/community/IMG_20260117_120339210_HDR_AE.jpg",
    width: 2304,
    height: 4096,
    title: "Hackathon Evaluation",
    alt: "Judges reviewing live project submissions during the hackathon finale",
  },
  {
    id: "IMG_2388",
    img: "/images/gallery/community/IMG_2388.JPG",
    width: 3666,
    height: 2062,
    title: "Community Celebration",
    alt: "Members celebrating the conclusion of an impactful technical conference",
  },
  {
    id: "IMG_2402",
    img: "/images/gallery/community/IMG_2402.jpg",
    width: 4032,
    height: 2268,
    title: "Award Presentation Ceremony",
    alt: "Winning teams receiving project certificates and merit trophies",
  },
  {
    id: "IMG_4483",
    img: "/images/gallery/community/IMG_4483.jpg",
    width: 3024,
    height: 4032,
    title: "Workshop Demonstration",
    alt: "Speaker demonstrating cloud architecture patterns on the laboratory projector",
  },
  {
    id: "IMG_4725",
    img: "/images/gallery/community/IMG_4725.jpg",
    width: 4284,
    height: 5712,
    title: "Campus Orientation Fair",
    alt: "First-year engineering students enrolling in SWE chapter memberships",
  },
  {
    id: "IMG_9922",
    img: "/images/gallery/community/IMG_9922.jpg",
    width: 5712,
    height: 3213,
    title: "Team Building Retreat",
    alt: "Chapter directors participating in strategic team-building activities",
  },
  {
    id: "IMG_9929",
    img: "/images/gallery/community/IMG_9929.jpg",
    width: 4032,
    height: 3024,
    title: "Closing Batch Ceremony",
    alt: "Chapter members and heads during the annual batch ceremony and valedictory",
  },
];

export function GallerySection() {
  return (
    <section id="gallery" className="section-padding bg-transparent border-b border-[#E9E3FB]/60" aria-label="Chapter Photo Gallery">
      <div className="section-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="max-w-2xl text-left">
            <div className="flex items-center gap-2 mb-3">
              <span className="section-eyebrow">Visual Archive</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#1E1033]">
              Moments in <span className="font-accent">Motion</span>.
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#6B6385] font-light leading-relaxed">
              Memories, milestones, and camaraderie captured across our workshops, hackathons, and outreach initiatives.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#E9E3FB] bg-white text-[#1E1033] hover:text-[#6538A5] hover:border-[#6538A5]/40 hover:bg-[#F6F2FC] transition-all duration-200 text-sm font-medium shadow-xs"
            >
              <span>Explore Full Archive ({galleryMasonryItems.length})</span>
              <ArrowRight className="size-4 text-[#6538A5]" />
            </Link>
          </div>
        </div>

        {/* ── Accessible Responsive Masonry Grid ── */}
        <AccessibleGallery items={galleryMasonryItems} limit={8} />
      </div>
    </section>
  );
}

export default GallerySection;
