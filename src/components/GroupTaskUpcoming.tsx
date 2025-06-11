import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  created_at: string;
  updated_at: string;
  finished_at: string;
  tags: Tag[];
  [key: string]: unknown;
}

interface Tag {
  id: number;
  name: string;
  tasks: Task[];
  [key: string]: unknown;
}

function GroupTaskUpcoming() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    fetch('/api/v1/tasks')
      .then(response => response.json())
      .then(data => {
        setTasks(data.tasks);
        setTags(data.tags);
      })
      .catch(error => console.error(error));
  }, []);

  const renderTags = () => {
    if (!tags.length) return <p>No hay etiquetas</p>;

    return tags.map((tag) => (
      <div key={tag.id} className="p-4 border border-border rounded-md">
        <h2>{tag.name}</h2>
        <ul>
          {tag.tasks.map((task) => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      </div>
    ));
  };

  const renderTasksWithoutTags = () => {
    const tasksWithoutTags = tasks.filter((task) => !task.tags || task.tags.length === 0);

    if (!tasksWithoutTags.length) return <p>No hay tareas sin etiquetas</p>;

    return (
      <div className="p-4 border border-border rounded-md">
        <h2>Tareas sin etiquetas</h2>
        <ul>
          {tasksWithoutTags.map((task) => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto py-6 px-2 sm:py-8 sm:px-4 lg:px-8">
      <div className="flex items-center gap-2 justify-start mb-4">
        <h1 className="text-3xl sm:text-4xl font-bold">Upcoming</h1>
        <span className="text-xl sm:text-2xl bg-muted rounded px-3 py-1 font-semibold">
          {tasks.length}
        </span>
      </div>

      <div className="mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            placeholder="Añadir etiqueta"
            onKeyDown={(e) => e.key === "Enter"}
            className="flex-1"
          />
          <Button variant="default" className="w-full sm:w-auto">
            Add
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {renderTags()}
        {renderTasksWithoutTags()}
      </div>
    </div>
  );
}

export default GroupTaskUpcoming;