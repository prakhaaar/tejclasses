"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/favicon.ico"
            alt="TejClasses Logo"
            width={40}
            height={40}
            className="rounded-full shadow-sm"
          />
          <span className="text-xl font-bold text-gray-900">
            TejClasses
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-3">
          <Link
            href="/tutor"
            className="rounded-xl border border-indigo-600 px-4 py-2 text-sm font-semibold text-indigo-600 hover:bg-indigo-50 transition"
          >
            Register as Tutor
          </Link>

          <Link
            href="/student"
            className="rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-4 py-2 text-sm font-semibold text-white shadow hover:brightness-110 transition"
          >
            Hire a Tutor
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden inline-flex items-center justify-center rounded-lg border border-gray-300 p-2 text-gray-700 hover:bg-gray-100"
        >
          {open ? (
            <span className="text-xl">✕</span>
          ) : (
            <span className="text-xl">☰</span>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-sm">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/tutor"
              onClick={() => setOpen(false)}
              className="block w-full rounded-xl border border-indigo-600 px-4 py-2 text-center text-sm font-semibold text-indigo-600 hover:bg-indigo-50 transition"
            >
              Register as Tutor
            </Link>

            <Link
              href="/student"
              onClick={() => setOpen(false)}
              className="block w-full rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-4 py-2 text-center text-sm font-semibold text-white shadow hover:brightness-110 transition"
            >
              Hire a Tutor
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
