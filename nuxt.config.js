const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: "%s - " + process.env.npm_package_name,
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: "~/plugins/socket.js", ssr: false },
    // '~/plugins/axios.client'
    // { src: '~/plugins/vuetify.js' },
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // "@nuxtjs/eslint-module",
    "@nuxtjs/vuetify",
    [
      "@nuxtjs/dotenv",
      {
        systemvars: true,
      },
    ],
  ],

  vuetify: {
    optionsPath: "~/vuetify.options.js",
  },
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/pwa", "@nuxtjs/axios", "@nuxtjs/auth-next"],

  axios: {
    baseURL: process.env.API_URL,
    browserBaseURL: process.env.CLIENT_URL,
    credentials: true
  },
  auth: {
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'accessToken',
          maxAge: 900,
          global: true,
          // type: 'Bearer'
        },
        refreshToken: {
          property: 'refreshToken',
          data: 'refreshToken',
          maxAge: 60 * 60 * 24 * 30
        },
        user: {
          property: 'user',
        //  autoFetch: true
        },
        endpoints: {
          login: { url: '/api/login', method: 'post' },
          refresh: { url: '/api/refresh', method: 'get' },
          user: { url: '/api/user', method: 'get' },
          logout: { url: '/api/logout', method: 'post' }
        },
        // autoLogout: true
      }
    },
    redirect: {
      login: '/login',
      logout: '/login',
      // callback: '/login',
      home: '/main'
    }
  },

  router: {
    middleware: ['auth']
  },

  pwa: {
    manifest: {
      name: "Nuxt.js PWA nuxt-chat-app",
      short_name: "Nuxt.js PWA",
      start_url: "/",
      theme_color: "#424242",
      display: "standalone",
    },
    icon: {
      iconSrc: "./static/favicon.ico",
    },
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  /*
   ** Build configuration
   */

  env: {
    DB_URL: 'mongodb+srv://egorbv:elfDKKz966v0q2zf@cluster0.bmmbums.mongodb.net/?retryWrites=true&w=majority',
    JWT_ACCESS_SECRET: 'jwt-nidga-car-cey',
    JWT_REFRESH_SECRET: 'jwt-uogway-tortoise-cey',
    // SMTP_HOST: process.env.SMTP_HOST,
    // SMTP_PORT: process.env.SMTP_PORT,
    // SMTP_USER: process.env.SMTP_USER,
    // SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    API_URL: 'http://localhost:3000',
    CLIENT_URL: 'http://localhost:3000',
  },

  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
};
