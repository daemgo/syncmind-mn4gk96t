import { Task, TaskPriority, TaskStatus } from '@/types/task';

// Mock customers for reference
const mockCustomers = [
  { id: 'c1', name: '腾讯科技' },
  { id: 'c2', name: '阿里巴巴' },
  { id: 'c3', name: '字节跳动' },
  { id: 'c4', name: '华为技术' },
  { id: 'c5', name: '京东集团' },
  { id: 'c6', name: '美团' },
  { id: 'c7', name: '百度' },
  { id: 'c8', name: '小米集团' },
  { id: 'c9', name: '网易' },
  { id: 'c10', name: '拼多多' },
  { id: 'c11', name: '滴滴出行' },
  { id: 'c12', name: '快手' },
  { id: 'c13', name: '蚂蚁集团' },
  { id: 'c14', name: '顺丰控股' },
  { id: 'c15', name: '理想汽车' },
];

// Mock opportunities for reference
const mockOpportunities = [
  { id: 'o1', name: '2026年企业服务采购' },
  { id: 'o2', name: '数字化转型项目' },
  { id: 'o3', name: '云服务续约' },
  { id: 'o4', name: 'CRM系统升级' },
  { id: 'o5', name: '数据中台建设' },
  { id: 'o6', name: 'AI平台合作' },
  { id: 'o7', name: '营销自动化' },
  { id: 'o8', name: '供应链优化' },
];

const assignees = ['张三', '李四', '王五', '赵六', '孙七', '周八', '吴九', '郑十'];

// Helper to generate random date
const randomDate = (start: Date, end: Date): string => {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
};

// Helper to generate random datetime
const randomDateTime = (start: Date, end: Date): string => {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString();
};

