import { useLocation } from "react-router";

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

  return (
    <header className="sticky top-0 z-10 flex justify-between items-center bg-white py-4 px-6 border-b border-[#E5E7EB]">
      <h1 className="text-2xl font-bold text-[#111827]">{title}</h1>

      <div className="flex items-center gap-3"></div>
    </header>
  );
};

export default Header;