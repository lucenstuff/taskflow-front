import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { tagService } from "@/services/tagService";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import type { TagDTO } from "@/types";

interface NewTagModalProps {
  onClose: () => void;
  onCreate: (tag: TagDTO) => void;
}

const NewTagModal = ({ onClose, onCreate }: NewTagModalProps) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("blue");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const newTag = await tagService.createTag({ name, color });
      toast.success("Etiqueta creada exitosamente.");
      onCreate(newTag);
      onClose();
    } catch (error) {
      console.error("Error creating tag:", error);
      toast.error("Error al crear la etiqueta.");
    } finally {
      setIsSubmitting(false);
    }
  };


  const colorOptions = [
    "gray",
    "red",
    "orange",
    "yellow",
    "lime",
    "green",
    "teal",
    "cyan",
    "blue",
    "indigo",
    "violet",
    "purple",
    "fuchsia",
    "pink",
  ];

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nueva Etiqueta</DialogTitle>
          <DialogDescription>
            Crea una nueva etiqueta para organizar tus tareas.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: 🏠 Hogar"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Color</Label>
            </div>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`w-7 h-7 rounded-full transition-all ${
                    color === c
                      ? "ring-2 ring-offset-2 opacity-100"
                      : "opacity-50 hover:opacity-80"
                  }`}
                  style={{ backgroundColor: c }}
                  onClick={() => setColor(c)}
                  aria-label={`Color ${c}`}
                  aria-selected={color === c}
                />
              ))}
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting || !name.trim()}>
              {isSubmitting ? "Creando..." : "Crear"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewTagModal;
