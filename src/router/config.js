/*
 * @Author: zhanggenyuan
 * @Date: 2020-08-06 15:01:58
 * @LastEditTime: 2020-09-08 13:53:31
 * @Description: 路由配置文件
 */

export default [{
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: '登录',
    component: () => import('@/pages/login/index.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/pages/layout/home.vue'),
    children: [
      // 系统设置类
      {
        path: '/dictionary/manage',
        name: 'dictionaryManage',
        meta: ['系统管理', '字典管理'],
        component: () => import('@/pages/admin/dictionary/manage/index.vue')
      },
      {
        path: '/menus/manage',
        name: 'menuManage',
        meta: ['系统管理', '菜单管理'],
        component: () => import('@/pages/admin/menu/manage/index.vue')
      },
      {
        path: '/department/manage',
        name: 'departmentManage',
        meta: ['系统管理', '部门管理'],
        component: () => import('@/pages/admin/department/manage/index.vue')
      },
      {
        path: '/user/manage',
        name: 'userManage',
        meta: ['系统管理', '用户管理'],
        component: () => import('@/pages/admin/user/manage/index.vue')
      },
      {
        path: '/role/manage',
        name: 'roleManage',
        meta: ['系统管理', '角色管理'],
        component: () => import('@/pages/admin/role/manage/index.vue')
      }
    ]
  }, {
    path: '*',
    component: () => import('@/pages/error/index.vue')
  },
];