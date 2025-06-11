import { Sidebar } from "@/components/Sidebar";
import { useState } from "react";
import type { ReactNode } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const TaskLayout = (): ReactNode => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleMobileMenuClose = () => setIsMobileMenuOpen(false);
  const handleMobileMenuToggle = () => setIsMobileMenuOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex h-screen flex-col md:flex-row min-h-0">
      <Sidebar
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuClose={handleMobileMenuClose}
        onMobileMenuToggle={handleMobileMenuToggle}
        brandName="Task Flow"
        onLogout={handleLogout}
      />
      <main className="flex-1 overflow-y-auto bg-background p-4">
        <Outlet />
      </main>
    </div>
  );
};
