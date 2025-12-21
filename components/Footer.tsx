import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-16 grid gap-10 md:grid-cols-3">
        {/* Brand */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">
            Tej Classes Home Tutorial
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
            Tej Classes Home Tutorial provides trusted and affordable home
            tuition services in Lucknow, focusing on personalized learning and
            academic success.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-5">Quick Links</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="#home" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/tutor" className="hover:text-white transition">
                Register as a Teacher
              </Link>
            </li>
            <li>
              <Link href="/student" className="hover:text-white transition">
                Hire a Home Tutor
              </Link>
            </li>
          </ul>
        </div>

        {/* Reach Us */}
        <div>
          <h4 className="text-white font-semibold mb-5">Reach Us</h4>

          <div className="space-y-3 text-sm">
            <a
              href="https://www.instagram.com/tejclasses_hometutorial/"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:text-pink-400 transition"
            >
              📸 Instagram
            </a>

            <a
              href="tel:+918887525956"
              className="block hover:text-green-400 transition"
            >
              📞 +91 88875 25956
            </a>

            <a
              href="mailto:tejclasseshometutorial@gmail.com"
              className="block hover:text-blue-400 transition"
            >
              📧 tejclasseshometutorial@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 text-center py-5 text-sm text-gray-400">
        © {new Date().getFullYear()} Tej Classes Home Tutorial. All rights
        reserved.
      </div>
    </footer>
  );
}
