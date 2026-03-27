// 跟进记录类型定义

import { FollowupType } from "@/lib/dict";

/**
 * 跟进记录
 */
export interface Followup {
  id: string;
  customerId: string;
  customerName: string;
  type: FollowupType;
  content: string;
  attendees?: string[];
  nextActions?: string;
  createdBy: string;
  createdAt: string;
}

/**
 * 跟进记录表单数据
 */
export interface FollowupFormData {
  customerId: string;
  type: FollowupType;
  content: string;
  attendees?: string[];
  nextActions?: string;
}

/**
 * 跟进记录筛选条件
 */
export interface FollowupFilters {
  keyword?: string;
  type?: FollowupType;
  dateRange?: {
    start: string;
    end: string;
  };
}

/**
 * 跟进记录视图类型
 */
export type FollowupViewType = "timeline" | "list";

/**
 * 跟进记录按客户分组
 */
export interface FollowupGroupByCustomer {
  customerId: string;
  customerName: string;
  followups: Followup[];
  lastFollowupAt: string;
}
