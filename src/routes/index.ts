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
          name: "DataView",
          path: "dataview",
          // component: () => import("@/views/index/dataview/DataView.vue"),
          children: [
            {
              name: "DataCenter",
              path: "data-center",
              component: () => import("@/views/index/dataview/DataCenter.vue")
            }
          ]
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
            },
            {
              name: "ParticularsApplying",
              path: "applying",
              component: () => import("@/views/index/particulars/ParticularsApplying.vue")
            },
            {
              name: "RefusedParticularsApplying",
              path: "refused-applying",
              component: () => import("@/views/index/particulars/RefusedParticularsApplying.vue")
            },
            {
              name: "SceneChecking",
              path: "scene-checking",
              component: () => import("@/views/index/particulars/SceneChecking.vue")
            },
            {
              name: "QualificationChecking",
              path: "qualification-checking",
              component: () => import("@/views/index/particulars/QualificationChecking.vue")
            },
            {
              name: "CompanyChecking",
              path: "company-checking",
              component: () => import("@/views/index/particulars/CompanyChecking.vue")
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
            },
            {
              name: "PreUploadContractList",
              path: "pre-upload-list",
              component: () => import("@/views/index/contract/PreUploadContractList.vue")
            },
            {
              name: "PreConfirmedContractList",
              path: "pre-confirmed-list",
              component: () => import("@/views/index/contract/PreConfirmedContractList.vue")
            },
            {
              name: "PreCensoredContractList",
              path: "pre-censored-list",
              component: () => import("@/views/index/contract/PreCensoredContractList.vue")
            },
            {
              name: "PreSignedContractList",
              path: "pre-signed-list",
              component: () => import("@/views/index/contract/PreSignedContractList.vue")
            },
            {
              name: "ContractTemplateList",
              path: "template-list",
              component: () => import("@/views/index/contract/ContractTemplateList.vue")
            },
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