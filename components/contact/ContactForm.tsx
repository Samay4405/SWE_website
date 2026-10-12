"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    subject: "Membership Inquiry",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "Failed to submit form.");
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      department: "",
      subject: "Membership Inquiry",
      message: "",
    });
    setStatus("idle");
  };

  if (status === "success") {
    return (
      <div className="p-8 sm:p-12 rounded-xl border border-border bg-card text-center animate-in fade-in zoom-in-95 duration-200">
        <div className="size-14 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="size-8" />
        </div>
        <h3
          className="text-2xl font-bold text-foreground mb-2"
          style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
        >
          Message Received!
        </h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
          Thank you for getting in touch with SWE MIT-WPU. Our core committee team will respond to your inquiry within 24–48 hours.
        </p>
        <Button variant="outline" size="sm" onClick={handleReset}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 sm:p-10 rounded-xl border border-border bg-card shadow-sm space-y-5"
    >
      {status === "error" && (
        <div className="p-4 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-sm flex items-start gap-3">
          <AlertCircle className="size-5 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Name & Email Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="name"
            className="block text-xs font-mono font-medium text-foreground mb-2"
          >
            Full Name <span className="text-primary">*</span>
          </label>
          <Input
            id="name"
            name="name"
            required
            placeholder="e.g. Ananya Sharma"
            value={formData.name}
            onChange={handleChange}
            disabled={status === "submitting"}
            className="h-11"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-xs font-mono font-medium text-foreground mb-2"
          >
            Email Address <span className="text-primary">*</span>
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="e.g. ananya@mitwpu.edu.in"
            value={formData.email}
            onChange={handleChange}
            disabled={status === "submitting"}
            className="h-11"
          />
        </div>
      </div>

      {/* Department & Topic Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="department"
            className="block text-xs font-mono font-medium text-foreground mb-2"
          >
            Department / Year
          </label>
          <Input
            id="department"
            name="department"
            placeholder="e.g. CSE / 2nd Year"
            value={formData.department}
            onChange={handleChange}
            disabled={status === "submitting"}
            className="h-11"
          />
        </div>

        <div>
          <label
            htmlFor="subject"
            className="block text-xs font-mono font-medium text-foreground mb-2"
          >
            Subject / Topic
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            disabled={status === "submitting"}
            className="w-full h-11 px-3 py-2 text-sm rounded-md border border-border bg-background text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="Membership Inquiry">Membership Inquiry</option>
            <option value="Event Registration">Event / Workshop Question</option>
            <option value="Sponsorship & Partnership">Corporate Sponsorship</option>
            <option value="Mentorship Connect">Alumni & Mentorship</option>
            <option value="General Query">General Question</option>
          </select>
        </div>
      </div>

      {/* Message Textarea */}
      <div>
        <label
          htmlFor="message"
          className="block text-xs font-mono font-medium text-foreground mb-2"
        >
          Your Message <span className="text-primary">*</span>
        </label>
        <Textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell us about yourself, your questions, or how you'd like to collaborate..."
          value={formData.message}
          onChange={handleChange}
          disabled={status === "submitting"}
          className="resize-none"
        />
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={status === "submitting"}
        className="w-full gap-2 h-11"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            <span>Sending Message...</span>
          </>
        ) : (
          <>
            <span>Submit Message</span>
            <Send className="size-4" />
          </>
        )}
      </Button>
    </form>
  );
}
