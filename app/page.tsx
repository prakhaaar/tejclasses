import Header from "@/components/Header";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <main id="home" className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Join TejClasses as a Tutor
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Empower students with quality home tuition and flexible teaching
          opportunities.
        </p>
      </section>
      {/* Testimonials Section */}
<section className="bg-gradient-to-b from-white to-gray-50 py-20">
  <div className="max-w-7xl mx-auto px-4">
    {/* Heading */}
    <div className="text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
        Trusted by Students & Parents
      </h2>
      <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
        Real feedback from students and parents who experienced quality learning
        with TejClasses.
      </p>
    </div>

    {/* Testimonials Grid */}
    <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {[
        {
          name: "Harshit Agarwal",
          role: "Parent",
          review:
            "TejClasses provided very satisfactory tutors and consistent academic support. I am completely satisfied after joining.",
          rating: 5,
        },
        {
          name: "Vaibhav Chaubey",
          role: "Student",
          review:
            "The teaching quality is excellent. Concepts are explained clearly and doubts are handled patiently. Highly recommended!",
          rating: 5,
        },
        {
          name: "Eshaan Mishra",
          role: "Student",
          review:
            "TejClasses helped me improve my grades significantly. The tutors are knowledgeable and very supportive.",
          rating: 5,
        },
      ].map((t, i) => (
        <div
          key={i}
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >
          {/* Stars */}
          <div className="flex gap-1 text-yellow-400">
            {Array.from({ length: t.rating }).map((_, i) => (
              <span key={i}>★</span>
            ))}
          </div>

          {/* Review */}
          <p className="mt-4 text-gray-700 leading-relaxed">
            “{t.review}”
          </p>

          {/* User */}
          <div className="mt-6">
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
