import { Opportunity, OpportunityStage } from '@/types/opportunity';

const customers = [
  '华为技术有限公司', '腾讯科技', '阿里巴巴', '字节跳动', '百度在线',
  '京东集团', '美团', '滴滴出行', '小米科技', '网易公司',
  '平安保险', '招商银行', '工商银行', '中国移动', '中国电信',
  '联想集团', '中芯国际', '大疆创新', '比亚迪股份', '宁德时代',
  '药明康德', '恒瑞医药', '迈瑞医疗', '爱尔眼科', '通策医疗',
  '中公教育', '新东方在线', '好未来', '有道', '传智教育'
];

const owners = ['张伟', '李娜', '王强', '刘洋', '陈静', '杨敏', '赵磊', '孙丽'];
const stages: OpportunityStage[] = ['prospecting', 'qualification', 'proposal', 'negotiation', 'closed_won', 'closed_lost'];

const opportunityNames = [
  'ERP系统采购项目', 'CRM系统升级', '数据中心迁移', '云服务采购', '网络安全解决方案',
  '办公软件授权', 'IT运维外包', '数字化转型咨询', 'AI智能客服系统', 'BI数据分析平台',
  '移动应用开发', '企业微信集成', '视频会议系统', '文档管理系统', '财务软件实施',
  'HR管理平台', '供应链管理系统', '电商平台搭建', '小程序开发', 'API接口对接',
  '服务器采购', '存储设备扩容', '网络设备升级', '机房改造', '灾备系统建设',
  'DevOps工具链', '容器化改造', '微服务架构升级', '数据库迁移', '大数据平台建设'
];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomAmount(): number {
  const ranges = [
    { min: 10000, max: 50000, weight: 3 },
    { min: 50000, max: 200000, weight: 5 },
    { min: 200000, max: 500000, weight: 3 },
    { min: 500000, max: 2000000, weight: 2 }
  ];
  const range = ranges.reduce((prev, curr) =>
    Math.random() * (prev.weight + curr.weight) < curr.weight ? curr : prev
  );
  return Math.floor(Math.random() * (range.max - range.min) + range.min);
}

function randomDate(start: Date, end: Date): string {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
}

function getStageProbability(stage: OpportunityStage): number {
  const probabilities: Record<OpportunityStage, number> = {
    prospecting: 10,
    qualification: 30,
    proposal: 50,
    negotiation: 75,
    closed_won: 100,
    closed_lost: 0
  };
  return probabilities[stage];
}

function generateOpportunity(id: number): Opportunity {
  const stage = randomItem(stages);
  const expectedCloseDate = randomDate(new Date(2026, 2, 27), new Date(2026, 11, 31));
  const createdDate = randomDate(new Date(2025, 0, 1), new Date(2026, 2, 27));

  return {
    id: `opp-${String(id).padStart(4, '0')}`,
    name: randomItem(opportunityNames),
    customerId: `cust-${String(Math.floor(Math.random() * 30) + 1).padStart(4, '0')}`,
    customerName: randomItem(customers),
    stage,
    amount: randomAmount(),
    probability: getStageProbability(stage),
    expectedCloseDate,
    owner: randomItem(owners),
    description: `关于${randomItem(opportunityNames)}的项目合作意向，客户表现出较强的采购意愿。`,
    createdAt: createdDate,
    updatedAt: randomDate(new Date(createdDate), new Date())
  };
}

export const mockOpportunities: Opportunity[] = Array.from({ length: 30 }, (_, i) => generateOpportunity(i + 1));

export const getOpportunitiesByStage = (stage: OpportunityStage): Opportunity[] => {
  return mockOpportunities.filter(opp => opp.stage === stage);
};

export const getOpportunityById = (id: string): Opportunity | undefined => {
  return mockOpportunities.find(opp => opp.id === id);
};

export const getPipelineStats = () => {
  const stats = stages.map(stage => {
    const stageOpps = mockOpportunities.filter(opp => opp.stage === stage);
    const totalAmount = stageOpps.reduce((sum, opp) => sum + opp.amount, 0);
    return {
      stage,
      count: stageOpps.length,
      amount: totalAmount
    };
  });
  return stats;
};
