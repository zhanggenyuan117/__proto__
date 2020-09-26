/*
 * @Author: yanggaiting
 * @Date: 2020-08-24 10:11:35
 * @LastEditTime: 2020-09-01 09:03:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \htmle:\豫力汽配生产管控系统\yuli_prodcontrolsystem\src\mock\get\api-admin\user\list\index.js
 */
module.exports = function () {
    return {
        "msg": "操作成功",
        "code": 0,
        "page": {
            "total": 12,
            "rows": [
                {
                    "id": 11,
                     "jobNumber": "20133231",
                    "username": "peiliao2",
                    "teleNumber":"123456",//密码
                    "deptId": 3,
                    "deptName":"生产部",
                    "roleId":2,
                    "roleName":"技术员",
                    "nickName":"王技术员",
                    "status":1,
                },
                {
                    "id": 12,
                     "jobNumber": "20133231",
                    "username": "peiliao2",
                    "teleNumber":"123456",//密码
                    "deptId": 4,
                    "deptName":"采购部",
                    "roleId":3,
                    "roleName":"采购员",
                    "nickName":"hfee",
                    "status":1,
                },
            ]
        }
    }
}