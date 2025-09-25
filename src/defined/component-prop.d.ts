
// 表单项
type FormItem = {
  key: string
  label: string
  component: Component
}
type FormItems = FormItem[]

// 表格项
type TableProps<T> = {
  columns: DataTableColumns<T>,
  data: T[],
  pagination: PaginationProps,
}

// 时间线
type DataDescTimeline = {
  props: TimelineProps,
  items: TimelineItemProps[]
}

// 描述块
type DataDesc = {
  key: string
  label?: string
  value?: string | number | boolean | Component
  span?: number
}
type DataDescs = DataDesc[]
type DataDescSection = {
  content: DataDescs
  title?: string
  cols?: number
}
type DataDescSections = DataDescSection[]

declare module "@/defined/component-prop" {
  export type { 
    FormItem, 
    FormItems, 
    TableProps, 
    DataDesc, 
    DataDescs, 
    DataDescSection, 
    DataDescSections, 
    DataDescTimeline 
  }
}