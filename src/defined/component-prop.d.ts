import type { Component } from "vue"
import type { DataTableColumns, PaginationProps } from "naive-ui"

// 表单项
export type FormItem = {
  label: string
  component: Component
}
export type FormItems = FormItem[]
// 表格项
export type TableProps<T> = {
  columns: DataTableColumns<T>,
  data: T[],
  pagination: PaginationProps,
}

declare module "@/defined/component-prop" {
  export { FormItem, FormItems, TableProps }
}