import { Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./components/Login";
import { TaskLayout } from "./layouts/TaskLayout";
import GroupTaskUpcoming from "./components/GroupTaskUpcoming";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <TaskLayout children={<GroupTaskUpcoming />} />
          </ProtectedRoute>
        }
      ></Route>
      <Route path="/register" element={<Register />}></Route>
    </Routes>
  );
}
