import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { google } from "googleapis";

/**
 * Append student to Google Sheet (Students tab)
 * Columns:
 * A: Full Name
 * B: Phone Number
 */
async function appendStudentToGoogleSheet(name: string, mobile: string) {
  console.log("➡️ [Sheets] Appending student data");

  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: "studentregistration!A:B",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[name, mobile]],
    },
  });

  console.log("✅ [Sheets] Student data appended");
}

/**
 * POST /api/student-registration
 * - Sends email
 * - Appends to Google Sheet
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
        <hr />
        <p>This student has registered through the website.</p>
      `,
    });

    console.log("✅ [Mail] Student registration email sent");

    // ---------- Append to Google Sheet ----------
    await appendStudentToGoogleSheet(name, mobile);

    console.log("🎉 [API] Student flow completed");

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ [Student API ERROR]:", err);
    return NextResponse.json(
      { success: false, error: String(err) },
      { status: 500 }
    );
  }
}
