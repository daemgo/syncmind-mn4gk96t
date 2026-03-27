import { CrmCustomer } from '@/types/customer'

const COMPANY_NAMES = [
  '腾讯科技', '阿里巴巴', '字节跳动', '华为技术', '京东集团',
  '百度在线', '网易公司', '美团点评', '滴滴出行', '小米科技',
  '平安银行', '招商银行', '工商银行', '建设银行', '中国银行',
  '比亚迪股份', '宁德时代', '海尔集团', '美的集团', '格力电器',
  '中国移动', '中国联通', '中国电信', '中石化', '中石油',
]

const CONTACTS = [
  '张伟', '李娜', '王强', '刘敏', '陈杰', '杨洋', '赵静', '黄磊',
  '周婷', '吴刚', '徐明', '孙丽', '马超', '朱珠', '胡军', '郭涛',
]

const POSITIONS = ['CEO', 'CTO', '产品总监', '技术总监', '采购经理', '运营总监', '市场总监']

const OWNERS = ['张三', '李四', '王五', '赵六', '孙七', '周八']

const generatePhone = () => {
  const prefix = ['138', '139', '150', '186', '189', '135', '136']
  const pre = prefix[Math.floor(Math.random() * prefix.length)]
  const mid = Math.floor(Math.random() * 8999 + 1000)
  const end = Math.floor(Math.random() * 8999 + 1000)
  return `${pre}-${mid}-${end}`
}

const generateDate = (daysAgo: number) => {
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)
  return date.toISOString().split('T')[0]
}

export const mockCustomers: CrmCustomer[] = COMPANY_NAMES.map((companyName, index) => {
  const statusValues: Array<'lead' | 'contacted' | 'qualified' | 'customer' | 'lost'> = ['lead', 'contacted', 'qualified', 'customer', 'lost']
  const levelValues: Array<'a' | 'b' | 'c'> = ['a', 'b', 'c']
  const industryValues: Array<'tech' | 'finance' | 'manufacturing' | 'retail' | 'healthcare' | 'education' | 'other'> = ['tech', 'finance', 'manufacturing', 'retail', 'healthcare', 'education', 'other']
  const scaleValues: Array<'1-50' | '51-200' | '201-500' | '500+'> = ['1-50', '51-200', '201-500', '500+']
  const sourceValues: Array<'website' | 'referral' | 'exhibition' | 'cold_call' | 'other'> = ['website', 'referral', 'exhibition', 'cold_call', 'other']

  return {
    id: `CUST${String(index + 1).padStart(4, '0')}`,
    companyName,
    industry: industryValues[index % industryValues.length],
    scale: scaleValues[index % scaleValues.length],
    level: levelValues[index % levelValues.length],
    status: statusValues[index % statusValues.length],
    source: sourceValues[index % sourceValues.length],
    contact: CONTACTS[index % CONTACTS.length],
    position: POSITIONS[index % POSITIONS.length],
    phone: generatePhone(),
    email: `contact@company${index + 1}.com`,
    wechat: `wx_${companyName.substring(0, 2)}${index}`,
    address: `北京市朝阳区建国路${index + 1}号`,
    owner: OWNERS[index % OWNERS.length],
    lastFollowup: index % 3 === 0 ? generateDate(Math.floor(Math.random() * 30)) : undefined,
    createdAt: generateDate(Math.floor(Math.random() * 180) + 30),
    updatedAt: generateDate(Math.floor(Math.random() * 30)),
  }
})
