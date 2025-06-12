import React, { useState } from "react";
import TaskCard from "./ui/TaskCard";
import type { TaskDTO } from "@/types";

type TodayTasksProps = {
  tasks: TaskDTO[];
  onToggleTask: (id: number) => void;
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

const TodayTasks: React.FC<TodayTasksProps> = ({ tasks, onToggleTask }) => {
  const [expandedTaskId, setExpandedTaskId] = useState<number | null>(null);

  const handleExpand = (id: number) => {
    setExpandedTaskId(expandedTaskId === id ? null : id);
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold">Tareas de hoy:</h2>
      </div>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          expanded={expandedTaskId === task.id}
          onToggleTask={onToggleTask}
          onExpand={handleExpand}
          tagColors={tagColors}
          priorityLabels={priorityLabels}
        />
      ))}
    </div>
  );
};

export default TodayTasks;
