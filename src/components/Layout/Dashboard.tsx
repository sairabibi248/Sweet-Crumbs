import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 bg-[#F8FAFC] text-[#111827]">
            <Outlet/>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;