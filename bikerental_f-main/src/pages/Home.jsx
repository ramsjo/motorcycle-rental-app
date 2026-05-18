import { useEffect, useState } from "react";

export default function Home() {
  // Store bikes from backend
  const [bikes, setBikes] = useState([]);

  /* --------------------------------
     Fetch bikes from backend
  -------------------------------- */
  useEffect(() => {
    fetch("http://localhost:5000/api/bikes")
      .then((res) => res.json())
      .then((data) => {
        // Take first 3 bikes
        setBikes(data.slice(0, 3));
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative h-[110vh] bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/hero.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Explore Freedom on Two Wheels
          </h1>

          <p className="text-xl mb-6">
            Book your ride today with our reliable
            motorcycle rentals
          </p>

          <a
            href="/booking"
            className="bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-500"
          >
            Book Now
          </a>
        </div>
      </section>

      {/* Popular Bikes Section */}
      <section className="py-16 px-4 md:px-20 bg-white">
        <h2 className="text-3xl font-bold text-center mb-10">
          Top Rentals
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {bikes.map((bike, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
            >
              <img
                src={bike.image}
                alt={bike.name}
                className="w-full h-35 object-cover"
              />

              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">
                  {bike.name}
                </h3>

                <a
                  href="/fleet"
                  className="text-blue-600 font-medium hover:underline"
                >
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-100 py-16 px-4 md:px-20">
        <h2 className="text-3xl font-bold text-center mb-10">
          Why Choose Us?
        </h2>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl mb-4">🏍️</div>

            <h4 className="text-xl font-bold mb-2">
              Wide Range of Bikes
            </h4>

            <p>
              Choose from top brands and models.
            </p>
          </div>

          <div>
            <div className="text-4xl mb-4">💰</div>

            <h4 className="text-xl font-bold mb-2">
              Affordable Rates
            </h4>

            <p>
              Competitive pricing with no hidden
              charges.
            </p>
          </div>

          <div>
            <div className="text-4xl mb-4">🔧</div>

            <h4 className="text-xl font-bold mb-2">
              Well Maintained
            </h4>

            <p>
              All bikes are regularly serviced.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-yellow-400 py-12 text-center text-black">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Ride?
        </h2>

        <a
          href="/booking"
          className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800"
        >
          Book Your Ride
        </a>
      </section>
    </div>
  );
}