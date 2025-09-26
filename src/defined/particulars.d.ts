type CustomerBase = {
  companyName: string
  employeeName: string
  industry: string
}

type Customer = CustomerBase & {
  reportLine: string,
  status: string,
  createAt: string,
}

type ParticularApplying = CustomerBase & {
  status: string
  createAt: string
}

type RefusedParticularApplying = CustomerBase & {
  refusedStage: string
  refusedReason: string
  refusedAt: string
}

type ParticularCustomerBaseFormItems = {
  companyName: string
  reportLine: string
  industry: string
  operatingLiscense: string
  legalPersonIdCard: string
  script: string
}

type ParticularCustomerContractFormItems = {
  price: string
  payment: string
  preparedContract: string
}

type ParticularCustomerLineFormItems = {
  lineName: string
  lineFile: string
}

type ParticularCustomerFormItems = {
  base: ParticularCustomerBaseFormItems
  contract: ParticularCustomerContractFormItems
  lines: ParticularCustomerLineFormItems[]
}

type SceneChecking = CustomerBase & {
  script: string
  applyLine: string
  applyAt: string
}

declare module "@/defined/particulars" {
  export type { 
    Customer, 
    ParticularApplying, 
    RefusedParticularApplying, 
    ParticularCustomerBaseFormItems, 
    ParticularCustomerContractFormItems, 
    ParticularCustomerLineFormItems,
    ParticularCustomerFormItems,
    SceneChecking
  }
}