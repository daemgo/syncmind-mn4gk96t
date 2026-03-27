/**
 * Data Dictionary
 * Centralized enums and dictionary functions for the CRM application
 */

// =============================================================================
// Customer Status
// =============================================================================

export type CustomerStatus =
  | "lead"
  | "contacted"
  | "qualified"
  | "customer"
  | "lost";

export const CUSTOMER_STATUS: Record<CustomerStatus, string> = {
  lead: "线索",
  contacted: "已联系",
  qualified: " qualified",
  customer: "成交客户",
  lost: "已流失",
};

export const CUSTOMER_STATUS_OPTIONS = [
  { value: "lead", label: "线索", color: "gray" },
  { value: "contacted", label: "已联系", color: "blue" },
  { value: "qualified", label: " qualified", color: "purple" },
  { value: "customer", label: "成交客户", color: "green" },
  { value: "lost", label: "已流失", color: "red" },
] as const;

// =============================================================================
// Followup Type
// =============================================================================

export type FollowupType = "visit" | "call" | "meeting" | "email" | "other";

export const FOLLOWUP_TYPE: Record<FollowupType, string> = {
  visit: "拜访",
  call: "电话",
  meeting: "会议",
  email: "邮件",
  other: "其他",
};

export const FOLLOWUP_TYPE_OPTIONS = [
  { value: "visit", label: "拜访" },
  { value: "call", label: "电话" },
  { value: "meeting", label: "会议" },
  { value: "email", label: "邮件" },
  { value: "other", label: "其他" },
] as const;

// =============================================================================
// Opportunity Stage
// =============================================================================

export type OpportunityStage =
  | "prospecting"
  | "qualification"
  | "proposal"
  | "negotiation"
  | "closed_won"
  | "closed_lost";

export const OPPORTUNITY_STAGE: Record<OpportunityStage, string> = {
  prospecting: "线索",
  qualification: "资格确认",
  proposal: "方案报价",
  negotiation: "谈判",
  closed_won: "成交",
  closed_lost: "失败",
};

export const OPPORTUNITY_STAGE_OPTIONS = [
  { value: "prospecting", label: "线索", color: "gray" },
  { value: "qualification", label: "资格确认", color: "blue" },
  { value: "proposal", label: "方案报价", color: "purple" },
  { value: "negotiation", label: "谈判", color: "yellow" },
  { value: "closed_won", label: "成交", color: "green" },
  { value: "closed_lost", label: "失败", color: "red" },
] as const;

// =============================================================================
// Task Priority
// =============================================================================

export type TaskPriority = "low" | "medium" | "high" | "urgent";

export const TASK_PRIORITY: Record<TaskPriority, string> = {
  low: "低",
  medium: "中",
  high: "高",
  urgent: "紧急",
};

export const TASK_PRIORITY_OPTIONS = [
  { value: "low", label: "低", color: "gray" },
  { value: "medium", label: "中", color: "blue" },
  { value: "high", label: "高", color: "orange" },
  { value: "urgent", label: "紧急", color: "red" },
] as const;

// =============================================================================
// Task Status
// =============================================================================

export type TaskStatus = "pending" | "in_progress" | "completed" | "cancelled";

export const TASK_STATUS: Record<TaskStatus, string> = {
  pending: "待处理",
  in_progress: "进行中",
  completed: "已完成",
  cancelled: "已取消",
};

export const TASK_STATUS_OPTIONS = [
  { value: "pending", label: "待处理", color: "gray" },
  { value: "in_progress", label: "进行中", color: "blue" },
  { value: "completed", label: "已完成", color: "green" },
  { value: "cancelled", label: "已取消", color: "red" },
] as const;

// =============================================================================
// Customer Level
// =============================================================================

export type CustomerLevel = "a" | "b" | "c";

export const CUSTOMER_LEVEL: Record<CustomerLevel, string> = {
  a: "A类（重点）",
  b: "B类（一般）",
  c: "C类（潜在）",
};

export const CUSTOMER_LEVEL_OPTIONS = [
  { value: "a", label: "A类（重点）" },
  { value: "b", label: "B类（一般）" },
  { value: "c", label: "C类（潜在）" },
] as const;

// =============================================================================
// Industry
// =============================================================================

export type Industry =
  | "tech"
  | "finance"
  | "manufacturing"
  | "retail"
  | "healthcare"
  | "education"
  | "other";

