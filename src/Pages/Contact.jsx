import React, { useEffect } from "react";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import AOS from "aos";
import "aos/dist/aos.css";
import { toast } from "react-toastify";

const Contact = () => {
  useEffect(() => {
    AOS.init({
      duration: 800, // animation duration
      once: true,    // animation happens only once
      easing: "ease-in-out",
    });
  }, []);
    
    const handleSubmit = () => {
        toast.success('Submit successfully')
    }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-12 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <h2
          data-aos="fade-up"
          className="text-3xl md:text-4xl font-bold text-center text-[#101960] dark:text-white mb-6"
        >
          Contact Us
        </h2>
        <p
          data-aos="fade-up"
          data-aos-delay="100"
          className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto"
        >
          Have any questions or want to get in touch? Fill out the form below or reach us through our contact info.
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Contact Info */}
          <div data-aos="fade-right" data-aos-delay="200" className="space-y-6">
            <div className="flex items-center space-x-4">
              <FiMail className="text-[#101960] dark:text-yellow-400 text-2xl" />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Email</h4>
                <p className="text-gray-600 dark:text-gray-300">support@example.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <FiPhone className="text-[#101960] dark:text-yellow-400 text-2xl" />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Phone</h4>
                <p className="text-gray-600 dark:text-gray-300">+880 123 456 789</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <FiMapPin className="text-[#101960] dark:text-yellow-400 text-2xl" />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Address</h4>
                <p className="text-gray-600 dark:text-gray-300">Dhaka, Bangladesh</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
                  <form
                      onSubmit={handleSubmit}
                      data-aos="fade-left" data-aos-delay="300" className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md space-y-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Name</label>
              <input
                              type="text"
                              required
                className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#21BEDA] dark:focus:ring-yellow-400"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Email</label>
                          <input
                              required
                type="email"
                className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#21BEDA] dark:focus:ring-yellow-400"
                placeholder="Your Email"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Message</label>
                          <textarea
                              required
                className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#21BEDA] dark:focus:ring-yellow-400"
                rows="5"
                placeholder="Your Message"
              ></textarea>
            </div>
                      <button
                          
              type="submit"
              className="w-full btn btn-outline border-[#21BEDA] border-1 dark:bg-yellow-500 text-[#21BEDA] hover:text-white hover:bg-[#21BEDA] dark:text-gray-900 hover:opacity-90 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
