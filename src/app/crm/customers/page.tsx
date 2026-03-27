"use client"

import { useState, useMemo } from 'react'
import { Plus, Search, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CustomerTable } from '@/components/customer/customer-table'
import { CustomerCard } from '@/components/customer/customer-card'
import { CustomerForm } from '@/components/customer/customer-form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { mockCustomers } from '@/lib/mock/customers'
import { CrmCustomer, CustomerFilter, CustomerFormData, CRM_CUSTOMER_STATUS_OPTIONS, CRM_CUSTOMER_LEVEL_OPTIONS, CRM_INDUSTRY_OPTIONS } from '@/types/customer'

export default function CrmCustomersPage() {
  const [customers, setCustomers] = useState<CrmCustomer[]>(mockCustomers)
  const [filter, setFilter] = useState<CustomerFilter>({})
  const [searchKeyword, setSearchKeyword] = useState('')
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState<CrmCustomer | null>(null)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [view, setView] = useState<'table' | 'card'>('table')

  // Filter customers
  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      // Keyword search
      if (searchKeyword) {
        const keyword = searchKeyword.toLowerCase()
        const matchKeyword =
          customer.companyName.toLowerCase().includes(keyword) ||
          customer.contact.toLowerCase().includes(keyword) ||
          customer.phone.includes(keyword)
        if (!matchKeyword) return false
      }

      // Status filter
      if (filter.status && customer.status !== filter.status) return false

      // Level filter
      if (filter.level && customer.level !== filter.level) return false

      // Industry filter
      if (filter.industry && customer.industry !== filter.industry) return false

      return true
    })
  }, [customers, filter, searchKeyword])

  const handleAddCustomer = (data: CustomerFormData) => {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      const newCustomer: CrmCustomer = {
        id: `CUST${String(customers.length + 1).padStart(4, '0')}`,
        ...data,
        status: data.status || 'lead',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      setCustomers([newCustomer, ...customers])
      setIsSubmitting(false)
      setShowAddDialog(false)
    }, 500)
  }

  const handleEditCustomer = (data: CustomerFormData) => {
    if (!editingCustomer) return

    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setCustomers(
        customers.map((c) =>
          c.id === editingCustomer.id
            ? { ...c, ...data, updatedAt: new Date().toISOString() }
            : c
        )
      )
      setIsSubmitting(false)
      setShowEditDialog(false)
      setEditingCustomer(null)
    }, 500)
  }

  const handleDeleteCustomer = (customerId: string) => {
    if (confirm('确定要删除该客户吗？')) {
      setCustomers(customers.filter((c) => c.id !== customerId))
    }
  }

  const handleResetFilter = () => {
    setFilter({})
    setSearchKeyword('')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">客户管理</h1>
          <p className="text-muted-foreground">
            管理您的客户信息，跟进客户状态
          </p>
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          新增客户
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 rounded-lg border p-4 bg-card">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Filter className="h-4 w-4" />
          筛选条件
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索客户名称、联系人"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="flex-1"
            />
          </div>

          <Select
            value={filter.status || ''}
            onValueChange={(value) =>
              setFilter({ ...filter, status: value as any || undefined })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="客户状态" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">全部状态</SelectItem>
              {CRM_CUSTOMER_STATUS_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filter.level || ''}
            onValueChange={(value) =>
              setFilter({ ...filter, level: value as any || undefined })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="客户等级" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">全部等级</SelectItem>
              {CRM_CUSTOMER_LEVEL_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filter.industry || ''}
            onValueChange={(value) =>
              setFilter({ ...filter, industry: value as any || undefined })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="行业" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">全部行业</SelectItem>
              {CRM_INDUSTRY_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" onClick={handleResetFilter}>
            重置
          </Button>
        </div>

        {/* View toggle */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            共 {filteredCustomers.length} 条记录
          </p>
          <div className="flex gap-2">
            <Button
              variant={view === 'table' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setView('table')}
            >
              列表视图
            </Button>
            <Button
              variant={view === 'card' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setView('card')}
            >
              卡片视图
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      {view === 'table' ? (
        <CustomerTable
          customers={filteredCustomers}
          onEdit={(customer) => {
            setEditingCustomer(customer)
            setShowEditDialog(true)
          }}
          onDelete={handleDeleteCustomer}
          onAddFollowup={(customer) => {
            // TODO: Implement add followup
            console.log('Add followup for customer:', customer.id)
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCustomers.map((customer) => (
            <CustomerCard
              key={customer.id}
              customer={customer}
              onEdit={(customer) => {
                setEditingCustomer(customer)
                setShowEditDialog(true)
              }}
              onDelete={handleDeleteCustomer}
            />
          ))}
        </div>
      )}

      {/* Add Customer Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>新增客户</DialogTitle>
            <DialogDescription>
              填写客户的基本信息和联系方式
            </DialogDescription>
          </DialogHeader>
          <CustomerForm
            onSubmit={handleAddCustomer}
            onCancel={() => setShowAddDialog(false)}
            isSubmitting={isSubmitting}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Customer Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>编辑客户</DialogTitle>
            <DialogDescription>
              修改客户的基本信息和联系方式
            </DialogDescription>
          </DialogHeader>
          {editingCustomer && (
            <CustomerForm
              customer={editingCustomer}
              onSubmit={handleEditCustomer}
              onCancel={() => {
                setShowEditDialog(false)
                setEditingCustomer(null)
              }}
              isSubmitting={isSubmitting}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
