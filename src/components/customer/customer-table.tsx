"use client"

import { useState } from 'react'
import Link from 'next/link'
import { MoreHorizontal, Pencil, Trash2, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CrmCustomer, CustomerFilter, CRM_CUSTOMER_STATUS_OPTIONS, CRM_CUSTOMER_LEVEL_OPTIONS, CRM_INDUSTRY_OPTIONS } from '@/types/customer'

interface CustomerTableProps {
  customers: CrmCustomer[]
  onEdit?: (customer: CrmCustomer) => void
  onDelete?: (customerId: string) => void
  onAddFollowup?: (customer: CrmCustomer) => void
}

export function CustomerTable({ customers, onEdit, onDelete, onAddFollowup }: CustomerTableProps) {
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

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '-'
    const date = new Date(dateStr)
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return '今天'
    if (diffDays === 1) return '昨天'
    if (diffDays < 7) return `${diffDays}天前`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}周前`
    return date.toLocaleDateString('zh-CN')
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">公司名称</TableHead>
            <TableHead className="w-[100px]">联系人</TableHead>
            <TableHead className="w-[120px]">电话</TableHead>
            <TableHead className="w-[100px]">行业</TableHead>
            <TableHead className="w-[80px]">等级</TableHead>
            <TableHead className="w-[100px]">状态</TableHead>
            <TableHead className="w-[100px]">负责人</TableHead>
            <TableHead className="w-[120px]">最后跟进</TableHead>
            <TableHead className="w-[80px] text-right">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="h-24 text-center">
                暂无客户数据
              </TableCell>
            </TableRow>
          ) : (
            customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">
                  <Link
                    href={`/customers/${customer.id}`}
                    className="hover:text-primary hover:underline"
                  >
                    {customer.companyName}
                  </Link>
                </TableCell>
                <TableCell>{customer.contact}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Phone className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm">{customer.phone}</span>
                  </div>
                </TableCell>
                <TableCell>{getIndustryLabel(customer.industry)}</TableCell>
                <TableCell>{getLevelBadge(customer.level)}</TableCell>
                <TableCell>{getStatusBadge(customer.status)}</TableCell>
                <TableCell>{customer.owner}</TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDate(customer.lastFollowup)}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon-sm">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">打开菜单</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/customers/${customer.id}`}>
                          查看详情
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit?.(customer)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        编辑
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onAddFollowup?.(customer)}>
                        添加跟进
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDelete?.(customer.id)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        删除
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
