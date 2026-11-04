"use client";

import React, { useState, useEffect, useRef } from "react";
import "./ContactExact.css";

interface ContactExactProps {
  id?: string;
  isStandalonePage?: boolean;
}

export function ContactExact({ id = "contact", isStandalonePage = false }: ContactExactProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [statusText, setStatusText] = useState("Checking chapter desk hours…");
  const [copyText, setCopyText] = useState("Copy address");
  const [liveAnnouncement, setLiveAnnouncement] = useState("");
  const [btnState, setBtnState] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    subject: "Membership inquiry",
    message: "",
    _gotcha: "",
  });

  const formRef = useRef<HTMLFormElement>(null);

  // Live open / closed status (IST, Mon–Fri 10:00–17:30) computed strictly client-side to prevent hydration mismatches
  useEffect(() => {
    try {
      const p = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        weekday: "short",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      }).formatToParts(new Date());

      const g = (t: string) => p.find((x) => x.type === t)?.value || "";
      const weekday = g("weekday");
      const hour = parseInt(g("hour") || "0", 10) % 24;
      const minute = parseInt(g("minute") || "0", 10);
      const min = hour * 60 + minute;

      const open =
        !["Sat", "Sun"].includes(weekday) && min >= 600 && min < 1050;
      setIsOpen(open);
      setStatusText(
        open
          ? "Chapter desk is open now · until 5:30 PM IST"
          : "Chapter desk is closed · opens Mon–Fri, 10:00 AM IST"
      );
    } catch {
      setStatusText("Student Chapter desk · Mon–Fri, 10:00 AM – 5:30 PM IST");
    }
  }, []);

  // Card pointer glow effect
  const handleCardPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - r.left}px`);
    card.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  // Copy email with polite screen reader confirmation
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("swe.chapter@mitwpu.edu.in");
      setCopyText("Copied ✓");
      setLiveAnnouncement("Chapter email address copied to clipboard.");
    } catch {
      setCopyText("Press Ctrl+C on the address");
      setLiveAnnouncement("Press Control C to copy the email address.");
    }
    setTimeout(() => {
      setCopyText("Copy address");
      setLiveAnnouncement("");
    }, 2500);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit handling with true validation and real error handling
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    if (!formRef.current.reportValidity()) return;

    setBtnState("sending");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        setBtnState("error");
        setErrorMessage(
          json.error || "Failed to deliver message. Please reach out to swe.chapter@mitwpu.edu.in."
        );
        return;
      }

      setBtnState("ok");
      setFormData({
        name: "",
        email: "",
        department: "",
        subject: "Membership inquiry",
        message: "",
        _gotcha: "",
      });

      setTimeout(() => {
        setBtnState("idle");
      }, 4000);
    } catch {
      setBtnState("error");
      setErrorMessage(
        "Network connection error. Please email us directly at swe.chapter@mitwpu.edu.in."
      );
    }
  };

  return (
    <div className="contact-scope" id={id}>
      <div id="join" className="absolute -top-24" aria-hidden="true" />

      {/* Screen reader live notification */}
      <span className="sr-only" aria-live="polite">
        {liveAnnouncement}
      </span>

      {/* Replaced invalid nested <main> with <div className="page"> */}
      <div className="page" role="region" aria-label="Contact Section">
        <div className="eb rv">Get in Touch</div>

        {/* Semantic heading hierarchy: h1 if standalone page, h2 when embedded on homepage */}
        {isStandalonePage ? (
          <h1
            className="rv"
            style={{ "--d": ".1s" } as React.CSSProperties}
          >
            Connect with <em>SWE MIT-WPU</em>
          </h1>
        ) : (
          <h2
            className="rv"
            style={{ "--d": ".1s" } as React.CSSProperties}
          >
            Connect with <em>SWE MIT-WPU</em>
          </h2>
        )}

        <p
          className="lead rv"
          style={{ "--d": ".2s" } as React.CSSProperties}
        >
          Have questions about chapter membership, upcoming workshops, or
          corporate partnerships? Drop us a message or visit us on campus in
          Pune.
        </p>

        <div
          className={`status rv ${isOpen ? "on" : ""}`}
          id="st"
          style={{ "--d": ".3s" } as React.CSSProperties}
        >
          <i />
          <span>{statusText}</span>
        </div>

        <div className="grid">
          <section
            className="card rv"
            style={{ "--d": ".35s" } as React.CSSProperties}
            onPointerMove={handleCardPointerMove}
          >
            <h3 className="ct">Send us a message</h3>
            <form id="f" ref={formRef} onSubmit={handleSubmit} noValidate>
              {/* Anti-spam honeypot (invisible to humans, trapped by bots) */}
              <input
                type="text"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                style={{ display: "none" }}
                aria-hidden="true"
                value={formData._gotcha}
                onChange={handleChange}
              />

              <div className="f">
                <label htmlFor="n">
                  Full name <b>*</b>
                </label>
                <input
                  id="n"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Ananya Sharma"
                  autoComplete="name"
                />
              </div>

              <div className="f">
                <label htmlFor="e">
                  Email address <b>*</b>
                </label>
                <input
                  id="e"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. ananya@mitwpu.edu.in"
                  autoComplete="email"
                />
              </div>

              <div className="f">
                <label htmlFor="d">Department / year</label>
                <input
                  id="d"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="e.g. CSE / 2nd Year"
                />
              </div>

              <div className="f">
                <label htmlFor="s">Subject / topic</label>
                <select
                  id="s"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                >
                  <option>Membership inquiry</option>
                  <option>Events &amp; workshops</option>
                  <option>Corporate partnership</option>
                  <option>Volunteering</option>
                  <option>Something else</option>
                </select>
              </div>

              <div className="f w">
                <label htmlFor="m">
                  Your message <b>*</b>
                </label>
                <textarea
                  id="m"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about yourself, your questions, or how you’d like to collaborate…"
                />
              </div>

              {/* Error Alert notice if submission failed */}
              {btnState === "error" && (
                <div className="w-full p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs mb-3 text-left">
                  {errorMessage}
                </div>
              )}

              <button
                className={`send ${btnState === "ok" ? "ok" : ""}`}
                id="b"
                type="submit"
                disabled={btnState === "sending"}
              >
                <span>
                  {btnState === "sending"
                    ? "Sending…"
                    : btnState === "ok"
                    ? "Message sent ✓"
                    : btnState === "error"
                    ? "Retry sending"
                    : "Send message"}
                </span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 3L10 14M21 3l-7 18-4-7-7-4 18-7z" />
                </svg>
              </button>
            </form>
          </section>

          <aside
            className="card rv"
            style={{ "--d": ".5s" } as React.CSSProperties}
            onPointerMove={handleCardPointerMove}
          >
            <h3 className="ct">Find us</h3>
            <div className="row">
              <div className="ic">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
              </div>
              <div>
                <h4>Chapter headquarters</h4>
                <p>
                  MIT World Peace University Campus
                  <br />
                  Paud Road, Kothrud, Pune, Maharashtra 411038
                </p>
                <a
                  className="lnk"
                  href="https://www.google.com/maps/search/?api=1&query=MIT+World+Peace+University+Kothrud+Pune"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in Maps ↗
                </a>
              </div>
            </div>

            <div className="row">
              <div className="ic">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="5" width="18" height="14" rx="3" />
                  <path d="M4 7l8 6 8-6" />
                </svg>
              </div>
              <div>
                <h4>Email contact</h4>
                <p>
                  <a href="mailto:swe.chapter@mitwpu.edu.in">
                    swe.chapter@mitwpu.edu.in
                  </a>
                </p>
                <button
                  className="lnk"
                  id="cp"
                  type="button"
                  onClick={handleCopyEmail}
                >
                  {copyText}
                </button>
              </div>
            </div>

            <div className="row">
              <div className="ic">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
              </div>
              <div>
                <h4>Student chapter hours</h4>
                <p>
                  Monday – Friday
                  <br />
                  10:00 AM – 5:30 PM IST
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
