"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Phone, Mail, MapPin, MessageSquare, TrendingUp, CheckSquare, Calendar, Building2, User, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { CrmCustomer, CRM_CUSTOMER_STATUS_OPTIONS, CRM_CUSTOMER_LEVEL_OPTIONS, CRM_INDUSTRY_OPTIONS } from '@/types/customer'

interface CustomerDetailProps {
  customer: CrmCustomer
  onEdit?: () => void
  onDelete?: () => void
  onAddFollowup?: () => void
  onCreateOpportunity?: () => void
  onCreateTask?: () => void
}

interface Followup {
  id: string
  type: string
  content: string
  attendees: string[]
  createdAt: string
  createdBy: string
}

interface Opportunity {
  id: string
  name: string
  stage: string
  amount: number
  expectedCloseDate: string
  owner: string
}

interface Task {
  id: string
  title: string
  priority: string
  status: string
  dueDate: string
  assignee: string
}

export function CustomerDetail({
  customer,
  onEdit,
  onDelete,
  onAddFollowup,
  onCreateOpportunity,
  onCreateTask,
}: CustomerDetailProps) {
  const [followups] = useState<Followup[]>([
    {
      id: '1',
      type: 'visit',
      content: '拜访客户，了解需求，演示产品功能',
      attendees: ['张三', '李四'],
      createdAt: '2026-03-20T10:00:00',
      createdBy: '张三',
    },
    {
      id: '2',
      type: 'call',
      content: '电话跟进，客户对产品表示满意，需要进一步沟通',
      attendees: ['张三'],
      createdAt: '2026-03-25T14:30:00',
      createdBy: '张三',
    },
  ])

  const [opportunities] = useState<Opportunity[]>([
    {
      id: '1',
      name: 'ERP系统采购项目',
      stage: 'proposal',
      amount: 500000,
      expectedCloseDate: '2026-06-30',
      owner: '张三',
    },
  ])

  const [tasks] = useState<Task[]>([
    {
      id: '1',
      title: '准备产品演示方案',
      priority: 'high',
      status: 'in_progress',
      dueDate: '2026-03-30',
      assignee: '李四',
    },
    {
      id: '2',
      title: '发送产品报价单',
      priority: 'medium',
      status: 'pending',
      dueDate: '2026-04-01',
      assignee: '张三',
    },
  ])

  const getStatusBadge = (status: string) => {
    const option = CRM_CUSTOMER_STATUS_OPTIONS.find(opt => opt.value === status)
    if (!option) return <Badge variant="outline">{status}</Badge>

    const colorMap: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      gray: "secondary",
      blue: "default",
      purple: "secondary",
      green: "default",
      red: "destructive",
    }

    return (
      <Badge variant={colorMap[option.color] || "outline"} className="bg-opacity-10">
        {option.label}
      </Badge>
    )
  }

  const getLevelBadge = (level: string) => {
    const option = CRM_CUSTOMER_LEVEL_OPTIONS.find(opt => opt.value === level)
    if (!option) return <Badge variant="outline">{level}</Badge>

    const colorMap: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      a: "default",
      b: "secondary",
      c: "outline",
    }

    return <Badge variant={colorMap[level]}>{option.label}</Badge>
  }

  const getIndustryLabel = (industry: string) => {
    const option = CRM_INDUSTRY_OPTIONS.find(opt => opt.value === industry)
    return option?.label || industry
  }

  const getFollowupTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      visit: '拜访',
      call: '电话',
      meeting: '会议',
      email: '邮件',
      other: '其他',
    }
    return types[type] || type
  }

  const getStageBadge = (stage: string) => {
    const stages: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
      prospecting: { label: '线索', variant: 'secondary' },
      qualification: { label: '资格确认', variant: 'outline' },
      proposal: { label: '方案报价', variant: 'default' },
      negotiation: { label: '谈判', variant: 'default' },
      closed_won: { label: '成交', variant: 'default' },
      closed_lost: { label: '失败', variant: 'destructive' },
    }
    const stageInfo = stages[stage] || { label: stage, variant: 'outline' as const }
    return <Badge variant={stageInfo.variant}>{stageInfo.label}</Badge>
  }

  const getPriorityBadge = (priority: string) => {
    const priorities: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
      low: { label: '低', variant: 'secondary' },
      medium: { label: '中', variant: 'outline' },
      high: { label: '高', variant: 'default' },
      urgent: { label: '紧急', variant: 'destructive' },
    }
    const priorityInfo = priorities[priority] || { label: priority, variant: 'outline' as const }
    return <Badge variant={priorityInfo.variant}>{priorityInfo.label}</Badge>
  }

  const getTaskStatusBadge = (status: string) => {
    const statuses: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
      pending: { label: '待处理', variant: 'secondary' },
      in_progress: { label: '进行中', variant: 'outline' },
      completed: { label: '已完成', variant: 'default' },
      cancelled: { label: '已取消', variant: 'destructive' },
    }
    const statusInfo = statuses[status] || { label: status, variant: 'outline' as const }
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  return (
    <div className="space-y-6">
      {/* Actions */}
      <div className="flex justify-end gap-3">
        {onEdit && (
          <Button variant="outline" onClick={onEdit}>
            编辑
          </Button>
        )}
        <Button variant="outline" onClick={onCreateOpportunity}>
          转化为商机
        </Button>
        {onDelete && (
          <Button variant="destructive" onClick={onDelete}>
            删除
          </Button>
        )}
      </div>

      {/* Basic Information Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            基本信息
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">公司名称</p>
              <p className="font-medium text-lg">{customer.companyName}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">行业</p>
              <p className="font-medium">{getIndustryLabel(customer.industry)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">规模</p>
              <p className="font-medium">{customer.scale || '-'}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">客户等级</p>
              <div>{getLevelBadge(customer.level)}</div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">客户状态</p>
              <div>{getStatusBadge(customer.status)}</div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">负责人</p>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <p className="font-medium">{customer.owner}</p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">创建时间</p>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <p className="font-medium">{formatDate(customer.createdAt)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            联系信息
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">联系人</p>
              <p className="font-medium">{customer.contact}</p>
              {customer.position && (
                <p className="text-sm text-muted-foreground">{customer.position}</p>
              )}
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">电话</p>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <p className="font-medium">{customer.phone}</p>
              </div>
            </div>
            {customer.email && (
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">邮箱</p>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <p className="font-medium">{customer.email}</p>
                </div>
              </div>
            )}
            {customer.wechat && (
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">微信号</p>
                <p className="font-medium">{customer.wechat}</p>
              </div>
            )}
            {customer.address && (
              <div className="space-y-1 md:col-span-2">
                <p className="text-sm text-muted-foreground">地址</p>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <p className="font-medium">{customer.address}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="followups" className="space-y-4">
        <TabsList>
          <TabsTrigger value="followups" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            跟进记录
            <Badge variant="secondary" className="ml-1">{followups.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="opportunities" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            销售机会
            <Badge variant="secondary" className="ml-1">{opportunities.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="tasks" className="flex items-center gap-2">
            <CheckSquare className="h-4 w-4" />
            相关任务
            <Badge variant="secondary" className="ml-1">{tasks.length}</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="followups" className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={onAddFollowup}>添加跟进</Button>
          </div>
          <Card>
            <CardContent className="pt-6">
              {followups.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  暂无跟进记录
                </div>
              ) : (
                <div className="space-y-6">
                  {followups.map((followup, index) => (
                    <div key={followup.id} className="relative">
                      {index < followups.length - 1 && (
                        <div className="absolute left-4 top-8 bottom-0 w-px bg-border" />
                      )}
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                            {getFollowupTypeLabel(followup.type)[0]}
                          </div>
                        </div>
                        <div className="flex-1 space-y-2 pb-2">
                          <div className="flex items-center gap-3 flex-wrap">
                            <Badge variant="outline">{getFollowupTypeLabel(followup.type)}</Badge>
                            <span className="text-sm text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {formatDate(followup.createdAt)}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {followup.createdBy}
                            </span>
                          </div>
                          <p className="text-sm">{followup.content}</p>
                          {followup.attendees.length > 0 && (
                            <p className="text-sm text-muted-foreground">
                              参与人: {followup.attendees.join(', ')}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="opportunities" className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={onCreateOpportunity}>新建机会</Button>
          </div>
          <Card>
            <CardContent className="pt-6">
              {opportunities.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  暂无销售机会
                </div>
              ) : (
                <div className="space-y-4">
                  {opportunities.map((opp) => (
                    <div key={opp.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <Link
                            href={`/opportunities/${opp.id}`}
                            className="font-medium hover:text-primary hover:underline"
                          >
                            {opp.name}
                          </Link>
                          <div className="flex items-center gap-3 text-sm">
                            {getStageBadge(opp.stage)}
                            <span className="text-muted-foreground">
                              预计: ¥{opp.amount.toLocaleString()}
                            </span>
                            <span className="text-muted-foreground">
                              负责人: {opp.owner}
                            </span>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          预计成交: {formatDate(opp.expectedCloseDate)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={onCreateTask}>新建任务</Button>
          </div>
          <Card>
            <CardContent className="pt-6">
              {tasks.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  暂无相关任务
                </div>
              ) : (
                <div className="space-y-4">
                  {tasks.map((task) => (
                    <div key={task.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <p className="font-medium">{task.title}</p>
                          <div className="flex items-center gap-3 text-sm">
                            {getPriorityBadge(task.priority)}
                            {getTaskStatusBadge(task.status)}
                            <span className="text-muted-foreground">
                              负责人: {task.assignee}
                            </span>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          截止: {formatDate(task.dueDate)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
