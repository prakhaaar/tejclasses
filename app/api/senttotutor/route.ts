import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    console.log("📨 [Tutor Mail] Sending welcome email");

    const formData = await req.formData();
    const tutorEmail = formData.get("email") as string;
    const tutorName = formData.get("fullName") as string;

    if (!tutorEmail) {
      throw new Error("Tutor email not found");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Tej Classes Home Tutorial" <${process.env.EMAIL_USER}>`,
      to: tutorEmail,
      subject: "Welcome to Tej Classes Home Tutorial",
      text: `Dear ${tutorName || "Tutor"},

Welcome to Tej Classes Home Tutorial.
Your registration has been completed successfully.

Your profile is currently under verification.
We will contact you soon.

Regards,
Tej Classes Home Tutorial`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ [Tutor Mail ERROR]:", err);
    return NextResponse.json(
      { success: false, error: String(err) },
      { status: 500 }
    );
  }
}
