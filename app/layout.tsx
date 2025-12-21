import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Tej Classes Home Tutorial | Best Home Tutors in Lucknow",
    template: "%s | Tej Classes Home Tutorial",
  },

  description:
    "Tej Classes Home Tutorial provides the most affordable and trusted home tutors in Lucknow. Hire experienced home tutors or register as a teacher today.",

  keywords: [
    "Tej Classes Home Tutorial",
    "Home Tutor in Lucknow",
    "Best Home Tutors in Lucknow",
    "Private Tutor Lucknow",
    "Home Tuition Lucknow",
    "Tutor Registration Lucknow",
    "Hire Home Tutor",
  ],

  authors: [{ name: "Tej Classes Home Tutorial" }],
  creator: "Tej Classes Home Tutorial",
  publisher: "Tej Classes Home Tutorial",

  openGraph: {
    title: "Tej Classes Home Tutorial | Best Home Tutors in Lucknow",
    description:
      "Find experienced and affordable home tutors in Lucknow. Hire a home tutor or register as a teacher with Tej Classes Home Tutorial.",
    siteName: "Tej Classes Home Tutorial",
    locale: "en_IN",
    type: "website",
    // url: "https://tejclasseshometutorial.", // add when domain is live
  },

  twitter: {
    card: "summary_large_image",
    title: "Tej Classes Home Tutorial | Best Home Tutors in Lucknow",
    description:
      "Affordable and trusted home tuition services in Lucknow. Hire a tutor or join as a teacher today.",
  },

  robots: {
    index: true,
    follow: true,
  },

  category: "education",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
