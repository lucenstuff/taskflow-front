import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { TagDTO } from "@/types";
import { Label } from "@/components/ui/label";

interface EditTagModalProps {
  tag: TagDTO;
  onClose: () => void;
  onUpdate: (tag: TagDTO) => void;
}

const EditTagModal = ({ tag, onClose, onUpdate }: EditTagModalProps) => {
  const [name, setName] = useState(tag.name);
  const [color, setColor] = useState(tag.color || "blue");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setName(tag.name);
    setColor(tag.color || "blue");
  }, [tag]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const updatedTag = {
      ...tag,
      name,
      color,
    };

    onUpdate(updatedTag);
    setIsSubmitting(false);
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
          <DialogTitle>Editar Etiqueta</DialogTitle>
          <DialogDescription>
            Actualiza el nombre o el color de tu etiqueta.
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
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTagModal;
