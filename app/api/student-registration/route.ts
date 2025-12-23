import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/**
 * POST /api/student-registration
 * Sends student details via email (NO Google Sheets)
 */
export async function POST(req: Request) {
  try {
    console.log("📩 [API] Student registration called");

    const body = await req.json();

    const name = String(body.name || "").trim();
    const mobile = String(body.mobile || "").trim();

    // ---------- Basic Validation ----------
    if (!name || !mobile) {
      return NextResponse.json(
        { success: false, error: "Name and mobile are required" },
        { status: 400 }
      );
    }


    // ---------- Mail Transport ----------
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log("📧 [Mail] Transporter created");

    // ---------- Send Mail ----------
    await transporter.sendMail({
      from: `"Tej Classes" <${process.env.EMAIL_USER}>`,
      to: "tejclasseshometutorial@gmail.com",
      subject: "New Student Registration",
      html: `
        <h2>📚 New Student Registration</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Mobile:</b> ${mobile}</p>
        <hr>
        <p>This student has registered through the website.</p>
      `,
    });

    console.log("✅ [Mail] Student registration email sent");

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ [Student API ERROR]:", err);
    return NextResponse.json(
      { success: false, error: String(err) },
      { status: 500 }
    );
  }
}
