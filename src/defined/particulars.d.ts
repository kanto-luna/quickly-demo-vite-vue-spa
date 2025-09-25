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

declare module "@/defined/particulars" {
  export type { Customer, ParticularApplying, RefusedParticularApplying }
}