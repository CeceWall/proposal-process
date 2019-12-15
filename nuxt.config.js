
export default {
  server: {
    host: '0.0.0.0', // default: localhost,
    port: 3000
  },
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    // { src: 'basscss/css/basscss.css', lang: 'css' },
    '~/styles/main.scss',
    '~/static/iconfont/iconfont.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/components',
    '~/plugins/axios',
    { src: '~/plugins/client-components.ts', mode: 'client' },
    { src: '~/static/iconfont/iconfont.js', mode: 'client' }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxt/typescript-build',
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    'bootstrap-vue/nuxt'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    proxy: true,
    host: 'localhost',
    port: '3000',
    debug: true
  },
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      pathRewrite: {
        '^/api': '/'
      }
    }
  },

  /*
  ** Build configuration
  */
  build: {
    postcss: {
      // 添加插件名称作为键，参数作为值
      // 使用npm或yarn安装它们
      plugins: {
        'autoprefixer': {
          browsers: ['Android >= 4.0', 'iOS >= 7']
        }
        // 'postcss-pxtorem': {
        //   rootValue: 37.5,
        //   propList: ['*']
        // }
      },
      preset: {
        // 更改postcss-preset-env 设置
        autoprefixer: {
          grid: true
        }
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      config.devtool = ctx.isClient ? 'eval-source-map' : 'inline-source-map'
    }
  }
}
