import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, department, subject, message } = data;

    // Validate required fields
    if (!name || typeof name !== "string" || name.trim() === "") {
      return NextResponse.json(
        { success: false, error: "Please enter your name." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: "Please provide a message with at least 10 characters." },
        { status: 400 }
      );
    }

    // In production, forward to email service (e.g., Resend, Formspree)
    console.log("[SWE Contact Submission]", {
      name,
      email,
      department: department || "N/A",
      subject: subject || "General Inquiry",
      message,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for reaching out! A SWE chapter representative will get back to you shortly.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Contact Route Error]", error);
    return NextResponse.json(
      { success: false, error: "Failed to process message. Please try again." },
      { status: 500 }
    );
  }
}
