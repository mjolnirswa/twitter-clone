// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "path"

export default defineNuxtConfig({
    modules: ["@nuxtjs/tailwindcss"],
    build: {
        transpile: ['@heroicons/vue']
    },
    alias: {
        '@': resolve(__dirname, "/"),
    },
    css: ["~/assets/css/main.css"],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
          },
    },
    runtimeConfig: {
        jwtAccessSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
        jwtRefreshSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
        cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
        cloudinaryCloudApiKey: process.env.CLOUDINARY_CLOUD_API_KEY,
        cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET
    }
})
