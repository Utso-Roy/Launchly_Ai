import React, { useEffect } from "react";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import AOS from "aos";
import "aos/dist/aos.css";
import { toast } from "react-toastify";
import Container from "../Container/Container";

const Contact = () => {
  useEffect(() => {
    AOS.init({
      duration: 800, 
      once: true,    
      easing: "ease-in-out",
    });
  }, []);
    
    const handleSubmit = () => {
        toast.success('Submit successfully')
    }

  return (
     <section className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16 transition-colors duration-300">
      <Container>
        {/* Heading */}
        <div className="text-center mb-12">
          <h2
            data-aos="fade-up"
            className="text-4xl md:text-5xl font-bold text-[#1c398e] dark:text-white mb-4 relative inline-block"
          >
            Get In Touch
          </h2>
          <p
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-lg text-gray-600 dark:text-gray-300 mt-6 max-w-2xl mx-auto"
          >
            Have any questions or want to get in touch? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div data-aos="fade-right" data-aos-delay="200" className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-[#21BEDA] dark:border-yellow-400">
              <div className="flex items-start space-x-5">
                <div className="bg-[#21BEDA]/10 dark:bg-yellow-400/10 p-4 rounded-xl">
                  <FiMail className="text-[#21BEDA] dark:text-yellow-400 text-3xl" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Email Us</h4>
                  <p className="text-gray-600 dark:text-gray-300">support@example.com</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">We'll respond within 24 hours</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-[#21BEDA] dark:border-yellow-400">
              <div className="flex items-start space-x-5">
                <div className="bg-[#21BEDA]/10 dark:bg-yellow-400/10 p-4 rounded-xl">
                  <FiPhone className="text-[#21BEDA] dark:text-yellow-400 text-3xl" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Call Us</h4>
                  <p className="text-gray-600 dark:text-gray-300">+880 123 456 789</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Mon-Fri from 9am to 6pm</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-[#21BEDA] dark:border-yellow-400">
              <div className="flex items-start space-x-5">
                <div className="bg-[#21BEDA]/10 dark:bg-yellow-400/10 p-4 rounded-xl">
                  <FiMapPin className="text-[#21BEDA] dark:text-yellow-400 text-3xl" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Visit Us</h4>
                  <p className="text-gray-600 dark:text-gray-300">Dhaka, Bangladesh</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Come visit our office</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            data-aos="fade-left"
            data-aos-delay="300"
            className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl space-y-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="space-y-2">
              <label className="block text-gray-800 dark:text-gray-200 font-semibold text-sm">
                Full Name *
              </label>
              <input
                type="text"
                required
                className="w-full border-2 border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-[#21BEDA] dark:focus:border-yellow-400 transition-all duration-300"
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-gray-800 dark:text-gray-200 font-semibold text-sm">
                Email Address *
              </label>
              <input
                required
                type="email"
                className="w-full border-2 border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-[#21BEDA] dark:focus:border-yellow-400 transition-all duration-300"
                placeholder="john@example.com"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-gray-800 dark:text-gray-200 font-semibold text-sm">
                Your Message *
              </label>
              <textarea
                required
                className="w-full border-2 border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-[#21BEDA] dark:focus:border-yellow-400 transition-all duration-300 resize-none"
                rows="5"
                placeholder="Tell us how we can help you..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#21BEDA]  dark:from-yellow-400 dark:to-yellow-600 text-white dark:text-gray-900 font-bold py-4 px-8 rounded-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 transform"
            >
              Send Message
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
};

export default Contact;
