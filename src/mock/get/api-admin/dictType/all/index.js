/*
 * @Author: your name
 * @Date: 2020-08-24 10:11:35
 * @LastEditTime: 2020-09-01 14:21:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \htmle:\豫力汽配生产管控系统\yuli_prodcontrolsystem\src\mock\get\api-admin\dictType\list\index.js
 */
/**
 * @file 字典分类接口
 * @author donghongyan
 * @date 2020-06-04
 */

module.exports = function() {
  return {
    msg: "操作成功",
    code: 0,
    page: [
      {
        id: 1,
        name: "贸易区域",
        remarks: "",
        delFlag: "0",
        children: [
          {
            id: 7,
            name: "内贸",
          },
          {
            id: 8,
            name: "外贸",
          },
        ],
      },
      {
        id: 3,
        name: "计件单位",
        remarks: "计量单位",
        delFlag: "0",
        children: [
          {
            id: 7,
            name: "kg",
          },
          {
            id: 8,
            name: "g",
          },
        ],
      },
    ],
  };
};
