import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import TaskListView from "./components/TaskListView";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

function AppContent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { logout } = useAuth();

  const handleMobileMenuClose = () => setIsMobileMenuOpen(false);
  const handleLogout = () => {
    logout();
    handleMobileMenuClose();
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuClose={handleMobileMenuClose}
        brandName="Task Flow"
        onLogout={handleLogout}
      />
      <main className="flex-1 overflow-y-auto">
        <TaskListView />
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
