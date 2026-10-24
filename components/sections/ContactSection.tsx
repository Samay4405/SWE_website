"use client";

import { MapPin, Mail, Compass } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

export function ContactSection() {
  return (
    <section id="contact" className="section-padding bg-[#FDFDFC]">
      <div className="section-container">
        {/* Section Header */}
        <ScrollReveal className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#7254A8]">
              GET IN TOUCH
            </span>
            <span className="h-[1.5px] w-7 bg-[#C4B5E6]" />
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#24164F]"
            style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
          >
            Connect with SWE MIT-WPU
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#5E5B70] leading-relaxed">
            Have questions about chapter membership, upcoming workshops, or corporate partnership?
            Drop us a message or visit us on campus in Pune.
          </p>
        </ScrollReveal>

        {/* 2-Column Layout: Form + Location Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form (7 columns) */}
          <ScrollReveal className="lg:col-span-7">
            <ContactForm />
          </ScrollReveal>

          {/* Info & Location Card (5 columns) */}
          <ScrollReveal delay={0.12} className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl border border-[#E5E2EC] bg-white space-y-6 shadow-xs">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#EDE6FA] text-[#7254A8] shrink-0">
                  <MapPin className="size-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#24164F] text-base mb-1">
                    Chapter Headquarters
                  </h4>
                  <p className="text-sm text-[#5E5B70] leading-relaxed">
                    MIT World Peace University Campus<br />
                    Paud Road, Kothrud, Pune, Maharashtra 411038
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-[#E5E2EC]">
                <div className="p-3 rounded-xl bg-[#EDE6FA] text-[#7254A8] shrink-0">
                  <Mail className="size-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#24164F] text-base mb-1">
                    Email Contact
                  </h4>
                  <p className="text-sm text-[#5E5B70]">
                    swe.chapter@mitwpu.edu.in
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-[#E5E2EC]">
                <div className="p-3 rounded-xl bg-[#EDE6FA] text-[#7254A8] shrink-0">
                  <Compass className="size-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#24164F] text-base mb-1">
                    Student Chapter Hours
                  </h4>
                  <p className="text-sm text-[#5E5B70]">
                    Monday – Friday: 10:00 AM – 5:30 PM IST
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
