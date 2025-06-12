import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { TagDTO } from "@/types";

interface DeleteTagModalProps {
  tag: TagDTO;
  onClose: () => void;
  onDelete: (tag: TagDTO) => void;
  isLoading: boolean;
}

const DeleteTagModal = ({
  tag,
  onClose,
  onDelete,
  isLoading,
}: DeleteTagModalProps) => {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar Etiqueta</DialogTitle>
          <DialogDescription>
            ¿Estás seguro que quieres eliminar la etiqueta "{tag.name}"? Esta
            acción no se puede deshacer.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={() => onDelete(tag)}
            disabled={isLoading}
          >
            {isLoading ? "Eliminando..." : "Eliminar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTagModal;
