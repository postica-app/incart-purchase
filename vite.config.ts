import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import svgr from '@svgr/rollup'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        svgr({
            icon: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '#': path.resolve(__dirname, '.'),
        },
    },
})
