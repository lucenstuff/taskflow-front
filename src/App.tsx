import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { LayoutDashboard } from 'lucide-react';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Inicio', href: '/', icon: <LayoutDashboard className="w-5 h-5" /> },
  ];

  const handleMobileMenuClose = () => setIsMobileMenuOpen(false);
  const handleLogout = () => console.log('logout');

  return (
    <div className="flex h-screen">
      <Sidebar
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuClose={handleMobileMenuClose}
        navigation={navigation}
        brandName="Task Flow"
        logoutText="Cerrar sesión"
        onLogout={handleLogout}
      />
      <main>
      </main>
    </div>
  );
}

export default App;
