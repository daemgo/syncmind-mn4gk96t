// Task priority levels
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

// Task status
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

// Task entity
export interface Task {
  id: string;
  title: string;
  description?: string;
  customerId?: string;
  customerName?: string;
  opportunityId?: string;
  opportunityName?: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  assignee: string;
  createdAt: string;
  updatedAt: string;
}

// Task form input
export interface TaskFormData {
  title: string;
  description?: string;
  customerId?: string;
  opportunityId?: string;
  priority: TaskPriority;
  dueDate: string;
  assignee: string;
}

// Task filter options
export interface TaskFilters {
  keyword?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  assignee?: string;
  dueDateRange?: {
    start?: string;
    end?: string;
  };
}

// Priority display configuration
export const PRIORITY_CONFIG: Record<TaskPriority, { label: string; color: string; value: number }> = {
  low: { label: '低', color: 'gray', value: 1 },
  medium: { label: '中', color: 'blue', value: 2 },
  high: { label: '高', color: 'orange', value: 3 },
  urgent: { label: '紧急', color: 'red', value: 4 },
};

// Status display configuration
export const STATUS_CONFIG: Record<TaskStatus, { label: string; color: string }> = {
  pending: { label: '待处理', color: 'gray' },
  in_progress: { label: '进行中', color: 'blue' },
  completed: { label: '已完成', color: 'green' },
  cancelled: { label: '已取消', color: 'red' },
};
