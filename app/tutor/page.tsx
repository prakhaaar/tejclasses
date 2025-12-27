"use client";

import React, { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";

// Tailwind-only, no extra libs required
// Drop this file into: app/components/TutorRegistrationForm.tsx (or /components in pages router)
// Then render <TutorRegistrationForm /> on a page.

export default function TutorRegistrationForm() {
  // ----- Form State -----
  const [form, setForm] = useState({
    fullName: "",
    dob: "",
    gender: "",
    email: "",
    whatsapp: "",
    address: "",
    photo: undefined as File | undefined,
    marksheet: undefined as File | undefined,
    idProof: undefined as File | undefined,
    qualification: "",
    board10: "",
    yearIntermediate: "",
    experienceYears: "",
    classes: [] as string[],
    classesOther: "",
    subjects: "",
    preferredAreas: "",
    referredBy: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [useCompressed, setUseCompressed] = useState(true);

  const MAX_FILE_SIZE = 4 * 1024 * 1024; // Vercel-safe

  const requiredKeys: (keyof typeof form)[] = [
    "fullName",
    "dob",
    "gender",
    "email",
    "whatsapp",
    "address",
    "photo",
    "marksheet",
    "idProof",
    "qualification",
    "board10",
    "yearIntermediate",
    "experienceYears",
    "classes",
    "subjects",
    "preferredAreas",
  ];

  const answeredCount = useMemo(() => {
    return requiredKeys.reduce((acc, key) => {
      const v = (form as any)[key];
      if (Array.isArray(v)) return acc + (v.length > 0 ? 1 : 0);
      if (v instanceof File || typeof v === "object") return acc + (v ? 1 : 0);
      return acc + (String(v ?? "").trim() ? 1 : 0);
    }, 0);
  }, [form]);

  // ----- Helpers -----
  const updateField = (key: keyof typeof form, value: any) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key as string]: "" }));
  };
  const validate = () => {
    const e: Record<string, string> = {};

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

    const phoneRegex = /^[6-9]\d{9}$/; // India mobile standard

    const nameRegex = /^[a-zA-Z\s]{3,}$/;

    const currentYear = new Date().getFullYear();

    // ---------- Required fields ----------
    for (const key of requiredKeys) {
      const v = (form as any)[key];
      const filled = Array.isArray(v)
        ? v.length > 0
        : v instanceof File
        ? !!v
        : String(v ?? "").trim() !== "";

      if (!filled) e[key] = "This field is required.";
    }

    // ---------- Full Name ----------
    if (form.fullName && !nameRegex.test(form.fullName.trim())) {
      e.fullName =
        "Name must contain only letters and be at least 3 characters.";
    }

    // ---------- DOB (Age >= 18) ----------
    if (form.dob) {
      const dob = new Date(form.dob);
      const age = (Date.now() - dob.getTime()) / (1000 * 60 * 60 * 24 * 365.25);

      if (age < 18) {
        e.dob = "Tutor must be at least 18 years old.";
      }
    }

    // ---------- Email ----------
    if (form.email && !emailRegex.test(form.email)) {
      e.email = "Enter a valid email address.";
    }

    // ---------- WhatsApp ----------
    const cleanPhone = form.whatsapp.replace(/\D/g, "");
    if (cleanPhone && !phoneRegex.test(cleanPhone)) {
      e.whatsapp = "Enter a valid 10-digit Indian mobile number.";
    }

    // ---------- Year of Passing ----------
    if (
      form.yearIntermediate &&
      (Number(form.yearIntermediate) < 1970 ||
        Number(form.yearIntermediate) > currentYear)
    ) {
      e.yearIntermediate = `Year must be between 1970 and ${currentYear}.`;
    }

    // ---------- Teaching Experience ----------
    if (form.experienceYears) {
      const exp = Number(form.experienceYears);
      if (exp < 0) e.experienceYears = "Experience cannot be negative.";
    }

    // ---------- Subjects ----------
    if (form.subjects && form.subjects.trim().length < 5) {
      e.subjects = "Please mention at least one subject properly.";
    }

    // ---------- Preferred Areas ----------
    if (form.preferredAreas && form.preferredAreas.trim().length < 5) {
      e.preferredAreas = "Please specify valid teaching areas.";
    }

    // ---------- Classes ----------
    if (form.classes.length === 0) {
      e.classes = "Select at least one class group.";
    }

    if (form.classes.includes("Other") && !form.classesOther.trim()) {
      e.classesOther = "Please specify other class group.";
    }

    // ---------- File Validation ----------
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "application/pdf",
    ];

    const checkFile = (file?: File, field?: string) => {
      if (!file) return;
      if (file.size > MAX_FILE_SIZE) {
        e[field!] = "File size must be under 4MB.";
      }
      if (!allowedTypes.includes(file.type)) {
        e[field!] = "Only JPG, PNG or PDF files are allowed.";
      }
    };

    checkFile(form.photo, "photo");
    checkFile(form.marksheet, "marksheet");
    checkFile(form.idProof, "idProof");

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (v instanceof File) fd.append(k, v);
        else if (Array.isArray(v)) fd.append(k, JSON.stringify(v));
        else fd.append(k, String(v ?? ""));
      });

      // 1️⃣ Send admin mail
      const adminRes = await fetch("/api/send-email", {
        method: "POST",
        body: fd,
      });

      if (!adminRes.ok) {
        throw new Error("Admin email failed");
      }

      // 2️⃣ Send tutor mail
      const tutorRes = await fetch("/api/senttotutor", {
        method: "POST",
        body: fd,
      });

      if (!tutorRes.ok) {
        throw new Error("Tutor email failed");
      }

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("❌ Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ----- UI Bits -----
  const label = (text: string, required = false) => (
    <label className="block text-sm font-medium text-gray-800">
      {text}
      {required && <span className="ml-1 text-rose-600">*</span>}
    </label>
  );

  const helper = (text: string) => (
    <p className="mt-1 text-xs text-gray-500">{text}</p>
  );

  const errorText = (key: string) =>
    errors[key] ? (
      <p className="mt-1 text-xs text-rose-600">{errors[key]}</p>
    ) : null;

  const box = (
    props: React.HTMLAttributes<HTMLDivElement> & { title?: string }
  ) => (
    <div
      {...props}
      className={
        "rounded-2xl bg-white/70 ring-1 ring-black/5 backdrop-blur p-4 md:p-6 shadow-sm " +
        (props.className || "")
      }
    />
  );

  return (
    <>
      <Header />

      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="text-center mb-14">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 ">
            Register as a Tutor
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600 ">
            Join Tej Classes Home Tutorial and start teaching students across
            Lucknow. Fill in the details below your profile will be verified
            before approval.
          </p>
        </div>
        <form onSubmit={onSubmit} className="mt-8 space-y-6">
          {/* Row 1 */}
          {box({
            className: "grid grid-cols-1 md:grid-cols-2 gap-6",
            children: (
              <>
                <div>
                  {label("1. Full Name", true)}
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(e) => updateField("fullName", e.target.value)}
                    placeholder="Enter your full name"
                    className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {errorText("fullName")}
                </div>

                <div>
                  {label("2. Date of Birth", true)}
                  <input
                    type="date"
                    value={form.dob}
                    onChange={(e) => updateField("dob", e.target.value)}
                    className="mt-2 w-full rounded-xl border border-gray-300  bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {helper("dd-mm-yyyy")}
                  {errorText("dob")}
                </div>

                <div>
                  {label("3. Gender", true)}
                  <div className="mt-3 flex items-center gap-6">
                    {[
                      { label: "Male", value: "Male" },
                      { label: "Female", value: "Female" },
                    ].map((g) => (
                      <label
                        key={g.value}
                        className="inline-flex items-center gap-2"
                      >
                        <input
                          type="radio"
                          name="gender"
                          value={g.value}
                          checked={form.gender === g.value}
                          onChange={(e) =>
                            updateField("gender", e.target.value)
                          }
                          className="h-4 w-4"
                        />
                        <span className="text-sm text-gray-800 ">
                          {g.label}
                        </span>
                      </label>
                    ))}
                  </div>
                  {errorText("gender")}
                </div>

                <div>
                  {label("4. E-Mail", true)}
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="you@example.com"
                    className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {errorText("email")}
                </div>
              </>
            ),
          })}

          {/* Row 2 */}
          {box({
            className: "grid grid-cols-1 md:grid-cols-2 gap-6",
            children: (
              <>
                <div>
                  {label("5. WhatsApp Number", true)}
                  <input
                    type="tel"
                    value={form.whatsapp}
                    onChange={(e) => updateField("whatsapp", e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="mt-2 w-full rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {errorText("whatsapp")}
                </div>

                <div>
                  {label("6. Full Address with Pincode", true)}
                  <textarea
                    value={form.address}
                    onChange={(e) => updateField("address", e.target.value)}
                    rows={3}
                    placeholder="House No, Street, Area, City - Pincode"
                    className="mt-2 w-full rounded-xl border border-gray-300  bg-white px-3 py-2 text-gray-900  focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {errorText("address")}
                </div>

                {/* Files */}
                <div>
                  {label("7. Latest Photograph", true)}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => updateField("photo", e.target.files?.[0])}
                    className="mt-2 block w-full text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:font-medium file:text-indigo-700 hover:file:bg-indigo-100"
                  />
                  {helper("Maximum allowed file size is 4MB.")}
                  {errorText("photo")}
                </div>

                <div>
                  {label("8. Latest Marksheet Proof/Degree", true)}
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) =>
                      updateField("marksheet", e.target.files?.[0])
                    }
                    className="mt-2 block w-full text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:font-medium file:text-indigo-700 hover:file:bg-indigo-100"
                  />
                  {helper("Maximum allowed file size is 4MB.")}
                  {errorText("marksheet")}
                </div>

                <div className="md:col-span-2">
                  {label("9. Government ID Proof", true)}
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) =>
                      updateField("idProof", e.target.files?.[0])
                    }
                    className="mt-2 block w-full text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:font-medium file:text-indigo-700 hover:file:bg-indigo-100"
                  />
                  {helper("Maximum allowed file size is 4MB.")}
                  {errorText("idProof")}
                </div>
              </>
            ),
          })}

          {/* Row 3 */}
          {box({
            className: "grid grid-cols-1 md:grid-cols-2 gap-6",
            children: (
              <>
                <div>
                  {label("10. Highest Qualification", true)}
                  <select
                    value={form.qualification}
                    onChange={(e) =>
                      updateField("qualification", e.target.value)
                    }
                    className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="" disabled>
                      Select your highest qualification
                    </option>
                    <option>High School</option>
                    <option>Diploma</option>
                    <option>Bachelor's</option>
                    <option>Master's</option>
                    <option>PhD</option>
                    <option>Other</option>
                  </select>
                  {errorText("qualification")}
                </div>

                <div>
                  {label("11. Board Studied in 10th", true)}
                  <select
                    value={form.board10}
                    onChange={(e) => updateField("board10", e.target.value)}
                    className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="" disabled>
                      Select your board
                    </option>
                    <option>CBSE</option>
                    <option>ICSE</option>
                    <option>State Board</option>
                    <option>Other</option>
                  </select>
                  {errorText("board10")}
                </div>

                <div>
                  {label("12. Year Of Passing Intermediate", true)}
                  <input
                    type="number"
                    min={1970}
                    max={new Date().getFullYear()}
                    value={form.yearIntermediate}
                    onChange={(e) =>
                      updateField("yearIntermediate", e.target.value)
                    }
                    placeholder="e.g. 2021"
                    className="mt-2 w-full rounded-xl border border-gray-300  bg-white  px-3 py-2 text-gray-900  focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {errorText("yearIntermediate")}
                </div>

                <div>
                  {label("13. Years of Teaching Experience", true)}
                  <input
                    type="number"
                    min={0}
                    step={0.5}
                    value={form.experienceYears}
                    onChange={(e) =>
                      updateField("experienceYears", e.target.value)
                    }
                    placeholder="e.g. 3"
                    className="mt-2 w-full rounded-xl border border-gray-300 bg-white  px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {errorText("experienceYears")}
                </div>
              </>
            ),
          })}

          {/* Row 4 */}
          {box({
            className: "grid grid-cols-1 gap-6",
            children: (
              <>
                <div>
                  {label("14. Classes Comfortable Teaching", true)}
                  <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                    {[
                      "Pre Primary",
                      "Primary",
                      "Junior",
                      "9-10",
                      "11-12",
                      "Other",
                    ].map((c) => (
                      <label
                        key={c}
                        className="flex items-center gap-2 rounded-xl border border-gray-300 px-3 py-2 text-sm"
                      >
                        <input
                          type="checkbox"
                          checked={form.classes.includes(c)}
                          onChange={(e) => {
                            const { checked } = e.target;
                            updateField(
                              "classes",
                              checked
                                ? [...form.classes, c]
                                : form.classes.filter((x) => x !== c)
                            );
                          }}
                        />
                        <span className="text-gray-800">{c}</span>
                      </label>
                    ))}
                  </div>
                  {form.classes.includes("Other") && (
                    <input
                      type="text"
                      value={form.classesOther}
                      onChange={(e) =>
                        updateField("classesOther", e.target.value)
                      }
                      placeholder="Please specify other class group"
                      className="mt-3 w-full rounded-xl border border-gray-300  bg-white  px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  )}
                  {errorText("classes")}
                  {errorText("classesOther")}
                </div>

                <div>
                  {label("15. Subjects You Can Teach", true)}
                  <textarea
                    value={form.subjects}
                    onChange={(e) => updateField("subjects", e.target.value)}
                    rows={3}
                    placeholder="e.g. Mathematics, Physics, English"
                    className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {errorText("subjects")}
                </div>

                <div>
                  {label("16. Preferred Areas for Teaching", true)}
                  <textarea
                    value={form.preferredAreas}
                    onChange={(e) =>
                      updateField("preferredAreas", e.target.value)
                    }
                    rows={3}
                    placeholder="e.g. Gomti Nagar, Indira Nagar, Aliganj"
                    className="mt-2 w-full rounded-xl border border-gray-300  bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {errorText("preferredAreas")}
                </div>

                <div>
                  {label(
                    "17. If referred by existing tutor, mention their name"
                  )}
                  <input
                    type="text"
                    value={form.referredBy}
                    onChange={(e) => updateField("referredBy", e.target.value)}
                    placeholder="Name of referring tutor (optional)"
                    className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </>
            ),
          })}

          {/* Footer */}
          <div className="sticky bottom-6 z-20">
            <div className="mx-auto max-w-5xl rounded-2xl border border-gray-200 bg-white/90  backdrop-blur px-4 py-3 shadow-lg">
              <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <AnimatePresence mode="wait">
                    {isSubmitting ? (
                      <motion.span
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <motion.span
                          className="h-4 w-4 rounded-full border-2 border-white border-t-transparent"
                          animate={{ rotate: 360 }}
                          transition={{
                            repeat: Infinity,
                            duration: 0.8,
                            ease: "linear",
                          }}
                        />
                        Submitting…
                      </motion.span>
                    ) : (
                      <motion.span
                        key="text"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        Submit Registration
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>
          </div>
        </form>

        {submitted && (
          <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
            <p className="font-semibold">Thank you! 🎉</p>
            <p className="text-sm mt-1">
              Your registration with <strong>Tej Classes Home Tutorial</strong>{" "}
              has been received. Our team will verify your profile and contact
              you shortly.
            </p>
          </div>
        )}

        <p className="mt-10 text-center text-xs text-gray-400">
          Answered {answeredCount} of 16
        </p>
      </div>
      <Footer />
    </>
  );
}
