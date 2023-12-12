export default defineNuxtConfig({
  modules: ['@nuxtjs/strapi'],
  strapi: {
    // Options :
      url: process.env.STRAPI_URL || 'http://localhost:1338',
      prefix: '/api',
      // admin: '/admin',
      version: 'v4',
      cookie: {},
      cookieName: 'strapi_jwt'
  }
})