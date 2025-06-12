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
import { taskService } from "@/services/taskService";
import { TaskPriority, TaskStatus, type TaskDTO } from "@/types";

type TodayTasksProps = {
  tasks: TaskDTO[];
  onToggleTask: (id: number) => void;
};

const tagColors: Record<string, string> = {
  Personal: "bg-red-400 text-white",
  Work: "bg-cyan-300 text-cyan-900",
};

const TodayTasks: React.FC<TodayTasksProps> = () => {
  const [tasks, setTasks] = useState<TaskDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [adding, setAdding] = useState(false);
  const [expandedTaskId, setExpandedTaskId] = useState<number | null>(null); // Nuevo estado

  const handleSubmit = async (event) => {
    event.preventDefault();
    const taskDTO = {
      title,
      description,
      status: TaskStatus.IN_PROGRESS,
      priority: TaskPriority.MEDIUM,
      // Debes reemplazar esto con el ID del usuario autenticado
      tags: [], // Debes reemplazar esto con los tags seleccionados
    };
    try {
      setAdding(true);
      const response = await taskService.createTask(taskDTO);
      console.log(response);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error(error);
    } finally {
      setAdding(false);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const tasksData = await taskService.getAllTasks();
      setTasks(tasksData);
      setLoading(false);
    };
    fetchTasks();
  }, []);

  const handleToggleTask = async (id: number, task: TaskDTO) => {
    const updatedTask = {
      ...task,
      status:
        task.status === TaskStatus.COMPLETED
          ? TaskStatus.IN_PROGRESS
          : TaskStatus.COMPLETED,
    };
    const toggledTask = await taskService.updateTask(id, updatedTask);

    setTasks(tasks.map((t) => (t.id === id ? toggledTask : t)));
  };
  const handleExpand = (id: number) => {
    setExpandedTaskId(expandedTaskId === id ? null : id);
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

          <Button
            variant="default"
            className="w-full sm:w-auto"
            disabled={adding}
            type="submit"
          >
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
                onCheckedChange={() => {
                  if (typeof task.id === "number") {
                    handleToggleTask(task.id, task);
                  }
                }}
                checked={task.status === TaskStatus.COMPLETED}
              />
              <CardTitle
                className={
                  task.status === TaskStatus.COMPLETED
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
                  className="transition"
                  onClick={() => handleExpand(task.id as number)}
                  aria-label="Expandir detalles"
                >
                  <ChevronRight
                    className={`w-5 h-5 transition-transform ${
                      expandedTaskId === task.id ? "rotate-90" : ""
                    }`}
                  />
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
              {expandedTaskId === task.id && (
                <div className="mt-2 text-sm text-muted-foreground">
                  <div>
                    <span className="font-semibold">Descripción:</span>{" "}
                    {task.description || (
                      <span className="italic">Sin descripción</span>
                    )}
                  </div>
                  <div>
                    <span className="font-semibold">Prioridad:</span>{" "}
                    {task.priority}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default TodayTasks;
