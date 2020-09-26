/*
 * @Author: your name
 * @Date: 2020-08-24 18:11:35
 * @LastEditTime: 2020-08-25 14:38:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \htmle:\豫力汽配生产管控系统\yuli_prodcontrolsystem\src\mock\post\api-admin\role\all\index.js
 */
module.exports=function(){
    return {
        "msg":"操作成功",
        "code":0,
        "page":[ {
            "roleId" : 1,
            "roleName" : "超级管理员",
            "menuIds" : "1,2,3,4,5,6,7,8,9,10,11,12,13,15,16,17,18,19,20,21,22,23,34,35,37,38,40,41,42,43,44,45",
            "remarks" : "1",
            "menuList" : [ {
              "menuId" : 45,
              "parentId" : 41,
              "name" : "出库管理",
              "url" : "/inventoryMgt/warehouseOut/list",
              "type" : 1,
              "checked" : true
            }, {
              "menuId" : 44,
              "parentId" : 41,
              "name" : "入库管理",
              "url" : "/inventoryMgt/warehousing/list",
              "type" : 1,
              "checked" : true
            }, {
              "menuId" : 43,
              "parentId" : 41,
              "name" : "物料管理",
              "url" : "/inventoryMgt/materiel/list",
              "type" : 1,
              "checked" : true
            }, {
              "menuId" : 42,
              "parentId" : 41,
              "name" : "库存管理",
              "url" : "/inventoryMgt/inventory/list",
              "type" : 1,
              "checked" : true
            }, {
              "menuId" : 41,
              "parentId" : 0,
              "name" : "库存管理",
              "type" : 0,
              "icon" : "iconfont  icon-kucun",
              "checked" : true
            }, {
              "menuId" : 40,
              "parentId" : 0,
              "name" : "客户管理",
              "url" : "/customer/manage",
              "type" : 0,
              "icon" : "iconfont  icon-custome",
              "orderNum" : 4,
              "checked" : true
            }, {
              "menuId" : 38,
              "parentId" : 0,
              "name" : "进度管理",
              "url" : "/progressMgt/list",
              "type" : 0,
              "icon" : "iconfont  icon-progress",
              "checked" : true
            }, {
              "menuId" : 37,
              "parentId" : 0,
              "name" : "工单管理",
              "url" : "/workOrderMgt/list",
              "type" : 0,
              "icon" : "iconfont  icon-gongdan",
              "checked" : true
            }, {
              "menuId" : 35,
              "parentId" : 15,
              "name" : "化验结果",
              "url" : "/productMgt/laborResult/list",
              "type" : 1,
              "checked" : true
            }, {
              "menuId" : 34,
              "parentId" : 15,
              "name" : "物料配比",
              "url" : "/productMgt/materialRatio/list",
              "type" : 1,
              "checked" : true
            }, {
              "menuId" : 23,
              "parentId" : 15,
              "name" : "发货阶段",
              "url" : "/productMgt/deliver/list",
              "type" : 1,
              "checked" : true
            }, {
              "menuId" : 22,
              "parentId" : 15,
              "name" : "包装阶段",
              "url" : "/productMgt/package/list",
              "type" : 1,
              "checked" : true
            }, {
              "menuId" : 21,
              "parentId" : 15,
              "name" : "组装阶段",
              "url" : "/productMgt/assemble/list",
              "type" : 1,
              "checked" : true
            }, {
              "menuId" : 20,
              "parentId" : 15,
              "name" : "加工阶段",
              "url" : "/productMgt/machining/list",
              "type" : 1,
              "checked" : true
            }, {
              "menuId" : 19,
              "parentId" : 15,
              "name" : "取出阶段",
              "url" : "/productMgt/takeOut/list",
              "type" : 1,
              "checked" : true
            }, {
              "menuId" : 18,
              "parentId" : 15,
              "name" : "电熔阶段",
              "url" : "/productMgt/electricSmelting/list",
              "type" : 1,
              "checked" : true
            }, {
              "menuId" : 17,
              "parentId" : 15,
              "name" : "砂型阶段",
              "url" : "/productMgt/sandMould/list",
              "type" : 1,
              "checked" : true
            }, {
              "menuId" : 16,
              "parentId" : 15,
              "name" : "生产计划",
              "url" : "/productMgt/plan/list",
              "type" : 1,
              "checked" : true
            }, {
              "menuId" : 15,
              "parentId" : 0,
              "name" : "生产管理",
              "type" : 0,
              "icon" : "iconfont  icon-product",
              "orderNum" : 3,
              "checked" : true
            }, {
              "menuId" : 13,
              "parentId" : 8,
              "name" : "已发运订单",
              "url" : "/orderMgt/delivered/list",
              "type" : 1,
              "checked" : true
            }, {
              "menuId" : 12,
              "parentId" : 8,
              "name" : "待发运订单",
              "url" : "/orderMgt/waitDespatch/list",
              "type" : 1,
              "checked" : true
            }, {
              "menuId" : 11,
              "parentId" : 8,
              "name" : "生产中订单",
              "url" : "/orderMgt/beProduct/list",
              "type" : 1,
              "checked" : true
            }, {
              "menuId" : 10,
              "parentId" : 8,
              "name" : "待生产订单",
              "url" : "/orderMgt/waitProduct/list",
              "type" : 1,
              "checked" : true
            }, {
              "menuId" : 9,
              "parentId" : 8,
              "name" : "订单列表",
              "url" : "/orderMgt/order/list",
              "type" : 1,
              "checked" : true
            }, {
              "menuId" : 8,
              "parentId" : 0,
              "name" : "订单管理",
              "type" : 0,
              "icon" : "iconfont icon-dingdanliebiao-01",
              "orderNum" : 2,
              "checked" : true
            }, {
              "menuId" : 7,
              "parentId" : 1,
              "name" : "角色管理",
              "url" : "/role/manage",
              "type" : 1,
              "checked" : true
            }, {
              "menuId" : 6,
              "parentId" : 1,
              "name" : "用户管理",
              "url" : "/user/manage",
              "type" : 1,
              "checked" : true
            }, {
              "menuId" : 5,
              "parentId" : 1,
              "name" : "部门管理",
              "url" : "/department/manage",
              "type" : 1,
              "checked" : true
            }, {
              "menuId" : 4,
              "parentId" : 1,
              "name" : "计算规则",
              "url" : "/calculation/rules",
              "perms" : "",
              "type" : 1,
              "checked" : true
            }, {
              "menuId" : 3,
              "parentId" : 1,
              "name" : "字典管理",
              "url" : "/dictionary/manage",
              "type" : 1,
              "icon" : "",
              "orderNum" : 4,
              "gmtCreate" : "2017-08-09 00:00:00",
              "gmtModified" : "2017-08-14 00:00:00",
              "checked" : true
            }, {
              "menuId" : 2,
              "parentId" : 1,
              "name" : "字典分类",
              "url" : "/dictionary/type",
              "perms" : "admin:menu:menu",
              "type" : 1,
              "icon" : "",
              "orderNum" : 4,
              "gmtCreate" : "2017-08-09 00:00:00",
              "checked" : true
            }, {
              "menuId" : 1,
              "parentId" : 0,
              "name" : "系统管理",
              "url" : "",
              "perms" : "",
              "type" : 0,
              "icon" : "iconfont icon-fenlei ",
              "orderNum" : 1,
              "checked" : true
            } ]
          }, {
            "roleId" : 6,
            "roleName" : "业务经理",
            "menuIds" : "8,9,10,11,12,13,15,16,17,18,34",
            "remarks" : "",
            "menuList" : [ {
              "menuId" : 45,
              "parentId" : 41,
              "name" : "出库管理",
              "url" : "/inventoryMgt/warehouseOut/list",
              "type" : 1,
              "checked" : false
            }, {
              "menuId" : 44,
              "parentId" : 41,
              "name" : "入库管理",
              "url" : "/inventoryMgt/warehousing/list",
              "type" : 1,
              "checked" : false
            }, {
              "menuId" : 43,
              "parentId" : 41,
              "name" : "物料管理",
              "url" : "/inventoryMgt/materiel/list",
              "type" : 1,
              "checked" : false
            }, {
              "menuId" : 42,
              "parentId" : 41,
              "name" : "库存管理",
              "url" : "/inventoryMgt/inventory/list",
              "type" : 1,
              "checked" : false
            }, {
              "menuId" : 41,
              "parentId" : 0,
              "name" : "库存管理",
              "type" : 0,
              "icon" : "iconfont  icon-kucun",
              "checked" : false
            }, {
              "menuId" : 40,
              "parentId" : 0,
              "name" : "客户管理",
              "url" : "/customer/manage",
              "type" : 0,
              "icon" : "iconfont  icon-custome",
              "orderNum" : 4,
              "checked" : false
            }, {
              "menuId" : 38,
              "parentId" : 0,
              "name" : "进度管理",
              "url" : "/progressMgt/list",
              "type" : 0,
              "icon" : "iconfont  icon-progress",
              "checked" : false
            }, {
              "menuId" : 37,
              "parentId" : 0,
              "name" : "工单管理",
              "url" : "/workOrderMgt/list",
              "type" : 0,
              "icon" : "iconfont  icon-gongdan",
              "checked" : false
            }, {
              "menuId" : 35,
              "parentId" : 15,
              "name" : "化验结果",
              "url" : "/productMgt/laborResult/list",
              "type" : 1,
              "checked" : false
            }, {
              "menuId" : 34,
              "parentId" : 15,
              "name" : "物料配比",
              "url" : "/productMgt/materialRatio/list",
              "type" : 1,
              "checked" : true
            }, {
              "menuId" : 23,
              "parentId" : 15,
              "name" : "发货阶段",
              "url" : "/productMgt/deliver/list",
              "type" : 1,
              "checked" : false
            }, {
              "menuId" : 22,
              "parentId" : 15,
              "name" : "包装阶段",
              "url" : "/productMgt/package/list",
              "type" : 1,
              "checked" : false
            }, {
              "menuId" : 21,
              "parentId" : 15,
              "name" : "组装阶段",
              "url" : "/productMgt/assemble/list",
              "type" : 1,
              "checked" : false
            }, {
              "menuId" : 20,
              "parentId" : 15,
              "name" : "加工阶段",
              "url" : "/productMgt/machining/list",
              "type" : 1,
              "checked" : false
            }, {
              "menuId" : 19,
              "parentId" : 15,
              "name" : "取出阶段",
              "url" : "/productMgt/takeOut/list",
              "type" : 1,
              "checked" : false
            }, {
              "menuId" : 18,
              "parentId" : 15,
              "name" : "电熔阶段",
              "url" : "/productMgt/electricSmelting/list",
              "type" : 1,
              "checked" : true
            }, {
              "menuId" : 17,
              "parentId" : 15,
              "name" : "砂型阶段",
              "url" : "/productMgt/sandMould/list",
              "type" : 1,
              "checked" : true
            }, {
              "menuId" : 16,
              "parentId" : 15,
              "name" : "生产计划",
              "url" : "/productMgt/plan/list",
              "type" : 1,
              "checked" : true
            }, {
              "menuId" : 15,
              "parentId" : 0,
              "name" : "生产管理",
              "type" : 0,
              "icon" : "iconfont  icon-product",
              "orderNum" : 3,
              "checked" : true
            }, {
              "menuId" : 13,
              "parentId" : 8,
              "name" : "已发运订单",
              "url" : "/orderMgt/delivered/list",
              "type" : 1,
              "checked" : true
            }, {
              "menuId" : 12,
              "parentId" : 8,
              "name" : "待发运订单",
              "url" : "/orderMgt/waitDespatch/list",
              "type" : 1,
              "checked" : true
            }, {
              "menuId" : 11,
              "parentId" : 8,
              "name" : "生产中订单",
              "url" : "/orderMgt/beProduct/list",
              "type" : 1,
              "checked" : true
            }, {
              "menuId" : 10,
              "parentId" : 8,
              "name" : "待生产订单",
              "url" : "/orderMgt/waitProduct/list",
              "type" : 1,
              "checked" : true
            }, {
              "menuId" : 9,
              "parentId" : 8,
              "name" : "订单列表",
              "url" : "/orderMgt/order/list",
              "type" : 1,
              "checked" : true
            }, {
              "menuId" : 8,
              "parentId" : 0,
              "name" : "订单管理",
              "type" : 0,
              "icon" : "iconfont icon-dingdanliebiao-01",
              "orderNum" : 2,
              "checked" : true
            }, {
              "menuId" : 7,
              "parentId" : 1,
              "name" : "角色管理",
              "url" : "/role/manage",
              "type" : 1,
              "checked" : false
            }, {
              "menuId" : 6,
              "parentId" : 1,
              "name" : "用户管理",
              "url" : "/user/manage",
              "type" : 1,
              "checked" : false
            }, {
              "menuId" : 5,
              "parentId" : 1,
              "name" : "部门管理",
              "url" : "/department/manage",
              "type" : 1,
              "checked" : false
            }, {
              "menuId" : 4,
              "parentId" : 1,
              "name" : "计算规则",
              "url" : "/calculation/rules",
              "perms" : "",
              "type" : 1,
              "checked" : false
            }, {
              "menuId" : 3,
              "parentId" : 1,
              "name" : "字典管理",
              "url" : "/dictionary/manage",
              "type" : 1,
              "icon" : "",
              "orderNum" : 4,
              "gmtCreate" : "2017-08-09 00:00:00",
              "gmtModified" : "2017-08-14 00:00:00",
              "checked" : false
            }, {
              "menuId" : 2,
              "parentId" : 1,
              "name" : "字典分类",
              "url" : "/dictionary/type",
              "perms" : "admin:menu:menu",
              "type" : 1,
              "icon" : "",
              "orderNum" : 4,
              "gmtCreate" : "2017-08-09 00:00:00",
              "checked" : false
            }, {
              "menuId" : 1,
              "parentId" : 0,
              "name" : "系统管理",
              "url" : "",
              "perms" : "",
              "type" : 0,
              "icon" : "iconfont icon-fenlei ",
              "orderNum" : 1,
              "checked" : false
            } ]
          } ]
      }
}