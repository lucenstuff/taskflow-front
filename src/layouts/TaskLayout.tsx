import { Sidebar } from "@/components/Sidebar";
import { useState } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

export const TaskLayout = ({ children }: { children: ReactNode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleMobileMenuClose = () => setIsMobileMenuOpen(false);
  const handleMobileMenuToggle = () => setIsMobileMenuOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <Sidebar
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuClose={handleMobileMenuClose}
        onMobileMenuToggle={handleMobileMenuToggle}
        brandName="Task Flow"
        onLogout={handleLogout}
      />
      {children}
    </>
  );
};
