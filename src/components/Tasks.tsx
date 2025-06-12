import { useState } from "react";
import TodayTasks from "./TodayTasks"; // ajusta la ruta según tu proyecto
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import NextTasks from "./NextTasks";
import NewTaskModal from "./NewTaskModal";

const initialTasks = [
  {
    id: 1,
    title: "Research content ideas",
    completed: false,
    tags: [],
    date: "22-03-22",
  },
  {
    id: 2,
    title: "Create a database of guest authors",
    completed: false,
    tags: [],
    date: "22-03-22",
  },
  {
    id: 3,
    title: "Renew driver's license",
    completed: false,
    tags: ["Personal"],
    date: "22-03-22",
  },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState("");
  const [showNewTaskModal ,setShowNewTaskModal] = useState(false);

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: newTask,
        completed: false,
        tags: [],
        date: null,
      },
    ]);
    setNewTask("");
  };

  const handleToggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
  <>
    <div className="w-full space-y-4">
      <div className="flex items-center gap-2 justify-start mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Tareas</h1>
        <span className="text-lg sm:text-xl bg-muted rounded px-3 py-1 font-semibold">
          {tasks.length}
        </span>
      </div>

      <div className="mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            placeholder="Añadir Tarea"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
            className="flex-1"
          />
          <Button
            onClick={handleAddTask}
            variant="default"
            className="w-full sm:w-auto"
          >
            Añadir
          </Button>
        </div>
      </div>

      <TodayTasks tasks={tasks} onToggleTask={handleToggleTask} />
      <NextTasks tasks={tasks} onToggleTask={handleToggleTask} />
    </div>
    {showNewTaskModal && (
        <NewTaskModal
          onClose={() => setShowNewTaskModal(false)}
          onCreate={handleAddTask}
        />
      )}
  </> 
  );
}
