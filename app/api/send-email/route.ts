import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { google } from "googleapis";

async function appendToGoogleSheet(data: Record<string, string>) {
  console.log("➡️ [Sheets] Starting append");

  console.log("➡️ [Sheets] Client Email:", process.env.GOOGLE_CLIENT_EMAIL);
  console.log("➡️ [Sheets] Sheet ID:", process.env.GOOGLE_SHEET_ID);

  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  console.log("✅ [Sheets] Auth object created");

  const sheets = google.sheets({ version: "v4", auth });

  const values = [
    [
      new Date().toLocaleString(),
      data.fullName,
      data.dob,
      data.gender,
      data.email,
      data.whatsapp,
      data.address,
      data.qualification,
      data.board10,
      data.yearIntermediate,
      data.experienceYears,
      data.classes,
      data.subjects,
      data.preferredAreas,
      data.referredBy || "-",
    ],
  ];

  console.log("➡️ [Sheets] Values to append:", values);

  // Use Sheet1 (the actual sheet name visible in your Google Sheet)
  const res = await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: "'tutor'!A:O",
    valueInputOption: "USER_ENTERED",
    requestBody: { values },
  });

  console.log("✅ [Sheets] Append response:", res.status);
}

export async function POST(req: Request) {
  try {
    console.log("📩 [API] POST /tutor-registration called");

    const formData = await req.formData();
    const entries = Array.from(formData.entries());
    const data: Record<string, string> = {};
    const attachments: any[] = [];

    for (const [key, value] of entries) {
      if (value instanceof File) {
        console.log("📎 [API] File received:", value.name);
        const buffer = Buffer.from(await value.arrayBuffer());
        attachments.push({
          filename: value.name,
          content: buffer,
        });
      } else {
        data[key] = String(value);
      }
    }

    console.log("🧾 [API] Parsed form data:", data);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log("📧 [Mail] Transporter created");

    await transporter.sendMail({
      from: `"Tej Classes" <${process.env.EMAIL_USER}>`,
      to: "tejclasseshometutorial@gmail.com",
      subject: `New Tutor Registration - ${data.fullName}`,
      html: `
        <h2>New Tutor Registration</h2>
        <p><b>Name:</b> ${data.fullName}</p>
        <p><b>Email:</b> ${data.email}</p>
        <p><b>WhatsApp:</b> ${data.whatsapp}</p>
        <p><b>Qualification:</b> ${data.qualification}</p>
        <hr>
        <h3>Full Details:</h3>
        <p><b>Date of Birth:</b> ${data.dob}</p>
        <p><b>Gender:</b> ${data.gender}</p>
        <p><b>Address:</b> ${data.address}</p>
        <p><b>Board (10th):</b> ${data.board10}</p>
        <p><b>Year (Intermediate):</b> ${data.yearIntermediate}</p>
        <p><b>Experience (Years):</b> ${data.experienceYears}</p>
        <p><b>Classes:</b> ${data.classes}</p>
        ${
          data.classesOther
            ? `<p><b>Other Classes:</b> ${data.classesOther}</p>`
            : ""
        }
        <p><b>Subjects:</b> ${data.subjects}</p>
        <p><b>Preferred Areas:</b> ${data.preferredAreas}</p>
        ${
          data.referredBy ? `<p><b>Referred By:</b> ${data.referredBy}</p>` : ""
        }
      `,
      attachments,
    });

    console.log("✅ [Mail] Email sent successfully");

    await appendToGoogleSheet(data);

    console.log("🎉 [API] Flow completed successfully");

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ [API ERROR]:", err);
    return NextResponse.json(
      { success: false, error: String(err) },
      { status: 500 }
    );
  }
}
