const path = require('path') //导入路径模块
const HtmlWebpackPlugin = require('html-webpack-plugin') //导入预览页面插件
const VueLoaderPlugin = require('vue-loader/lib/plugin') //Vue单文件
const htmlPlugin = new HtmlWebpackPlugin({ //创建实例对象
    template: './src/index.html', //指定用到的模板文件
    filename: 'index.html' //指定生成的文件，放在内存中，不显示
})
module.exports = {
    mode: 'development',
    entry: path.join(__dirname, './src/index.js'), //打包入口
    output: {
        path: path.join(__dirname, './dist'), //存放路径
        filename: 'bundle.js' //输出文件名称
    },
    plugins: [htmlPlugin, new VueLoaderPlugin()],
    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            { test: /\.jpg|png|gif|bmp|ttf|eot|svg|woff|woff2$/, use: ['url-loader?limit=16490'] },
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
            { test: /\.vue$/, loader: 'vue-loader' },
        ]
    }
}