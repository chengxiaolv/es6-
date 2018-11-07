import { getParams } from '@/libs/util'
import md5 from 'md5'

const USER_MAP = {
    "ywy1": {
        "passport": {
            "user": {
                "id": "1cca4241bf21473e8dfc3f69d6d260ec",
                "nickName": null,
                "avatar": "",
                "deptName": "运营"
            },
            "roles": [
                "运营"
            ],
            "perms": [
                {
                    "deep": 1,
                    "resource": null,
                    "name": "信贷管理"
                },
                {
                    "deep": 2,
                    "resource": "com:cstcustomer:index",
                    "name": "客户基础管理模块"
                },
                {
                    "deep": 2,
                    "resource": "corp:cstcorp:index",
                    "name": "企业客户管理模块"
                },
                {
                    "deep": 2,
                    "resource": "personal:cstpersonal:index",
                    "name": "个人客户管理模块"
                },
                {
                    "deep": 3,
                    "resource": "com:cstcustomer:save",
                    "name": "客户基础管理模块-数据新增"
                },
                {
                    "deep": 3,
                    "resource": "corp:cstcorp:save",
                    "name": "企业客户管理模块-数据新增"
                },
                {
                    "deep": 3,
                    "resource": "personal:cstpersonal:save",
                    "name": "个人客户管理模块-数据新增"
                },
                {
                    "deep": 3,
                    "resource": "com:cstcustomer:update",
                    "name": "客户基础管理模块-数据修改"
                },
                {
                    "deep": 3,
                    "resource": "corp:cstcorp:update",
                    "name": "企业客户管理模块-数据修改"
                },
                {
                    "deep": 3,
                    "resource": "personal:cstpersonal:update",
                    "name": "个人客户管理模块-数据修改"
                },
                {
                    "deep": 3,
                    "resource": "personal:cstpersonal:delete",
                    "name": "个人客户管理模块-数据删除"
                },
                {
                    "deep": 3,
                    "resource": "com:cstcustomer:delete",
                    "name": "客户基础管理模块-数据删除"
                },
                {
                    "deep": 3,
                    "resource": "corp:cstcorp:delete",
                    "name": "企业客户管理模块-数据删除"
                },
                {
                    "deep": 3,
                    "resource": "corp:cstcorp:info",
                    "name": "企业客户管理模块-查看数据明细"
                },
                {
                    "deep": 3,
                    "resource": "com:cstcustomer:info",
                    "name": "客户基础管理模块-查看数据明细"
                },
                {
                    "deep": 3,
                    "resource": "personal:cstpersonal:info",
                    "name": "个人客户管理模块-查看数据明细"
                },
                {
                    "deep": 3,
                    "resource": "com:cstcustomer:list",
                    "name": "客户基础管理模块-查询数据列表"
                },
                {
                    "deep": 3,
                    "resource": "personal:cstpersonal:list",
                    "name": "个人客户管理模块-查询数据列表"
                },
                {
                    "deep": 3,
                    "resource": "corp:cstcorp:list",
                    "name": "企业客户管理模块-查询数据列表"
                },
                {
                    "deep": 2,
                    "resource": "personal:cstpersonalcareer:index",
                    "name": "个人客户职业管理模块"
                },
                {
                    "deep": 2,
                    "resource": "corp:cstcorpshareholder:index",
                    "name": "企业客户股东管理模块"
                },
                {
                    "deep": 2,
                    "resource": "com:cstcase:index",
                    "name": "案件基本管理模块"
                },
                {
                    "deep": 3,
                    "resource": "com:cstcase:save",
                    "name": "案件基本管理模块-数据新增"
                },
                {
                    "deep": 3,
                    "resource": "personal:cstpersonalcareer:save",
                    "name": "个人客户职业管理模块-数据新增"
                },
                {
                    "deep": 3,
                    "resource": "corp:cstcorpshareholder:save",
                    "name": "企业客户股东管理模块-数据新增"
                },
                {
                    "deep": 3,
                    "resource": "com:cstcase:update",
                    "name": "案件基本管理模块-数据修改"
                },
                {
                    "deep": 3,
                    "resource": "corp:cstcorpshareholder:update",
                    "name": "企业客户股东管理模块-数据修改"
                },
                {
                    "deep": 3,
                    "resource": "personal:cstpersonalcareer:update",
                    "name": "个人客户职业管理模块-数据修改"
                },
                {
                    "deep": 3,
                    "resource": "personal:cstpersonalcareer:delete",
                    "name": "个人客户职业管理模块-数据删除"
                },
                {
                    "deep": 3,
                    "resource": "corp:cstcorpshareholder:delete",
                    "name": "企业客户股东管理模块-数据删除"
                },
                {
                    "deep": 3,
                    "resource": "com:cstcase:delete",
                    "name": "案件基本管理模块-数据删除"
                },
                {
                    "deep": 3,
                    "resource": "com:cstcase:info",
                    "name": "案件基本管理模块-查看数据明细"
                },
                {
                    "deep": 3,
                    "resource": "personal:cstpersonalcareer:info",
                    "name": "个人客户职业管理模块-查看数据明细"
                },
                {
                    "deep": 3,
                    "resource": "corp:cstcorpshareholder:info",
                    "name": "企业客户股东管理模块-查看数据明细"
                },
                {
                    "deep": 3,
                    "resource": "personal:cstpersonalcareer:list",
                    "name": "个人客户职业管理模块-查询数据列表"
                },
                {
                    "deep": 3,
                    "resource": "corp:cstcorpshareholder:list",
                    "name": "企业客户股东管理模块-查询数据列表"
                },
                {
                    "deep": 3,
                    "resource": "com:cstcase:list",
                    "name": "案件基本管理模块-查询数据列表"
                },
                {
                    "deep": 2,
                    "resource": "corp:cstcorpexecutive:index",
                    "name": "企业客户高管管理模块"
                },
                {
                    "deep": 2,
                    "resource": "personal:cstpersonalincomeexpend:index",
                    "name": "个人客户收支管理模块"
                },
                {
                    "deep": 3,
                    "resource": "personal:cstpersonalincomeexpend:save",
                    "name": "个人客户收支管理模块-数据新增"
                },
                {
                    "deep": 3,
                    "resource": "corp:cstcorpexecutive:save",
                    "name": "企业客户高管管理模块-数据新增"
                },
                {
                    "deep": 3,
                    "resource": "corp:cstcorpexecutive:update",
                    "name": "企业客户高管管理模块-数据修改"
                },
                {
                    "deep": 3,
                    "resource": "personal:cstpersonalincomeexpend:update",
                    "name": "个人客户收支管理模块-数据修改"
                },
                {
                    "deep": 3,
                    "resource": "corp:cstcorpexecutive:delete",
                    "name": "企业客户高管管理模块-数据删除"
                },
                {
                    "deep": 3,
                    "resource": "personal:cstpersonalincomeexpend:delete",
                    "name": "个人客户收支管理模块-数据删除"
                },
                {
                    "deep": 3,
                    "resource": "personal:cstpersonalincomeexpend:info",
                    "name": "个人客户收支管理模块-查看数据明细"
                },
                {
                    "deep": 3,
                    "resource": "corp:cstcorpexecutive:info",
                    "name": "企业客户高管管理模块-查看数据明细"
                },
                {
                    "deep": 3,
                    "resource": "corp:cstcorpexecutive:list",
                    "name": "企业客户高管管理模块-查询数据列表"
                },
                {
                    "deep": 3,
                    "resource": "personal:cstpersonalincomeexpend:list",
                    "name": "个人客户收支管理模块-查询数据列表"
                },
                {
                    "deep": 2,
                    "resource": "com:cstcontract:index",
                    "name": "合同管理模块"
                },
                {
                    "deep": 2,
                    "resource": "corp:cstcorpchange:index",
                    "name": "企业客户重大变更管理模块"
                },
                {
                    "deep": 2,
                    "resource": "personal:cstpersonalaccount:index",
                    "name": "个人客户账户管理管理模块"
                },
                {
                    "deep": 3,
                    "resource": "personal:cstpersonalaccount:save",
                    "name": "个人客户账户管理管理模块-数据新增"
                },
                {
                    "deep": 3,
                    "resource": "corp:cstcorpchange:save",
                    "name": "企业客户重大变更管理模块-数据新增"
                },
                {
                    "deep": 3,
                    "resource": "com:cstcontract:save",
                    "name": "合同管理模块-数据新增"
                },
                {
                    "deep": 3,
                    "resource": "com:cstcontract:update",
                    "name": "合同管理模块-数据修改"
                },
                {
                    "deep": 3,
                    "resource": "personal:cstpersonalaccount:update",
                    "name": "个人客户账户管理管理模块-数据修改"
                },
                {
                    "deep": 3,
                    "resource": "corp:cstcorpchange:update",
                    "name": "企业客户重大变更管理模块-数据修改"
                },
                {
                    "deep": 3,
                    "resource": "com:cstcontract:delete",
                    "name": "合同管理模块-数据删除"
                },
                {
                    "deep": 3,
                    "resource": "corp:cstcorpchange:delete",
                    "name": "企业客户重大变更管理模块-数据删除"
                },
                {
                    "deep": 3,
                    "resource": "personal:cstpersonalaccount:delete",
                    "name": "个人客户账户管理管理模块-数据删除"
                },
                {
                    "deep": 3,
                    "resource": "com:cstcontract:info",
                    "name": "合同管理模块-查看数据明细"
                },
                {
                    "deep": 3,
                    "resource": "personal:cstpersonalaccount:info",
                    "name": "个人客户账户管理管理模块-查看数据明细"
                },
                {
                    "deep": 3,
                    "resource": "corp:cstcorpchange:info",
                    "name": "企业客户重大变更管理模块-查看数据明细"
                },
                {
                    "deep": 3,
                    "resource": "corp:cstcorpchange:list",
                    "name": "企业客户重大变更管理模块-查询数据列表"
                },
                {
                    "deep": 3,
                    "resource": "com:cstcontract:list",
                    "name": "合同管理模块-查询数据列表"
                },
                {
                    "deep": 3,
                    "resource": "personal:cstpersonalaccount:list",
                    "name": "个人客户账户管理管理模块-查询数据列表"
                },
                {
                    "deep": 2,
                    "resource": "corp:cstcorpproduction:index",
                    "name": "企业客户产品管理模块"
                },
                {
                    "deep": 2,
                    "resource": "personal:cstpersonalcredit:index",
                    "name": "个人客户信用管理模块"
                },
                {
                    "deep": 3,
                    "resource": "personal:cstpersonalcredit:save",
                    "name": "个人客户信用管理模块-数据新增"
                },
                {
                    "deep": 3,
                    "resource": "corp:cstcorpproduction:save",
                    "name": "企业客户产品管理模块-数据新增"
                },
                {
                    "deep": 3,
                    "resource": "personal:cstpersonalcredit:update",
                    "name": "个人客户信用管理模块-数据修改"
                },
                {
                    "deep": 3,
                    "resource": "corp:cstcorpproduction:update",
                    "name": "企业客户产品管理模块-数据修改"
                },
                {
                    "deep": 3,
                    "resource": "corp:cstcorpproduction:delete",
                    "name": "企业客户产品管理模块-数据删除"
                },
                {
                    "deep": 3,
                    "resource": "personal:cstpersonalcredit:delete",
                    "name": "个人客户信用管理模块-数据删除"
                },
                {
                    "deep": 3,
                    "resource": "corp:cstcorpproduction:info",
                    "name": "企业客户产品管理模块-查看数据明细"
                },
                {
                    "deep": 3,
                    "resource": "personal:cstpersonalcredit:info",
                    "name": "个人客户信用管理模块-查看数据明细"
                },
                {
                    "deep": 3,
                    "resource": "corp:cstcorpproduction:list",
                    "name": "企业客户产品管理模块-查询数据列表"
                },
                {
                    "deep": 3,
                    "resource": "personal:cstpersonalcredit:list",
                    "name": "个人客户信用管理模块-查询数据列表"
                }
            ]
        }
    }
}

export const login = ({ body }) => {
    return {
        code: 200,
        data: USER_MAP[body.userName],
        msg: ''
    }
}

export const getUserInfo = ({ body, url }) => {
    var token = body.token
    var userName = Object.keys(USER_MAP).find(k => md5(k) == token)

    return {
        code: 200,
        data: USER_MAP[userName],
        msg: ''
    }
}

export const logout = () => {
    return {
        code: 200,
        data: null,
        msg: ''
    }
}
