import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  /* -------------------------
     Handle Input Changes
  ------------------------- */
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /* -------------------------
     Handle Form Submit
  ------------------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus("");

    try {
      const response = await fetch(
        "https://motorcycle-rental-api.onrender.com/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setStatus("✅ Message sent successfully!");

        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        setStatus(`❌ ${data.error}`);
      }
    } catch (error) {
      console.error(error);

      setStatus("❌ Server error.");
    }
  };

  return (
    <section className="max-w-xl mx-auto py-20 px-4">
      <h2 className="text-2xl font-bold mb-4">
        Contact Us
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-white p-6 rounded shadow"
      >
        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="p-3 border rounded"
          required
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="p-3 border rounded"
          required
        />

        {/* Message */}
        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          className="p-3 border rounded"
          rows="5"
          required
        />

        {/* Button */}
        <button
          type="submit"
          className="bg-green-600 text-white py-3 rounded hover:bg-green-700"
        >
          Send
        </button>

        {/* Status */}
        {status && (
          <p className="text-center text-sm text-gray-700">
            {status}
          </p>
        )}
      </form>
    </section>
  );
}