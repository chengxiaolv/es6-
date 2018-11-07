import Dict from '@/components/global/dict'

// 身份证 2018-08-31
const idCardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/

// 中国手机号 2018-05-16
const phoneReg = /^(0|86|17951)?(13[0-9]|14[01456789]|15[0-9]|16[56]|17[0-8]|18[0-9]|198|199)[0-9]{8}$/

// 中国固定电话
const landlinePhoneReg = /^0\d{2,3}-?\d{7,8}$/

//邮政编码
const postCodeReg = /^\d{6}$/

//传真号码
const faxReg = /^(\d{3,4}-)?\d{7,8}$/

//组织机构代码
const zzjgReg = /^([0-9A-Z]){8}-[0-9|X]$/

//营业执照
const licenseReg = /(^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$)|(^\d{15}$)/

//社会信用代码
const socialReg = /^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/

//银行卡号
const bankNumberReg = /^([1-9]{1})(\d{14}|\d{18}|\d{15})$/

//1-100
const rateReg = /^([1-9][0-9]{0,1}|100)$/

export function tel(rule, value, callback, source, options) {
    var msg = "请输入正确的手机号码"

    // 排除空值
    if (value == "" || value == null || value == undefined) {
        return callback()
    }

    if (typeof value != "string" ||
        value.length != 11 ||
        phoneReg.test(value) == false
    ) {
        return callback(new Error(msg))
    }

    // errors为空则表示校验通过，反之不过
    return callback()
}

export function phone(rule, value, callback, source, options) {
    var msg = "请输入正确的电话"

    // 排除空值
    if (value == "" || value == null || value == undefined) {
        return callback()
    }

    if (typeof value != "string" ||
        (phoneReg.test(value) == false && landlinePhoneReg.test(value) == false)) {
        return callback(new Error(msg))
    }

    // errors为空则表示校验通过，反之不过
    return callback()
}

export function idCard(rule, value, callback, source, options) {
    var msg = "请输入正确的身份证号码"

    // 排除空值
    if (value == "" || value == null || value == undefined) {
        return callback()
    }

    if (typeof value != "string" ||
        (value.length != 15 && value.length != 18) ||
        idCardReg.test(value) == false
    ) {
        return callback(new Error(msg))
    }

    // errors为空则表示校验通过，反之不过
    return callback()
}

export function postCode(rule, value, callback, source, options) {
    var msg = "请输入正确的邮政编码"

    // 排除空值
    if (value == "" || value == null || value == undefined) {
        return callback()
    }

    if (typeof value != "string" ||
        value.length != 6 ||
        postCodeReg.test(value) == false
    ) {
        return callback(new Error(msg))
    }

    // errors为空则表示校验通过，反之不过
    return callback()
}

export function fax(rule, value, callback, source, options) {
    var msg = "请输入正确的传真号码"

    // 排除空值
    if (value == "" || value == null || value == undefined) {
        return callback()
    }

    if (typeof value != "string" ||
        value.length != 12 ||
        faxReg.test(value) == false
    ) {
        return callback(new Error(msg))
    }

    // errors为空则表示校验通过，反之不过
    return callback()
}

export function socialCode(rule, value, callback, source, options) {
    var msg = "请输入正确的社会信用代码"

    // 排除空值
    if (value == "" || value == null || value == undefined) {
        return callback()
    }

    if (typeof value != "string" ||
        value.length != 18 ||
        socialReg.test(value) == false
    ) {
        return callback(new Error(msg))
    }

    // errors为空则表示校验通过，反之不过
    return callback()
}

export function zzjgCode(rule, value, callback, source, options) {
    var msg = "请输入正确的组织机构代码"

    // 排除空值
    if (value == "" || value == null || value == undefined) {
        return callback()
    }

    if (typeof value != "string" ||
        zzjgReg.test(value) == false
    ) {
        return callback(new Error(msg))
    }

    // errors为空则表示校验通过，反之不过
    return callback()
}

export function licenseCode(rule, value, callback, source, options) {
    var msg = "请输入正确的营业执照号码"

    // 排除空值
    if (value == "" || value == null || value == undefined) {
        return callback()
    }
    if (typeof value != "string" ||
        licenseReg.test(value) == false
    ) {
        return callback(new Error(msg))
    }
    // errors为空则表示校验通过，反之不过
    return callback()
}

//银行卡号校验
export function bankNumber(rule, value, callback, source, options) {
    var msg = "请输入正确的银行卡号"

    // 排除空值
    if (value == "" || value == null || value == undefined) {
        return callback()
    }

    if (typeof value != "string" ||
        bankNumberReg.test(value) == false
    ) {
        return callback(new Error(msg))
    }
    
    return callback()
}

//个人证件类型校验
export function createPersonCredNumber(data) {
    return function credNumber(rule, value, callback, source, options) {
        var code = data['credType'] ? data['credType'] : data['legalCredType']
        if (!code) {
            return callback(new Error('请先选择证件类型'))
        }

        return Dict.get("credTypePersonal").then(res => {

            var text = res.find(v => v.id == code).text
            var msg = "请输入正确的" + text + "号码"
            var flag = false

            // 排除空值
            if (value == "" || value == null || value == undefined) {
                return callback()
            }
            
            switch (text) {
                case '身份证':
                case '临时身份证':
                case '户口簿':
                    flag = idCardReg.test(value)
                    break
                case '护照':
                    flag = /^((1[45]\d{7})|(G\d{8})|(P\d{7})|(S\d{7,8}))?$/.test(value)
                    break
                case '军官证':
                case '士兵证':
                    flag = /^[a-zA-Z0-9]{7,21}$/.test(value)
                    break
                case '港澳居民来往内地通行证':
                    flag = /^[a-zA-Z0-9]{5,21}$/.test(value)
                    break
                case '台湾同胞来往内地通行证':
                    flag = /^[0-9]{8,10}$/.test(value)
                    break
            }
            if (!flag) {
                return callback(new Error(msg))
            }
            callback()
        })
    }

}
