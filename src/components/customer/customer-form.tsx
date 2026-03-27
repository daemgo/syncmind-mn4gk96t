"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { CrmCustomer, CustomerFormData, CRM_INDUSTRY_OPTIONS, CRM_COMPANY_SCALE_OPTIONS, CRM_CUSTOMER_LEVEL_OPTIONS, CRM_CUSTOMER_SOURCE_OPTIONS, CRM_CUSTOMER_STATUS_OPTIONS } from '@/types/customer'

interface CustomerFormProps {
  customer?: CrmCustomer
  onSubmit: (data: CustomerFormData) => void
  onCancel?: () => void
  isSubmitting?: boolean
}

export function CustomerForm({ customer, onSubmit, onCancel, isSubmitting }: CustomerFormProps) {
  const [formData, setFormData] = useState<CustomerFormData>(
    customer || {
      companyName: '',
      industry: 'tech',
      scale: '1-50',
      level: 'c',
      source: 'website',
      contact: '',
      position: '',
      phone: '',
      email: '',
      wechat: '',
      address: '',
      owner: '',
      status: 'lead',
    }
  )

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (field: keyof CustomerFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.companyName.trim()) {
      newErrors.companyName = '请输入公司名称'
    }
    if (!formData.contact.trim()) {
      newErrors.contact = '请输入联系人'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = '请输入电话'
    }
    if (!formData.owner.trim()) {
      newErrors.owner = '请选择负责人'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      onSubmit(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>基本信息</CardTitle>
          <CardDescription>填写公司的基本资料</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">
                公司名称 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)}
                placeholder="请输入公司名称"
                className={errors.companyName ? 'border-destructive' : ''}
              />
              {errors.companyName && (
                <p className="text-sm text-destructive">{errors.companyName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry">
                行业 <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.industry}
                onValueChange={(value) => handleChange('industry', value)}
              >
                <SelectTrigger className={errors.industry ? 'border-destructive' : ''}>
                  <SelectValue placeholder="请选择行业" />
                </SelectTrigger>
                <SelectContent>
                  {CRM_INDUSTRY_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.industry && (
                <p className="text-sm text-destructive">{errors.industry}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="scale">公司规模</Label>
              <Select
                value={formData.scale}
                onValueChange={(value) => handleChange('scale', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="请选择规模" />
                </SelectTrigger>
                <SelectContent>
                  {CRM_COMPANY_SCALE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="level">
                客户等级 <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.level}
                onValueChange={(value) => handleChange('level', value)}
              >
                <SelectTrigger className={errors.level ? 'border-destructive' : ''}>
                  <SelectValue placeholder="请选择等级" />
                </SelectTrigger>
                <SelectContent>
                  {CRM_CUSTOMER_LEVEL_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.level && (
                <p className="text-sm text-destructive">{errors.level}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="source">客户来源</Label>
              <Select
                value={formData.source}
                onValueChange={(value) => handleChange('source', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="请选择来源" />
                </SelectTrigger>
                <SelectContent>
                  {CRM_CUSTOMER_SOURCE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {customer && (
              <div className="space-y-2">
                <Label htmlFor="status">客户状态</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleChange('status', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="请选择状态" />
                  </SelectTrigger>
                  <SelectContent>
                    {CRM_CUSTOMER_STATUS_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>联系信息</CardTitle>
          <CardDescription>填写联系人的详细信息</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contact">
                联系人 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="contact"
                value={formData.contact}
                onChange={(e) => handleChange('contact', e.target.value)}
                placeholder="请输入联系人姓名"
                className={errors.contact ? 'border-destructive' : ''}
              />
              {errors.contact && (
                <p className="text-sm text-destructive">{errors.contact}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">职位</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => handleChange('position', e.target.value)}
                placeholder="请输入职位"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">
                电话 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="请输入电话号码"
                className={errors.phone ? 'border-destructive' : ''}
              />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">邮箱</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="请输入邮箱"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="wechat">微信号</Label>
              <Input
                id="wechat"
                value={formData.wechat}
                onChange={(e) => handleChange('wechat', e.target.value)}
                placeholder="请输入微信号"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">地址</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                placeholder="请输入地址"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assignment */}
      <Card>
        <CardHeader>
          <CardTitle>分配信息</CardTitle>
          <CardDescription>设置负责人和状态</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="owner">
                负责人 <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.owner}
                onValueChange={(value) => handleChange('owner', value)}
              >
                <SelectTrigger className={errors.owner ? 'border-destructive' : ''}>
                  <SelectValue placeholder="请选择负责人" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="张三">张三</SelectItem>
                  <SelectItem value="李四">李四</SelectItem>
                  <SelectItem value="王五">王五</SelectItem>
                  <SelectItem value="赵六">赵六</SelectItem>
                  <SelectItem value="孙七">孙七</SelectItem>
                  <SelectItem value="周八">周八</SelectItem>
                </SelectContent>
              </Select>
              {errors.owner && (
                <p className="text-sm text-destructive">{errors.owner}</p>
              )}
            </div>

            {!customer && (
              <div className="space-y-2">
                <Label htmlFor="status">客户状态</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleChange('status', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="请选择状态" />
                  </SelectTrigger>
                  <SelectContent>
                    {CRM_CUSTOMER_STATUS_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            取消
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '保存中...' : '保存'}
        </Button>
      </div>
    </form>
  )
}
