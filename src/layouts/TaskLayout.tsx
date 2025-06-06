import { Sidebar } from "@/components/Sidebar";
import { useState } from "react";
//funcion flecha 
export const TaskLayout = ({children}:{children: React.ReactNode})=>{
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const  handleMobileMenuClose = () => setIsMobileMenuOpen(false);
  const handleLogout = () => console.log("logout");
  return (
    <>
      <Sidebar
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuClose={handleMobileMenuClose}
        brandName="Task Flow"
        onLogout={handleLogout}
      />
      {children}
    </>
  );
} 
