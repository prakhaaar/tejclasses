import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const entries = Array.from(formData.entries());
    const data: Record<string, string> = {};
    const attachments: any[] = [];

    for (const [key, value] of entries) {
      if (value instanceof File) {
        const buffer = Buffer.from(await value.arrayBuffer());
        attachments.push({
          filename: value.name,
          content: buffer,
        });
      } else {
        data[key] = String(value);
      }
    }

    // Setup Gmail transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Beautiful HTML Email Template
    const html = `
    <div style="background:#f5f7fa;padding:40px;font-family:Segoe UI,Arial,sans-serif;">
      <div style="max-width:650px;margin:auto;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 6px 20px rgba(0,0,0,0.1);">
        
        <!-- Header -->
        <div style="background:linear-gradient(90deg,#4f46e5,#a21caf);color:white;text-align:center;padding:24px;">
          <h1 style="margin:0;font-size:22px;font-weight:700;">Tej Classes Home Tutorial</h1>
          <p style="margin-top:6px;font-size:14px;opacity:0.9;">New Tutor Registration Received</p>
        </div>

        <!-- Body -->
        <div style="padding:24px 28px;">
          <h2 style="color:#4f46e5;font-size:18px;margin-bottom:16px;">📋 Tutor Information</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tbody>
              ${buildRow("Full Name", data.fullName)}
              ${buildRow("Date of Birth", data.dob)}
              ${buildRow("Gender", data.gender)}
              ${buildRow("Email", data.email)}
              ${buildRow("WhatsApp", data.whatsapp)}
              ${buildRow("Address", data.address)}
              ${buildRow("Qualification", data.qualification)}
              ${buildRow("Board (10th)", data.board10)}
              ${buildRow("Year of Passing", data.yearIntermediate)}
              ${buildRow("Experience (years)", data.experienceYears)}
              ${buildRow("Classes", data.classes)}
              ${buildRow("Subjects", data.subjects)}
              ${buildRow("Preferred Areas", data.preferredAreas)}
              ${data.referredBy ? buildRow("Referred By", data.referredBy) : ""}
            </tbody>
          </table>

          <p style="margin-top:24px;font-size:13px;color:#4b5563;line-height:1.5;">
            📎 The applicant’s <strong>photo, marksheet, and ID proof</strong> have been attached for your reference.
          </p>
        </div>

        <!-- Footer -->
        <div style="background:#f3f4f6;padding:18px;text-align:center;">
          <p style="margin:0;font-size:13px;color:#6b7280;">
            Sent automatically from <b>Tej Classes Home Tutorial Registration Form</b><br/>
            Please do not reply directly to this email.
          </p>
        </div>
      </div>
    </div>
  `;

    // Helper to format rows
    function buildRow(label: string, value: string | undefined) {
      return `
        <tr>
          <td style="padding:8px 0;width:45%;font-weight:600;color:#374151;border-bottom:1px solid #f0f0f0;">${label}</td>
          <td style="padding:8px 0;color:#111827;border-bottom:1px solid #f0f0f0;">${
            value || "-"
          }</td>
        </tr>`;
    }

    // Send the email
    await transporter.sendMail({
      from: `"Tej Classes Home Tutorial" <${process.env.EMAIL_USER}>`,
      to: "tejclasseshometutorial@gmail.com", 
      subject: `📧 New Tutor Registration - ${data.fullName || "Untitled"}`,
      html,
      attachments,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ Email send failed:", err);
    return NextResponse.json(
      { success: false, error: String(err) },
      { status: 500 }
    );
  }
}