export const INDUSTRY: Record<Industry, string> = {
  tech: "科技/互联网",
  finance: "金融",
  manufacturing: "制造业",
  retail: "零售",
  healthcare: "医疗",
  education: "教育",
  other: "其他",
};

export const INDUSTRY_OPTIONS = [
  { value: "tech", label: "科技/互联网" },
  { value: "finance", label: "金融" },
  { value: "manufacturing", label: "制造业" },
  { value: "retail", label: "零售" },
  { value: "healthcare", label: "医疗" },
  { value: "education", label: "教育" },
  { value: "other", label: "其他" },
] as const;

// =============================================================================
// Customer Scale
// =============================================================================

export type CustomerScale = "1-50" | "51-200" | "201-500" | "500+";

export const CUSTOMER_SCALE: Record<CustomerScale, string> = {
  "1-50": "1-50人",
  "51-200": "51-200人",
  "201-500": "201-500人",
  "500+": "500人以上",
};

export const CUSTOMER_SCALE_OPTIONS = [
  { value: "1-50", label: "1-50人" },
  { value: "51-200", label: "51-200人" },
  { value: "201-500", label: "201-500人" },
  { value: "500+", label: "500人以上" },
] as const;

// =============================================================================
// Customer Source
// =============================================================================

export type CustomerSource = "website" | "referral" | "exhibition" | "cold_call" | "other";

export const CUSTOMER_SOURCE: Record<CustomerSource, string> = {
  website: "官网咨询",
  referral: "客户推荐",
  exhibition: "展会",
  cold_call: "电话开发",
  other: "其他",
};

export const CUSTOMER_SOURCE_OPTIONS = [
  { value: "website", label: "官网咨询" },
  { value: "referral", label: "客户推荐" },
  { value: "exhibition", label: "展会" },
  { value: "cold_call", label: "电话开发" },
  { value: "other", label: "其他" },
] as const;

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Get dictionary label by value
 */
export function getDictLabel(
  dict: Record<string, string>,
  value: string
): string {
  return dict[value] || value;
}

/**
 * Get customer status label
 */
export function getCustomerStatusLabel(status: CustomerStatus): string {
  return CUSTOMER_STATUS[status];
}

/**
 * Get followup type label
 */
export function getFollowupTypeLabel(type: FollowupType): string {
  return FOLLOWUP_TYPE[type];
}

/**
 * Get opportunity stage label
 */
export function getOpportunityStageLabel(stage: OpportunityStage): string {
  return OPPORTUNITY_STAGE[stage];
}

/**
 * Get task priority label
 */
export function getTaskPriorityLabel(priority: TaskPriority): string {
  return TASK_PRIORITY[priority];
}

/**
 * Get task status label
 */
export function getTaskStatusLabel(status: TaskStatus): string {
  return TASK_STATUS[status];
}

/**
 * Get customer level label
 */
export function getCustomerLevelLabel(level: CustomerLevel): string {
  return CUSTOMER_LEVEL[level];
}

/**
 * Get industry label
 */
export function getIndustryLabel(industry: Industry): string {
  return INDUSTRY[industry];
}

/**
 * Get customer scale label
 */
export function getCustomerScaleLabel(scale: CustomerScale): string {
  return CUSTOMER_SCALE[scale];
}

/**
 * Get customer source label
 */
export function getCustomerSourceLabel(source: CustomerSource): string {
  return CUSTOMER_SOURCE[source];
}

/**
 * Get options array for select components
 */
export function getSelectOptions(
  dict: Record<string, string>
): Array<{ value: string; label: string }> {
  return Object.entries(dict).map(([value, label]) => ({ value, label }));
}

/**
 * Get status variant for Badge component
 * Maps color names to shadcn Badge variants
 */
export function getStatusVariant(
  color: string
): "default" | "secondary" | "outline" | "destructive" {
  const variantMap: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
    gray: "outline",
    blue: "secondary",
    green: "default",
    red: "destructive",
    yellow: "outline",
    purple: "secondary",
    orange: "outline",
  };
  return variantMap[color] || "outline";
}

/**
 * Get custom status badge className
 * For colors that don't have standard Badge variants
 */
export function getStatusBadgeClassName(color: string): string {
  const classNameMap: Record<string, string> = {
    yellow: "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-50",
    purple: "border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-50",
    orange: "border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-50",
  };
  return classNameMap[color] || "";
}
