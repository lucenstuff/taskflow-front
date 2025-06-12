import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardAction,
} from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
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
      <div className="flex flex-row flex-wrap">
        {task.tags?.map((t) => (
          <div key={t.name} className="relative mr-2 mb-2">
            <div className="relative inline-flex items-center text-xs font-medium rounded-md">
              <span
                className="absolute inset-0 rounded-sm"
                style={{ backgroundColor: t.color, opacity: 0.5 }}
              />
              <span className="relative z-10 flex items-center px-2 py-2 gap-1 rounded-sm">
                {t.name}
              </span>
            </div>
          </div>
        ))}
      </div>
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
