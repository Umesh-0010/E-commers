import React from "react";

// Sample team data
const team = [
  { id: 1, name: "Alice Johnson", role: "CEO", image: "/images/team1.jpg" },
  { id: 2, name: "Bob Smith", role: "CTO", image: "/images/team2.jpg" },
  { id: 3, name: "Clara Lee", role: "Designer", image: "/images/team3.jpg" },
  { id: 4, name: "David Kim", role: "Developer", image: "/images/team4.jpg" },
];

function AboutUs() {
  return (
    <div className="h-144 w-full bg-gray-50 text-gray-800">
      
      <section className="relative bg-linear-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-24 px-6 md:px-20 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
          About Us
        </h1>
        <p className="text-lg md:text-xl max-w-2xl drop-shadow-md">
          We are committed to delivering top-quality products and exceptional service to our customers. Our team is passionate about innovation and excellence.
        </p>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 px-6 md:px-20 grid md:grid-cols-2 gap-12">
        <div className="bg-white shadow-2xl rounded-xl p-8 hover:scale-105 transform transition duration-300">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">Our Mission</h2>
          <p className="text-gray-700 text-base md:text-lg">
            To empower our customers with innovative solutions that simplify their lives and create long-lasting value.
          </p>
        </div>
        <div className="bg-white shadow-2xl rounded-xl p-8 hover:scale-105 transform transition duration-300">
          <h2 className="text-2xl font-bold mb-4 text-purple-600">Our Vision</h2>
          <p className="text-gray-700 text-base md:text-lg">
            To be a global leader in our industry, recognized for quality, integrity, and the dedication of our team.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6 md:px-20 bg-gray-100">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {team.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transform transition duration-300"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="font-semibold text-xl">{member.name}</h3>
                <p className="text-gray-500">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6 md:px-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
          Get in Touch
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-6">
          Have questions or want to work with us? Reach out anytime, and we’ll get back to you promptly.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors">
          Contact Us
        </button>
      </section>
    </div>
  );
}

export default AboutUs;