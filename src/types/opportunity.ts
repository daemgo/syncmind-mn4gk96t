// Opportunity type definitions
export type OpportunityStage =
  | 'prospecting'
  | 'qualification'
  | 'proposal'
  | 'negotiation'
  | 'closed_won'
  | 'closed_lost';

export interface Opportunity {
  id: string;
  name: string;
  customerId: string;
  customerName: string;
  stage: OpportunityStage;
  amount: number;
  probability: number;
  expectedCloseDate: string;
  owner: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OpportunityStageConfig {
  value: OpportunityStage;
  label: string;
  color: string;
}

export const OPPORTUNITY_STAGES: OpportunityStageConfig[] = [
  { value: 'prospecting', label: '线索', color: 'gray' },
  { value: 'qualification', label: '资格确认', color: 'blue' },
  { value: 'proposal', label: '方案报价', color: 'purple' },
  { value: 'negotiation', label: '谈判', color: 'yellow' },
  { value: 'closed_won', label: '成交', color: 'green' },
  { value: 'closed_lost', label: '失败', color: 'red' },
];

export const STAGE_TRANSITIONS: Record<OpportunityStage, OpportunityStage[]> = {
  prospecting: ['qualification', 'closed_lost'],
  qualification: ['proposal', 'closed_lost'],
  proposal: ['negotiation', 'closed_lost'],
  negotiation: ['closed_won', 'closed_lost'],
  closed_won: [],
  closed_lost: [],
};

export const DEFAULT_PROBABILITY: Record<OpportunityStage, number> = {
  prospecting: 10,
  qualification: 30,
  proposal: 50,
  negotiation: 70,
  closed_won: 100,
  closed_lost: 0,
};
