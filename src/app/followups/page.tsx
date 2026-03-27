// 跟进记录页面

"use client";

import { useState } from "react";
import { MessageSquare, List, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FollowupTimeline } from "@/components/followup/followup-timeline";
import { FollowupList } from "@/components/followup/followup-list";
import { FollowupForm } from "@/components/followup/followup-form";
import { mockFollowups } from "@/lib/mock/followups";
import { getFollowupsGroupedByCustomer } from "@/lib/mock/followups";
import { FollowupFormData, FollowupViewType } from "@/types/followup";

export default function FollowupsPage() {
  const [viewType, setViewType] = useState<FollowupViewType>("timeline");
  const [isFormOpen, setIsFormOpen] = useState(false);

  // 处理新增跟进
  const handleAddFollowup = (data: FollowupFormData) => {
    console.log("新增跟进记录:", data);
    // TODO: 调用 API 保存跟进记录
  };

  // 按客户分组的跟进记录
  const groupedFollowups = getFollowupsGroupedByCustomer();

  return (
    <div className="space-y-6">
      {/* 页面头部 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">跟进记录</h1>
          <p className="text-muted-foreground">记录客户沟通情况，追踪销售进度</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>
          <MessageSquare className="mr-2 h-4 w-4" />
          添加跟进
        </Button>
      </div>

      {/* 统计卡片 */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">总记录数</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockFollowups.length}</div>
            <p className="text-xs text-muted-foreground">累计跟进记录</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">涉及客户</CardTitle>
            <List className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{groupedFollowups.length}</div>
            <p className="text-xs text-muted-foreground">有跟进记录的客户</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">本周跟进</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockFollowups.filter((f) => {
                const date = new Date(f.createdAt);
                const now = new Date();
                const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                return date >= weekAgo;
              }).length}
            </div>
            <p className="text-xs text-muted-foreground">近7天跟进次数</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">今日跟进</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockFollowups.filter((f) => {
                const date = new Date(f.createdAt);
                const today = new Date();
                return (
                  date.toDateString() === today.toDateString()
                );
              }).length}
            </div>
            <p className="text-xs text-muted-foreground">今天新增记录</p>
          </CardContent>
        </Card>
      </div>

      {/* 跟进记录列表 */}
      <Tabs value={viewType} onValueChange={(v) => setViewType(v as FollowupViewType)}>
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="timeline">时间线视图</TabsTrigger>
            <TabsTrigger value="list">列表视图</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="timeline" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>按客户分组</CardTitle>
            </CardHeader>
            <CardContent>
              <FollowupTimeline followups={groupedFollowups} groupByCustomer />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="list" className="mt-4">
          <FollowupList followups={mockFollowups} onAddClick={() => setIsFormOpen(true)} />
        </TabsContent>
      </Tabs>

      {/* 添加跟进表单 */}
      <FollowupForm open={isFormOpen} onOpenChange={setIsFormOpen} onSubmit={handleAddFollowup} />
    </div>
  );
}
