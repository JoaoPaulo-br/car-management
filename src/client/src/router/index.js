import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */

const userListRoute = {
  path: '/user-list',
  component: Layout,
  children: [{
    path: 'index',
    name: 'Form Test',
    component: () => import('@/views/user-list/index'),
    meta: {
      title: 'Users',
      icon: 'table'
    }
  }]
}
const carListRoute = {
  path: '/car-list',
  component: Layout,
  children: [{
    path: 'index',
    name: 'Car List',
    component: () => import('@/views/car-list/index'),
    meta: {
      title: 'Cars',
      icon: 'table'
    }
  }]
}
const adminListRoute = {
  path: '/admin-list',
  component: Layout,
  children: [{
    path: 'index',
    name: 'Admins',
    component: () => import('@/views/admin-list/index'),
    meta: {
      title: 'Admins',
      icon: 'table'
    }
  }]
}
const addCarRoute = {
  path: '/add-car',
  component: Layout,
  children: [{
    path: 'index',
    name: 'Add Car',
    component: () => import('@/views/add-car/index'),
    meta: {
      title: 'Add Car',
      icon: 'form'
    }
  }]
}
const updateCarRoute = {
  path: '/update-car/:id',
  component: Layout,
  children: [{
    path: '',
    name: 'Update Car',
    component: () => import('@/views/update-car/index'),
    meta: {
      title: '',
      icon: ''
    }
  }]
}
const myCarRoute = {
  path: '/my-car',
  component: Layout,
  children: [{
    path: '',
    name: 'Update Car',
    component: () => import('@/views/my-car/index'),
    meta: {
      title: 'My Car',
      icon: 'form'
    }
  }]
}
const updateUserRoute = {
  path: '/update-user/:id',
  component: Layout,
  children: [{
    path: '',
    name: 'Update User',
    component: () => import('@/views/update-user/index'),
    meta: {
      title: '',
      icon: ''
    }
  }]
}
const commonRoutes = [{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  }, {
    path: '/signup',
    component: () => import('@/views/signup/index'),
    hidden: true
  }, {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  }, {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: 'Dashboard',
        icon: 'dashboard'
      }
    }]
  }, // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/dashboard',
    hidden: true
  }
]

const regularUserRoutes = [
  ...commonRoutes,
  myCarRoute,
  updateUserRoute
]

const adminRoutes = [
  ...commonRoutes,
  carListRoute,
  userListRoute,
  addCarRoute,
  updateCarRoute,
  updateUserRoute
]

const superAdminRoutes = [
  ...commonRoutes,
  userListRoute,
  adminListRoute,
  updateUserRoute
]

export const constantRoutes = [
  ...commonRoutes
]

function getRoutes() {
  const currentUserInfo = JSON.parse(localStorage.getItem('currentUserInfo'))
  let filteredRoutes = []
  if (currentUserInfo && currentUserInfo.isSuperAdmin) {
    filteredRoutes = superAdminRoutes
  } else if (currentUserInfo && currentUserInfo.isAdmin) {
    filteredRoutes = adminRoutes
  } else {
    filteredRoutes = regularUserRoutes
  }
  return filteredRoutes
}

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: getRoutes()
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const currentUserInfo = JSON.parse(localStorage.getItem('currentUserInfo'))
  let filteredRoutes = []
  if (currentUserInfo && currentUserInfo.isSuperAdmin) {
    filteredRoutes = superAdminRoutes
  } else if (currentUserInfo && currentUserInfo.isAdmin) {
    filteredRoutes = adminRoutes
  } else {
    filteredRoutes = regularUserRoutes
  }
  const newRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({
      y: 0
    }),
    routes: filteredRoutes
  })
  router.matcher = newRouter.matcher // reset router
}

export default router
