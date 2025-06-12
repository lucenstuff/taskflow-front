import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardAction,
} from "@/components/ui/card";
import { ChevronRight, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TaskStatus, type TaskDTO } from "@/types";

type TaskCardProps = {
  task: TaskDTO;
  expanded: boolean;
  onToggleTask: (id: number) => void;
  onExpand: (id: number) => void;
  tagColors: Record<string, string>;
  priorityLabels: Record<string, string>;
};

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  expanded,
  onToggleTask,
  onExpand,
  tagColors,
  priorityLabels,
}) => (
  <Card key={task.id} className="group transition rounded-sm">
    <CardHeader className="flex flex-row items-center gap-2 px-4 py-2">
      <Checkbox
        onCheckedChange={() => {
          if (typeof task.id === "number") {
            onToggleTask(task.id);
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
          onClick={() => onExpand(task.id as number)}
          aria-label="Expandir detalles"
        >
          <ChevronRight
            className={`w-5 h-5 transition-transform ${
              expanded ? "rotate-90" : ""
            }`}
          />
        </Button>
      </CardAction>
    </CardHeader>
    <CardContent className="pt-0 pb-2">
      {task.tags?.map((tag) => (
        <span
          key={typeof tag === "string" ? tag : tag.name}
          className={`flex items-center gap-1 px-2 py-0.5 rounded ${
            tagColors[typeof tag === "string" ? tag : tag.name] || "bg-muted"
          }`}
        >
          <Tag className="w-3 h-3" />
          {typeof tag === "string" ? tag : tag.name}
        </span>
      ))}
      {expanded && (
        <div className="mt-2 text-sm text-muted-foreground">
          <div>
            <span className="font-semibold">Descripción:</span>{" "}
            {task.description || (
              <span className="italic">Sin descripción</span>
            )}
          </div>
          <div>
            <span className="font-semibold">Prioridad:</span>{" "}
            {priorityLabels[task.priority] || task.priority}
          </div>
        </div>
      )}
    </CardContent>
  </Card>
);

export default TaskCard;
