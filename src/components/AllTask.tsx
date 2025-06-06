import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardHeader, CardTitle, CardContent, CardAction } from '@/components/ui/card';
import { ChevronRight, Calendar, List, Tag } from 'lucide-react';


// Mock de tareas iniciales
const initialTasks = [
    {
        id: 1,
        title: 'Research content ideas',
        completed: false,
        subtasks: [],
        tags: [],
        date: null,
        list: null,
    },
    {
        id: 2,
        title: 'Create a database of guest authors',
        completed: false,
        subtasks: [],
        tags: [],
        date: null,
        list: null,
    },
    {
        id: 3,
        title: "Renew driver's license",
        completed: false,
        subtasks: [
            { id: 31, title: 'Find documents', completed: false },
        ],
        tags: ['Personal'],
        date: '22-03-22',
        list: null,
    },
    {
        id: 4,
        title: 'Consult accountant',
        completed: false,
        subtasks: [
            { id: 41, title: 'Prepare questions', completed: false },
            { id: 42, title: 'Send email', completed: false },
            { id: 43, title: 'Review answers', completed: false },
        ],
        tags: [],
        date: null,
        list: 'List 1',
    },
    {
        id: 5,
        title: 'Print business card',
        completed: false,
        subtasks: [],
        tags: [],
        date: null,
        list: null,
    },
];

const tagColors: Record<string, string> = {
    Personal: 'bg-red-400 text-white',
    Work: 'bg-cyan-300 text-cyan-900',
};

const listColors: Record<string, string> = {
    'List 1': 'bg-yellow-300',
};
export function AllTask() {
    const [tasks, setTasks] = useState(initialTasks);
        const [newTask, setNewTask] = useState('');
    
        const handleAddTask = () => {
            if (!newTask.trim()) return;
            setTasks([
                ...tasks,
                { id: Date.now(), title: newTask, completed: false, subtasks: [], tags: [], date: null, list: null },
            ]);
            setNewTask('');
        };
        
    const handleToggleTask = (id: number) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };
  return (
        <div className="max-w-3xl mx-auto py-6 px-2 sm:py-8 sm:px-4 lg:px-8">
            <div className="flex items-center gap-2 justify-start mb-4">
                <h1 className="text-3xl sm:text-4xl font-bold">All Task</h1>
                <span className="text-xl sm:text-2xl bg-muted rounded px-3 py-1 font-semibold">{tasks.length}</span>
            </div>
            <div className="mb-4 sm:mb-6">
                <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                        placeholder="Add New Task"
                        value={newTask}
                        onChange={e => setNewTask(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleAddTask()}
                        className="flex-1"
                    />
                    <Button onClick={handleAddTask} variant="default" className="w-full sm:w-auto">Add</Button>
                </div>
            </div>
            <div className="space-y-4">
                {tasks.map(task => (
                    <Card key={task.id} className="group transition">
                        <CardHeader className="flex flex-row items-center gap-2 px-4 py-2">
                            <Checkbox checked={task.completed} onCheckedChange={() => handleToggleTask(task.id)} />
                            <CardTitle className={task.completed ? 'line-through text-muted-foreground flex-1' : 'flex-1'}>
                                {task.title}
                            </CardTitle>
                            <CardAction>
                                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition"><ChevronRight className="w-5 h-5" /></Button>
                            </CardAction>
                        </CardHeader>
                        <CardContent className="pt-0 pb-2">
                            <div className="flex flex-wrap gap-2 mt-1 text-xs items-center">
                                {task.date && (
                                    <span className="flex items-center gap-1 bg-muted px-2 py-0.5 rounded"><Calendar className="w-3 h-3" />{task.date}</span>
                                )}
                                {task.list && (
                                    <span className={`flex items-center gap-1 px-2 py-0.5 rounded ${listColors[task.list] || 'bg-muted'}`}><List className="w-3 h-3" />{task.list}</span>
                                )}
                                {task.tags.map(tag => (
                                    <span key={tag} className={`flex items-center gap-1 px-2 py-0.5 rounded ${tagColors[tag] || 'bg-muted'}`}><Tag className="w-3 h-3" />{tag}</span>
                                ))}
                                {task.subtasks.length > 0 && (
                                    <span className="flex items-center gap-1 bg-muted px-2 py-0.5 rounded"><List className="w-3 h-3" />{task.subtasks.length} Subtasks</span>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
 

