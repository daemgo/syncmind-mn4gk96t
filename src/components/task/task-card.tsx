'use client';

import { Task, PRIORITY_CONFIG, STATUS_CONFIG } from '@/types/task';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { Link } from 'lucide-react';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import {
  MoreVertical,
  Calendar,
  User,
  Building2,
  TrendingUp,
  Check,
  Clock,
} from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onEdit?: () => void;
  onView?: () => void;
  onComplete?: () => void;
  onDelete?: () => void;
}

export function TaskCard({ task, onEdit, onView, onComplete, onDelete }: TaskCardProps) {
  const priorityConfig = PRIORITY_CONFIG[task.priority];
  const statusConfig = STATUS_CONFIG[task.status];

  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed';
  const dueDate = format(new Date(task.dueDate), 'MM月dd日', { locale: zhCN });

  const handleCheckboxChange = (checked: boolean) => {
    if (checked && onComplete) {
      onComplete();
    }
  };

  return (
    <Card
      className={`p-4 hover:shadow-md transition-shadow cursor-pointer ${
        task.status === 'completed' ? 'opacity-60' : ''
      } ${isOverdue ? 'border-red-200 bg-red-50/30' : ''}`}
      onClick={onView}
    >
      <div className="flex items-start gap-4">
        {/* Checkbox */}
        <div className="pt-1" onClick={(e) => e.stopPropagation()}>
          <Checkbox
            checked={task.status === 'completed'}
            onCheckedChange={handleCheckboxChange}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title row */}
          <div className="flex items-start gap-3 mb-2">
            <h3 className={`font-medium truncate ${
              task.status === 'completed' ? 'line-through text-muted-foreground' : ''
            }`}>
              {task.title}
            </h3>

            {/* Priority badge */}
            <Badge
              variant="outline"
              className={`shrink-0 border-${priorityConfig.color}-200 bg-${priorityConfig.color}-50 text-${priorityConfig.color}-700`}
            >
              {priorityConfig.label}
            </Badge>

            {/* Status badge */}
            <Badge
              variant="outline"
              className={`shrink-0`}
            >
              {statusConfig.label}
            </Badge>

            {/* Overdue badge */}
            {isOverdue && (
              <Badge variant="destructive" className="shrink-0">
                已逾期
              </Badge>
            )}
          </div>

          {/* Description */}
          {task.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {task.description}
            </p>
          )}

          {/* Meta info */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
            {/* Due date */}
            <div className={`flex items-center gap-1 ${isOverdue ? 'text-red-600' : ''}`}>
              <Calendar className="h-4 w-4" />
              <span>{dueDate}</span>
            </div>

            {/* Assignee */}
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{task.assignee}</span>
            </div>

            {/* Related customer */}
            {task.customerName && (
              <div className="flex items-center gap-1">
                <Building2 className="h-4 w-4" />
                <span className="hover:text-primary transition-colors">{task.customerName}</span>
              </div>
            )}

            {/* Related opportunity */}
            {task.opportunityName && (
              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                <span className="hover:text-primary transition-colors">{task.opportunityName}</span>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {task.status !== 'completed' && (
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                onComplete?.();
              }}
            >
              <Check className="h-4 w-4" />
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button size="sm" variant="ghost">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onView?.(); }}>
                查看详情
              </DropdownMenuItem>
              {task.status !== 'completed' && (
                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEdit?.(); }}>
                  编辑任务
                </DropdownMenuItem>
              )}
              {task.status === 'pending' && (
                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onComplete?.(); }}>
                  <Clock className="mr-2 h-4 w-4" />
                  标记进行中
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                onClick={(e) => { e.stopPropagation(); onDelete?.(); }}
                className="text-red-600"
              >
                删除任务
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Card>
  );
}
