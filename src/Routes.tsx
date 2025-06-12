import { Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./components/Login";
import { TaskLayout } from "./layouts/TaskLayout";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Tasks from "./components/Tasks";
import Not_Found from "./errors/Not_Found";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route
        element={
          <ProtectedRoute>
            <TaskLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Tasks />} />
      </Route>
      <Route path="/register" element={<Register />} />

      
      <Route path="*" element={<Not_Found />} />
    </Routes>
  );
}
