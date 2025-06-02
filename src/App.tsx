import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import TaskListView from "./components/TaskListView";

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
      <main className="flex-1 overflow-y-auto">
        <TaskListView />
      </main>
    </div>
  );
}

export default App;
