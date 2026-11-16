import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

const titles: Record<string, string> = {
  "/": "Overview",
  "/inventory": "Inventory",
  "/orders": "Orders",
  "/categories": "Categories",
  "/recipes": "Recipes",
  "/settings": "Settings",
};

const Header = () => {
  const location = useLocation();
  const title = titles[location.pathname] ?? "Sweet Crumbs";

  const navigate = useNavigate();
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-10 flex justify-between items-center bg-white py-4 px-6 border-b border-[#E5E7EB] dark:bg-[#18191C] dark:border-[#2A2B30]">
      <h1 className="text-2xl font-bold text-[#111827] dark:text-[#F4F4F5]">{title}</h1>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
         className="px-3 py-2 rounded-lg border border-[#E5E7EB] text-sm cursor-pointer dark:border-[#3F3F46] dark:text-[#F4F4F5] dark:hover:border-[#C2416C]"
        >
          {theme === "light" ? "Dark" : "Light"}
        </button>

        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-lg bg-[#C2416C] text-white text-sm font-medium cursor-pointer hover:bg-[#A8345B]"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
