'use client';

import { useState } from 'react';
import { Opportunity, OpportunityStage } from '@/types/opportunity';
import { mockOpportunities } from '@/lib/mock/opportunities';
import { OpportunityKanban } from '@/components/opportunity/opportunity-kanban';
import { OpportunityFunnel } from '@/components/opportunity/opportunity-funnel';
import { OpportunityForm } from '@/components/opportunity/opportunity-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { OPPORTUNITY_STAGES } from '@/types/opportunity';
import { Search, Filter, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(mockOpportunities);
  const [filteredOpportunities, setFilteredOpportunities] = useState<Opportunity[]>(mockOpportunities);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filterStage, setFilterStage] = useState<string>('all');
  const [filterOwner, setFilterOwner] = useState<string>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingOpportunity, setEditingOpportunity] = useState<Opportunity | undefined>();

  const owners = Array.from(new Set(opportunities.map(opp => opp.owner)));

  const handleFilter = () => {
    let filtered = [...opportunities];

    if (searchKeyword) {
      filtered = filtered.filter(opp =>
        opp.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        opp.customerName.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }

    if (filterStage !== 'all') {
      filtered = filtered.filter(opp => opp.stage === filterStage);
    }

    if (filterOwner !== 'all') {
      filtered = filtered.filter(opp => opp.owner === filterOwner);
    }

    setFilteredOpportunities(filtered);
  };

  const handleReset = () => {
    setSearchKeyword('');
    setFilterStage('all');
    setFilterOwner('all');
    setFilteredOpportunities(opportunities);
  };

  const handleStageChange = (opportunityId: string, newStage: OpportunityStage) => {
    setOpportunities(prev =>
      prev.map(opp =>
        opp.id === opportunityId
          ? { ...opp, stage: newStage, updatedAt: new Date().toISOString() }
          : opp
      )
    );

    setFilteredOpportunities(prev =>
      prev.map(opp =>
        opp.id === opportunityId
          ? { ...opp, stage: newStage, updatedAt: new Date().toISOString() }
          : opp
      )
    );
  };

  const handleAddOpportunity = () => {
    setEditingOpportunity(undefined);
    setIsFormOpen(true);
  };

  const handleEditOpportunity = (opportunity: Opportunity) => {
    setEditingOpportunity(opportunity);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (data: Partial<Opportunity>) => {
    if (editingOpportunity) {
      const updated = {
        ...editingOpportunity,
        ...data,
        updatedAt: new Date().toISOString()
      } as Opportunity;

      setOpportunities(prev =>
        prev.map(opp => opp.id === editingOpportunity.id ? updated : opp)
      );
      setFilteredOpportunities(prev =>
        prev.map(opp => opp.id === editingOpportunity.id ? updated : opp)
      );
    } else {
      const newOpportunity: Opportunity = {
        id: `opp-${Date.now()}`,
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      } as Opportunity;

      setOpportunities(prev => [...prev, newOpportunity]);
      setFilteredOpportunities(prev => [...prev, newOpportunity]);
    }

    setIsFormOpen(false);
    setEditingOpportunity(undefined);
  };

  const stats = {
    total: filteredOpportunities.length,
    totalAmount: filteredOpportunities.reduce((sum, opp) => sum + opp.amount, 0),
    wonCount: filteredOpportunities.filter(opp => opp.stage === 'closed_won').length,
    wonAmount: filteredOpportunities
      .filter(opp => opp.stage === 'closed_won')
      .reduce((sum, opp) => sum + opp.amount, 0)
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">销售机会</h1>
          <p className="text-muted-foreground mt-1">
            管理和跟踪销售漏斗中的所有机会
          </p>
        </div>
        <Button onClick={handleAddOpportunity}>
          <Plus className="mr-2 h-4 w-4" />
          新建机会
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">总机会数</p>
          </div>
          <p className="text-2xl font-bold mt-2">{stats.total}</p>
        </div>

        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">预计总金额</p>
          </div>
          <p className="text-2xl font-bold mt-2">{formatCurrency(stats.totalAmount)}</p>
        </div>

        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">已成交</p>
            <Badge variant="default" className="bg-green-500">成功</Badge>
          </div>
          <p className="text-2xl font-bold mt-2">{stats.wonCount}</p>
        </div>

        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">成交金额</p>
          </div>
          <p className="text-2xl font-bold mt-2 text-green-600">{formatCurrency(stats.wonAmount)}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索机会名称、客户..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="pl-8"
          />
        </div>

        <Select value={filterStage} onValueChange={setFilterStage}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="销售阶段" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部阶段</SelectItem>
            {OPPORTUNITY_STAGES.map(stage => (
              <SelectItem key={stage.value} value={stage.value}>
                {stage.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filterOwner} onValueChange={setFilterOwner}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="负责人" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部负责人</SelectItem>
            {owners.map(owner => (
              <SelectItem key={owner} value={owner}>
                {owner}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button variant="outline" onClick={handleFilter}>
          <Filter className="mr-2 h-4 w-4" />
          筛选
        </Button>

        <Button variant="ghost" onClick={handleReset}>
          重置
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <OpportunityKanban
            opportunities={filteredOpportunities}
            onStageChange={handleStageChange}
            onEdit={handleEditOpportunity}
            onAdd={handleAddOpportunity}
          />
        </div>

        <div className="lg:col-span-1">
          <OpportunityFunnel opportunities={filteredOpportunities} />
        </div>
      </div>

      <OpportunityForm
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingOpportunity(undefined);
        }}
        onSubmit={handleFormSubmit}
        opportunity={editingOpportunity}
        mode={editingOpportunity ? 'edit' : 'create'}
      />
    </div>
  );
}
