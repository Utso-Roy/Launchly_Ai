import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is this platform about?",
    answer:
      "This is a modern platform where users can discover, share and explore trending tech products, guides, and community stories.",
  },
  {
    question: "How can I submit my product?",
    answer:
      "You need to create an account, go to the 'Add Product' section, fill in the details, and submit. Our moderators will review it.",
  },
  {
    question: "Is there any subscription fee?",
    answer:
      "Basic features are free! Premium features like product boosting and extra visibility require a subscription.",
  },
  {
    question: "Can I write reviews on products?",
    answer:
      "Yes, once logged in, you can review any product and share your feedback with the community.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className=" py-10">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl text-[#101960] font-bold text-center mb-10"
        >
          Frequently Asked Questions
        </motion.h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow cursor-target cursor-pointer"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="flex items-center justify-between cursor-pointer w-full p-5 text-left"
              >
                <span className="text-lg font-medium text-gray-800">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-6 h-6 text-gray-600 transform transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-5 pb-5 text-gray-600">{faq.answer}</div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
