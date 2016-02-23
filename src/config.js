/**
 * @file    应用基本配置信息
 */

require('babel-polyfill');

const environment = {
    development: {
        isProduction: false
    },
    production: {
        isProduction: true
    }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
    host: process.env.HOST || 'localhost',
    port: process.env.PORT,
    apiHost: process.env.APIHOST || 'localhost',
    apiPort: process.env.APIPORT,
    app: {
        title: 'TaiFinance Risk Control Platform',
        description: 'Risk control platform webapp powered by TaiFinance',
        head: {
            titleTemplate: 'TaiFinance Risk Control Platform: %s',
            meta: [
                { name: 'description', content: 'Risk control platform webapp powered by TaiFinance' },
                { charset: 'utf-8' },
                { property: 'og:site_name', content: 'TaiFinance Risk Control Platform' },
                { property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg' },
                { property: 'og:locale', content: 'en_US' },
                { property: 'og:title', content: 'TaiFinance Risk Control Platform' },
                { property: 'og:description', content: 'Risk control platform webapp powered by TaiFinance' },
                { property: 'og:card', content: 'summary' },
                { property: 'og:site', content: '@FisherYu-CN' },
                { property: 'og:creator', content: '@FisherYu-CN' },
                { property: 'og:image:width', content: '200' },
                { property: 'og:image:height', content: '200' }
            ]
        }
    },
}, environment);
