"use client";

import React, { useState } from "react";

export default function StudentRegistrationForm() {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  // ----- Helpers -----
  const updateField = (key: keyof typeof form, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    const phoneRegex = /^[0-9+\-()\s]{8,}$/;

    if (!form.name.trim()) {
      e.name = "Name is required.";
    }

    if (!form.mobile.trim()) {
      e.mobile = "Mobile number is required.";
    } else if (!phoneRegex.test(form.mobile)) {
      e.mobile = "Enter a valid mobile number.";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ----- Submit -----
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const res = await fetch("/api/student-register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setSubmitted(true);
      setForm({ name: "", mobile: "" });
    } else {
      alert("❌ Failed to submit. Please try again.");
    }
  };

  // ----- UI helpers -----
  const label = (text: string) => (
    <label className="block text-sm font-medium text-gray-800 dark:text-gray-100">
      {text}
      <span className="ml-1 text-rose-600">*</span>
    </label>
  );

  const errorText = (key: string) =>
    errors[key] ? (
      <p className="mt-1 text-xs text-rose-600">{errors[key]}</p>
    ) : null;

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 p-[1px] shadow-lg">
        <div className="rounded-3xl bg-white dark:bg-slate-950 p-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Student Registration
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Register to get started with{" "}
            <span className="font-semibold">Tej Classes</span>
          </p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={onSubmit}
        className="mt-6 space-y-5 rounded-2xl bg-white/80 dark:bg-slate-900/70 p-6 ring-1 ring-black/5 backdrop-blur shadow-sm"
      >
        <div>
          {label("Full Name")}
          <input
            type="text"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder="Enter student name"
            className="mt-2 w-full rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errorText("name")}
        </div>

        <div>
          {label("Mobile Number")}
          <input
            type="tel"
            value={form.mobile}
            onChange={(e) => updateField("mobile", e.target.value)}
            placeholder="e.g. 9876543210"
            className="mt-2 w-full rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errorText("mobile")}
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          Submit
        </button>
      </form>

      {/* Success */}
      {submitted && (
        <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900 dark:border-emerald-900/40 dark:bg-emerald-950/40 dark:text-emerald-200">
          <p className="font-semibold">Registration successful 🎉</p>
          <p className="text-sm mt-1">
            We’ll contact you shortly on the provided number.
          </p>
        </div>
      )}
    </div>
  );
}
