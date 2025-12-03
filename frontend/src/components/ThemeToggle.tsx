"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.theme === "dark";
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const toggleTheme = () => {
    const newTheme = !dark;
    setDark(newTheme);
    localStorage.theme = newTheme ? "dark" : "light";
  };

  return (
    <button onClick={toggleTheme} className="fixed bottom-5 left-5">
      {dark ? "Light" : "Dark"}
    </button>
  );
}
