"use client";

/**
 * Dashboard - CRM Overview
 * Main dashboard showing statistics, charts, and recent activities
 */

import {
  ArrowDown,
  ArrowUp,
  CheckSquare,
  DollarSign,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  getStatusBadgeClassName,
  getStatusVariant,
  OPPORTUNITY_STAGE,
  OPPORTUNITY_STAGE_OPTIONS,
} from "@/lib/dict";
import {
  dashboardStats,
  industryDistributionData,
  monthlySalesData,
  pendingTasks,
  pipelineDistributionData,
  recentFollowups,
  topOpportunities,
} from "@/lib/mock/dashboard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// =============================================================================
// Chart Configurations
// =============================================================================

const salesChartConfig: ChartConfig = {
  amount: {
    label: "销售额",
    color: "hsl(var(--chart-1))",
  },
  count: {
    label: "订单数",
    color: "hsl(var(--chart-2))",
  },
};

const pipelineChartConfig: ChartConfig = {
  count: {
    label: "数量",
  },
};

const industryChartConfig: ChartConfig = {
  value: {
    label: "占比",
  },
};

// =============================================================================
// Helper Functions
// =============================================================================

function formatCurrency(value: number): string {
  if (value >= 10000) {
    return `¥${(value / 10000).toFixed(1)}万`;
  }
  return `¥${value.toLocaleString()}`;
}

function getStageColor(stage: string): string {
  const colorMap: Record<string, string> = {
    "线索": "hsl(var(--chart-1))",
    "资格确认": "hsl(var(--chart-2))",
    "方案报价": "hsl(var(--chart-3))",
    "谈判": "hsl(var(--chart-4))",
    "成交": "hsl(var(--chart-5))",
  };
  return colorMap[stage] || "hsl(var(--muted))";
}

function getPriorityVariant(priority: string): "default" | "secondary" | "outline" | "destructive" {
  const variantMap: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
    urgent: "destructive",
    high: "default",
    medium: "secondary",
    low: "outline",
  };
  return variantMap[priority] || "outline";
}

