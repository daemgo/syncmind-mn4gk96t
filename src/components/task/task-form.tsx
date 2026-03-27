'use client';

import { useState } from 'react';
import { Task, TaskFormData, TaskPriority, PRIORITY_CONFIG } from '@/types/task';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';

interface TaskFormProps {
  open?: boolean;
  task?: Task;
  onClose?: () => void;
  onSubmit?: (data: TaskFormData) => void;
}

const mockCustomers = [
  { id: 'c1', name: '腾讯科技' },
  { id: 'c2', name: '阿里巴巴' },
  { id: 'c3', name: '字节跳动' },
  { id: 'c4', name: '华为技术' },
  { id: 'c5', name: '京东集团' },
  { id: 'c6', name: '美团' },
  { id: 'c7', name: '百度' },
  { id: 'c8', name: '小米集团' },
  { id: 'c9', name: '网易' },
  { id: 'c10', name: '拼多多' },
  { id: 'c11', name: '滴滴出行' },
  { id: 'c12', name: '快手' },
  { id: 'c13', name: '蚂蚁集团' },
  { id: 'c14', name: '顺丰控股' },
  { id: 'c15', name: '理想汽车' },
];

const mockOpportunities = [
  { id: 'o1', name: '2026年企业服务采购' },
  { id: 'o2', name: '数字化转型项目' },
  { id: 'o3', name: '云服务续约' },
  { id: 'o4', name: 'CRM系统升级' },
  { id: 'o5', name: '数据中台建设' },
  { id: 'o6', name: 'AI平台合作' },
  { id: 'o7', name: '营销自动化' },
  { id: 'o8', name: '供应链优化' },
];

const assignees = ['张三', '李四', '王五', '赵六', '孙七', '周八', '吴九', '郑十'];

export function TaskForm({ open, task, onClose, onSubmit }: TaskFormProps) {
  const isEdit = !!task;

  const [formData, setFormData] = useState<TaskFormData>({
    title: task?.title || '',
    description: task?.description || '',
    customerId: task?.customerId,
    opportunityId: task?.opportunityId,
    priority: task?.priority || 'medium',
    dueDate: task?.dueDate || '',
    assignee: task?.assignee || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = '请输入任务标题';
    }

    if (!formData.dueDate) {
      newErrors.dueDate = '请选择截止日期';
    }

    if (!formData.assignee) {
      newErrors.assignee = '请选择负责人';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit?.(formData);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      customerId: undefined,
      opportunityId: undefined,
      priority: 'medium',
      dueDate: '',
      assignee: '',
    });
    setErrors({});
    onClose?.();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? '编辑任务' : '新建任务'}</DialogTitle>
          <DialogDescription>
            {isEdit ? '修改任务信息和设置' : '创建一个新的待办任务'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">
              任务标题 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              placeholder="请输入任务标题"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className={errors.title ? 'border-red-500' : ''}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">任务描述</Label>
            <Textarea
              id="description"
              placeholder="请输入任务描述（可选）"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          {/* Related Customer */}
          <div className="space-y-2">
            <Label htmlFor="customer">关联客户</Label>
            <Select
              value={formData.customerId || ''}
              onValueChange={(value) =>
                setFormData({ ...formData, customerId: value || undefined })
              }
            >
              <SelectTrigger id="customer">
                <SelectValue placeholder="选择关联客户（可选）" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">无关联客户</SelectItem>
                {mockCustomers.map((customer) => (
                  <SelectItem key={customer.id} value={customer.id}>
                    {customer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Related Opportunity */}
          <div className="space-y-2">
            <Label htmlFor="opportunity">关联商机</Label>
            <Select
              value={formData.opportunityId || ''}
              onValueChange={(value) =>
                setFormData({ ...formData, opportunityId: value || undefined })
              }
            >
              <SelectTrigger id="opportunity">
                <SelectValue placeholder="选择关联商机（可选）" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">无关联商机</SelectItem>
                {mockOpportunities.map((opp) => (
                  <SelectItem key={opp.id} value={opp.id}>
                    {opp.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Priority & Due Date */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">
                优先级 <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.priority}
                onValueChange={(value) =>
                  setFormData({ ...formData, priority: value as TaskPriority })
                }
              >
                <SelectTrigger id="priority">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(PRIORITY_CONFIG).map(([value, config]) => (
                    <SelectItem key={value} value={value}>
                      {config.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate">
                截止日期 <span className="text-red-500">*</span>
              </Label>
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    id="dueDate"
                    variant="outline"
                    className={`w-full justify-start text-left font-normal ${
                      !formData.dueDate && 'text-muted-foreground'
                    } ${errors.dueDate ? 'border-red-500' : ''}`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.dueDate ? (
                      format(new Date(formData.dueDate), 'yyyy-MM-dd', { locale: zhCN })
                    ) : (
                      <span>选择日期</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.dueDate ? new Date(formData.dueDate) : undefined}
                    onSelect={(date) => {
                      if (date) {
                        setFormData({
                          ...formData,
                          dueDate: date.toISOString().split('T')[0],
                        });
                        setCalendarOpen(false);
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.dueDate && (
                <p className="text-sm text-red-500">{errors.dueDate}</p>
              )}
            </div>
          </div>

          {/* Assignee */}
          <div className="space-y-2">
            <Label htmlFor="assignee">
              负责人 <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.assignee}
              onValueChange={(value) => setFormData({ ...formData, assignee: value })}
            >
              <SelectTrigger id="assignee" className={errors.assignee ? 'border-red-500' : ''}>
                <SelectValue placeholder="选择负责人" />
              </SelectTrigger>
              <SelectContent>
                {assignees.map((assignee) => (
                  <SelectItem key={assignee} value={assignee}>
                    {assignee}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.assignee && (
              <p className="text-sm text-red-500">{errors.assignee}</p>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              取消
            </Button>
            <Button type="submit">
              {isEdit ? '保存' : '创建'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
