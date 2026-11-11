import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactExact } from "@/components/contact/ContactExact";

export const metadata: Metadata = {
  title: "Contact | SWE MIT-WPU",
  description:
    "Connect with the Society of Women Engineers (SWE) MIT-WPU Student Chapter in Pune. Submit membership inquiries, corporate partnerships, or workshop questions.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <PageHeader
        title="Contact Us"
        eyebrow="Get In Touch"
      />
      <ContactExact />
    </div>
  );
}
