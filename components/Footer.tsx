import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12 grid gap-8 md:grid-cols-3">
        
        {/* Brand */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">
            TejClasses
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Personalized home tuition for quality learning, academic growth,
            and long-term success.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#home" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="#register" className="hover:text-white transition">
                Tutor Registration
              </Link>
            </li>
            <li>
              <Link href="#contact" className="hover:text-white transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Reach Us */}
        <div>
          <h4 className="text-white font-semibold mb-4">
            Reach Us
          </h4>

          <div className="space-y-2 text-sm">
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
              href="mailto:tejclasses@gmail.com"
              className="block hover:text-blue-400 transition"
            >
              📧tejclasseshometutorial@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} TejClasses. All rights reserved.
      </div>
    </footer>
  );
}
