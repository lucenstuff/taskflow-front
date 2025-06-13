import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { TaskDTO } from "@/types";

interface DeleteTaskModalProps {
  task: TaskDTO;
  onClose: () => void;
  onDelete: (task: TaskDTO) => void;
  isLoading: boolean;
}

const DeleteTaskModal = ({
  task,
  onClose,
  onDelete,
  isLoading,
}: DeleteTaskModalProps) => {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar Tarea</DialogTitle>
          <DialogDescription>
            ¿Estás seguro que quieres eliminar la tarea "{task.title}"? Esta
            acción no se puede deshacer.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={() => onDelete(task)}
            disabled={isLoading}
          >
            {isLoading ? "Eliminando..." : "Eliminar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTaskModal;
