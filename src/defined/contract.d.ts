type ContractBase = {
  id: string
  companyName: string
  industry: string
  employeeName: string
}
type ContractAvailable = ContractBase & {
  code: string
  startAt: string
  expiredAt: string
}
type ContractRunning = ContractBase & {
  status: string
}
type ContractClose2Expired = ContractAvailable
type ContractExpired = ContractAvailable
type Contract = ContractBase | ContractAvailable | ContractRunning

type RefusedContract = ContractBase & {
  refusedReason: string
  refusedAt: string
}

declare module "@/defined/contract" {
  export { 
    Contract, 
    ContractBase, 
    ContractAvailable, 
    ContractRunning, 
    ContractClose2Expired, 
    ContractExpired,
    RefusedContract
  }
}