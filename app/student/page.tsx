"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import React, { useState } from "react";

export default function StudentRegistrationForm() {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const updateField = (key: keyof typeof form, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};

    const nameRegex = /^[a-zA-Z\s]{3,}$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!form.name.trim()) {
      e.name = "Name is required.";
    } else if (!nameRegex.test(form.name.trim())) {
      e.name = "Enter a valid name (min 3 letters).";
    }

    const cleanPhone = form.mobile.replace(/\D/g, "");
    if (!cleanPhone) {
      e.mobile = "Mobile number is required.";
    } else if (!phoneRegex.test(cleanPhone)) {
      e.mobile = "Enter a valid 10-digit Indian mobile number.";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    await fetch("/api/student-registration", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setSubmitted(true);
  };
  return (
    <>
      <Header />

      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-2xl px-4 py-20">
          {/* Page Intro */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Hire a Home Tutor
            </h1>
            <p className="mt-3 text-gray-600 max-w-xl mx-auto">
              Share your details and we will connect you with the best home
              tutors from Tej Classes Home Tutorial.
            </p>
          </div>

          {/* Form Card */}
          <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-black/5">
            <form onSubmit={onSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-800">
                  Full Name <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="Enter student's or parent's full name"
                  className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-rose-600">{errors.name}</p>
                )}
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-sm font-medium text-gray-800">
                  Mobile Number <span className="text-rose-600">*</span>
                </label>
                <input
                  type="tel"
                  value={form.mobile}
                  onChange={(e) => updateField("mobile", e.target.value)}
                  placeholder="e.g. 9876543210"
                  className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                />
                {errors.mobile && (
                  <p className="mt-1 text-xs text-rose-600">{errors.mobile}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full rounded-2xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-lg hover:bg-indigo-700 hover:shadow-xl transition"
              >
                Submit Enquiry
              </button>
            </form>
          </div>

          {/* Success */}
          {submitted && (
            <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-800 text-center">
              <p className="font-semibold text-lg">
                Registration successful 🎉
              </p>
              <p className="text-sm mt-1">
                Our team from Tej Classes Home Tutorial will contact you
                shortly.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
