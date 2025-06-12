import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
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

interface NewTaskModalProps {
  onClose: () => void;
  onCreate: (tag: {id : number, title: string; description: string, priority: string, date : string, tags : string[]}) => void;
}

const taskPriority = [
    'HIGH',
    'MEDIUM',
    'LOW'
]

export default function NewTaskModal({ onClose, onCreate }: NewTaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [tags, setTags] = useState("")
  const [isLoading, setIsLoading] = useState(false);

  const [availableTags , setAvailableTags] = useState<TagDTO[]>([])

  useEffect(() => {
      tagService.getAll().then(setAvailableTags);
    }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const newTask = {
        title: title,
        description : description,
        priority: priority,
        complete: false,
        date: new Date(),
        tags: [tags]
    }
    try {
        console.log(newTask);
        onCreate({id : 10, title : newTask.title, description : newTask.description, date: newTask.date.toDateString(), tags : newTask.tags, priority : newTask.priority})
        onClose();
    } catch {
        toast.error("Error al añadir la tarea.")
    }  finally {
        setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <Card className="w-[400px]">
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
                onValueChange={(e) => setPriority(e)}
                required
                >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona la prioridad" />
                </SelectTrigger>
                <SelectContent>
                    {taskPriority.map((v, i) => {
                        return(
                            <SelectItem key={i} value={v}>{v}</SelectItem>
                        );
                    })}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="priority"
                className="text-sm font-medium leading-none"
              >
                Etiquetas:
              </label>
              <Select 
                onValueChange={(e) => setTags(e)}
                disabled={(availableTags.length <= 0)}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={(availableTags.length > 0)? "Selecciona etiquetas disponibles" : "No hay etiquetas disponibles"}/>
                </SelectTrigger>
                <SelectContent>
                    {availableTags.map((t) => {
                            return(
                                <SelectItem key={t.id} value={t.name}>{t.name}</SelectItem>
                            );
                        })
                    }
                </SelectContent>
              </Select>
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