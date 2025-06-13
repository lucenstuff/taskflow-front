import React from "react";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardAction,
} from "@/components/ui/card";
import { Edit, MoreVertical, Trash2 } from "lucide-react";
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
  priorityLabels,
}) => {
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  function toggleDropdown(id: number, e: React.MouseEvent) {
    e.stopPropagation();
    if (openDropdownId === id) {
      setOpenDropdownId(null);
    } else {
      setOpenDropdownId(id);
    }
  }

  function handleEditClick(task: TaskDTO, e: React.MouseEvent) {
    e.stopPropagation();

    // Logic to handle edit action
  }

  function handleDeleteClick(task: TaskDTO, e: React.MouseEvent) {
    e.stopPropagation();
    // Logic to handle delete action
  }

  return (
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
          <button
            className="ml-1 p-0.5 rounded hover:bg-black/10 relative z-10"
            onClick={(e) => {
              if (typeof task.id === "number") {
                toggleDropdown(task.id, e);
              }
            }}
          >
            <MoreVertical className="w-3 h-3" />
          </button>

          <div className="relative">
            {openDropdownId === task.id && (
              <div className="absolute -top-3 right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                <div className="py-1">
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={(e) => handleEditClick(task, e)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                  </button>
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={(e) => handleDeleteClick(task, e)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Eliminar
                  </button>
                </div>
              </div>
            )}
          </div>
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
};

export default TaskCard;
