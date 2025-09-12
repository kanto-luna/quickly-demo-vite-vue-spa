import { defineStore } from "pinia"

import type { User, Menu } from "@/defined/auth"

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      token: undefined as string | undefined,
      user: undefined as User | undefined,
      menus: undefined as Menu[] | undefined,
    }
  },
  actions: {
    setToken(token: string) {
      this.token = token
    }, 
    setUser<T extends User>(user: T) {
      this.user = user
    }
  },
  persist: true
})