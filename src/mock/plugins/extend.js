import dict from './dictData'

export default {
    install(Mock) {
        // 扩展Mock
        Object.assign(Mock, {
            repeat(template, count = 1) {
                let res = []

                if (typeof count != 'number') {
                    count = this.mock(count)
                }

                count = parseInt(count)

                if (isNaN(count)) {
                    throw new TypeError('count必须为整数')
                }

                for (let i = 0; i < count; i++) {
                    res.push(this.mock(template))
                }

                return res
            },
            parse(str) {
                return qs.parse(str)
            }
        })

        // 扩展占位符
        const random = Mock.Random
        random.extend({
            uuid() {
                return this.lower(this.guid().replace(/\-/g, ""))
            },
            avatar() {
                return this.pick(['./static/a2.png', './static/a4.png', './static/a5.png'])
            },
            tel() {
                let tel = this.pick(['130', '139', '134', '150', '151', '180', '186'])
                for (var i = 0; i < 8; i++) {
                    tel += this.character('number')
                }

                return tel
            },
            money(min = 0, max = 5000, dgit = 2) {
                return this.float(min, max, dgit, dgit) + ""
            },
            marial() {
                return this.pick(['已婚', '未婚', '其他'])
            },
            credType() {
                return this.pick(['身份证', '驾照'])
            },
            ID(){
                return this.id()
            },
            dict(name){
                var list = dict[name] || {}

                list = list.list || []

                var target = this.pick(list)

                return target ? target.id : ''
            }
        })
    }
}
