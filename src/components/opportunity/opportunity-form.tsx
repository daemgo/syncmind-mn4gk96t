'use client';

import { useState, useEffect } from 'react';
import { Opportunity, OpportunityStage, OPPORTUNITY_STAGES, DEFAULT_PROBABILITY } from '@/types/opportunity';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockCustomers } from '@/lib/mock/customers';

interface OpportunityFormProps {
  open?: boolean;
  onClose?: () => void;
  onSubmit?: (opportunity: Partial<Opportunity>) => void;
  opportunity?: Opportunity;
  mode?: 'create' | 'edit';
}

export function OpportunityForm({
  open = true,
  onClose,
  onSubmit,
  opportunity,
  mode = 'create'
}: OpportunityFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    customerId: '',
    stage: 'prospecting' as OpportunityStage,
    amount: '',
    probability: 10,
    expectedCloseDate: '',
    owner: '',
    description: ''
  });

  useEffect(() => {
    if (opportunity && mode === 'edit') {
      setFormData({
        name: opportunity.name,
        customerId: opportunity.customerId,
        stage: opportunity.stage,
        amount: opportunity.amount.toString(),
        probability: opportunity.probability,
        expectedCloseDate: opportunity.expectedCloseDate,
        owner: opportunity.owner,
        description: opportunity.description || ''
      });
    }
  }, [opportunity, mode]);

  const handleStageChange = (value: OpportunityStage) => {
    setFormData(prev => ({
      ...prev,
      stage: value,
      probability: DEFAULT_PROBABILITY[value]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const submitData: Partial<Opportunity> = {
      name: formData.name,
      customerId: formData.customerId,
      customerName: mockCustomers.find(c => c.id === formData.customerId)?.companyName || '',
      stage: formData.stage,
      amount: parseFloat(formData.amount) || 0,
      probability: formData.probability,
      expectedCloseDate: formData.expectedCloseDate,
      owner: formData.owner,
      description: formData.description
    };

    onSubmit?.(submitData);
    onClose?.();
  };

  const minDate = new Date().toISOString().split('T')[0];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? '新建销售机会' : '编辑销售机会'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">机会名称 *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="例如：ERP系统采购项目"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="customer">客户 *</Label>
            <Select
              value={formData.customerId}
              onValueChange={(value) => setFormData(prev => ({ ...prev, customerId: value }))}
              required
            >
              <SelectTrigger id="customer">
                <SelectValue placeholder="选择客户" />
              </SelectTrigger>
              <SelectContent>
                {mockCustomers.map(customer => (
                  <SelectItem key={customer.id} value={customer.id}>
                    {customer.companyName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="stage">销售阶段 *</Label>
              <Select
                value={formData.stage}
                onValueChange={handleStageChange}
              >
                <SelectTrigger id="stage">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {OPPORTUNITY_STAGES.map(stage => (
                    <SelectItem key={stage.value} value={stage.value}>
                      {stage.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">预计金额 (¥) *</Label>
              <Input
                id="amount"
                type="number"
                min="0"
                step="1000"
                value={formData.amount}
                onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                placeholder="100000"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="probability">成交概率 (%)</Label>
              <Input
                id="probability"
                type="number"
                min="0"
                max="100"
                value={formData.probability}
                onChange={(e) => setFormData(prev => ({ ...prev, probability: parseInt(e.target.value) || 0 }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expectedCloseDate">预计成交日期 *</Label>
              <Input
                id="expectedCloseDate"
                type="date"
                min={minDate}
                value={formData.expectedCloseDate}
                onChange={(e) => setFormData(prev => ({ ...prev, expectedCloseDate: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="owner">负责人 *</Label>
            <Input
              id="owner"
              value={formData.owner}
              onChange={(e) => setFormData(prev => ({ ...prev, owner: e.target.value }))}
              placeholder="例如：张伟"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">描述</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="机会描述、需求背景、关键决策人等信息"
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              取消
            </Button>
            <Button type="submit">
              {mode === 'create' ? '创建' : '保存'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
