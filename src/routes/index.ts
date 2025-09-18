import { createRouter, createWebHistory, type NavigationGuardNext, type RouteLocationNormalized } from "vue-router"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "login",
      path: "/login",
      component: () => import("@/views/auth/Auth.vue")
    },
    {
      name: "Index",
      path: "/",
      component: () => import("@/views/index/Index.vue"),
      redirect: "/home",
      children: [
        {
          name: "Home",
          path: "home",
          component: () => import("@/views/index/home/Home.vue")
        },
        {
          name: "Particulars",
          path: "particulars",
          // component: () => import("@/views/index/particulars/Particulars.vue"),
          children: [
            {
              name: "ParticularsIndex",
              path: "",
              redirect: "/particulars/customer"
            },
            {
              name: "ParticularsCustomer",
              path: "customer",
              component: () => import("@/views/index/particulars/ParticularsCustomer.vue")
            }
          ]
        },
        {
          name: "Contract",
          path: "contract",
          // component: () => import("@/views/index/contract/Contract.vue"),
          children: [
            {
              name: "ContractIndex",
              path: "",
              redirect: "/contract/list"
            },
            {
              name: "ContractList",
              path: "list",
              component: () => import("@/views/index/contract/ContractList.vue")
            },
            {
              name: "RefusedContractList",
              path: "refused-list",
              component: () => import("@/views/index/contract/RefusedContractList.vue")
            }
          ]
        }
      ],
    },
    {
      name: "403-unavailable",
      path: "/403",
      component: () => import("@/views/common/403.vue")
    },
    {
      name: "404-not-found",
      path: "/404",
      component: () => import("@/views/common/404.vue")
    },
    {
      name: "not-found",
      path: "/:pathMatch(.*)*",
      redirect: "/404"
    }
  ],
})

router.beforeEach((to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) => {
  if (to.path === "/login" || to.path === "/403" || to.path === "/404") {
    return next()
  }
  const authStr: string = localStorage.getItem("auth") || "{}"
  const auth: { token?: string } = JSON.parse(authStr) as { token?: string }
  if (auth.token) {
    return next()
  } else {
    return next("/403")
  }
})

export default router