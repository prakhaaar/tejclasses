import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main
      id="home"
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white"
    >
      <Header />

      {/* HERO */}
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* LEFT CONTENT */}
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
                Most Affordable and Best Home Tutorial in Lucknow
              </h1>

              <p className="mt-6 text-lg md:text-xl text-gray-900">
                <a
                  href="tel:+918887525956"
                  className="inline-block hover:text-green-500 transition"
                >
                  Reach us here 📞 +91 88875 25956
                </a>
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-5 justify-center md:justify-start">
                <Link
                  href="/student"
                  className="rounded-2xl bg-indigo-600 px-10 py-4 text-white font-semibold shadow-lg hover:bg-indigo-700 hover:shadow-xl transition"
                >
                  Hire a Home Tutor
                </Link>

                <Link
                  href="/tutor"
                  className="rounded-2xl border-2 border-indigo-600 px-10 py-4 font-semibold text-indigo-600 hover:bg-indigo-50 transition"
                >
                  Register as a Teacher
                </Link>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative w-full h-[320px] md:h-[420px]">
              <Image
                src="/tejclasses.png"
                alt="Home tutor teaching student at Tej Classes"
                fill
                priority
                className="object-cover rounded-3xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      {/* ABOUT */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* LEFT IMAGE */}
            <div className="relative w-full h-[280px] md:h-[380px]">
              <Image
                src="/tejclassescta.png"
                alt="Experienced home tutor teaching a student at Tej Classes"
                fill
                className="object-cover rounded-3xl shadow-lg"
              />
            </div>

            {/* RIGHT CONTENT */}
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                About Tej Classes Home Tutorial
              </h2>

              <p className="mt-6 text-gray-600 leading-relaxed text-lg">
                Tej Classes Home Tutorial provides trusted and experienced home
                tutors for students across Lucknow. We focus on personalized
                learning, affordable fees, and quality education to help
                students achieve academic success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      {/* TESTIMONIALS */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* LEFT IMAGE */}
            <div className="relative w-full h-[320px] md:h-[420px]">
              <Image
                src="/test.png"
                alt="Happy students and parents with Tej Classes Home Tutorial"
                fill
                className="object-contain rounded-3xl"
              />
            </div>

            {/* RIGHT CONTENT */}
            <div>
              <div className="text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Trusted by Students & Parents
                </h2>
                <p className="mt-4 text-gray-600 max-w-xl">
                  Real feedback from students and parents who experienced
                  quality learning with Tej Classes Home Tutorial.
                </p>
              </div>

              <div className="mt-12 grid gap-8 md:grid-cols-2">
                {[
                  {
                    name: "Harshit Agarwal",
                    role: "Parent",
                    review:
                      "Tej Classes Home Tutorial provided very satisfactory tutors and consistent academic support. I am completely satisfied after joining.",
                  },
                  {
                    name: "Vaibhav Chaubey",
                    role: "Student",
                    review:
                      "The teaching quality is excellent. Concepts are explained clearly and doubts are handled patiently. Highly recommended!",
                  },
                  {
                    name: "Eshaan Mishra",
                    role: "Student",
                    review:
                      "Tej Classes Home Tutorial helped me improve my grades significantly. The tutors are knowledgeable and very supportive.",
                  },
                ].map((t, i) => (
                  <div
                    key={i}
                    className="rounded-3xl bg-white p-8 shadow-md hover:shadow-xl transition"
                  >
                    <div className="flex gap-1 text-yellow-400 text-lg">
                      ★★★★★
                    </div>

                    <p className="mt-5 text-gray-700 leading-relaxed">
                      “{t.review}”
                    </p>

                    <div className="mt-8">
                      <p className="font-semibold text-gray-900">{t.name}</p>
                      <p className="text-sm text-gray-500">{t.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
