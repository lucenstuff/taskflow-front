import { Toaster } from "sonner";
import { AuthProvider } from "./components/providers/AuthContextProvider";
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
