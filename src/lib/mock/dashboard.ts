/**
 * Dashboard Mock Data
 * Sample data for dashboard statistics, charts, and lists
 */

import {
  OPPORTUNITY_STAGE,
  TASK_PRIORITY,
  TASK_STATUS,
  FOLLOWUP_TYPE,
  INDUSTRY,
} from "../dict";

// =============================================================================
// Statistics Data
// =============================================================================

export const dashboardStats = {
  totalCustomers: 128,
  customersGrowth: 12.5,
  totalOpportunities: 45,
  opportunitiesGrowth: 8.3,
  pipelineValue: 3280000,
  pendingTasks: 18,
  tasksChange: -5.2,
};

// =============================================================================
// Chart Data
// =============================================================================

// Sales pipeline distribution by stage
export const pipelineDistributionData = [
  { stage: "线索", count: 15, fill: "var(--color-chart-1)" },
  { stage: "资格确认", count: 12, fill: "var(--color-chart-2)" },
  { stage: "方案报价", count: 10, fill: "var(--color-chart-3)" },
  { stage: "谈判", count: 6, fill: "var(--color-chart-4)" },
  { stage: "成交", count: 2, fill: "var(--color-chart-5)" },
];

// Monthly sales trend (last 6 months)
export const monthlySalesData = [
  { month: "10月", amount: 450000, count: 8 },
  { month: "11月", amount: 680000, count: 12 },
  { month: "12月", amount: 520000, count: 9 },
  { month: "1月", amount: 890000, count: 15 },
  { month: "2月", amount: 720000, count: 13 },
  { month: "3月", amount: 980000, count: 18 },
];

// Customer industry distribution
export const industryDistributionData = [
  { name: "科技/互联网", value: 35, count: 45, fill: "var(--color-chart-1)" },
  { name: "金融", value: 20, count: 26, fill: "var(--color-chart-2)" },
  { name: "制造业", value: 18, count: 23, fill: "var(--color-chart-3)" },
  { name: "零售", value: 12, count: 15, fill: "var(--color-chart-4)" },
  { name: "医疗", value: 8, count: 10, fill: "var(--color-chart-5)" },
  { name: "其他", value: 7, count: 9, fill: "var(--color-chart-6)" },
];

// =============================================================================
// List Data (Top 5)
// =============================================================================

export const recentFollowups = [
  {
    id: "1",
    customer: "深圳科技创新有限公司",
    customerSlug: "shenzhen-tech",
    type: "visit",
    content: "拜访客户，演示产品功能，客户对数据分析模块很感兴趣",
    createdAt: "2026-03-27 10:30",
    createdBy: "张三",
  },
  {
    id: "2",
    customer: "北京金融集团",
    customerSlug: "beijing-finance",
    type: "meeting",
    content: "技术交流会，讨论系统集成方案和安全性问题",
    createdAt: "2026-03-27 09:15",
    createdBy: "李四",
  },
  {
    id: "3",
    customer: "上海制造企业",
    customerSlug: "shanghai-mfg",
    type: "call",
    content: "电话跟进，确认下周二的技术演示安排",
    createdAt: "2026-03-26 16:45",
    createdBy: "王五",
  },
  {
    id: "4",
    customer: "广州零售连锁",
    customerSlug: "guangzhou-retail",
    type: "email",
    content: "发送产品报价单和合同草案，等待客户反馈",
    createdAt: "2026-03-26 14:20",
    createdBy: "张三",
  },
  {
    id: "5",
    customer: "杭州医疗科技",
    customerSlug: "hangzhou-medical",
    type: "visit",
    content: "现场调研，了解客户业务流程和痛点需求",
    createdAt: "2026-03-26 11:00",
    createdBy: "赵六",
  },
];