// =============================================================================
// Main Component
// =============================================================================

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-2xl font-semibold tracking-tight">概览</h1>
          <p className="text-sm text-muted-foreground">CRM 业务数据总览</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6 space-y-6">
        {/* Statistics Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total Customers */}
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">总客户数</p>
                <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                  <Users className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-2 text-2xl font-bold">{dashboardStats.totalCustomers}</p>
              <div className="mt-1 flex items-center gap-1 text-xs">
                <ArrowUp className="h-3 w-3 text-emerald-600" />
                <span className="text-emerald-600 font-medium">
                  {dashboardStats.customersGrowth}%
                </span>
                <span className="text-muted-foreground">较上月</span>
              </div>
            </CardContent>
          </Card>

          {/* Total Opportunities */}
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">销售机会</p>
                <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
                  <TrendingUp className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-2 text-2xl font-bold">{dashboardStats.totalOpportunities}</p>
              <div className="mt-1 flex items-center gap-1 text-xs">
                <ArrowUp className="h-3 w-3 text-emerald-600" />
                <span className="text-emerald-600 font-medium">
                  {dashboardStats.opportunitiesGrowth}%
                </span>
                <span className="text-muted-foreground">较上月</span>
              </div>
            </CardContent>
          </Card>

          {/* Pipeline Value */}
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">销售漏斗金额</p>
                <div className="rounded-lg bg-purple-50 p-2 text-purple-600">
                  <DollarSign className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-2 text-2xl font-bold">{formatCurrency(dashboardStats.pipelineValue)}</p>
              <div className="mt-1 flex items-center gap-1 text-xs">
                <span className="text-muted-foreground">预计成交总额</span>
              </div>
            </CardContent>
          </Card>

          {/* Pending Tasks */}
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">待办任务</p>
                <div className="rounded-lg bg-orange-50 p-2 text-orange-600">
                  <CheckSquare className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-2 text-2xl font-bold">{dashboardStats.pendingTasks}</p>
              <div className="mt-1 flex items-center gap-1 text-xs">
                <ArrowDown className="h-3 w-3 text-red-500" />
                <span className="text-red-500 font-medium">
                  {Math.abs(dashboardStats.tasksChange)}%
                </span>
                <span className="text-muted-foreground">较上周</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid gap-4 lg:grid-cols-3">
          {/* Monthly Sales Trend */}
          <Card className="lg:col-span-2 hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">月度销售趋势</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={salesChartConfig} className="h-[280px] w-full">
                <LineChart data={monthlySalesData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="month"
                    className="text-xs"
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                  />
                  <YAxis
                    className="text-xs"
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                    tickFormatter={(value) => `¥${(value / 10000).toFixed(0)}万`}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "hsl(var(--chart-1))" }}
                    activeDot={{ r: 6 }}
                  />
                  <Bar
                    dataKey="count"
                    fill="hsl(var(--chart-2))"
                    radius={[4, 4, 0, 0]}
                    opacity={0.3}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Pipeline Distribution */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">销售阶段分布</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={pipelineChartConfig} className="h-[220px] w-full">
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Pie
                    data={pipelineDistributionData}
                    dataKey="count"
                    nameKey="stage"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    strokeWidth={2}
                    stroke="hsl(var(--background))"
                  >
                    {pipelineDistributionData.map((entry) => (
                      <Cell key={entry.stage} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {pipelineDistributionData.map((item) => (
                  <div key={item.stage} className="flex items-center gap-2 text-xs">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: item.fill }}
                    />
                    <span className="text-muted-foreground">{item.stage}</span>
                    <span className="ml-auto font-medium">{item.count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Industry Distribution */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">客户行业分布</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 lg:grid-cols-2">
              <ChartContainer config={industryChartConfig} className="h-[200px] w-full">
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Pie
                    data={industryDistributionData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    strokeWidth={2}
                    stroke="hsl(var(--background))"
                  >
                    {industryDistributionData.map((entry) => (
                      <Cell key={entry.name} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
              <div className="grid grid-cols-2 gap-3">
                {industryDistributionData.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center gap-2 text-sm p-2 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <span
                      className="h-3 w-3 rounded-full shrink-0"
                      style={{ backgroundColor: item.fill }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.count} 家客户</p>
                    </div>
                    <span className="text-sm font-semibold">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lists Row */}
        <div className="grid gap-4 lg:grid-cols-3">
          {/* Pending Tasks */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-base font-medium">待办任务</CardTitle>
              <Link
                href="/tasks"
                className="text-xs text-blue-600 hover:text-blue-700 hover:underline"
              >
                查看全部
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div className="mt-0.5">
                      <Badge
                        variant={getPriorityVariant(task.priority)}
                        className="text-xs"
                      >
                        {task.priority === "urgent" && "紧急"}
                        {task.priority === "high" && "高"}
                        {task.priority === "medium" && "中"}
                        {task.priority === "low" && "低"}
                      </Badge>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{task.title}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {task.relatedCustomer}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        截止：{task.dueDate}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Followups */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-base font-medium">最近跟进</CardTitle>
              <Link
                href="/followups"
                className="text-xs text-blue-600 hover:text-blue-700 hover:underline"
              >
                查看全部
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentFollowups.map((followup) => (
                  <div
                    key={followup.id}
                    className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div className="mt-0.5">
                      <Badge variant="outline" className="text-xs">
                        {followup.type === "visit" && "拜访"}
                        {followup.type === "call" && "电话"}
                        {followup.type === "meeting" && "会议"}
                        {followup.type === "email" && "邮件"}
                        {followup.type === "other" && "其他"}
                      </Badge>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{followup.customer}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {followup.content}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {followup.createdAt}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Opportunities */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-base font-medium">高价值机会</CardTitle>
              <Link
                href="/opportunities"
                className="text-xs text-blue-600 hover:text-blue-700 hover:underline"
              >
                查看全部
              </Link>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>机会</TableHead>
                    <TableHead className="text-right">金额</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topOpportunities.map((opp) => (
                    <TableRow key={opp.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell className="p-2">
                        <p className="text-sm font-medium truncate max-w-[140px]">
                          {opp.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {opp.customer}
                        </p>
                      </TableCell>
                      <TableCell className="p-2 text-right">
                        <p className="text-sm font-semibold">
                          {formatCurrency(opp.amount)}
                        </p>
                        <Badge
                          variant={getStatusVariant(
                            OPPORTUNITY_STAGE_OPTIONS.find(
                              (o) => o.value === opp.stage
                            )?.color || "gray"
                          )}
                          className={`text-xs ${getStatusBadgeClassName(
                            OPPORTUNITY_STAGE_OPTIONS.find(
                              (o) => o.value === opp.stage
                            )?.color || "gray"
                          )}`}
                        >
                          {OPPORTUNITY_STAGE[opp.stage as keyof typeof OPPORTUNITY_STAGE]}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
