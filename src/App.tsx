import { Routes, Route } from "react-router";
import Dashboard from "./components/Layout/Dashboard";
import Overview from "./Pages/Overview";
import Inventory from "./Pages/Inventory";
import Orders from "./Pages/Orders";
import Categories from "./Pages/Categories";
import Recipes from "./Pages/Recipes";
import Settings from "./Pages/Settings";
import NotFound from "./Pages/NotFound";

function App() {
  return (
    <Routes>
      <Route element={<Dashboard />}>
        <Route path="/" element={<Overview />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;