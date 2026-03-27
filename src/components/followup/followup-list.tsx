// 跟进记录列表视图组件

"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Search, Filter, Calendar, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Followup, FollowupFilters } from "@/types/followup";
import { FOLLOWUP_TYPE, getFollowupTypeLabel, FollowupType } from "@/lib/dict";

interface FollowupListProps {
  followups: Followup[];
  onAddClick?: () => void;
}

export function FollowupList({ followups, onAddClick }: FollowupListProps) {
  const [filters, setFilters] = useState<FollowupFilters>({});
  const [filteredFollowups, setFilteredFollowups] = useState<Followup[]>(followups);

  // 应用筛选
  const applyFilters = (newFilters: FollowupFilters) => {
    let result = [...followups];

    // 关键词筛选
    if (newFilters.keyword) {
      const keyword = newFilters.keyword.toLowerCase();
      result = result.filter(
        (f) =>
          f.customerName.toLowerCase().includes(keyword) ||
          f.content.toLowerCase().includes(keyword)
      );
    }

    // 类型筛选
    if (newFilters.type) {
      result = result.filter((f) => f.type === newFilters.type);
    }

    // 日期范围筛选
    if (newFilters.dateRange) {
      const { start, end } = newFilters.dateRange;
      result = result.filter((f) => {
        const date = new Date(f.createdAt);
        return date >= new Date(start) && date <= new Date(end);
      });
    }

    setFilteredFollowups(result);
  };

  // 更新筛选条件
  const updateFilter = (key: keyof FollowupFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  // 重置筛选
  const resetFilters = () => {
    const emptyFilters: FollowupFilters = {};
    setFilters(emptyFilters);
    applyFilters(emptyFilters);
  };

  return (
    <div className="space-y-4">
      {/* 筛选栏 */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            {/* 关键词搜索 */}
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium">搜索</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="搜索客户、内容..."
                  className="pl-9"
                  value={filters.keyword || ""}
                  onChange={(e) => updateFilter("keyword", e.target.value)}
                />
              </div>
            </div>

            {/* 类型筛选 */}
            <div className="w-full space-y-2 sm:w-48">
              <label className="text-sm font-medium">类型</label>
              <Select
                value={filters.type || "all"}
                onValueChange={(value) => updateFilter("type", value === "all" ? undefined : value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="全部类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部类型</SelectItem>
                  {Object.entries(FOLLOWUP_TYPE).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 操作按钮 */}
            <div className="flex gap-2">
              {onAddClick && (
                <Button onClick={onAddClick} className="sm:w-auto w-full">
                  添加跟进
                </Button>
              )}
              <Button variant="outline" onClick={resetFilters}>
                重置
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 统计信息 */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          共 <span className="font-medium text-foreground">{filteredFollowups.length}</span> 条跟进记录
        </p>
      </div>

      {/* 跟进记录列表 */}
      <div className="space-y-3">
        {filteredFollowups.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground">暂无跟进记录</p>
            </CardContent>
          </Card>
        ) : (
          filteredFollowups.map((followup) => (
            <Card key={followup.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  {/* 左侧内容 */}
                  <div className="flex-1 space-y-2">
                    {/* 客户和类型 */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <Link
                        href={`/customers/${followup.customerId}`}
                        className="font-medium hover:underline"
                      >
                        {followup.customerName}
                      </Link>
                      <Badge variant="outline">{getFollowupTypeLabel(followup.type)}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(followup.createdAt), "yyyy-MM-dd HH:mm")}
                      </span>
                    </div>

                    {/* 内容 */}
                    <p className="text-sm text-muted-foreground line-clamp-2">{followup.content}</p>

                    {/* 参与人 */}
                    {followup.attendees && followup.attendees.length > 0 && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>参与人:</span>
                        {followup.attendees.map((attendee, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {attendee}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* 后续计划 */}
                    {followup.nextActions && (
                      <div className="text-xs">
                        <span className="font-medium">后续计划: </span>
                        <span className="text-muted-foreground">{followup.nextActions}</span>
                      </div>
                    )}
                  </div>

                  {/* 右侧操作 */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {followup.createdBy}
                    </span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon-sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>查看详情</DropdownMenuItem>
                        <DropdownMenuItem>编辑</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">删除</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
