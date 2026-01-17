import { Star } from "lucide-react";

const recruiters = [
  {
    id: 1,
    name: "Google",
    rating: 4.6,
    reviews: "5.7k",
    tagline: "Build products that impact billions",
  },
  {
    id: 2,
    name: "Amazon",
    rating: 4.4,
    reviews: "4.9k",
    tagline: "Work hard. Have fun. Make history.",
  },
  {
    id: 3,
    name: "Microsoft",
    rating: 4.5,
    reviews: "6.2k",
    tagline: "Empower every person and organization",
  },
  {
    id: 4,
    name: "Infosys",
    rating: 4.2,
    reviews: "8.1k",
    tagline: "Navigate your next",
  },
];

export default function RecruiterCard() {
  return (
    <section className="px-6 py-16 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Top Recruiters
          </h2>
          <button className="text-blue-600 font-medium hover:underline">
            View all companies →
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {recruiters.map((rec) => (
            <div
              key={rec.id}
              className="border rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition"
            >
              {/* Company Logo Placeholder */}
              <div className="h-12 w-12 bg-blue-100 text-blue-700 font-bold flex items-center justify-center rounded-lg mb-4">
                {rec.name[0]}
              </div>

              {/* Company Name */}
              <h3 className="font-semibold text-lg text-gray-900">
                {rec.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-1 mt-1 text-sm">
                <Star size={16} className="text-yellow-500 fill-yellow-500" />
                <span className="font-medium">{rec.rating}</span>
                <span className="text-gray-500">
                  ({rec.reviews} reviews)
                </span>
              </div>

              {/* Tagline */}
              <p className="text-sm text-gray-600 mt-2">
                {rec.tagline}
              </p>

              {/* Action */}
              <button className="mt-4 w-full border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition">
                View Jobs
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
