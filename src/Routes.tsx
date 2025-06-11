import { Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./components/Login";
import {TaskLayout} from "./layouts/TaskLayout";
import GroupTaskUpcoming from "./components/GroupTaskUpcoming";
import TaskListView from "./components/TaskListView";
import Register from "./components/Register";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />}/>
      </Route>
      <Route path="/"  element={<TaskLayout children={<GroupTaskUpcoming />} />}></Route>
      <Route path="/today"  element={<TaskLayout children={<TaskListView />} />}></Route>
      <Route path="/register" element={<Register/>}></Route>
    </Routes>
  );
}
