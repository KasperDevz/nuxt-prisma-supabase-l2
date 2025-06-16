// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({

  ssr: true,

  routeRules:{
    '/backend/**' : { ssr: false }
  },

  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  runtimeConfig:{
    githubToken: 'ghb_default_token',
    githubUsername: 'ghb_no_username',
    githubRepo:'ghb_no_repo'
  },

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@nuxtjs/supabase',
  ],

  supabase: {
    redirect: false,
    cookieOptions: {
      secure: false, // Set to true in production
    }
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      bodyAttrs: {
        class: 'demo'
      },
      charset: 'utf-8',
      titleTemplate: '%s | IT Genius Engineering',
      meta: [
        {
          name: 'author',
          content: 'IT Genius Engineering, Thailand'
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, maximum-scale=5'
        }
      ]
    }
  },

  
})