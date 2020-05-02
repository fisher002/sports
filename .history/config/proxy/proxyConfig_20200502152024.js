// const config = require("./config");  //路径
// module.exports = {
//     proxy: {
//         [config.ROOT]: {    //将www.exaple.com印射为/api
//             target: config.PROXYROOT, // 接口域名
//             secure: false,  // 如果是https接口，需要配置这个参数
//             changeOrigin: true,  //是否跨域
//             pathRewrite: {
//                 [`^${config.ROOT}`]: ''   //需要rewrite的
//             }
//         }
//     }
// }
const testApi = 'http://58.249.78.66:9093'

module.exports = {
    proxy: {
        '/api': {    //将本地IP（localhost/127.0.0.1）印射为/api
            target: testApi,  // 接口域名
            secure: false,  // 如果是https接口，需要配置这个参数
            changeOrigin: true,  //是否跨域
            pathRewrite: {
                '^/api': ''   //需要rewrite的,
            }
        }
    }
}