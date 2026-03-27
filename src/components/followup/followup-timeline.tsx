// 跟进记录时间线组件

"use client";

import { useState } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { zhCN } from "date-fns/locale";
import {
  MessageSquare,
  Phone,
  Users,
  Mail,
  MoreHorizontal,
  Clock,
  User,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Followup, FollowupGroupByCustomer } from "@/types/followup";
import { FOLLOWUP_TYPE, getFollowupTypeLabel } from "@/lib/dict";
import { cn } from "@/lib/utils";

interface FollowupTimelineProps {
  followups: Followup[] | FollowupGroupByCustomer[];
  groupByCustomer?: boolean;
  showCustomerLink?: boolean;
}

// 跟进类型图标映射
const typeIcons = {
  visit: Users,
  call: Phone,
  meeting: MessageSquare,
  email: Mail,
  other: Clock,
};

// 跟进类型颜色映射
const typeColors = {
  visit: "bg-blue-500",
  call: "bg-green-500",
  meeting: "bg-purple-500",
  email: "bg-orange-500",
  other: "bg-gray-500",
};

// 单条跟进记录卡片
function FollowupCard({
  followup,
  showCustomerLink = false,
}: {
  followup: Followup;
  showCustomerLink?: boolean;
}) {
  const TypeIcon = typeIcons[followup.type];
  const colorClass = typeColors[followup.type];

  return (
    <div className="relative pl-6 pb-8 last:pb-0">
      {/* 时间轴线 */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-border last:hidden" />

      {/* 时间点 */}
      <div className="absolute left-[-5px] top-1.5 h-2.5 w-2.5 rounded-full ring-4 ring-background" />

      {/* 图标 */}
      <div className={cn("absolute left-[-11px] top-[-2px] rounded-full p-1.5 text-white", colorClass)}>
        <TypeIcon className="h-3 w-3" />
      </div>

      {/* 内容卡片 */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline">{getFollowupTypeLabel(followup.type)}</Badge>
                {showCustomerLink && (
                  <Link
                    href={`/customers/${followup.customerId}`}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    {followup.customerName}
                  </Link>
                )}
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatDistanceToNow(new Date(followup.createdAt), {
                    addSuffix: true,
                    locale: zhCN,
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {followup.createdBy}
                </span>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon-sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>编辑</DropdownMenuItem>
                <DropdownMenuItem>删除</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          <p className="text-sm whitespace-pre-wrap">{followup.content}</p>

          {followup.attendees && followup.attendees.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {followup.attendees.map((attendee, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {attendee}
                </Badge>
              ))}
            </div>
          )}

          {followup.nextActions && (
            <div className="rounded-md bg-muted p-3">
              <p className="text-xs font-medium text-muted-foreground mb-1">后续计划</p>
              <p className="text-sm">{followup.nextActions}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// 按客户分组的时间线
function GroupedTimeline({ groups }: { groups: FollowupGroupByCustomer[] }) {
  return (
    <div className="space-y-8">
      {groups.map((group) => (
        <div key={group.customerId} className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">{group.customerName}</h3>
              <Badge variant="secondary" className="text-xs">
                {group.followups.length} 条记录
              </Badge>
            </div>
            <Link href={`/customers/${group.customerId}`}>
              <Button variant="outline" size="sm">
                查看客户
              </Button>
            </Link>
          </div>

          <div className="relative">
            {group.followups.map((followup) => (
              <FollowupCard key={followup.id} followup={followup} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// 标准时间线
function StandardTimeline({ followups, showCustomerLink }: { followups: Followup[]; showCustomerLink?: boolean }) {
  return (
    <div className="relative">
      {followups.map((followup) => (
        <FollowupCard key={followup.id} followup={followup} showCustomerLink={showCustomerLink} />
      ))}
    </div>
  );
}

export function FollowupTimeline({
  followups,
  groupByCustomer = false,
  showCustomerLink = false,
}: FollowupTimelineProps) {
  if (groupByCustomer) {
    return <GroupedTimeline groups={followups as FollowupGroupByCustomer[]} />;
  }

  return <StandardTimeline followups={followups as Followup[]} showCustomerLink={showCustomerLink} />;
}
