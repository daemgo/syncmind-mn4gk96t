'use client';

import { useState } from 'react';
import { Task, TaskFormData } from '@/types/task';
import { TaskList } from '@/components/task/task-list';
import { TaskForm } from '@/components/task/task-form';
import { useRouter } from 'next/navigation';

export default function TasksPage() {
  const router = useRouter();
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();

  const handleAddTask = () => {
    setEditingTask(undefined);
    setFormOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setFormOpen(true);
  };

  const handleViewTask = (task: Task) => {
    router.push(`/tasks/${task.id}`);
  };

  const handleFormSubmit = (data: TaskFormData) => {
    // In a real app, this would call an API
    console.log('Form submitted:', data);
    // For now, just close the form
    setFormOpen(false);
    setEditingTask(undefined);
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setEditingTask(undefined);
  };

  return (
    <div className="container mx-auto py-6">
      <TaskList
        onAddTask={handleAddTask}
        onEditTask={handleEditTask}
        onViewTask={handleViewTask}
      />

      <TaskForm
        open={formOpen}
        task={editingTask}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
