/**
 * @file 登录接口返回
 * @author donghonghyan
 * @date 2020-06-01
 */

module.exports = function () {
  return {
    code: 0,
    msg: '登录成功',
    router: [{
      id: 3,
      name: '系统管理',
      leaf: false,
      menuShow: true,
      parentId: 0,
      iconCls: 'iconfont icon-xitongguanli',
      children: [
        {
          path: '/dictionary/manage',
          id: 227,
          name: '字典管理',
          leaf: true,
          menuShow: true,
          parentId: 3,
          iconCls: '',
          children: [{
              path: '/api-admin/dict/save',
              id: 235,
              name: '新增',
              leaf: false,
              menuShow: true,
              parentId: 227,
              children: []
            },
            {
              path: '/api-admin/dict/delete',
              id: 237,
              name: '删除',
              leaf: false,
              menuShow: true,
              parentId: 227,
              children: []
            },
            {
              path: '/dictionary/list',
              id: 229,
              name: '字典列表',
              leaf: false,
              menuShow: true,
              parentId: 227,
              children: []
            },
            {
              path: '/api-admin/dict/update',
              id: 236,
              name: '编辑',
              leaf: false,
              menuShow: true,
              parentId: 227,
              children: []
            }
          ]
        },
        {
          path: '/user/manage',
          id: 6,
          name: '用户管理',
          leaf: true,
          menuShow: true,
          parentId: 3,
          iconCls: '',
          children: [{
              path: '/api-admin/user',
              id: 14,
              name: '删除',
              leaf: false,
              menuShow: true,
              parentId: 6,
              children: []
            },
            {
              path: '/api-admin/user/resetPwd',
              id: 26,
              name: '重置密码',
              leaf: false,
              menuShow: true,
              parentId: 6,
              iconCls: '',
              children: []
            },
            {
              path: '/api-admin/user',
              id: 13,
              name: '编辑',
              leaf: false,
              menuShow: true,
              parentId: 6,
              iconCls: '',
              children: []
            },
            {
              path: '/api-admin/user',
              id: 12,
              name: '新增',
              leaf: false,
              menuShow: true,
              parentId: 6,
              iconCls: '',
              children: []
            },
            {
              path: '/api-admin/user',
              id: 24,
              name: '批量删除',
              leaf: false,
              menuShow: true,
              parentId: 6,
              iconCls: '',
              children: []
            },
            {
              path: '/api-admin/user/disable',
              id: 25,
              name: '停用',
              leaf: false,
              menuShow: true,
              parentId: 6,
              children: []
            }
          ]
        },
        {
          "path" : "/department/manage",
          "id" : 5,
          "name" : "部门管理",
          "leaf" : true,
          "menuShow" : true,
          "parentId" : 1,
          "children" : [ ]
        },
        {
          path: '/menus/manage',
          id: 4,
          name: '菜单管理',
          leaf: true,
          menuShow: true,
          parentId: 3,
          iconCls: '',
          children: [{
              path: '/api-admin/menu',
              id: 14,
              name: '删除',
              leaf: false,
              menuShow: true,
              parentId: 6,
              children: []
            },
            {
              path: '/api-admin/menu',
              id: 13,
              name: '编辑',
              leaf: false,
              menuShow: true,
              parentId: 6,
              iconCls: '',
              children: []
            },
            {
              path: '/api-admin/menu',
              id: 12,
              name: '新增',
              leaf: false,
              menuShow: true,
              parentId: 6,
              iconCls: '',
              children: []
            }
          ]
        },
        {
          path: '/role/manage',
          id: 7,
          name: '角色管理',
          leaf: true,
          menuShow: true,
          parentId: 3,
          iconCls: '',
          children: [{
              path: '/api-admin/role',
              id: 56,
              name: '删除',
              leaf: false,
              menuShow: true,
              parentId: 7,
              children: []
            },
            {
              path: '/api-admin/role',
              id: 55,
              name: '编辑',
              leaf: false,
              menuShow: true,
              parentId: 7,
              iconCls: '',
              children: []
            },
            {
              path: '/api-admin/role/batchRemove',
              id: 62,
              name: '批量删除',
              leaf: false,
              menuShow: true,
              parentId: 7,
              children: []
            },
            {
              path: '/api-admin/role',
              id: 15,
              name: '新增',
              leaf: false,
              menuShow: true,
              parentId: 7,
              iconCls: '',
              children: []
            }
          ]
        }
      ]
    },{
      id: 8,
      name: '产品管理',
      leaf: false,
      menuShow: true,
      parentId: 0,
      iconCls: 'iconfont icon-chanpin',
      children: [
        {
          path: '/product/category/list',
          id: 227,
          name: '产品类别管理',
          leaf: true,
          menuShow: true,
          parentId: 3,
          iconCls: '',
          children: [{
              path: '/product/category/save',
              id: 235,
              name: '新增',
              leaf: false,
              menuShow: true,
              parentId: 227,
              children: []
            },
            {
              path: '/product/category/delete',
              id: 237,
              name: '删除',
              leaf: false,
              menuShow: true,
              parentId: 227,
              children: []
            },
            {
              path: '/product/category/list',
              id: 229,
              name: '类别列表',
              leaf: false,
              menuShow: true,
              parentId: 227,
              children: []
            },
            {
              path: '/product/category/edit',
              id: 236,
              name: '编辑',
              leaf: false,
              menuShow: true,
              parentId: 227,
              children: []
            }
          ]
        },
        {
          path: '/product/type/list',
          id: 227,
          name: '产品型号管理',
          leaf: true,
          menuShow: true,
          parentId: 3,
          iconCls: '',
          children: [{
              path: '/product/type/save',
              id: 235,
              name: '新增',
              leaf: false,
              menuShow: true,
              parentId: 227,
              children: []
            },
            {
              path: '/product/type/delete',
              id: 237,
              name: '删除',
              leaf: false,
              menuShow: true,
              parentId: 227,
              children: []
            },
            {
              path: '/product/type/list',
              id: 229,
              name: '类别列表',
              leaf: false,
              menuShow: true,
              parentId: 227,
              children: []
            },
            {
              path: '/product/type/edit',
              id: 236,
              name: '编辑',
              leaf: false,
              menuShow: true,
              parentId: 227,
              children: []
            }
          ]
        },
      ]
    },{
      id: 10,
      name: '工单管理',
      leaf: false,
      menuShow: true,
      parentId: 0,
      iconCls: 'iconfont icon-gongdan',
      path:'/workOrder/manage',
      children: []
    },{
      id: 9,
      name: '报货管理',
      leaf: false,
      menuShow: true,
      parentId: 0,
      iconCls: 'iconfont icon-baohuo',
      path:'/baohuo/manage',
      children: []
    },{
      id: 11,
      name: '采购管理',
      leaf: false,
      menuShow: true,
      parentId: 0,
      iconCls: 'iconfont icon-buy-car',
      path:'/purchase/manage',
      children: [{
        id: 11,
        name: '铜线采购',
        leaf: false,
        menuShow: true,
        parentId: 0,
        iconCls: '',
        path:'/purchase/manage/list',
        children: []
      },{
        id: 11,
        name: '采购单',
        leaf: false,
        menuShow: true,
        parentId: 0,
        iconCls: '',
        path:'/purchase/manage/orderList',
        children: []
      }]
    },{
      id: 12,
      name: '半成品库存',
      leaf: false,
      menuShow: true,
      parentId: 0,
      iconCls: 'iconfont icon-banchengpin',
      path:'/banchengpin/stock',
      children: []
    },{
      id: 13,
      name: '工资管理',
      leaf: false,
      menuShow: true,
      parentId: 0,
      iconCls: '',
      path:'/salary/manage',
      children: []
    },{
      id: 14,
      name: '生产任务管理',
      leaf: false,
      menuShow: true,
      parentId: 0,
      iconCls: '',
      path:'/productTask/manage',
      children: []
    }],
    code: 0,
    perms: [
      'admin:dict:save',
      'admin:role:remove',
      'admin:dictType:delete',
      'admin:branch:edit',
      'admin:dict:delete',
      'admin:role:edit',
      'admin:dictType:save',
      'admin:branch:add',
      'admin:menu:list',
      'admin:dictonary:list',
      'admin:role:batchRemove',
      'admin:branch:list',
      'admin:menu:batchRemove',
      'admin:dict:update',
      'admin:menu:userMenus',
      'admin:dictType:update',
      'admin:branch:delete',
      'admin:user:remove',
      'admin:menu:remove',
      'admin:user:resetPwd',
      'admin:user:edit',
      'admin:user:add',
      'admin:user:batchRemove',
      'admin:menu:edit',
      'admin:branch:branch',
      'admin:role:add',
      'admin:user:disable',
      'admin:menu:add',
      'admin:role:role',
      'admin:user:user',
      'admin:menu:menu',
      'admin:dictionary:type',
      'admin:dictionary:list'
    ],
    user: {
      userId: 1,
      username: 'admin',
      name: '超级管理员',
      deptId: 1,
      password: 'b6583e756408e6af4533bbcc04ae4499',
      mobile: '17699999999',
      status: 1,
      userIdCreate: 1,
      gmtCreate: '2017-08-15 00:00:00',
      gmtModified: '2018-11-27 14:27:29',
      picturePath: 'http://tf.ibiandan.cn:8004/files/customer/18/73/ed343c2e-ce78-40bb-bf7e-9a7cde9bf684'
    },
    token: 'eyJhbGciOiJIUzI1NiJ9'
  };
};