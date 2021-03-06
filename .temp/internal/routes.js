/**
 * Generated by "@vuepress/internal-routes"
 */

import { injectComponentOption, ensureAsyncComponentsLoaded } from '@app/util'
import rootMixins from '@internal/root-mixins'
import GlobalLayout from "E:\\user\\彼邑科技\\个人\\代码文件\\个人项目\\blog\\node_modules\\@vuepress\\core\\lib\\client\\components\\GlobalLayout.vue"

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
    name: "v-15d3e3de",
    path: "/bug/",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-15d3e3de").then(next)
    },
  },
  {
    path: "/bug/index.html",
    redirect: "/bug/"
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
    name: "v-43ba2ffe",
    path: "/Phaser/",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-43ba2ffe").then(next)
    },
  },
  {
    path: "/Phaser/index.html",
    redirect: "/Phaser/"
  },
  {
    path: '*',
    component: GlobalLayout
  }
]