import React, { useState } from "react";
import Navbar from "../navbar/Navbar";

const FaqList = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAnswer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="bg-white px-6 py-3 rounded-md shadow-md mb-4">
        <div className="flex justify-between items-center">
          <h3
            className="text-lg font-semibold cursor-pointer"
            onClick={toggleAnswer}
          >
            {item.question}
          </h3>
          <button
            onClick={toggleAnswer}
            className="transition-transform transform focus:outline-none"
          >
            <svg
              className={`w-6 h-6 ${isOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
        </div>
        <div
          className={`mt-2 transition-max-height ease-in-out duration-300 ${
            isOpen ? "max-h-96" : "max-h-0 overflow-hidden"
          }`}
        >
          <p className="text-gray-700">{item.answer}</p>
        </div>
      </div>
    </>
  );
};

const Service = () => {
  const items = [
    {
      question: "How can I create an account on the ecommerce platform?",
      answer:
        'To create an account, click on the "Sign Up" or "Create Account" link on the homepage. Fill in the required information and follow the prompts to complete the registration process.',
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept various payment methods, including credit cards (Visa, MasterCard, American Express), PayPal, and other secure payment options. You can view the available payment methods during the checkout process.",
    },
    {
      question: "How do I track my order?",
      answer: `Once your order is shipped, you will receive a confirmation email with a tracking number. You can use this tracking number on our website or the courier's website to track the status and location of your package.`,
    },
    {
      question: "What is your return policy?",
      answer:
        'Our return policy allows you to return items within a specified period after receiving your order. Please visit our "Returns and Exchanges" page for detailed information on how to initiate a return and our return guidelines.',
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we offer international shipping to many countries. During the checkout process, you can select your country, and shipping options and costs will be calculated accordingly.",
    },
    // Add more FAQs as needed
  ];

  return (
    <> 
      <div className="py-10 h-screen px-60 bg-rose-100">
        <h1 className="my-4 text-xl font-semibold">
          FAQ - Order, Shipping, Etc.
        </h1>
        {items.map((item, index) => (
          <FaqList item={item} key={index}></FaqList>
        ))}
      </div>
    </>
  );
};

export default Service;
