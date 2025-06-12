import React, { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardAction,
} from "@/components/ui/card";

import { ChevronRight, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getTasks,
  toggleTask,
  createTask,
} from "@/components/axiosControllers/TaskController"; 
import { TaskPriority, TaskStatus } from "@/types";

type Task = {
  id: number;
  title: string;
  completed: boolean;
  tags: string[];
  date: string | null;
};

type TodayTasksProps = {
  tasks: Task[];
  onToggleTask: (id: number) => void;
};

const tagColors: Record<string, string> = {
  Personal: "bg-red-400 text-white",
  Work: "bg-cyan-300 text-cyan-900",
};

const TodayTasks: React.FC<TodayTasksProps> = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const taskDTO = {
      id:0,
      title,
      description,
      status: TaskStatus.IN_PROGRESS,
      priority: TaskPriority.LOW,
      updated_at: new Date(date), 
      finished_at: new Date(date),
      created_at: new Date(date),
      userId: 1, // Debes reemplazar esto con el ID del usuario autenticado
      tags: [], // Debes reemplazar esto con los tags seleccionados
    };
    try {
      const response = await createTask(taskDTO);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const tasksData = await getTasks();
      setTasks(tasksData);
      setLoading(false);
    };
    fetchTasks();
  }, []);

  const handleToggleTask = async (id: number) => {
    const toggledTask = await toggleTask(id);
    setTasks(tasks.map((task) => (task.id === id ? toggledTask : task)));
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold">Tareas de hoy:</h2>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Añadir Titulo"
            className="flex-1"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <Input
            type="text"
            placeholder="Añadir Descripcion"
            className="flex-1"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <Input
            type="date"
            placeholder="Añadir Date"
            className="flex-1"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />

          <Button variant="default" className="w-full sm:w-auto" type="submit">
            Añadir
          </Button>
        </form>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        tasks.map((task) => (
          <Card key={task.id} className="group transition">
            <CardHeader className="flex flex-row items-center gap-2 px-4 py-2">
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => handleToggleTask(task.id)}
              />
              <CardTitle
                className={
                  task.completed
                    ? "line-through text-muted-foreground flex-1"
                    : "flex-1"
                }
              >
                {task.title}
              </CardTitle>
              <CardAction>
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 transition"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent className="pt-0 pb-2">
              <div className="flex flex-wrap gap-2 mt-1 text-xs items-center">
                {task.date && (
                  <span className="flex items-center gap-1 bg-muted px-2 py-0.5 rounded">
                    <Calendar className="w-3 h-3" />
                    {task.date}
                  </span>
                )}
                {task.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded ${
                      tagColors[tag] || "bg-muted"
                    }`}
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default TodayTasks;
