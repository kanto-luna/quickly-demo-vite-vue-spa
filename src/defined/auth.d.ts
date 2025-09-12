interface User {
  id: string
  username: string
  role: string
}

interface Menu {
  name: string
  path: string
  component: string
  children?: Menu[]
  [key: string]: string | Menu[] | undefined
}

declare module "@/defined/auth" {
  export { User, Menu }
}