/*
 * @Author: yanggaiting
 * @Date: 2020-09-01 10:39:25
 * @LastEditTime: 2020-09-01 14:15:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Editexp
 * @FilePath: \htmle:\豫力汽配生产管控系统\yuli_prodcontrolsystem\src\mock\post\api-admin\menu\list\index.js
 */
module.exports = function() {
  return {
    msg: "操作成功",
    code: 0,
    page: [
      {
        id: 1,
        name: "系统管理",
        url: "menu/index",
        "icon ": "",
        pid: 0,
        status: 1,
        children: [
          {
            id: 2,
            name: "角色管理",
            url: "menu/index",
            "icon ": "",
            pid: 1,
            status: 1,
            children: [
              {
                id: 3,
                name: "新增按钮",
                url: "menu/index",
                "icon ": "",
                pid: 2,
                status: 2,
              },
            ],
          },
        ],
      },
    ],
  };
};
