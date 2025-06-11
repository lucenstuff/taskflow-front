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
    <div className="flex flex-col h-screen">
      <Sidebar
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuClose={handleMobileMenuClose}
        onMobileMenuToggle={handleMobileMenuToggle}
        brandName="Task Flow"
        onLogout={handleLogout}
      />
      <Outlet />
    </div>
  );
};
