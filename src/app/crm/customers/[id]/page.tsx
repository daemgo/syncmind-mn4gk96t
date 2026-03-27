"use client"

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { CustomerDetail } from '@/components/customer/customer-detail'
import { mockCustomers } from '@/lib/mock/customers'
import { CrmCustomer } from '@/types/customer'

export default function CustomerDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [customer, setCustomer] = useState<CrmCustomer | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const foundCustomer = mockCustomers.find(c => c.id === params.id)
    setCustomer(foundCustomer || null)
    setLoading(false)
  }, [params.id])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">加载中...</p>
      </div>
    )
  }

  if (!customer) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <p className="text-muted-foreground">客户不存在</p>
        <Button onClick={() => router.back()}>返回</Button>
      </div>
    )
  }

  const handleEdit = () => {
    // TODO: Implement edit functionality
    console.log('Edit customer:', customer.id)
  }

  const handleDelete = () => {
    if (confirm('确定要删除该客户吗？')) {
      // TODO: Implement delete functionality
      console.log('Delete customer:', customer.id)
      router.push('/crm/customers')
    }
  }

  const handleAddFollowup = () => {
    // TODO: Implement add followup functionality
    console.log('Add followup for customer:', customer.id)
  }

  const handleCreateOpportunity = () => {
    // TODO: Implement create opportunity functionality
    console.log('Create opportunity for customer:', customer.id)
  }

  const handleCreateTask = () => {
    // TODO: Implement create task functionality
    console.log('Create task for customer:', customer.id)
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Button
          variant="ghost"
          size="sm"
          className="h-auto p-0"
          onClick={() => router.push('/crm/customers')}
        >
          客户管理
        </Button>
        <span>/</span>
        <span className="text-foreground font-medium">{customer.companyName}</span>
      </div>

      <CustomerDetail
        customer={customer}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAddFollowup={handleAddFollowup}
        onCreateOpportunity={handleCreateOpportunity}
        onCreateTask={handleCreateTask}
      />
    </div>
  )
}
