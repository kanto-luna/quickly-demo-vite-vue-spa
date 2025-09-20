type ContractBase = {
  id: string
  companyName: string // 企业名称
  industry: string // 所属行业
  employeeName: string
}
type ContractAvailable = ContractBase & {
  code: string // 合同编号
  startAt: string // 开始时间
  expiredAt: string // 到期时间
}
type ContractRunning = ContractBase & {
  status: string // 合同状态
}
type ContractClose2Expired = ContractAvailable
type ContractExpired = ContractAvailable
type Contract = ContractBase | ContractAvailable | ContractRunning

type RefusedContract = ContractBase & {
  refusedReason: string // 驳回理由
  refusedAt: string // 驳回时间
}

type PreUploadContract = ContractBase & {
  createdAt: string // 创建时间
  script: string // 合同话术
}

type ContractTemplate = ContractBase & {
  templateName: string // 模板名称
  creator: string // 创建人
  createdAt: string // 创建时间
  updateAt: string // 更新时间
}

declare module "@/defined/contract" {
  export { 
    Contract, 
    ContractBase, 
    ContractAvailable, 
    ContractRunning, 
    ContractClose2Expired, 
    ContractExpired,
    RefusedContract,
    PreUploadContract,
    ContractTemplate,
  }
}