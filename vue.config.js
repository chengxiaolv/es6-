const path = require('path')
const fs = require('fs')
const webpack = require('webpack')

const resolve = dir => {
    return path.join(__dirname, dir)
}

const env = process.env.NODE_ENV || 'development'
fs.writeFileSync(path.join(__dirname, './config/env.js'), `export default '${env}'`)

const isMockignore = fs.existsSync(path.join(__dirname, './src/mockignore.js'))
if (isMockignore == false) {
    fs.writeFileSync(path.join(__dirname, './src/mockignore.js'), `export default []`)
}

// 这里需要修改为你线上项目存放的路径
// 比如你打包的文件放到服务器的my-app文件夹，域名为a.com，则应改为
// http(s)://a.com/my-app/
// const BASE_URL = env  == 'development' ? '/' : 'http://ian024.coding.me/front-end/demo/shendun/'
const BASE_URL = '/'

module.exports = {
    // Project deployment base
    // By default we assume your app will be deployed at the root of a domain,
    // e.g. https://www.my-app.com/
    // If your app is deployed at a sub-path, you will need to specify that
    // sub-path here. For example, if your app is deployed at
    // https://www.foobar.com/my-app/
    // then change this to '/my-app/'
    baseUrl: BASE_URL,
    // vue.config.js
    css: {
        loaderOptions: {
            // pass options to sass-loader
            sass: {
                // @/ is an alias to src/
                // so this assumes you have a file named `src/variables.scss`
                data: `
                    @import "@/components/global/_variables.scss";
                `
            }
        }
    },

    devServer: {
        proxy: {
            '/api': {
                target: 'http://118.31.45.170:11012',
                ws: true,
                changeOrigin: true
            }
        }
    },

    configureWebpack: {
        module: {
            rules: [{
                test: /\.(xlsx|xls)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'files/[name].[hash:8].[ext]'
                    }
                }]
            }]
        }
    },

    // tweak internal webpack configuration.
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: config => {
        config
            .resolve
                // 别名
                .alias
                .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
                .set('_c', resolve('src/components'))
                .set('_conf', resolve('config'))
            .end()
        .end()
    }
}
