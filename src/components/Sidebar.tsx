import { Link, useLocation } from "react-router-dom";
import { X, LogOut, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { tagService } from "@/services/tagService";
import { useEffect, useState } from "react";
import type { TagDTO } from "@/types";
import { authService } from "@/services/authService";
import { useNavigate } from "react-router-dom";

const tasks = [
  {
    name: "Próximas Tareas",
    count: 12,
    href: "/upcoming",
  },
  {
    name: "Tareas de Hoy",
    count: 5,
    href: "/today",
  },
];

// const tags = [
//   { name: "🏠 Hogar", color: "bg-cyan-100 text-cyan-900" },
//   { name: "🎉 Cumpleaños", color: "bg-red-100 text-red-900" },
//   { name: "📚 Estudio", color: "bg-yellow-100 text-yellow-900" },
//   { name: "💼 Trabajo", color: "bg-blue-100 text-blue-900" },
// ];

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

  useEffect(() => {
    tagService.getAll().then(setTags);
  }, []);

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  const SidebarContent = ({ onClose }: { onClose?: () => void }) => (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-border">
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

      <div className="px-4 pt-2 pb-1 font-semibold text-muted-foreground tracking-widest">
        Tareas:
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

      <div className="px-4 pt-2 pb-1 font-semibold text-muted-foreground tracking-widest">
        Tus Etiquetas:
      </div>
      <div className="px-4 py-2 flex flex-wrap pb-4 border-b">
        {tags.map((tag) => (
          <span
            key={tag.name}
            className={cn(
              "inline-flex items-center px-3 py-2 text-xs font-medium rounded-full mr-2 mb-2",
              `bg-${tag.color}-100`
            )}
          >
            {tag.name}
          </span>
        ))}
        <span className="inline-flex items-center px-3 py-2 text-xs font-medium rounded-full mr-2 mb-2 bg-neutral-100 border">
          <Link to="/tags" className="text-muted-foreground hover:text-primary">
            + Añadir Etiqueta
          </Link>
        </span>
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
      <div className="flex items-center justify-center p-4 border-b border-border md:hidden">
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
    </>
  );
}
