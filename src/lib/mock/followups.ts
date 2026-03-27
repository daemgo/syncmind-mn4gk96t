// Mock Data: 跟进记录

import { Followup } from "@/types/followup";
import { FOLLOWUP_TYPE } from "@/lib/dict";

// 模拟客户列表
const mockCustomers = [
  { id: "c1", name: "腾讯科技" },
  { id: "c2", name: "阿里巴巴" },
  { id: "c3", name: "字节跳动" },
  { id: "c4", name: "华为技术" },
  { id: "c5", name: "小米科技" },
  { id: "c6", name: "京东集团" },
  { id: "c7", name: "美团点评" },
  { id: "c8", name: "网易公司" },
  { id: "c9", name: "百度公司" },
  { id: "c10", name: "拼多多" },
];

// 模拟用户列表
const mockUsers = ["张三", "李四", "王五", "赵六", "钱七", "孙八", "周九", "吴十"];

// 模拟跟进内容模板
const contentTemplates = [
  "与客户进行了深入沟通，了解到了他们的核心需求和痛点。",
  "向客户演示了产品功能，客户对XX功能特别感兴趣。",
  "客户反馈了预算情况，预计Q2会有采购计划。",
  "预约了下次技术交流会议，时间定在下周三。",
  "客户正在对比多家供应商，我们的优势在于XX方面。",
  "发送了产品资料和案例，等待客户内部讨论。",
  "拜访了客户现场，了解了他们的实际业务场景。",
  "电话跟进项目进度，客户表示仍在审批流程中。",
  "参加了客户组织的供应商会议，与决策层进行了沟通。",
  "客户提出了技术问题，已安排售前工程师跟进解答。",
  "了解到竞争对手也在接触该客户，需要加快推进节奏。",
  "客户的IT部门对我们的产品提出了新的要求。",
  "与客户讨论了实施方案和交付周期。",
  "客户对价格有些顾虑，需要申请折扣政策。",
  "项目暂时搁置，客户内部有组织架构调整。",
];

// 模拟参与人
const attendeeTemplates = [
  ["张三", "客户经理"],
  ["李四", "售前工程师"],
  ["王五", "技术总监"],
  ["张三", "李四"],
  ["客户采购", "客户IT"],
  ["客户CEO", "客户CTO"],
];

// 生成随机日期
function randomDate(start: Date, end: Date): string {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString();
}

// 生成跟进记录
function generateFollowups(count: number): Followup[] {
  const followups: Followup[] = [];
  const now = new Date();
  const threeMonthsAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);

  for (let i = 0; i < count; i++) {
    const customer = mockCustomers[Math.floor(Math.random() * mockCustomers.length)];
    const type = Object.keys(FOLLOWUP_TYPE)[Math.floor(Math.random() * 5)] as keyof typeof FOLLOWUP_TYPE;
    const content = contentTemplates[Math.floor(Math.random() * contentTemplates.length)];
    const attendees = attendeeTemplates[Math.floor(Math.random() * attendeeTemplates.length)];
    const createdBy = mockUsers[Math.floor(Math.random() * mockUsers.length)];
    const createdAt = randomDate(threeMonthsAgo, now);

    followups.push({
      id: `f${i + 1}`,
      customerId: customer.id,
      customerName: customer.name,
      type,
      content,
      attendees,
      nextActions: Math.random() > 0.5 ? "安排下次技术交流" : undefined,
      createdBy,
      createdAt,
    });
  }

  // 按时间倒序排序
  return followups.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export const mockFollowups: Followup[] = generateFollowups(50);

// 按客户分组的跟进记录
export const getFollowupsGroupedByCustomer = () => {
  const grouped = new Map<string, Followup[]>();

  mockFollowups.forEach((followup) => {
    if (!grouped.has(followup.customerId)) {
      grouped.set(followup.customerId, []);
    }
    grouped.get(followup.customerId)!.push(followup);
  });

  return Array.from(grouped.entries()).map(([customerId, followups]) => ({
    customerId,
    customerName: followups[0].customerName,
    followups: followups.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    lastFollowupAt: followups[0].createdAt,
  }));
};