export const topOpportunities = [
  {
    id: "1",
    name: "企业级CRM系统采购项目",
    customer: "深圳科技创新有限公司",
    customerSlug: "shenzhen-tech",
    stage: "negotiation",
    amount: 850000,
    expectedCloseDate: "2026-04-15",
    owner: "张三",
  },
  {
    id: "2",
    name: "金融数据分析平台",
    customer: "北京金融集团",
    customerSlug: "beijing-finance",
    stage: "proposal",
    amount: 1200000,
    expectedCloseDate: "2026-05-20",
    owner: "李四",
  },
  {
    id: "3",
    name: "智能制造管理系统",
    customer: "上海制造企业",
    customerSlug: "shanghai-mfg",
    stage: "qualification",
    amount: 680000,
    expectedCloseDate: "2026-06-10",
    owner: "王五",
  },
  {
    id: "4",
    name: "零售连锁门店管理系统",
    customer: "广州零售连锁",
    customerSlug: "guangzhou-retail",
    stage: "proposal",
    amount: 450000,
    expectedCloseDate: "2026-04-30",
    owner: "张三",
  },
  {
    id: "5",
    name: "医疗设备采购及系统集成",
    customer: "杭州医疗科技",
    customerSlug: "hangzhou-medical",
    stage: "negotiation",
    amount: 920000,
    expectedCloseDate: "2026-04-08",
    owner: "赵六",
  },
];

export const pendingTasks = [
  {
    id: "1",
    title: "准备深圳科技创新技术演示方案",
    type: "机会跟进",
    relatedCustomer: "深圳科技创新有限公司",
    relatedCustomerSlug: "shenzhen-tech",
    relatedOpportunity: "企业级CRM系统采购项目",
    priority: "urgent",
    status: "pending",
    dueDate: "2026-03-28",
    assignee: "张三",
  },
  {
    id: "2",
    title: "跟进北京金融集团合同审批进度",
    type: "商务跟进",
    relatedCustomer: "北京金融集团",
    relatedCustomerSlug: "beijing-finance",
    relatedOpportunity: null,
    priority: "high",
    status: "pending",
    dueDate: "2026-03-29",
    assignee: "李四",
  },
  {
    id: "3",
    title: "完成上海制造企业需求调研报告",
    type: "需求调研",
    relatedCustomer: "上海制造企业",
    relatedCustomerSlug: "shanghai-mfg",
    relatedOpportunity: "智能制造管理系统",
    priority: "medium",
    status: "in_progress",
    dueDate: "2026-03-30",
    assignee: "王五",
  },
  {
    id: "4",
    title: "更新广州零售连锁报价方案",
    type: "方案更新",
    relatedCustomer: "广州零售连锁",
    relatedCustomerSlug: "guangzhou-retail",
    relatedOpportunity: "零售连锁门店管理系统",
    priority: "medium",
    status: "pending",
    dueDate: "2026-03-31",
    assignee: "张三",
  },
  {
    id: "5",
    title: "安排杭州医疗科技第二次技术交流",
    type: "会议安排",
    relatedCustomer: "杭州医疗科技",
    relatedCustomerSlug: "hangzhou-medical",
    relatedOpportunity: null,
    priority: "low",
    status: "pending",
    dueDate: "2026-04-02",
    assignee: "赵六",
  },
];

// =============================================================================
// Type Definitions
// =============================================================================

export interface DashboardStats {
  totalCustomers: number;
  customersGrowth: number;
  totalOpportunities: number;
  opportunitiesGrowth: number;
  pipelineValue: number;
  pendingTasks: number;
  tasksChange: number;
}

export interface PipelineDistribution {
  stage: string;
  count: number;
  fill: string;
}

export interface MonthlySales {
  month: string;
  amount: number;
  count: number;
}

export interface IndustryDistribution {
  name: string;
  value: number;
  count: number;
  fill: string;
}

export interface RecentFollowup {
  id: string;
  customer: string;
  customerSlug: string;
  type: keyof typeof FOLLOWUP_TYPE;
  content: string;
  createdAt: string;
  createdBy: string;
}

export interface TopOpportunity {
  id: string;
  name: string;
  customer: string;
  customerSlug: string;
  stage: keyof typeof OPPORTUNITY_STAGE;
  amount: number;
  expectedCloseDate: string;
  owner: string;
}

export interface PendingTask {
  id: string;
  title: string;
  type: string;
  relatedCustomer: string;
  relatedCustomerSlug: string;
  relatedOpportunity: string | null;
  priority: keyof typeof TASK_PRIORITY;
  status: keyof typeof TASK_STATUS;
  dueDate: string;
  assignee: string;
}
