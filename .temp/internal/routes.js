/**
 * Generated by "@vuepress/internal-routes"
 */

import { injectComponentOption, ensureAsyncComponentsLoaded } from '@app/util'
import rootMixins from '@internal/root-mixins'
import GlobalLayout from "C:\\Users\\admin22\\AppData\\Roaming\\npm\\node_modules\\vuepress\\node_modules\\@vuepress\\core\\lib\\client\\components\\GlobalLayout.vue"

injectComponentOption(GlobalLayout, 'mixins', rootMixins)
export const routes = [
  {
    name: "v-3e73283b",
    path: "/",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-3e73283b").then(next)
    },
  },
  {
    path: "/index.html",
    redirect: "/"
  },
  {
    name: "v-55d8074b",
    path: "/web/html/",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-55d8074b").then(next)
    },
  },
  {
    path: "/web/html/index.html",
    redirect: "/web/html/"
  },
  {
    name: "v-0acfd504",
    path: "/interview/",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-0acfd504").then(next)
    },
  },
  {
    path: "/interview/index.html",
    redirect: "/interview/"
  },
  {
    name: "v-b0ca22ba",
    path: "/web/css/",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-b0ca22ba").then(next)
    },
  },
  {
    path: "/web/css/index.html",
    redirect: "/web/css/"
  },
  {
    path: '*',
    component: GlobalLayout
  }
]