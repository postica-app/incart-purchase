import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import svgr from '@svgr/rollup'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        svgr({
            icon: true,
        }),
        react(),
    ],
})
