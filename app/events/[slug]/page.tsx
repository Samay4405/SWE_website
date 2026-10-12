import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar,
  Clock,
  MapPin,
  ArrowLeft,
  Share2,
  Users,
  CheckCircle,
  Building,
  UserCheck,
} from "lucide-react";
import { events } from "@/content/events";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return events.map((event) => ({
    slug: event.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);

  if (!event) {
    return {
      title: "Event Not Found",
    };
  }

  return {
    title: `${event.title} | SWE MIT-WPU`,
    description: event.shortDescription,
    openGraph: {
      title: event.title,
      description: event.shortDescription,
      images: [event.coverImage],
    },
  };
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);

  if (!event) {
    notFound();
  }

  return (
    <article className="min-h-screen py-10 md:py-16">
      <div className="section-container">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to all events</span>
          </Link>
        </div>

        {/* Hero Cover Graphic */}
        <div className="relative w-full aspect-[21/9] sm:aspect-[16/7] rounded-xl overflow-hidden border border-border bg-muted mb-10 shadow-sm">
          <Image
            src={event.coverImage}
            alt={event.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Event Header Info */}
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium uppercase border bg-primary/10 text-primary border-primary/20">
              {event.category}
            </span>
            <span className="text-xs font-mono text-muted-foreground">
              SWE MIT-WPU Official Event
            </span>
          </div>

          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6"
            style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
          >
            {event.title}
          </h1>

          {/* Quick Details Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-xl border border-border bg-card mb-12">
            <div className="flex items-start gap-3">
              <Calendar className="size-5 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-muted-foreground font-mono block">Date</span>
                <span className="text-sm font-semibold text-foreground">
                  {formatDate(event.date)}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="size-5 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-muted-foreground font-mono block">Time</span>
                <span className="text-sm font-semibold text-foreground">
                  {event.schedule[0]?.time || "09:00 AM onwards"}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="size-5 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-muted-foreground font-mono block">Venue</span>
                <span className="text-sm font-semibold text-foreground">
                  {event.location}
                </span>
              </div>
            </div>
          </div>

          {/* Content Layout: 2 Columns on desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left 2 Cols: Description & Schedule */}
            <div className="lg:col-span-2 space-y-12">
              {/* Event Body */}
              <section>
                <h2
                  className="text-2xl font-bold text-foreground mb-4"
                  style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
                >
                  Event Overview
                </h2>
                <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground leading-relaxed whitespace-pre-line text-sm sm:text-base">
                  {event.body}
                </div>
              </section>

              {/* Schedule Timeline */}
              {event.schedule && event.schedule.length > 0 && (
                <section>
                  <h2
                    className="text-2xl font-bold text-foreground mb-6"
                    style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
                  >
                    Schedule &amp; Timeline
                  </h2>
                  <div className="relative border-l-2 border-primary/20 ml-3 pl-6 space-y-8">
                    {event.schedule.map((item, index) => (
                      <div key={index} className="relative">
                        {/* Dot indicator */}
                        <div className="absolute -left-[31px] top-1 size-3 rounded-full bg-primary border-4 border-background" />
                        <span className="font-mono text-xs font-semibold text-primary block mb-1">
                          {item.time}
                        </span>
                        <h3 className="text-base font-bold text-foreground mb-1">
                          {item.title}
                        </h3>
                        {item.description && (
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Speakers Grid */}
              {event.speakers && event.speakers.length > 0 && (
                <section>
                  <h2
                    className="text-2xl font-bold text-foreground mb-6"
                    style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
                  >
                    Featured Speakers &amp; Mentors
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {event.speakers.map((speaker, index) => (
                      <div
                        key={index}
                        className="p-5 rounded-lg border border-border bg-card flex items-center gap-4"
                      >
                        <div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-base shrink-0">
                          {speaker.name
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                        <div>
                          <h3 className="font-bold text-foreground text-sm">
                            {speaker.name}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {speaker.title}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right 1 Col: Registration & Info Sidebar */}
            <div className="space-y-6">
              {/* Registration Card */}
              <div className="p-6 rounded-xl border border-border bg-card shadow-sm sticky top-24">
                <h3
                  className="text-lg font-bold text-foreground mb-2"
                  style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
                >
                  Join this Event
                </h3>
                <p className="text-xs text-muted-foreground mb-6">
                  Participation is open to MIT-WPU students and external collegiate participants.
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-xs text-foreground">
                    <CheckCircle className="size-4 text-emerald-500 shrink-0" />
                    <span>Free registration for SWE members</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-foreground">
                    <CheckCircle className="size-4 text-emerald-500 shrink-0" />
                    <span>Participation Certificate provided</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-foreground">
                    <CheckCircle className="size-4 text-emerald-500 shrink-0" />
                    <span>Hands-on lab access included</span>
                  </div>
                </div>

                <Link href="/contact" className="block w-full mb-3">
                  <Button className="w-full" size="lg">
                    Register Now
                  </Button>
                </Link>

                <p className="text-[11px] text-center text-muted-foreground">
                  Limited seats available on first-come basis.
                </p>

                {/* Partners block */}
                {event.partners && event.partners.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-border">
                    <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block mb-3">
                      Event Partners
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {event.partners.map((partner) => (
                        <span
                          key={partner}
                          className="px-2.5 py-1 rounded-md text-xs font-medium bg-muted text-muted-foreground border border-border"
                        >
                          {partner}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
