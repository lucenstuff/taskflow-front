import { Toaster } from "sonner";
import { AuthProvider } from "./contexts/AuthContext";
import { AppRoutes } from "./Routes";

function App() {
  return (
    <AuthProvider>
      <Toaster />
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
