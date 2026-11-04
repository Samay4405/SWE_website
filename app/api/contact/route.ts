import { NextResponse } from "next/server";

// Simple in-memory rate limiting map (IP -> timestamp array)
const rateLimitMap = new Map<string, number[]>();

export async function POST(request: Request) {
  try {
    // Check rate limit: max 5 requests per 10 minutes per IP
    const clientIp = request.headers.get("x-forwarded-for") || "unknown";
    const now = Date.now();
    const windowMs = 10 * 60 * 1000;
    const history = (rateLimitMap.get(clientIp) || []).filter(
      (time) => now - time < windowMs
    );

    if (history.length >= 5) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many messages sent. Please wait a few minutes before trying again.",
        },
        { status: 429 }
      );
    }

    const data = await request.json();
    const { name, email, department, subject, message, _gotcha } = data;

    // Honeypot spam check: bots will auto-fill hidden input _gotcha
    if (_gotcha && _gotcha.trim() !== "") {
      // Return 200 to trick spam bots without processing
      return NextResponse.json({ success: true }, { status: 200 });
    }

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

    if (!message || typeof message !== "string" || message.trim().length < 8) {
      return NextResponse.json(
        { success: false, error: "Please provide a message with at least 8 characters." },
        { status: 400 }
      );
    }

    // Register timestamp for rate limiting
    history.push(now);
    rateLimitMap.set(clientIp, history);

    console.log("[SWE Chapter Contact Submission]", {
      name: name.trim(),
      email: email.trim(),
      department: department?.trim() || "Unspecified",
      subject: subject?.trim() || "Membership Inquiry",
      message: message.trim(),
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for reaching out! A chapter representative will respond to your inquiry shortly.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Contact API Error]", error);
    return NextResponse.json(
      { success: false, error: "Failed to process your request. Please try again or email us directly." },
      { status: 500 }
    );
  }
}
