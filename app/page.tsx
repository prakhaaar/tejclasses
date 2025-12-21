import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <main
      id="home"
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white"
    >
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
            Most Affordable and Best Home Tutorial in Lucknow
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            We are the most affordable and best home tutorial in Lucknow.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-5">
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
      </section>

      {/* ABOUT */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            About Tej Classes Home Tutorial
          </h2>

          <p className="mt-6 text-gray-600 leading-relaxed max-w-3xl mx-auto text-lg">
            Tej Classes Home Tutorial provides trusted and experienced home
            tutors for students across Lucknow. We focus on personalized
            learning, affordable fees, and quality education to help students
            achieve academic success.
          </p>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Trusted by Students & Parents
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Real feedback from students and parents who experienced quality
              learning with Tej Classes Home Tutorial.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
                <div className="flex gap-1 text-yellow-400 text-lg">★★★★★</div>

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
      </section>

      <Footer />
    </main>
  );
}
