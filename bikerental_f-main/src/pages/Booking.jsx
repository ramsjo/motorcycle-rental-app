import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import bikes from "../data/bikes";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Booking() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedBike = params.get("bike");

  const [formData, setFormData] = useState({
    name: "",
    fromDate: null,
    toDate: null,
    bike: selectedBike || "",
  });

  const [status, setStatus] = useState("");
  const [unavailableDates, setUnavailableDates] = useState([]);

  /* -----------------------------
     Fetch unavailable dates
  ----------------------------- */
  useEffect(() => {
    if (!formData.bike) return;

    fetch(`http://localhost:5000/api/bookings/${formData.bike}`)
      .then((res) => res.json())
      .then((data) => {
        const dates = [];

        data.forEach((booking) => {
          const start = new Date(booking.fromDate);
          const end = new Date(booking.toDate);

          const current = new Date(start);

          while (current <= end) {
            dates.push(new Date(current));
            current.setDate(current.getDate() + 1);
          }
        });

        setUnavailableDates(dates);
      })
      .catch((err) => console.error(err));
  }, [formData.bike]);

  /* -----------------------------
     Handle text/select changes
  ----------------------------- */
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /* -----------------------------
     Submit booking
  ----------------------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus("");

    if (
      !formData.name ||
      !formData.fromDate ||
      !formData.toDate ||
      !formData.bike
    ) {
      setStatus("❌ Please fill all fields.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            fromDate: formData.fromDate.toISOString().split("T")[0],
            toDate: formData.toDate.toISOString().split("T")[0],
            bike: formData.bike,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setStatus("✅ Booking confirmed!");

        setFormData({
          name: "",
          fromDate: null,
          toDate: null,
          bike: "",
        });
      } else {
        setStatus(`❌ ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Server error.");
    }
  };

  const bikeDetails = bikes.find(
    (b) => b.name === formData.bike
  );

  return (
    <section className="max-w-xl mx-auto py-20 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
        Book Your Ride
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-white shadow-md p-6 rounded"
      >
        {/* Name */}
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="p-3 border rounded"
          required
        />

        {/* From Date */}
        <div>
          <label className="block mb-1 font-medium">
            From Date
          </label>

          <DatePicker
            selected={formData.fromDate}
            onChange={(date) =>
              setFormData((prev) => ({
                ...prev,
                fromDate: date,
              }))
            }
            excludeDates={unavailableDates}
            minDate={new Date()}
            placeholderText="Select start date"
            className="w-full p-3 border rounded"
            dateFormat="yyyy-MM-dd"
          />
        </div>

        {/* To Date */}
        <div>
          <label className="block mb-1 font-medium">
            To Date
          </label>

          <DatePicker
            selected={formData.toDate}
            onChange={(date) =>
              setFormData((prev) => ({
                ...prev,
                toDate: date,
              }))
            }
            excludeDates={unavailableDates}
            minDate={
              formData.fromDate || new Date()
            }
            placeholderText="Select end date"
            className="w-full p-3 border rounded"
            dateFormat="yyyy-MM-dd"
          />
        </div>

        {/* Bike Selection */}
        <select
          name="bike"
          value={formData.bike}
          onChange={handleChange}
          className="p-3 border rounded"
          required
        >
          <option value="">
            Select a motorcycle
          </option>

          {bikes.map((bike) => (
            <option
              key={bike.id}
              value={bike.name}
            >
              {bike.name}
            </option>
          ))}
        </select>

        {/* Submit */}
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white py-3 rounded font-semibold"
        >
          Confirm Booking
        </button>

        {/* Status */}
        {status && (
          <p className="text-center text-sm text-gray-700">
            {status}
          </p>
        )}
      </form>

      {/* Bike Details */}
      {bikeDetails && (
        <div className="mt-6 p-4 border rounded shadow bg-gray-50 text-center">
          <img
            src={bikeDetails.image}
            alt={bikeDetails.name}
            className="mx-auto h-40 object-cover mb-4 rounded"
          />

          <h3 className="text-lg font-semibold">
            {bikeDetails.name}
          </h3>

          <p className="text-sm text-gray-600">
            {bikeDetails.description}
          </p>
        </div>
      )}
    </section>
  );
}