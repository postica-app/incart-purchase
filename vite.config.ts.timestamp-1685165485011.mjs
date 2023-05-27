// vite.config.ts
import react from "file:///home/ubuntu/incart/incart-purchase/node_modules/.pnpm/@vitejs+plugin-react@3.0.0_vite@4.0.0/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig } from "file:///home/ubuntu/incart/incart-purchase/node_modules/.pnpm/vite@4.0.0/node_modules/vite/dist/node/index.js";
import svgr from "file:///home/ubuntu/incart/incart-purchase/node_modules/.pnpm/@svgr+rollup@6.5.1/node_modules/@svgr/rollup/dist/index.js";
import path from "path";
var __vite_injected_original_dirname = "/home/ubuntu/incart/incart-purchase";
var vite_config_default = defineConfig({
  plugins: [
    svgr({
      icon: true
    }),
    react()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src"),
      "#": path.resolve(__vite_injected_original_dirname, ".")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS91YnVudHUvaW5jYXJ0L2luY2FydC1wdXJjaGFzZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvdWJ1bnR1L2luY2FydC9pbmNhcnQtcHVyY2hhc2Uvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvdWJ1bnR1L2luY2FydC9pbmNhcnQtcHVyY2hhc2Uvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHN2Z3IgZnJvbSAnQHN2Z3Ivcm9sbHVwJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gICAgcGx1Z2luczogW1xuICAgICAgICBzdmdyKHtcbiAgICAgICAgICAgIGljb246IHRydWUsXG4gICAgICAgIH0pLFxuICAgICAgICByZWFjdCgpLFxuICAgIF0sXG4gICAgcmVzb2x2ZToge1xuICAgICAgICBhbGlhczoge1xuICAgICAgICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMnKSxcbiAgICAgICAgICAgICcjJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4nKSxcbiAgICAgICAgfSxcbiAgICB9LFxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMlIsT0FBTyxXQUFXO0FBQzdTLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sVUFBVTtBQUNqQixPQUFPLFVBQVU7QUFIakIsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDeEIsU0FBUztBQUFBLElBQ0wsS0FBSztBQUFBLE1BQ0QsTUFBTTtBQUFBLElBQ1YsQ0FBQztBQUFBLElBQ0QsTUFBTTtBQUFBLEVBQ1Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNMLE9BQU87QUFBQSxNQUNILEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxNQUNwQyxLQUFLLEtBQUssUUFBUSxrQ0FBVyxHQUFHO0FBQUEsSUFDcEM7QUFBQSxFQUNKO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
