/*
 * @Author      : Mr.bin
 * @Date        : 2023-06-16 21:07:51
 * @LastEditTime: 2023-06-19 17:35:13
 * @Description : 路由
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  /*
   * 前面加"/"表示绝对路径，不加"/"表示相对路径
   * 一般嵌套路由中的子路由不需要加"/"，它会在父路由后自动加上"/子路由"
   * 比如父 "/father"，子 "child"，要想访问子路由，跳转链接需要写成 "/father/child"
   */

  {
    path: '/',
    name: 'layout',
    component: () => import('@/layout'),
    redirect: '/home',
    children: [
      // 首页
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home'),
        meta: ['首页']
      },
      // 调零
      {
        path: 'set-zero',
        name: 'set-zero',
        component: () => import('@/views/set/set-zero'),
        meta: ['调零']
      },
      // 设置K
      {
        path: 'set-k',
        name: 'set-k',
        component: () => import('@/views/set/set-k'),
        meta: ['设置K']
      },
      // 开发者
      {
        path: 'set-developer',
        name: 'set-developer',
        component: () => import('@/views/set/set-developer'),
        meta: ['开发者']
      },

      // 任务详情页
      {
        path: 'task',
        name: 'task',
        component: () => import('@/views/task'),
        meta: ['任务详情页']
      },

      /* 评估 */
      // 全身肌力测试-具体测量
      {
        path: 'body-muscle-measure',
        name: 'body-muscle-measure',
        component: () => import('@/views/test-mode/body-muscle/measure'),
        meta: ['全身肌力测试-具体测量']
      },
      // 全身肌力测试-项目介绍
      {
        path: 'cvRearProtraction',
        name: 'cvRearProtraction',
        component: () =>
          import('@/views/test-mode/body-muscle/introduce/cvRearProtraction'),
        meta: ['颈椎后伸']
      },
      {
        path: 'cvAnteflexion',
        name: 'cvAnteflexion',
        component: () =>
          import('@/views/test-mode/body-muscle/introduce/cvAnteflexion'),
        meta: ['颈椎前屈']
      },
      {
        path: 'cvRightSide',
        name: 'cvRightSide',
        component: () =>
          import('@/views/test-mode/body-muscle/introduce/cvRightSide'),
        meta: ['颈椎右侧屈']
      },
      {
        path: 'cvLeftSide',
        name: 'cvLeftSide',
        component: () =>
          import('@/views/test-mode/body-muscle/introduce/cvLeftSide'),
        meta: ['颈椎左侧屈']
      },
      {
        path: 'tRearProtraction',
        name: 'tRearProtraction',
        component: () =>
          import('@/views/test-mode/body-muscle/introduce/tRearProtraction'),
        meta: ['躯干后伸']
      },
      {
        path: 'tAnteflexion',
        name: 'tAnteflexion',
        component: () =>
          import('@/views/test-mode/body-muscle/introduce/tAnteflexion'),
        meta: ['躯干前屈']
      },
      {
        path: 'tLeftSide',
        name: 'tLeftSide',
        component: () =>
          import('@/views/test-mode/body-muscle/introduce/tLeftSide'),
        meta: ['躯干左侧屈']
      },
      {
        path: 'tRightSide',
        name: 'tRightSide',
        component: () =>
          import('@/views/test-mode/body-muscle/introduce/tRightSide'),
        meta: ['躯干右侧屈']
      },
      {
        path: 'ulPush',
        name: 'ulPush',
        component: () =>
          import('@/views/test-mode/body-muscle/introduce/ulPush'),
        meta: ['上肢推']
      },
      {
        path: 'ulPull',
        name: 'ulPull',
        component: () =>
          import('@/views/test-mode/body-muscle/introduce/ulPull'),
        meta: ['上肢拉']
      },
      {
        path: 'ulLeftAbducent',
        name: 'ulLeftAbducent',
        component: () =>
          import('@/views/test-mode/body-muscle/introduce/ulLeftAbducent'),
        meta: ['上肢左外展']
      },
      {
        path: 'ulRightAbducent',
        name: 'ulRightAbducent',
        component: () =>
          import('@/views/test-mode/body-muscle/introduce/ulRightAbducent'),
        meta: ['上肢右外展']
      },
      {
        path: 'llAfterLeftOut',
        name: 'llAfterLeftOut',
        component: () =>
          import('@/views/test-mode/body-muscle/introduce/llAfterLeftOut'),
        meta: ['下肢左后伸']
      },
      {
        path: 'llAfterRightOut',
        name: 'llAfterRightOut',
        component: () =>
          import('@/views/test-mode/body-muscle/introduce/llAfterRightOut'),
        meta: ['下肢右后伸']
      },
      {
        path: 'llLeftAbducent',
        name: 'llLeftAbducent',
        component: () =>
          import('@/views/test-mode/body-muscle/introduce/llLeftAbducent'),
        meta: ['下肢左外展']
      },
      {
        path: 'llRightAbducent',
        name: 'llRightAbducent',
        component: () =>
          import('@/views/test-mode/body-muscle/introduce/llRightAbducent'),
        meta: ['下肢右外展']
      },
      {
        path: 'llLeftInsideCollect',
        name: 'llLeftInsideCollect',
        component: () =>
          import('@/views/test-mode/body-muscle/introduce/llLeftInsideCollect'),
        meta: ['下肢左内收']
      },
      {
        path: 'llRightInsideCollect',
        name: 'llRightInsideCollect',
        component: () =>
          import(
            '@/views/test-mode/body-muscle/introduce/llRightInsideCollect'
          ),
        meta: ['下肢右内收']
      },

      /* 训练 */
      // 反馈训练-具体测量
      {
        path: 'feedback-measure',
        name: 'feedback-measure',
        component: () => import('@/views/train-mode/feedback/measure'),
        meta: ['反馈训练-具体测量']
      },
      // 肌耐力训练-具体测量
      {
        path: 'muscular-endurance-measure',
        name: 'muscular-endurance-measure',
        component: () =>
          import('@/views/train-mode/muscular-endurance/measure'),
        meta: ['肌耐力训练-具体测量']
      },
      // 肌肥大训练-具体测量
      {
        path: 'muscular-hypertrophy-measure',
        name: 'muscular-hypertrophy-measure',
        component: () =>
          import('@/views/train-mode/muscular-hypertrophy/measure'),
        meta: ['肌肥大训练-具体测量']
      }
    ]
  },

  /* 评估数据统一发送页面 */
  {
    path: '/test-send',
    name: 'test-send',
    component: () => import('@/views/test-mode/test-send'),
    meta: ['评估数据统一发送页面']
  },

  /* 训练数据统一发送页面 */
  {
    path: '/train-send',
    name: 'train-send',
    component: () => import('@/views/train-mode/train-send'),
    meta: ['训练数据统一发送页面']
  },

  {
    path: '/refresh',
    name: 'refresh',
    component: () => import('@/views/refresh')
  },
  {
    path: '/refresh-special',
    name: 'refresh-special',
    component: () => import('@/views/refresh-special'),
    meta: ['刷新中转页-测试模块专用']
  },

  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  routes,
  /* 自定义路由切换时页面如何滚动 */
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 } // 回到顶部
  }
})
export default router
