"use client";

import Header from "@/components/Header";
import Footer  from "@/components/Footer";
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
    <div className="mx-auto max-w-xl px-4 py-10">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-br from-indigo-600 to-fuchsia-600 p-[1px] shadow-lg">
        <div className="rounded-3xl bg-white p-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Student Registration
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Register to get started with Tej Classes
          </p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={onSubmit}
        className="mt-8 rounded-2xl bg-white p-6 shadow ring-1 ring-black/5 space-y-5"
      >
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-800">
            Full Name <span className="text-rose-600">*</span>
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder="Enter student's full name"
            className="mt-2 w-full rounded-xl border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500"
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
            className="mt-2 w-full rounded-xl border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500"
          />
          {errors.mobile && (
            <p className="mt-1 text-xs text-rose-600">{errors.mobile}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 py-2.5 text-sm font-semibold text-white shadow hover:brightness-110"
        >
          Register
        </button>
      </form>

      {/* Success */}
      {submitted && (
        <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
          <p className="font-semibold">Registration successful 🎉</p>
          <p className="text-sm mt-1">
            We’ll contact you shortly on WhatsApp.
          </p>
        </div>
      )}
    </div>
    <Footer />  
    </>
  );
}
