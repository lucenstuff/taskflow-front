import { useState } from "react";
import { Sidebar } from "./components/Sidebar";

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuClose = () => setIsMobileMenuOpen(false);
  const handleLogout = () => console.log('logout');

  return (
    <div className="flex h-screen">
      <Sidebar
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuClose={handleMobileMenuClose}
        brandName="Task Flow"
        onLogout={handleLogout}
      />
      <main>
      </main>
    </div>
  );
}

export default App;
