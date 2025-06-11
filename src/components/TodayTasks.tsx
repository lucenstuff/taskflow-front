import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardAction,
} from "@/components/ui/card";
import { ChevronRight, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

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

const TodayTasks: React.FC<TodayTasksProps> = ({ tasks, onToggleTask }) => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold">Tareas de hoy:</h2>
      </div>
      {tasks.map((task) => (
        <Card key={task.id} className="group transition">
          <CardHeader className="flex flex-row items-center gap-2 px-4 py-2">
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => onToggleTask(task.id)}
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
      ))}
    </div>
  );
};

export default TodayTasks;
