import type { Metadata } from "next";
import { MapPin, Mail, Clock, MessageSquare, Compass, ExternalLink } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact & Join",
  description:
    "Connect with the Society of Women Engineers (SWE) MIT-WPU Student Chapter in Pune. Submit membership inquiries, sponsorship requests, or workshop questions.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen py-12 md:py-20">
      <div className="section-container">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-muted/50 text-xs font-mono font-medium text-muted-foreground mb-4">
            <span>GET IN TOUCH</span>
          </div>
          <h1
            className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4"
            style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
          >
            Connect with SWE MIT-WPU
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Have questions about chapter membership, upcoming hackathons, or corporate sponsorship? 
            Drop us a message or visit us on campus in Pune.
          </p>
        </div>

        {/* 2-Column Layout: Form + Location Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form (7 columns) */}
          <div className="lg:col-span-7">
            <h2
              className="text-2xl font-bold text-foreground mb-6"
              style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
            >
              Send an Inquiry
            </h2>
            <ContactForm />
          </div>

          {/* Info & Location (5 columns) */}
          <div className="lg:col-span-5 space-y-6">
            <h2
              className="text-2xl font-bold text-foreground mb-6"
              style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
            >
              Chapter Headquarters
            </h2>

            {/* Location Card */}
            <div className="p-6 sm:p-8 rounded-xl border border-border bg-card space-y-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary shrink-0">
                  <MapPin className="size-5" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-base mb-1">
                    Campus Address
                  </h3>
                  <address className="not-italic text-sm text-muted-foreground leading-relaxed">
                    MIT World Peace University (MIT-WPU)
                    <br />
                    Survey No. 124, Paud Road,
                    <br />
                    Kothrud, Pune — 411038
                    <br />
                    Maharashtra, India
                  </address>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-border/60">
                <div className="p-3 rounded-lg bg-primary/10 text-primary shrink-0">
                  <Compass className="size-5" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-base mb-1">
                    Meeting Space
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Chanakya Building, Innovation Hub, Room 302
                    <br />
                    Weekly General Body Meetings: Thursdays at 4:30 PM
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-border/60">
                <div className="p-3 rounded-lg bg-primary/10 text-primary shrink-0">
                  <Mail className="size-5" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-base mb-1">
                    Direct Email
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    <a
                      href="mailto:swe@mitwpu.edu.in"
                      className="text-primary hover:underline font-mono"
                    >
                      swe@mitwpu.edu.in
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Membership FAQ Card */}
            <div className="p-6 rounded-xl border border-border bg-muted/30">
              <h3 className="font-bold text-foreground text-sm mb-2">
                Who can join SWE MIT-WPU?
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                Membership is open to all students across all engineering disciplines, departments, and years at MIT-WPU. 
                We welcome everyone who believes in advancing women in technology.
              </p>
              <div className="flex items-center gap-2 text-xs font-medium text-primary">
                <span>Free collegiate registration</span>
                <span>•</span>
                <span>Year-round induction</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
