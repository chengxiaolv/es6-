// const dollarSign = '$'
const emptyString = ''
const comma = ','
const period = '.'
const minus = '-'
const minusRegExp = /-/
const nonDigitsRegExp = /\D+/g
const number = 'number'
const digitRegExp = /\d/
const caretTrap = '[]'

function convertToMask(strNumber) {
    return strNumber
        .split(emptyString)
        .map((char) => digitRegExp.test(char) ? digitRegExp : char)
}

// http://stackoverflow.com/a/10899795/604296
function addThousandsSeparator(n, thousandsSeparatorSymbol) {
    // @1 这种写法利用了replace的内部算法，虽然/\B(?=(\d{3})+(?!\d))/无法捕获任何内容，
    // 但是regex内部的 lastIndex 却在移动
    // 利用 str.search()可以看到这个index
    // '1234567'.search(reg) = 1
    // '1,234567'.search(reg) = 5
    // 太隐蔽了
    return n.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparatorSymbol)
}

// 数值mask
export default function numberMask(rawValue = emptyString) {
    const prefixLength = this.prefix && this.prefix.length || 0
    const suffixLength = this.suffix && this.suffix.length || 0
    const thousandsSeparatorSymbolLength = this.thousandsSeparatorSymbol && this.thousandsSeparatorSymbol.length || 0

    // 支持设置 min/max，超出范围则回到上一版本
    var curValue = this.toNumber(rawValue)
    if(this.isOverflow(curValue) != 0){
        rawValue = this.value
    }

    const rawValueLength = rawValue.length

    if (
        rawValue === emptyString ||
        (rawValue[0] === this.prefix[0] && rawValueLength === 1)
    ) {
        // 未输入或者输入1个数字 ['prefix', /\d/, 'suffix']
        return this.prefix.split(emptyString).concat([digitRegExp]).concat(this.suffix.split(emptyString))
    } else if (
        rawValue === this.decimalSymbol &&
        this.allowDecimal
    ) {
        // 只输入. ['prefix', 0, '.', /\d/, 'suffix']
        return this.prefix.split(emptyString).concat(['0', this.decimalSymbol, digitRegExp]).concat(this.suffix.split(emptyString))
    }

    // 是否为负
    const isNegative = (rawValue[0] === minus) && this.allowNegative

    //If negative remove "-" sign
    if (isNegative) {
        rawValue = rawValue.toString().substr(1)
    }

    const indexOfLastDecimal = rawValue.lastIndexOf(this.decimalSymbol)
    // 是否有小数点
    const hasDecimal = indexOfLastDecimal !== -1

    let integer
    let fraction
    let mask

    // remove the this.suffix
    if (rawValue.slice(suffixLength * -1) === this.suffix) {
        rawValue = rawValue.slice(0, suffixLength * -1)
    }

    // 取整数部分，切除prefix以及小数部分
    if (hasDecimal && (this.allowDecimal || this.requireDecimal)) {
        integer = rawValue.slice(rawValue.slice(0, prefixLength) === this.prefix ? prefixLength : 0, indexOfLastDecimal)
        // 小数部分
        fraction = rawValue.slice(indexOfLastDecimal + 1, rawValueLength)
        fraction = convertToMask(fraction.replace(nonDigitsRegExp, emptyString))
    } else {
        if (rawValue.slice(0, prefixLength) === this.prefix) {
            integer = rawValue.slice(prefixLength)
        } else {
            integer = rawValue
        }
    }

    // 按长度截取integer
    if (this.integerLimit && typeof this.integerLimit === number) {
        const thousandsSeparatorRegex = this.thousandsSeparatorSymbol === '.' ? '[.]' : `${this.thousandsSeparatorSymbol}`
        const numberOfThousandSeparators = (integer.match(new RegExp(thousandsSeparatorRegex, 'g')) || []).length

        integer = integer.slice(0, this.integerLimit + (numberOfThousandSeparators * thousandsSeparatorSymbolLength))
    }

    // integer只保留数字
    integer = integer.replace(nonDigitsRegExp, emptyString)

    if (!this.allowLeadingZeroes) {
        // 禁止前导0则去除多余的0
        integer = integer.replace(/^0+(0$|[^0])/, '$1')
    }

    // 添加千分位
    integer = (this.includeThousandsSeparator) ? addThousandsSeparator(integer, this.thousandsSeparatorSymbol) : integer
    // 整数部分mask
    mask = convertToMask(integer)

    // 小数部分mask
    if ((hasDecimal && this.allowDecimal) || this.requireDecimal === true) {
        if (rawValue[indexOfLastDecimal - 1] !== this.decimalSymbol) {
            mask.push(caretTrap)
        }

        // caretTrap ?
        mask.push(this.decimalSymbol, caretTrap)

        // 添加已存在的小数部分mask
        if (fraction) {
            if (typeof this.decimalLimit === number) {
                fraction = fraction.slice(0, this.decimalLimit)
            }

            mask = mask.concat(fraction)
        }

        // 禁止连续输入.符号
        if (this.requireDecimal === true && rawValue[indexOfLastDecimal - 1] === this.decimalSymbol) {
            mask.push(digitRegExp)
        }
    }

    // 添加前缀mask
    if (prefixLength > 0) {
        mask = this.prefix.split(emptyString).concat(mask)
    }

    // 负数mask
    if (isNegative) {
        // If user is entering a negative number, add a mask placeholder spot to attract the caret to it.
        if (mask.length === prefixLength) {
            mask.push(digitRegExp)
        }

        mask = [minusRegExp].concat(mask)
    }

    // 后缀mask
    if (this.suffix.length > 0) {
        mask = mask.concat(this.suffix.split(emptyString))
    }

    return mask
}
