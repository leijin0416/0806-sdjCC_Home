// vue.config.js
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


function resolve(dir) {
    return path.join(__dirname, dir)
}


module.exports = {
	baseUrl: "./",
	
	assetsDir: "./",
	outputDir:'./dist',
	
    runtimeCompiler: true,
    productionSourceMap: false,

    lintOnSave: false,

    devServer: {
        open: false,        
        host: '0.0.0.0',    
        port: 8082,         
        https: false,       
        //proxy: 'http://192.168.1.171:8085/',
        proxy: {
            '/api': {
                target: 'http://192.168.1.171:8085/',//后端接口地址
                changeOrigin: true,//是否允许跨越
                pathRewrite: {
                    '^/api': '/api',//重写,
                }
            }
        },
    },

    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('assets', resolve('src/assets/img'))
            .set('components', resolve('src/components'))
		
    },

    configureWebpack: config => {
        // 生产环境打包分析体积
        if (process.env.NODE_ENV === 'production') {
            return {
                plugins: [
                    new BundleAnalyzerPlugin(),
                ]
            }
        }
    },
    css: {
		extract: true,
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
