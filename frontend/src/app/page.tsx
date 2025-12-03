"use client";

import UploadSection from "@/components/UploadSection";
import { FaCircleArrowDown } from "react-icons/fa6";

export default function Home() {
  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col min-h-screen items-center justify-center">
      <div className="relative flex h-screen w-full flex-col items-center justify-center">
        <div
          className="flex flex-col md:flex-row items-center gap-1.5 text-3xl md:text-5xl bg-linear-to-b from-sky-400 to-sky-700 bg-clip-text text-transparent font-black font-playfair-display uppercase mb-5 
        drop-shadow-[0_0_5px_rgba(0,184,219,0.35),0_0_50px_rgba(0,184,219,0.35)]"
        >
          <h1>QUICK</h1>
          <h1>CAREER COACH</h1>
        </div>
        <div className="max-w-56 text-center md:max-w-full">
          <p className="text-lg md:text-2xl">
            AI-powered career coaching for job seekers
          </p>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <FaCircleArrowDown
            onClick={() =>
              window.scrollTo({
                top: document.getElementById("upload-cv")?.offsetTop || 0,
                behavior: "smooth",
              })
            }
            className="animate-bounce text-4xl text-zinc-950 dark:text-zinc-50"
          />
        </div>
      </div>
      <UploadSection />
    </div>
  );
}
