import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Suspense } from "react";
const Dashboard = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 bg-[#F8FAFC] text-[#111827] dark:bg-[#111214] dark:text-[#F4F4F5]">
          <Suspense fallback={<p className="text-center">Loading page...</p>}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