// Generate mock tasks
export const mockTasks: Task[] = [
  {
    id: 't1',
    title: '准备腾讯科技Q2季度方案汇报',
    description: '整理产品功能对比、报价方案、成功案例，准备PPT演示文稿',
    customerId: 'c1',
    customerName: '腾讯科技',
    opportunityId: 'o1',
    opportunityName: '2026年企业服务采购',
    priority: 'urgent',
    status: 'in_progress',
    dueDate: '2026-03-30',
    assignee: '张三',
    createdAt: '2026-03-20T09:00:00Z',
    updatedAt: '2026-03-27T10:30:00Z',
  },
  {
    id: 't2',
    title: '跟进阿里巴巴合同签署进度',
    description: '联系法务确认合同审批状态，协调签署时间',
    customerId: 'c2',
    customerName: '阿里巴巴',
    opportunityId: 'o2',
    opportunityName: '数字化转型项目',
    priority: 'high',
    status: 'pending',
    dueDate: '2026-03-28',
    assignee: '李四',
    createdAt: '2026-03-21T14:20:00Z',
    updatedAt: '2026-03-21T14:20:00Z',
  },
  {
    id: 't3',
    title: '字节跳动产品演示准备',
    description: '根据客户需求定制演示流程，准备测试环境',
    customerId: 'c3',
    customerName: '字节跳动',
    priority: 'high',
    status: 'pending',
    dueDate: '2026-03-29',
    assignee: '王五',
    createdAt: '2026-03-22T11:15:00Z',
    updatedAt: '2026-03-22T11:15:00Z',
  },
  {
    id: 't4',
    title: '华为技术技术对接会议',
    description: '与客户技术团队对接API集成方案，明确接口规范',
    customerId: 'c4',
    customerName: '华为技术',
    opportunityId: 'o3',
    opportunityName: '云服务续约',
    priority: 'medium',
    status: 'pending',
    dueDate: '2026-03-31',
    assignee: '赵六',
    createdAt: '2026-03-23T16:45:00Z',
    updatedAt: '2026-03-23T16:45:00Z',
  },
  {
    id: 't5',
    title: '京东集团需求调研报告整理',
    description: '汇总各部门需求，输出需求文档',
    customerId: 'c5',
    customerName: '京东集团',
    opportunityId: 'o4',
    opportunityName: 'CRM系统升级',
    priority: 'medium',
    status: 'in_progress',
    dueDate: '2026-04-02',
    assignee: '孙七',
    createdAt: '2026-03-18T10:30:00Z',
    updatedAt: '2026-03-27T09:15:00Z',
  },
  {
    id: 't6',
    title: '发送美团产品更新通知',
    description: '整理3月版本更新内容，发邮件给客户',
    customerId: 'c6',
    customerName: '美团',
    priority: 'low',
    status: 'pending',
    dueDate: '2026-04-05',
    assignee: '周八',
    createdAt: '2026-03-24T13:20:00Z',
    updatedAt: '2026-03-24T13:20:00Z',
  },
  {
    id: 't7',
    title: '百度竞对分析报告',
    description: '分析主要竞品功能差异，输出对比表格',
    customerId: 'c7',
    customerName: '百度',
    opportunityId: 'o5',
    opportunityName: '数据中台建设',
    priority: 'medium',
    status: 'pending',
    dueDate: '2026-04-03',
    assignee: '吴九',
    createdAt: '2026-03-19T15:00:00Z',
    updatedAt: '2026-03-19T15:00:00Z',
  },
  {
    id: 't8',
    title: '小米集团报价方案修订',
    description: '根据反馈调整折扣策略，更新报价单',
    customerId: 'c8',
    customerName: '小米集团',
    priority: 'high',
    status: 'pending',
    dueDate: '2026-03-28',
    assignee: '郑十',
    createdAt: '2026-03-25T11:40:00Z',
    updatedAt: '2026-03-25T11:40:00Z',
  },
  {
    id: 't9',
    title: '网易POC环境部署',
    description: '协助客户部署测试环境，提供技术支持',
    customerId: 'c9',
    customerName: '网易',
    opportunityId: 'o6',
    opportunityName: 'AI平台合作',
    priority: 'urgent',
    status: 'in_progress',
    dueDate: '2026-03-28',
    assignee: '张三',
    createdAt: '2026-03-20T08:30:00Z',
    updatedAt: '2026-03-27T14:20:00Z',
  },
  {
    id: 't10',
    title: '拼多多年度续约谈判准备',
    description: '准备续约方案，整理年度服务数据',
    customerId: 'c10',
    customerName: '拼多多',
    opportunityId: 'o7',
    opportunityName: '营销自动化',
    priority: 'high',
    status: 'pending',
    dueDate: '2026-04-08',
    assignee: '李四',
    createdAt: '2026-03-17T10:00:00Z',
    updatedAt: '2026-03-17T10:00:00Z',
  },
  {
    id: 't11',
    title: '滴滴出行客户回访',
    description: '了解产品使用情况，收集改进建议',
    customerId: 'c11',
    customerName: '滴滴出行',
    priority: 'low',
    status: 'pending',
    dueDate: '2026-04-10',
    assignee: '王五',
    createdAt: '2026-03-16T14:15:00Z',
    updatedAt: '2026-03-16T14:15:00Z',
  },
  {
    id: 't12',
    title: '快手定制化方案评估',
    description: '评估定制需求可行性，给出报价和工期',
    customerId: 'c12',
    customerName: '快手',
    opportunityId: 'o8',
    opportunityName: '供应链优化',
    priority: 'medium',
    status: 'in_progress',
    dueDate: '2026-04-01',
    assignee: '赵六',
    createdAt: '2026-03-22T09:50:00Z',
    updatedAt: '2026-03-27T11:00:00Z',
  },
  {
    id: 't13',
    title: '蚂蚁集团安全合规文档准备',
    description: '准备等保三级认证材料，配合客户审计',
    customerId: 'c13',
    customerName: '蚂蚁集团',
    priority: 'urgent',
    status: 'pending',
    dueDate: '2026-03-29',
    assignee: '孙七',
    createdAt: '2026-03-23T13:30:00Z',
    updatedAt: '2026-03-23T13:30:00Z',
  },
  {
    id: 't14',
    title: '顺丰控股培训材料更新',
    description: '更新用户手册和培训PPT，录制操作视频',
    customerId: 'c14',
    customerName: '顺丰控股',
    priority: 'low',
    status: 'pending',
    dueDate: '2026-04-15',
    assignee: '周八',
    createdAt: '2026-03-15T10:20:00Z',
    updatedAt: '2026-03-15T10:20:00Z',
  },
  {
    id: 't15',
    title: '理想汽车季度业务复盘',
    description: '整理Q1使用数据，准备复盘会议材料',
    customerId: 'c15',
    customerName: '理想汽车',
    priority: 'medium',
    status: 'completed',
    dueDate: '2026-03-25',
    assignee: '吴九',
    createdAt: '2026-03-10T09:00:00Z',
    updatedAt: '2026-03-25T16:00:00Z',
  },
  {
    id: 't16',
    title: '更新客户资料库',
    description: '批量更新客户联系方式和决策人信息',
    priority: 'low',
    status: 'pending',
    dueDate: '2026-04-12',
    assignee: '郑十',
    createdAt: '2026-03-14T11:30:00Z',
    updatedAt: '2026-03-14T11:30:00Z',
  },
  {
    id: 't17',
    title: '参加行业展会筹备',
    description: '准备展会物料、宣传册、演示Demo',
    priority: 'medium',
    status: 'in_progress',
    dueDate: '2026-04-20',
    assignee: '张三',
    createdAt: '2026-03-12T14:00:00Z',
    updatedAt: '2026-03-27T10:00:00Z',
  },
  {
    id: 't18',
    title: '销售团队周报整理',
    description: '汇总各销售本周跟进情况，输出周报',
    priority: 'low',
    status: 'pending',
    dueDate: '2026-03-28',
    assignee: '李四',
    createdAt: '2026-03-26T16:00:00Z',
    updatedAt: '2026-03-26T16:00:00Z',
  },
  {
    id: 't19',
    title: '客户投诉处理跟进',
    description: '跟进上周投诉处理进度，给客户反馈',
    customerId: 'c4',
    customerName: '华为技术',
    priority: 'high',
    status: 'in_progress',
    dueDate: '2026-03-28',
    assignee: '王五',
    createdAt: '2026-03-24T10:45:00Z',
    updatedAt: '2026-03-27T09:30:00Z',
  },
  {
    id: 't20',
    title: '新产品功能测试',
    description: '测试V3.5版本新功能，输出测试报告',
    priority: 'medium',
    status: 'pending',
    dueDate: '2026-04-06',
    assignee: '赵六',
    createdAt: '2026-03-21T15:20:00Z',
    updatedAt: '2026-03-21T15:20:00Z',
  },
  {
    id: 't21',
    title: '合作伙伴商务对接',
    description: '与渠道伙伴洽谈Q2合作计划',
    priority: 'medium',
    status: 'pending',
    dueDate: '2026-04-09',
    assignee: '孙七',
    createdAt: '2026-03-19T11:10:00Z',
    updatedAt: '2026-03-19T11:10:00Z',
  },
  {
    id: 't22',
    title: '客户满意度调查分析',
    description: '分析Q1满意度调查结果，提取改进点',
    priority: 'low',
    status: 'pending',
    dueDate: '2026-04-18',
    assignee: '周八',
    createdAt: '2026-03-13T14:30:00Z',
    updatedAt: '2026-03-13T14:30:00Z',
  },
  {
    id: 't23',
    title: '竞品动态监控报告',
    description: '整理主要竞品近期功能更新和定价变化',
    priority: 'low',
    status: 'pending',
    dueDate: '2026-04-16',
    assignee: '吴九',
    createdAt: '2026-03-11T09:40:00Z',
    updatedAt: '2026-03-11T09:40:00Z',
  },
  {
    id: 't24',
    title: '大客户季度规划会议',
    description: '邀请TOP10客户参加Q2规划会议',
    priority: 'high',
    status: 'pending',
    dueDate: '2026-04-25',
    assignee: '郑十',
    createdAt: '2026-03-08T10:15:00Z',
    updatedAt: '2026-03-08T10:15:00Z',
  },
  {
    id: 't25',
    title: '系统升级通知发送',
    description: '提前通知客户3月底系统维护时间',
    priority: 'medium',
    status: 'completed',
    dueDate: '2026-03-24',
    assignee: '张三',
    createdAt: '2026-03-20T08:00:00Z',
    updatedAt: '2026-03-24T12:00:00Z',
  },
];

// Get tasks by status
export const getTasksByStatus = (status: TaskStatus): Task[] => {
  return mockTasks.filter(task => task.status === status);
};

// Get tasks by priority
export const getTasksByPriority = (priority: TaskPriority): Task[] => {
  return mockTasks.filter(task => task.priority === priority);
};

// Get tasks by assignee
export const getTasksByAssignee = (assignee: string): Task[] => {
  return mockTasks.filter(task => task.assignee === assignee);
};

// Get overdue tasks
export const getOverdueTasks = (): Task[] => {
  const today = new Date().toISOString().split('T')[0];
  return mockTasks.filter(task => task.dueDate < today && task.status !== 'completed');
};

// Get upcoming tasks (next 7 days)
export const getUpcomingTasks = (): Task[] => {
  const today = new Date();
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  const todayStr = today.toISOString().split('T')[0];
  const nextWeekStr = nextWeek.toISOString().split('T')[0];

  return mockTasks.filter(task =>
    task.dueDate >= todayStr &&
    task.dueDate <= nextWeekStr &&
    task.status !== 'completed'
  );
};
