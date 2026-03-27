'use client';

import { useState } from 'react';
import { Task, TaskFilters, PRIORITY_CONFIG, STATUS_CONFIG } from '@/types/task';
import { mockTasks } from '@/lib/mock/tasks';
import { TaskCard } from './task-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Plus, SortDesc } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TaskListProps {
  onAddTask?: () => void;
  onEditTask?: (task: Task) => void;
  onViewTask?: (task: Task) => void;
}

export function TaskList({ onAddTask, onEditTask, onViewTask }: TaskListProps) {
  const [filters, setFilters] = useState<TaskFilters>({});
  const [sortBy, setSortBy] = useState<'priority' | 'dueDate' | 'createdAt'>('priority');

  // Filter tasks
  const filteredTasks = mockTasks.filter(task => {
    // Keyword filter
    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      if (
        !task.title.toLowerCase().includes(keyword) &&
        !task.description?.toLowerCase().includes(keyword) &&
        !task.customerName?.toLowerCase().includes(keyword)
      ) {
        return false;
      }
    }

    // Status filter
    if (filters.status && task.status !== filters.status) {
      return false;
    }

    // Priority filter
    if (filters.priority && task.priority !== filters.priority) {
      return false;
    }

    // Assignee filter
    if (filters.assignee && task.assignee !== filters.assignee) {
      return false;
    }

    // Date range filter
    if (filters.dueDateRange?.start && task.dueDate < filters.dueDateRange.start) {
      return false;
    }
    if (filters.dueDateRange?.end && task.dueDate > filters.dueDateRange.end) {
      return false;
    }

    return true;
  });

  // Sort tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'priority') {
      return PRIORITY_CONFIG[b.priority].value - PRIORITY_CONFIG[a.priority].value;
    }
    if (sortBy === 'dueDate') {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // Count by status
  const statusCounts = {
    all: mockTasks.length,
    pending: mockTasks.filter(t => t.status === 'pending').length,
    in_progress: mockTasks.filter(t => t.status === 'in_progress').length,
    completed: mockTasks.filter(t => t.status === 'completed').length,
  };

  const handleStatusChange = (value: string) => {
    if (value === 'all') {
      setFilters({ ...filters, status: undefined });
    } else {
      setFilters({ ...filters, status: value as any });
    }
  };

  const handlePriorityChange = (value: string) => {
    if (value === 'all') {
      setFilters({ ...filters, priority: undefined });
    } else {
      setFilters({ ...filters, priority: value as any });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">任务提醒</h1>
          <p className="text-muted-foreground mt-1">
            管理您的待办事项和任务计划
          </p>
        </div>
        <Button onClick={onAddTask}>
          <Plus className="mr-2 h-4 w-4" />
          新建任务
        </Button>
      </div>

      {/* Status tabs */}
      <div className="flex items-center gap-2 border-b">
        <button
          onClick={() => setFilters({ ...filters, status: undefined })}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            !filters.status
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          全部 <Badge variant="secondary" className="ml-2">{statusCounts.all}</Badge>
        </button>
        <button
          onClick={() => setFilters({ ...filters, status: 'pending' })}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            filters.status === 'pending'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          待处理 <Badge variant="secondary" className="ml-2">{statusCounts.pending}</Badge>
        </button>
        <button
          onClick={() => setFilters({ ...filters, status: 'in_progress' })}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            filters.status === 'in_progress'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          进行中 <Badge variant="secondary" className="ml-2">{statusCounts.in_progress}</Badge>
        </button>
        <button
          onClick={() => setFilters({ ...filters, status: 'completed' })}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            filters.status === 'completed'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          已完成 <Badge variant="secondary" className="ml-2">{statusCounts.completed}</Badge>
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 flex-wrap">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索任务标题、客户..."
            value={filters.keyword || ''}
            onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
            className="pl-9"
          />
        </div>

        {/* Priority filter */}
        <Select value={filters.priority || 'all'} onValueChange={handlePriorityChange}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="优先级" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部优先级</SelectItem>
            <SelectItem value="urgent">紧急</SelectItem>
            <SelectItem value="high">高</SelectItem>
            <SelectItem value="medium">中</SelectItem>
            <SelectItem value="low">低</SelectItem>
          </SelectContent>
        </Select>

        {/* Sort */}
        <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
          <SelectTrigger className="w-[140px]">
            <SortDesc className="mr-2 h-4 w-4" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="priority">按优先级</SelectItem>
            <SelectItem value="dueDate">按截止日期</SelectItem>
            <SelectItem value="createdAt">按创建时间</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Task list */}
      <div className="space-y-3">
        {sortedTasks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">暂无任务</p>
          </div>
        ) : (
          sortedTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={() => onEditTask?.(task)}
              onView={() => onViewTask?.(task)}
            />
          ))
        )}
      </div>
    </div>
  );
}
