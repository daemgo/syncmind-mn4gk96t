"use client"

import Link from 'next/link'
import { Phone, Mail, MapPin, MoreHorizontal } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CrmCustomer, CRM_CUSTOMER_STATUS_OPTIONS, CRM_CUSTOMER_LEVEL_OPTIONS, CRM_INDUSTRY_OPTIONS } from '@/types/customer'

interface CustomerCardProps {
  customer: CrmCustomer
  onEdit?: (customer: CrmCustomer) => void
  onDelete?: (customerId: string) => void
}

export function CustomerCard({ customer, onEdit, onDelete }: CustomerCardProps) {
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

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">
              <Link
                href={`/customers/${customer.id}`}
                className="hover:text-primary hover:underline"
              >
                {customer.companyName}
              </Link>
            </CardTitle>
            <div className="flex items-center gap-2 mt-2">
              {getStatusBadge(customer.status)}
              {getLevelBadge(customer.level)}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/customers/${customer.id}`}>查看详情</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit?.(customer)}>
                编辑
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete?.(customer.id)}
                className="text-destructive focus:text-destructive"
              >
                删除
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground w-16">联系人:</span>
            <span className="font-medium">{customer.contact}</span>
            {customer.position && (
              <span className="text-muted-foreground">({customer.position})</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{customer.phone}</span>
          </div>
          {customer.email && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{customer.email}</span>
            </div>
          )}
          {customer.address && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{customer.address}</span>
            </div>
          )}
        </div>
        <div className="pt-3 border-t flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">行业:</span>
            <span>{getIndustryLabel(customer.industry)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">负责人:</span>
            <span className="font-medium">{customer.owner}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
