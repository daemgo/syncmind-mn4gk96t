'use client';

import { Opportunity, OPPORTUNITY_STAGES } from '@/types/opportunity';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface OpportunityFunnelProps {
  opportunities: Opportunity[];
}

interface StageStats {
  stage: string;
  label: string;
  color: string;
  count: number;
  amount: number;
  probability: number;
  weightedAmount: number;
}

export function OpportunityFunnel({ opportunities }: OpportunityFunnelProps) {
  const stats: StageStats[] = OPPORTUNITY_STAGES.map(stageConfig => {
    const stageOpps = opportunities.filter(opp => opp.stage === stageConfig.value);
    const totalAmount = stageOpps.reduce((sum, opp) => sum + opp.amount, 0);
    const avgProbability = stageOpps.length > 0
      ? stageOpps.reduce((sum, opp) => sum + opp.probability, 0) / stageOpps.length
      : 0;
    const weightedAmount = totalAmount * (avgProbability / 100);

    return {
      stage: stageConfig.value,
      label: stageConfig.label,
      color: stageConfig.color,
      count: stageOpps.length,
      amount: totalAmount,
      probability: avgProbability,
      weightedAmount
    };
  }).filter(s => s.count > 0 || ['prospecting', 'qualification', 'proposal', 'negotiation', 'closed_won'].includes(s.stage));

  const totalValue = stats.reduce((sum, s) => sum + s.weightedAmount, 0);
  const maxAmount = Math.max(...stats.map(s => s.weightedAmount), 1);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getBarColor = (color: string) => {
    const colors: Record<string, string> = {
      gray: 'bg-gray-500',
      blue: 'bg-blue-500',
      purple: 'bg-purple-500',
      yellow: 'bg-yellow-500',
      green: 'bg-green-500',
      red: 'bg-red-500',
    };
    return colors[color] || 'bg-gray-500';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">销售漏斗</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stats.map((stat, index) => (
            <div key={stat.stage} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{stat.label}</span>
                  <span className="text-muted-foreground">({stat.count})</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{formatCurrency(stat.weightedAmount)}</div>
                  {stat.probability > 0 && (
                    <div className="text-xs text-muted-foreground">
                      预计: {formatCurrency(stat.amount)} · 概率 {stat.probability.toFixed(0)}%
                    </div>
                  )}
                </div>
              </div>
              <Progress
                value={(stat.weightedAmount / maxAmount) * 100}
                className="h-2"
              />
            </div>
          ))}

          <div className="pt-4 border-t">
            <div className="flex items-center justify-between">
              <span className="font-medium">预计总金额</span>
              <span className="text-lg font-bold text-primary">
                {formatCurrency(totalValue)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
