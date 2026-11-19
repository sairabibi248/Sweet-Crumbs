import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router";
import Dashboard from "./components/Layout/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";

const Login = lazy(() => import("./Pages/Login"));
const Overview = lazy(() => import("./Pages/Overview"));
const Inventory = lazy(() => import("./Pages/Inventory"));
const Orders = lazy(() => import("./Pages/Orders"));
const Recipes = lazy(() => import("./Pages/Recipes"));
const NotFound = lazy(() => import("./Pages/NotFound"));

function App() {
  return (
    <Suspense fallback={<p className="p-6 text-center">Loading...</p>}>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element={<Dashboard />}>
            <Route path="/" element={<Overview />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/recipes" element={<Recipes />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;