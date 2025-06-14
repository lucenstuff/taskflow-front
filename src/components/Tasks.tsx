import { useState } from "react";
import TodayTasks from "./TodayTasks";
import NewTaskModal from "./NewTaskModal";
import { useEffect } from "react";
import { taskService } from "@/services/taskService";
import type { TaskDTO } from "@/types";
import { TaskStatus } from "@/types";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

import EditTaskModal from "./EditTaskModal";

export default function TasksPage() {
  const [tasks, setTasks] = useState<TaskDTO[]>([]);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);

  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<TaskDTO | null>(null);

  const fetchTasks = async () => {
    try {
      const tasksData = await taskService.getAllTasks();
      setTasks(tasksData);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleToggleTask = async (id: number) => {
    try {
      const taskToUpdate = tasks.find((task) => task.id === id);
      if (!taskToUpdate) return;

      const updatedTask = {
        ...taskToUpdate,
        status:
          taskToUpdate.status === TaskStatus.COMPLETED
            ? TaskStatus.IN_PROGRESS
            : TaskStatus.COMPLETED,
      };

      const response = await taskService.updateTask(id, updatedTask);
      setTasks(tasks.map((task) => (task.id === id ? response : task)));
    } catch (error) {
      console.error("Error toggling task status:", error);
    }
  };

  const handleDeleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleEditTask = (task: TaskDTO) => {
    setTaskToEdit(task);
    setShowEditTaskModal(true);
  };

  const handleTaskUpdated = async () => {
    await fetchTasks();
    setShowEditTaskModal(false);
    setTaskToEdit(null);
  };

  return (
    <>
      <Card className="w-full mb-6 rounded-sm">
        <CardContent className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold">Tareas</h1>
            <span className="text-lg sm:text-xl bg-muted rounded px-3 py-1 font-semibold">
              {tasks.length}
            </span>
          </div>
          <Button onClick={() => setShowNewTaskModal(true)}>
            {" "}
            + Nueva Tarea
          </Button>
        </CardContent>
      </Card>
      <TodayTasks
        tasks={tasks}
        onToggleTask={handleToggleTask}
        onDeleteTask={handleDeleteTask}
        onEditTask={handleEditTask}
      />
      {showNewTaskModal && (
        <NewTaskModal
          onClose={() => setShowNewTaskModal(false)}
          onTaskCreated={fetchTasks}
        />
      )}
      {showEditTaskModal && taskToEdit && (
        <EditTaskModal
          task={taskToEdit}
          onClose={() => setShowEditTaskModal(false)}
          onTaskUpdated={handleTaskUpdated}
        />
      )}
    </>
  );
}
