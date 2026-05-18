import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Fleet() {
  // Store bikes from backend
  const [bikes, setBikes] = useState([]);

  // Store selected bike for modal
  const [selectedBike, setSelectedBike] = useState(null);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Error state
  const [error, setError] = useState("");

  /* --------------------------------
     Fetch bikes from backend
  -------------------------------- */
  useEffect(() => {
    fetch("http://localhost:5000/api/bikes")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch bikes");
        }

        return res.json();
      })
      .then((data) => {
        setBikes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);

        setError("Could not load bikes.");
        setLoading(false);
      });
  }, []);

  /* --------------------------------
     Open modal
  -------------------------------- */
  const openModal = (bike) => {
    setSelectedBike(bike);
  };

  /* --------------------------------
     Close modal
  -------------------------------- */
  const closeModal = () => {
    setSelectedBike(null);
  };

  /* --------------------------------
     Loading UI
  -------------------------------- */
  if (loading) {
    return (
      <div className="text-center py-20 text-xl">
        Loading bikes...
      </div>
    );
  }

  /* --------------------------------
     Error UI
  -------------------------------- */
  if (error) {
    return (
      <div className="text-center py-20 text-red-600 text-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-center mb-8">
        Choose Your Ride
      </h2>

      {/* Bike Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {bikes.map((bike) => (
          <div
            key={bike.id}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            {/* Bike Image */}
            <img
              src={bike.image}
              alt={bike.name}
              className="max-h-full max-w-full object-contain"
            />

            {/* Bike Content */}
            <div className="p-4 text-center">
              <h4 className="text-xl font-semibold mb-2">
                {bike.name}
              </h4>

              <button
                onClick={() => openModal(bike)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedBike && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-md w-full relative">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-xl font-bold"
              onClick={closeModal}
            >
              ×
            </button>

            {/* Bike Image */}
            <img
              src={selectedBike.image}
              alt={selectedBike.name}
              className="w-full h-60 object-cover rounded"
            />

            {/* Bike Name */}
            <h3 className="text-2xl font-bold mt-4">
              {selectedBike.name}
            </h3>

            {/* Bike Description */}
            <p className="text-gray-700 mt-2">
              {selectedBike.description}
            </p>

            {/* Booking Button */}
            <Link
              to={`/booking?bike=${encodeURIComponent(
                selectedBike.name
              )}`}
              className="inline-block mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}