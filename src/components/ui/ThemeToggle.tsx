
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return document.documentElement.classList.contains("dark");
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      aria-label="Переключить тему"
      onClick={() => setDark((d) => !d)}
      className={`flex items-center gap-1 px-3 py-2 rounded-xl font-bold bg-gradient-to-r from-orange-400 to-cyber-purple text-white hover:scale-105 transition 
        shadow-lg active:scale-95`}
    >
      {dark ? <Sun size={20} className="animate-spin-slow" /> : <Moon size={20} />}
      <span className="hidden sm:inline">{dark ? "Светлая" : "Тёмная"} тема</span>
    </button>
  );
};

export default ThemeToggle;

