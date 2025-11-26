import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router";

const Home = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <Header />

      <div className="flex flex-col items-center justify-center flex-1 text-center px-6">
        <h1 className="text-6xl font-extrabold tracking-tight animate-fade-in">
          Welcome to <span className="text-teal-600">AI Resume Builder</span>
        </h1>

        <p className="text-lg mt-4 text-gray-600 max-w-xl animate-fade-in-delay">
          Build professional resumes in minutes using AI — fast, smart, and beautifully designed.
        </p>

        <Link to={"/dashboard"} className="mt-8 animate-bounce-slow">
          <Button
            variant="default"
            className="px-6 py-3 text-lg font-semibold rounded-2xl shadow-md hover:shadow-xl transition-all"
          >
            Get Started 🚀
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
