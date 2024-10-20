import { useState, useEffect } from "react";
import { Switch } from "./ui/switch";

type ThemeValue = "dark" | "light";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<ThemeValue>("light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className="p-4">
      <Switch
        checked={theme === "dark"}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        aria-label="Dark Mode"
      />
    </div>
  );
};

export default ThemeToggle;
