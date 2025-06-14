import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { TagDTO } from "@/types";
import { tagService } from "@/services/tagService";
import { toast } from "sonner";
import { taskService } from "@/services/taskService";

interface NewTaskModalProps {
  onClose: () => void;
  onTaskCreated: () => void;
}

import { TaskPriority, TaskStatus } from "@/types/task";

const taskPriority: TaskPriority[] = [
  TaskPriority.HIGH,
  TaskPriority.MEDIUM,
  TaskPriority.LOW,
];

export default function NewTaskModal({
  onClose,
  onTaskCreated,
}: NewTaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority | "">("");
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tagSelectOpen, setTagSelectOpen] = useState(false);

  const [availableTags, setAvailableTags] = useState<TagDTO[]>([]);

  const priorityLabels: Record<TaskPriority, string> = {
    HIGH: "Alta",
    MEDIUM: "Media",
    LOW: "Baja",
  };

  useEffect(() => {
    tagService.getAll().then(setAvailableTags);
  }, []);

  const getUserTags = () => {
    tagService
      .getAll()
      .then((tags) => {
        setAvailableTags(tags);
      })
      .catch((error) => {
        console.error("Error fetching tags:", error);
        toast.error("Error al obtener las etiquetas.");
      });
  };

  useEffect(() => {
    getUserTags();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    try {
      const tagIds = selectedTagIds;
      await taskService.createTask({
        title,
        description,
        priority: priority as TaskPriority,
        due_date: new Date().toISOString(),
        status: "IN_PROGRESS" as TaskStatus,
        tags: availableTags.filter((tag) => tagIds.includes(tag.id!)),
      });

      setTitle("");
      setDescription("");
      setPriority("");
      setSelectedTagIds([]);
      onTaskCreated();
      onClose();
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Error al crear la tarea.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <Card className="w-96">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Nueva Tarea</CardTitle>
          <CardDescription>Agrega tarea.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="text-sm font-medium leading-none"
              >
                Nombre:
              </label>
              <Input
                id="title"
                type="text"
                placeholder="Ej: Hacer ejercicio"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="text-sm font-medium leading-none"
              >
                Description:
              </label>
              <Input
                id="description"
                type="text"
                placeholder="Descripcion de la tarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="priority"
                className="text-sm font-medium leading-none"
              >
                Prioridad:
              </label>
              <Select
                onValueChange={(e) => setPriority(e as TaskPriority)}
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona la prioridad" />
                </SelectTrigger>
                <SelectContent>
                  {taskPriority.map((v, i) => {
                    return (
                      <SelectItem key={i} value={v}>
                        {priorityLabels[v]}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="tags"
                className="text-sm font-medium leading-none"
              >
                Etiquetas:
              </label>
              <div>
                <Select
                  open={tagSelectOpen}
                  onOpenChange={setTagSelectOpen}
                  disabled={availableTags.length <= 0}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={
                        availableTags.length > 0
                          ? selectedTagIds.length > 0
                            ? availableTags
                                .filter((t) => selectedTagIds.includes(t.id!))
                                .map((t) => t.name)
                                .join(", ")
                            : "Selecciona etiquetas disponibles"
                          : "No hay etiquetas disponibles"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTags.map((t) => (
                      <div
                        key={t.id}
                        className="flex items-center px-2 py-1 cursor-pointer hover:bg-accent"
                        onClick={() => {
                          setSelectedTagIds((prev) =>
                            prev.includes(t.id!)
                              ? prev.filter((id) => id !== t.id)
                              : [...prev, t.id!]
                          );
                          setTagSelectOpen(false);
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={selectedTagIds.includes(t.id!)}
                          readOnly
                          className="mr-2"
                        />
                        <span>{t.name}</span>
                      </div>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedTagIds.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {availableTags
                    .filter((t) => selectedTagIds.includes(t.id!))
                    .map((t) => (
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
              )}
            </div>
          </CardContent>
          <CardFooter className="pt-8 flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Agregando..." : "Agregar Tarea"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancelar
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
