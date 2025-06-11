import { Sidebar } from "@/components/Sidebar";
import { useState } from "react";
import type { ReactNode } from "react";

export const TaskLayout = ({ children }: { children: ReactNode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuClose = () => setIsMobileMenuOpen(false);
  const handleMobileMenuToggle = () => setIsMobileMenuOpen((prev) => !prev);
  const handleLogout = () => console.log("logout");

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
