// vue.config.js
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


function resolve(dir) {
    return path.join(__dirname, dir)
}


module.exports = {
	//打包路径
	baseUrl: "./",
	
	// 放置生成的静态资源
	assetsDir: "./",
	outputDir:'./dist',
	
	// 版本3.0以上配置：
	//publicPath: process.env.NODE_ENV == 'production' ? '.dist/' : '',
	
    // 使用运行时编译器的 Vue 构建版本
    runtimeCompiler: true,

    // 开启生产环境SourceMap，设为false打包时不生成.map文件
    productionSourceMap: false,

    // 关闭ESLint，如果你需要使用ESLint，把lintOnSave设为true即可
    lintOnSave: false,

    devServer: {
        open: 'Google Chrome',        // 是否自动打开浏览器页面
        host: '0.0.0.0',    // 指定使用一个 host，默认是 localhost
        port: 8082,         // 端口地址
        https: false,       // 使用https提供服务
        // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
        proxy: 'http://api.zhuishushenqi.com'
    },

    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('assets', resolve('src/assets/img'))
            .set('components', resolve('src/components'))
        
        //  html页面禁止压缩
        // config
        // .plugin('html')
        //     .tap(args=>{
        //         args[0].minify = false;
        //         return args;
        // });
        
        // 打包分析
        if (process.env.IS_ANALYZ) {
            config.plugin('webpack-report')
            .use(BundleAnalyzerPlugin, [{
                analyzerMode: 'dist',
            }]);
        }
		
    },

    configureWebpack: config => {
        // 生产环境打包分析体积
        if (process.env.NODE_ENV === 'production') {
            return {
                plugins: [
                    new BundleAnalyzerPlugin(),
                ]
            }
        };
        if (IS_PROD) {
            const plugins = [];
            plugins.push(
                new CompressionWebpackPlugin({
                    filename: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: productionGzipExtensions,
                    threshold: 10240,
                    minRatio: 0.8
                }) );
            // 合并plugins
            config.plugins = [
              ...config.plugins,
              ...plugins
            ];
        }
    },
    css: {
		extract: true, //是否使用css分离插件
        loaderOptions: {
            sass: {
                data: `
                @import "@/style/mixin.scss";
                @import "@/style/_var.scss";
                `
            }
        }
    },
	// 第三方插件的选项
    pluginOptions: {
       
    }
};
