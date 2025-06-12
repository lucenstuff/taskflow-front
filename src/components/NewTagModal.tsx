import { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { tagService } from "@/services/tagService";
import { toast } from "sonner";

interface NewTagModalProps {
  onClose: () => void;
  onCreate: (tag: { name: string; color: string }) => void;
}

const tailwindColors = [
  "red",
  "orange",
  "yellow",
  "green",
  "cyan",
  "blue",
  "purple",
  "pink",
  "amber",
  "gray",
];

const tailwindColorClasses: Record<string, string> = {
  red: "bg-red-500",
  orange: "bg-orange-500",
  yellow: "bg-yellow-400",
  green: "bg-green-500",
  cyan: "bg-cyan-500",
  blue: "bg-blue-500",
  purple: "bg-purple-500",
  pink: "bg-pink-500",
  amber: "bg-amber-500",
  gray: "bg-gray-500",
};

export default function NewTagModal({ onClose, onCreate }: NewTagModalProps) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const newTag = await tagService.createTag({
        name,
        color,
      });
      onCreate({ name: newTag.name, color: newTag.color ?? "" });
      onClose();
    } catch {
      toast.error("Error al crear la etiqueta.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <Card className="w-[400px]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Nueva Etiqueta</CardTitle>
          <CardDescription>Agrega una nueva etiqueta a la tarea.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium leading-none"
              >
                Nombre:
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Ej: 🏠 Hogar"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="color"
                className="text-sm font-medium leading-none"
              >
                Color:
              </label>
              <div className="flex gap-2">
                {tailwindColors.map((twColor) => (
                  <button
                    key={twColor}
                    type="button"
                    className={`w-7 h-7 rounded-full border-2 ${
                      color === twColor ? "border-black" : "border-transparent"
                    } ${tailwindColorClasses[twColor]} focus:outline-none`}
                    onClick={() => setColor(twColor)}
                    aria-label={twColor}
                    disabled={isLoading}
                  />
                ))}
              </div>
              <input type="hidden" value={color} required readOnly />
            </div>
          </CardContent>
          <CardFooter className="pt-8 flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Agregando..." : "Agregar Etiqueta"}
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
