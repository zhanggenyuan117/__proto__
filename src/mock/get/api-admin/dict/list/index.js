/*
 * @Author: your name
 * @Date: 2020-08-24 10:11:35
 * @LastEditTime: 2020-09-01 14:26:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \htmle:\豫力汽配生产管控系统\yuli_prodcontrolsystem\src\mock\get\api-admin\dictType\list\index.js
 */
/**
 * @file 字典分类接口
 * @author donghongyan
 * @date 2020-06-04
 */

module.exports = function () {
  return {
    "msg" : "操作成功",
    "code" : 0,
    "page" : {
      total:10,
      rows:[ {
        "id" : 2,
        "className" : "贸易区域",
        "state":true,
        "children" : [ {
          "id" : 6,
          "name" : "内贸"
        }, {
          "id" : 7,
          "name" : "外贸"
        } ],
        "delFlag" : "1"
      }, {
        "id" : 3,
        "className" : "炉型",
        "state":false,
        "children" : [ {
          "id" : 8,
          "name" : "空气助燃马蹄焰窑炉"
        }, {
          "id" : 9,
          "name" : "全氧燃烧窑炉"
        }, {
          "id" : 10,
          "name" : "电熔窑炉"
        }, {
          "id" : 11,
          "name" : "全氧+电助熔"
        }, {
          "id" : 12,
          "name" : "马蹄焰+电助熔"
        }, {
          "id" : 58,
          "name" : "小炉"
        } ],
        "delFlag" : "1"
      }, {
        "id" : 4,
        "className" : "玻璃种类",
        "code":4,
        "state":true,
        "children" : [ {
          "id" : 14,
          "name" : "普通钠钙玻璃"
        }, {
          "id" : 15,
          "name" : "高白料玻璃"
        }, {
          "id" : 16,
          "name" : "晶白料玻璃"
        }, {
          "id" : 17,
          "name" : "乳白料玻璃"
        }, {
          "id" : 18,
          "name" : "高硼硅玻璃"
        }, {
          "id" : 19,
          "name" : "玻璃纤维"
        }, {
          "id" : 20,
          "name" : "色料玻璃"
        } ],
        "delFlag" : "1"
      }]
    }
  }
}