import { Link, useLocation } from "react-router-dom";
import { X, LogOut, Menu, Edit, Trash2, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { tagService } from "@/services/tagService";
import { useEffect, useState, useRef } from "react";
import type { TagDTO } from "@/types";
import { authService } from "@/services/authService";
import { useNavigate } from "react-router-dom";
import NewTagModal from "./NewTagModal";
import DeleteTagModal from "./DeleteTagModal";
import EditTagModal from "./EditTagModal";
import { toast } from "sonner";

const tasks = [
  {
    name: "Próximas Tareas ⏰",
    count: 12,
    href: "/upcoming",
  },
  {
    name: "Tareas de Hoy 📅",
    count: 5,
    href: "/today",
  },
];

interface SidebarProps {
  isMobileMenuOpen: boolean;
  onMobileMenuClose: () => void;
  onMobileMenuToggle: () => void;
  brandName: string;
  onLogout?: () => void;
}

export function Sidebar({
  isMobileMenuOpen,
  onMobileMenuClose,
  onMobileMenuToggle,
  brandName,
}: SidebarProps) {
  const location = useLocation();
  const isActive = (href: string) => location.pathname === href;
  const navigate = useNavigate();

  const [tags, setTags] = useState<TagDTO[]>([]);
  const [showNewTagModal, setShowNewTagModal] = useState(false);
  const [tagToDelete, setTagToDelete] = useState<TagDTO | null>(null);
  const [tagToEdit, setTagToEdit] = useState<TagDTO | null>(null);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  // Create separate refs for each dropdown
  const dropdownRefs = useRef<Map<number, HTMLDivElement | null>>(new Map());

  useEffect(() => {
    tagService.getAll().then(setTags);
  }, []);

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  const handleCreateTag = (tag: TagDTO) => {
    setTags((prev) => [...prev, tag]);
  };

  const handleEditTag = (updatedTag: TagDTO) => {
    if (typeof updatedTag.id !== "number") {
      console.error("Tag id is missing or not a number.");
      toast.error("No se pudo actualizar la etiqueta: id inválido.");
      return;
    }

    tagService
      .updateTag(updatedTag.id, updatedTag)
      .then(() => {
        setTags((prev) =>
          prev.map((tag) => (tag.id === updatedTag.id ? updatedTag : tag))
        );
        toast.success("Etiqueta actualizada exitosamente.");
        setTagToEdit(null);
      })
      .catch((error) => {
        console.error("Error updating tag:", error);
        toast.error("Error al actualizar la etiqueta.");
      });
  };

  const handleDeleteTag = (tag: TagDTO) => {
    if (typeof tag.id !== "number") {
      console.error("Tag id is missing or not a number.");
      toast.error("No se pudo eliminar la etiqueta: id inválido.");
      return;
    }

    setIsDeleting(tag.id);
    tagService
      .deleteTag(tag.id)
      .then(() => {
        setTags((prev: TagDTO[]) =>
          prev.filter((t: TagDTO) => t.id !== tag.id)
        );
        toast.success("Etiqueta eliminada exitosamente.");
      })
      .catch((error: unknown) => {
        console.error("Error deleting tag:", error);
        toast.error("Error al eliminar la etiqueta.");
      })
      .finally(() => {
        setIsDeleting(null);
        setTagToDelete(null);
      });
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (openDropdownId !== null) {
        const currentRef = dropdownRefs.current.get(openDropdownId);
        if (currentRef && !currentRef.contains(event.target as Node)) {
          setOpenDropdownId(null);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdownId]);

  const toggleDropdown = (tagId: number | undefined, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (tagId !== undefined) {
      setOpenDropdownId(openDropdownId === tagId ? null : tagId);
    }
  };

  // Separate function handlers for edit and delete that first close the dropdown
  const handleEditClick = (tag: TagDTO, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenDropdownId(null);
    setTagToEdit(tag);
  };

  const handleDeleteClick = (tag: TagDTO, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenDropdownId(null);
    setTagToDelete(tag);
  };

  const SidebarContent = ({ onClose }: { onClose?: () => void }) => (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between py-2 px-4 border-b border-border">
        <span className="font-bold text-lg whitespace-nowrap text-primary">
          {brandName}
        </span>
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Cerrar menú"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </Button>
        )}
      </div>

      <div className="px-4 pt-2 pb-1 font-semibold text-primary tracking-widest">
        Tareas📚:
      </div>
      <div className="pb-4 border-b">
        {tasks.map((task) => (
          <Link
            key={task.name}
            to={task.href}
            className={cn(
              "flex items-center px-4 py-2 text-sm rounded-md font-medium",
              isActive(task.href)
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted"
            )}
            onClick={onClose}
          >
            <span className="flex-1">{task.name}</span>
            {task.count !== undefined && (
              <span className="ml-2 bg-muted text-xs rounded px-2 py-0.5 font-semibold">
                {task.count}
              </span>
            )}
          </Link>
        ))}
      </div>

      <div className="px-4 pt-2 pb-1 font-semibold text-primary tracking-widest">
        Tus Etiquetas🏷️:
      </div>

      <div className="px-4 py-2 flex flex-wrap pb-4 border-b">
        {tags.map((tag) => (
          <div key={tag.name} className="relative mr-2 mb-2">
            <div className="relative inline-flex items-center text-xs font-medium rounded-md">
              <span
                className="absolute inset-0 rounded-sm"
                style={{ backgroundColor: tag.color, opacity: 0.5 }}
              />

              <span className="relative z-10 flex items-center px-2 py-2 gap-1 rounded-sm">
                {tag.name}
                <div
                  ref={(el) => {
                    if (tag.id !== undefined) {
                      dropdownRefs.current.set(tag.id, el);
                    }
                  }}
                  className="relative"
                >
                  <button
                    className="ml-1 p-0.5 rounded hover:bg-black/10 relative z-10"
                    onClick={(e) => toggleDropdown(tag.id, e)}
                  >
                    <MoreVertical className="w-3 h-3" />
                  </button>

                  {openDropdownId === tag.id && (
                    <div className="absolute left-1 mt-1 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                      <div className="py-1">
                        <button
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={(e) => handleEditClick(tag, e)}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Editar
                        </button>
                        <button
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={(e) => handleDeleteClick(tag, e)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Eliminar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </span>
            </div>
          </div>
        ))}

        <button
          type="button"
          className="inline-flex items-center px-2 py-2 text-xs font-medium rounded-md mr-2 mb-2 bg-neutral-100 border text-muted-foreground hover:text-primary"
          onClick={() => setShowNewTagModal(true)}
          aria-label="Añadir Etiqueta"
        >
          + Añadir Etiqueta
        </button>
      </div>

      <div className="flex-1" />
      <div className="px-2 pb-2 mt-4">
        <Button
          variant="ghost"
          className="w-full justify-start text-foreground hover:text-primary"
          onClick={handleLogout}
          size="sm"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Cerrar Sesión
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <div className="flex items-center justify-center py-2 px-4 border-b border-border md:hidden">
        <button onClick={onMobileMenuToggle} aria-label="Abrir menú">
          <Menu className="w-6 h-6 text-primary" />
        </button>
        <span className="font-bold text-lg whitespace-nowrap text-primary flex-1 text-center">
          {brandName}
        </span>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onMobileMenuClose}
          aria-hidden="true"
        />
      )}

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-background transform transition-transform duration-200 ease-in-out md:hidden",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarContent onClose={onMobileMenuClose} />
      </div>

      <div className="inset-y-0 left-0 z-30 hidden md:flex flex-col w-64 bg-background border-r border-border">
        <SidebarContent />
      </div>

      {showNewTagModal && (
        <NewTagModal
          onClose={() => setShowNewTagModal(false)}
          onCreate={handleCreateTag}
        />
      )}

      {tagToDelete && (
        <DeleteTagModal
          tag={tagToDelete}
          onClose={() => setTagToDelete(null)}
          onDelete={handleDeleteTag}
          isLoading={tagToDelete?.id ? isDeleting === tagToDelete.id : false}
        />
      )}

      {tagToEdit && (
        <EditTagModal
          tag={tagToEdit}
          onClose={() => setTagToEdit(null)}
          onUpdate={handleEditTag}
        />
      )}
    </>
  );
}
