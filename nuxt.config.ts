// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  dir: {
    static: 'static'
  },
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  app: {
    head: {
      title: '24/7 Handyshop - sicher einkaufen',
      meta: [
      { name: 'description', content: 'Willkommen 24/7 Handyshop. Hier können sicher und schnell ihr neues Handy kaufen' },
      ],
      link: [
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css' }
      ]
    }
  },

  modules: ["@nuxtjs/supabase"],
  supabase: {
    redirect:false
  }
})