import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { TaskStatus, type TaskDTO } from "@/types";
import DeleteTaskModal from "@/components/DeleteTaskModal";

type TaskCardProps = {
  task: TaskDTO;
  onToggleTask: (id: number) => void;
  onEdit: (task: TaskDTO) => void;
  onDelete: (task: TaskDTO) => void;
  tagColors: Record<string, string>;
  priorityLabels: Record<string, string>;
};

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onToggleTask,
  onEdit,
  onDelete,
  tagColors,
  priorityLabels,
}) => {
  const isCompleted = task.status === TaskStatus.COMPLETED;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (taskToDelete: TaskDTO) => {
    setIsDeleting(true);
    await onDelete(taskToDelete);
    setIsDeleting(false);
    setShowDeleteModal(false);
  };

  return (
    <>
      <Card
        className={`rounded-xl border p-4 ${isCompleted ? "opacity-70" : ""}`}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Checkbox
              checked={isCompleted}
              onCheckedChange={() =>
                task.id !== undefined && onToggleTask(task.id)
              }
            />
            <CardTitle
              className={`text-base font-semibold ${
                isCompleted ? "line-through text-muted-foreground" : ""
              }`}
            >
              {task.title}
            </CardTitle>
          </div>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onEdit(task)}
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setShowDeleteModal(true)}
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Descripción:</span>{" "}
          {task.description || <span className="italic">Sin descripción</span>}
        </div>

        <div className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Prioridad:</span>{" "}
          {priorityLabels[task.priority] || task.priority}
        </div>

        {Array.isArray(task.tags) && task.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {task.tags.map((tag) => (
              <span
                key={tag.name}
                className="text-xs px-2 py-1 rounded-sm text-white"
                style={{
                  backgroundColor: tag.color || tagColors[tag.name] || "#666",
                }}
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}
      </Card>
      {showDeleteModal && (
        <DeleteTaskModal
          task={task}
          onClose={() => setShowDeleteModal(false)}
          onDelete={handleDelete}
          isLoading={isDeleting}
        />
      )}
    </>
  );
};

export default TaskCard;
