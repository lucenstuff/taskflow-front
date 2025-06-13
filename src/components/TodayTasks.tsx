import React from "react";
import TaskCard from "./ui/TaskCard";
import type { TaskDTO } from "@/types";
import { Card } from "./ui/card";
import { taskService } from "@/services/taskService";
import { toast } from "sonner";

type TodayTasksProps = {
  tasks: TaskDTO[];
  onToggleTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
  onEditTask: (task: TaskDTO) => void;
};

const tagColors: Record<string, string> = {
  Personal: "bg-red-400 text-white",
  Work: "bg-cyan-300 text-cyan-900",
};

const priorityLabels: Record<string, string> = {
  HIGH: "Alta",
  MEDIUM: "Media",
  LOW: "Baja",
};

const TodayTasks: React.FC<TodayTasksProps> = ({
  tasks,
  onToggleTask,
  onDeleteTask,
  onEditTask,
}) => {
  const handleDeleteTask = async (task: TaskDTO) => {
    if (task.id === undefined) {
      console.error("Cannot delete task: id is undefined", task);
      toast.error("No se puede eliminar la tarea: ID no definido");
      return;
    }
    await taskService.deleteTask(task.id);
    toast.success("Tarea eliminada correctamente");
    onDeleteTask(task.id);
  };

  return (
    <div className="space-y-4">
      {tasks.length === 0 ? (
        <div>
          <Card className="w-full mb-6 rounded-sm">
            <div className="flex items-center justify-between p-4">
              <h2>
                <span role="img" aria-label="party popper">
                  🎉
                </span>
                ¡No hay tareas para hoy!
                <span role="img" aria-label="clapping hands">
                  👏
                </span>
              </h2>
            </div>
          </Card>
        </div>
      ) : (
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggleTask={onToggleTask}
            tagColors={tagColors}
            priorityLabels={priorityLabels}
            onEdit={() => onEditTask(task)}
            onDelete={() => handleDeleteTask(task)}
          />
        ))
      )}
    </div>
  );
};

export default TodayTasks;
