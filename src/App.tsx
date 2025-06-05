import { AuthProvider } from "./contexts/AuthContext";
import {AppRoutes} from "./Routes";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
