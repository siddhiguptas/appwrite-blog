import React from "react";
import { Container, Button } from "../Components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cn } from "@/utils/cn";
("use client");

function Home() {
  const status = useSelector((state) => state.auth.status);

  const navigate = useNavigate();
  const navigateHome = () => {
    if (status) {
      navigate("/all-posts");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-customGray">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-customGray to-black" />

        {/* Animated gradient orbs */}
        <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
        <div className="absolute top-0 -right-4 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000" />
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col gap-8 items-center justify-center text-center px-4">
          {/* Main Heading */}
          <div className="relative">
            {/* Glow effect behind heading */}
            <div
              className="absolute -inset-x-20 -inset-y-10 z-0 transform-gpu overflow-hidden blur-3xl opacity-50"
              aria-hidden="true"
            >
              <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#22d3ee] to-[#0ea5e9] opacity-30" />
            </div>

            <h1 className="relative text-5xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 mb-6">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-600 text-transparent bg-clip-text">
                ByteVerse!
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <div className="max-w-2xl mx-auto z-10 relative">
            <div className="absolute inset-0 -z-10 blur-2xl">
              <div className="h-full w-full bg-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-full opacity-50" />
            </div>
            <p className="text-lg md:text-xl text-gray-100 mb-8">
              Uncover your next captivating read, share your unique story with
              the world, and immerse yourself in a thriving community of
              storytellers and readers.
            </p>
          </div>

          {/* CTA Button */}
          <div className="relative group z-10">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <Button
              onClick={() => navigateHome()}
              className="relative px-8 py-3 bg-black/50 backdrop-blur-sm text-white font-semibold rounded-xl leading-none flex items-center gap-2 group-hover:text-white/90 transition duration-300"
            >
              {status ? "Explore Posts" : "Start Your Journey"}
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Home;
