// 跟进记录表单组件

"use client";

import { useState } from "react";
import { CalendarIcon, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { FollowupFormData } from "@/types/followup";
import { FollowupType, FOLLOWUP_TYPE, getFollowupTypeLabel } from "@/lib/dict";

interface FollowupFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: FollowupFormData) => void;
  customerId?: string;
  customerName?: string;
}

// 模拟客户列表
const mockCustomers = [
  { id: "c1", name: "腾讯科技" },
  { id: "c2", name: "阿里巴巴" },
  { id: "c3", name: "字节跳动" },
  { id: "c4", name: "华为技术" },
  { id: "c5", name: "小米科技" },
];

// 模拟参与人列表
const mockAttendees = [
  "张三",
  "李四",
  "王五",
  "赵六",
  "客户经理",
  "售前工程师",
  "技术总监",
  "产品经理",
];

export function FollowupForm({
  open,
  onOpenChange,
  onSubmit,
  customerId,
  customerName,
}: FollowupFormProps) {
  const [formData, setFormData] = useState<FollowupFormData>({
    customerId: customerId || "",
    type: "visit",
    content: "",
    attendees: [],
    nextActions: "",
  });

  const [selectedAttendees, setSelectedAttendees] = useState<string[]>([]);

  // 更新表单字段
  const updateField = (field: keyof FollowupFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // 添加参与人
  const addAttendee = (attendee: string) => {
    if (!selectedAttendees.includes(attendee)) {
      const newAttendees = [...selectedAttendees, attendee];
      setSelectedAttendees(newAttendees);
      updateField("attendees", newAttendees);
    }
  };

  // 移除参与人
  const removeAttendee = (attendee: string) => {
    const newAttendees = selectedAttendees.filter((a) => a !== attendee);
    setSelectedAttendees(newAttendees);
    updateField("attendees", newAttendees);
  };

  // 提交表单
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.customerId || !formData.content) {
      return;
    }

    onSubmit({
      ...formData,
      attendees: selectedAttendees,
    });

    // 重置表单
    setFormData({
      customerId: customerId || "",
      type: "visit",
      content: "",
      attendees: [],
      nextActions: "",
    });
    setSelectedAttendees([]);

    onOpenChange(false);
  };

  // 关闭对话框
  const handleClose = () => {
    setFormData({
      customerId: customerId || "",
      type: "visit",
      content: "",
      attendees: [],
      nextActions: "",
    });
    setSelectedAttendees([]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>添加跟进记录</DialogTitle>
            <DialogDescription>记录客户沟通情况，为后续跟进提供参考。</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* 客户选择 */}
            <div className="space-y-2">
              <Label htmlFor="customer">
                客户 <span className="text-destructive">*</span>
              </Label>
              {customerId ? (
                <div className="flex h-9 w-full items-center rounded-md border border-input bg-transparent px-3 text-sm">
                  {customerName}
                </div>
              ) : (
                <Select
                  value={formData.customerId}
                  onValueChange={(value) => updateField("customerId", value)}
                >
                  <SelectTrigger id="customer">
                    <SelectValue placeholder="选择客户" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCustomers.map((customer) => (
                      <SelectItem key={customer.id} value={customer.id}>
                        {customer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            {/* 跟进类型 */}
            <div className="space-y-2">
              <Label htmlFor="type">
                跟进类型 <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.type}
                onValueChange={(value) => updateField("type", value as FollowupType)}
              >
                <SelectTrigger id="type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(FOLLOWUP_TYPE).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 跟进内容 */}
            <div className="space-y-2">
              <Label htmlFor="content">
                跟进内容 <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="content"
                placeholder="详细描述本次沟通的内容、客户反馈、需求变化等..."
                className="min-h-[120px]"
                value={formData.content}
                onChange={(e) => updateField("content", e.target.value)}
              />
            </div>

            {/* 参与人 */}
            <div className="space-y-2">
              <Label htmlFor="attendees">参与人</Label>
              <Select onValueChange={addAttendee} value="">
                <SelectTrigger id="attendees">
                  <SelectValue placeholder="添加参与人" />
                </SelectTrigger>
                <SelectContent>
                  {mockAttendees
                    .filter((a) => !selectedAttendees.includes(a))
                    .map((attendee) => (
                      <SelectItem key={attendee} value={attendee}>
                        {attendee}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              {selectedAttendees.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedAttendees.map((attendee) => (
                    <Badge key={attendee} variant="secondary" className="gap-1 pr-1">
                      {attendee}
                      <button
                        type="button"
                        onClick={() => removeAttendee(attendee)}
                        className="hover:bg-destructive/20 rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* 后续计划 */}
            <div className="space-y-2">
              <Label htmlFor="nextActions">后续计划</Label>
              <Textarea
                id="nextActions"
                placeholder="计划下一步行动，如：安排技术交流、发送方案资料等..."
                className="min-h-[80px]"
                value={formData.nextActions}
                onChange={(e) => updateField("nextActions", e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              取消
            </Button>
            <Button type="submit" disabled={!formData.customerId || !formData.content}>
              保存
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
