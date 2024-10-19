// vite.config.js
import react from "file:///C:/Users/Debojyoti/Desktop/Tridyota/tridyota_frontend_admin/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig } from "file:///C:/Users/Debojyoti/Desktop/Tridyota/tridyota_frontend_admin/node_modules/vite/dist/node/index.js";
import cssInjectedByJsPlugin from "file:///C:/Users/Debojyoti/Desktop/Tridyota/tridyota_frontend_admin/node_modules/vite-plugin-css-injected-by-js/dist/esm/index.js";
import preload from "file:///C:/Users/Debojyoti/Desktop/Tridyota/tridyota_frontend_admin/node_modules/vite-plugin-preload/dist/index.mjs";
import { VitePWA } from "file:///C:/Users/Debojyoti/Desktop/Tridyota/tridyota_frontend_admin/node_modules/vite-plugin-pwa/dist/index.js";
import dns from "dns";
import path from "path";
var __vite_injected_original_dirname = "C:\\Users\\Debojyoti\\Desktop\\Tridyota\\tridyota_frontend_admin";
dns.setDefaultResultOrder("verbatim");
var vite_config_default = defineConfig({
  // root: "./", // Set the root directory of your project
  // base: "/", // Set the base URL path for your application
  build: {
    outDir: "build",
    // Set the output directory for the build files
    assetsDir: "@/assets",
    // Set the directory for the static assets
    // sourcemap: process.env.__DEV__ === "true",
    rollupOptions: {
      // Additional Rollup configuration options if needed
    },
    chunkSizeWarningLimit: 10 * 1024
  },
  plugins: [
    react(),
    cssInjectedByJsPlugin(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        // enabled: process.env.SW_DEV === "true",
        enabled: false,
        /* when using generateSW the PWA plugin will switch to classic */
        type: "module",
        navigateFallback: "index.html"
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024
      },
      // add this to cache all the
      // // static assets in the public folder
      // includeAssets: ["**/*"],
      includeAssets: [
        "**/*",
        "src/assets/img/logo/*.png",
        "src/assets/img/*.png",
        "src/assets/img/*.jepg",
        "src/assets/img/*.webp",
        "favicon.ico"
      ],
      manifest: [
        {
          theme_color: "#f69435",
          background_color: "#f69435",
          display: "standalone",
          orientation: "portrait",
          scope: ".",
          start_url: ".",
          id: ".",
          short_name: "TriDyota | Admin Dashboard- E-Commerce Website",
          name: "TriDyota | Admin Dashboard:TriDyota | Admin Dashboard",
          description: "TriDyota | Admin Dashboard: TriDyota - Electric Item Wholesale Marketplace",
          icons: [
            {
              src: "favicon.ico",
              sizes: "48x48",
              type: "image/x-icon"
            },
            {
              src: "/icon-192x192.png",
              sizes: "192x192",
              type: "image/png",
              purpose: "maskable"
            },
            {
              src: "/icon-256x256.png",
              sizes: "256x256",
              type: "image/png"
            },
            {
              src: "/icon-384x384.png",
              sizes: "384x384",
              type: "image/png"
            },
            {
              src: "/icon-512x512.png",
              sizes: "512x512",
              type: "image/png"
            }
          ]
        }
      ]
    }),
    preload()
  ],
  server: {
    proxy: {
      "/api/": {
        target: "http://localhost:5065",
        changeOrigin: true
      }
    }
  },
  define: {
    "process.env": process.env
    // global: {},
  },
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      "@": path.resolve(__vite_injected_original_dirname, "./src/")
    }
  },
  test: {
    global: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTest.js"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxEZWJvanlvdGlcXFxcRGVza3RvcFxcXFxUcmlkeW90YVxcXFx0cmlkeW90YV9mcm9udGVuZF9hZG1pblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcRGVib2p5b3RpXFxcXERlc2t0b3BcXFxcVHJpZHlvdGFcXFxcdHJpZHlvdGFfZnJvbnRlbmRfYWRtaW5cXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL0RlYm9qeW90aS9EZXNrdG9wL1RyaWR5b3RhL3RyaWR5b3RhX2Zyb250ZW5kX2FkbWluL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xyXG5pbXBvcnQgY3NzSW5qZWN0ZWRCeUpzUGx1Z2luIGZyb20gXCJ2aXRlLXBsdWdpbi1jc3MtaW5qZWN0ZWQtYnktanNcIjtcclxuaW1wb3J0IHByZWxvYWQgZnJvbSBcInZpdGUtcGx1Z2luLXByZWxvYWRcIjtcclxuaW1wb3J0IHsgVml0ZVBXQSB9IGZyb20gXCJ2aXRlLXBsdWdpbi1wd2FcIjtcclxuXHJcbmltcG9ydCBkbnMgZnJvbSBcImRuc1wiO1xyXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5cclxuZG5zLnNldERlZmF1bHRSZXN1bHRPcmRlcihcInZlcmJhdGltXCIpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICAvLyByb290OiBcIi4vXCIsIC8vIFNldCB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgeW91ciBwcm9qZWN0XHJcbiAgLy8gYmFzZTogXCIvXCIsIC8vIFNldCB0aGUgYmFzZSBVUkwgcGF0aCBmb3IgeW91ciBhcHBsaWNhdGlvblxyXG5cclxuICBidWlsZDoge1xyXG4gICAgb3V0RGlyOiBcImJ1aWxkXCIsIC8vIFNldCB0aGUgb3V0cHV0IGRpcmVjdG9yeSBmb3IgdGhlIGJ1aWxkIGZpbGVzXHJcbiAgICBhc3NldHNEaXI6IFwiQC9hc3NldHNcIiwgLy8gU2V0IHRoZSBkaXJlY3RvcnkgZm9yIHRoZSBzdGF0aWMgYXNzZXRzXHJcbiAgICAvLyBzb3VyY2VtYXA6IHByb2Nlc3MuZW52Ll9fREVWX18gPT09IFwidHJ1ZVwiLFxyXG4gICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICAvLyBBZGRpdGlvbmFsIFJvbGx1cCBjb25maWd1cmF0aW9uIG9wdGlvbnMgaWYgbmVlZGVkXHJcbiAgICB9LFxyXG4gICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiAxMCAqIDEwMjQsXHJcbiAgfSxcclxuICBwbHVnaW5zOiBbXHJcbiAgICByZWFjdCgpLFxyXG4gICAgY3NzSW5qZWN0ZWRCeUpzUGx1Z2luKCksXHJcblxyXG4gICAgVml0ZVBXQSh7XHJcbiAgICAgIHJlZ2lzdGVyVHlwZTogXCJhdXRvVXBkYXRlXCIsXHJcbiAgICAgIGRldk9wdGlvbnM6IHtcclxuICAgICAgICAvLyBlbmFibGVkOiBwcm9jZXNzLmVudi5TV19ERVYgPT09IFwidHJ1ZVwiLFxyXG4gICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgIC8qIHdoZW4gdXNpbmcgZ2VuZXJhdGVTVyB0aGUgUFdBIHBsdWdpbiB3aWxsIHN3aXRjaCB0byBjbGFzc2ljICovXHJcbiAgICAgICAgdHlwZTogXCJtb2R1bGVcIixcclxuICAgICAgICBuYXZpZ2F0ZUZhbGxiYWNrOiBcImluZGV4Lmh0bWxcIixcclxuICAgICAgfSxcclxuICAgICAgd29ya2JveDoge1xyXG4gICAgICAgIGdsb2JQYXR0ZXJuczogW1wiKiovKi57anMsY3NzLGh0bWwsaWNvLHBuZyxzdmd9XCJdLFxyXG4gICAgICAgIG1heGltdW1GaWxlU2l6ZVRvQ2FjaGVJbkJ5dGVzOiAxMCAqIDEwMjQgKiAxMDI0LFxyXG4gICAgICB9LFxyXG4gICAgICAvLyBhZGQgdGhpcyB0byBjYWNoZSBhbGwgdGhlXHJcbiAgICAgIC8vIC8vIHN0YXRpYyBhc3NldHMgaW4gdGhlIHB1YmxpYyBmb2xkZXJcclxuICAgICAgLy8gaW5jbHVkZUFzc2V0czogW1wiKiovKlwiXSxcclxuICAgICAgaW5jbHVkZUFzc2V0czogW1xyXG4gICAgICAgIFwiKiovKlwiLFxyXG4gICAgICAgIFwic3JjL2Fzc2V0cy9pbWcvbG9nby8qLnBuZ1wiLFxyXG4gICAgICAgIFwic3JjL2Fzc2V0cy9pbWcvKi5wbmdcIixcclxuICAgICAgICBcInNyYy9hc3NldHMvaW1nLyouamVwZ1wiLFxyXG4gICAgICAgIFwic3JjL2Fzc2V0cy9pbWcvKi53ZWJwXCIsXHJcbiAgICAgICAgXCJmYXZpY29uLmljb1wiLFxyXG4gICAgICBdLFxyXG4gICAgICBtYW5pZmVzdDogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRoZW1lX2NvbG9yOiBcIiNmNjk0MzVcIixcclxuICAgICAgICAgIGJhY2tncm91bmRfY29sb3I6IFwiI2Y2OTQzNVwiLFxyXG4gICAgICAgICAgZGlzcGxheTogXCJzdGFuZGFsb25lXCIsXHJcbiAgICAgICAgICBvcmllbnRhdGlvbjogXCJwb3J0cmFpdFwiLFxyXG4gICAgICAgICAgc2NvcGU6IFwiLlwiLFxyXG4gICAgICAgICAgc3RhcnRfdXJsOiBcIi5cIixcclxuICAgICAgICAgIGlkOiBcIi5cIixcclxuICAgICAgICAgIHNob3J0X25hbWU6IFwiVHJpRHlvdGEgfCBBZG1pbiBEYXNoYm9hcmQtIEUtQ29tbWVyY2UgV2Vic2l0ZVwiLFxyXG4gICAgICAgICAgbmFtZTogXCJUcmlEeW90YSB8IEFkbWluIERhc2hib2FyZDpUcmlEeW90YSB8IEFkbWluIERhc2hib2FyZFwiLFxyXG4gICAgICAgICAgZGVzY3JpcHRpb246XHJcbiAgICAgICAgICAgIFwiVHJpRHlvdGEgfCBBZG1pbiBEYXNoYm9hcmQ6IFRyaUR5b3RhIC0gRWxlY3RyaWMgSXRlbSBXaG9sZXNhbGUgTWFya2V0cGxhY2VcIixcclxuICAgICAgICAgIGljb25zOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBzcmM6IFwiZmF2aWNvbi5pY29cIixcclxuICAgICAgICAgICAgICBzaXplczogXCI0OHg0OFwiLFxyXG4gICAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2UveC1pY29uXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBzcmM6IFwiL2ljb24tMTkyeDE5Mi5wbmdcIixcclxuICAgICAgICAgICAgICBzaXplczogXCIxOTJ4MTkyXCIsXHJcbiAgICAgICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcclxuICAgICAgICAgICAgICBwdXJwb3NlOiBcIm1hc2thYmxlXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBzcmM6IFwiL2ljb24tMjU2eDI1Ni5wbmdcIixcclxuICAgICAgICAgICAgICBzaXplczogXCIyNTZ4MjU2XCIsXHJcbiAgICAgICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHNyYzogXCIvaWNvbi0zODR4Mzg0LnBuZ1wiLFxyXG4gICAgICAgICAgICAgIHNpemVzOiBcIjM4NHgzODRcIixcclxuICAgICAgICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgc3JjOiBcIi9pY29uLTUxMng1MTIucG5nXCIsXHJcbiAgICAgICAgICAgICAgc2l6ZXM6IFwiNTEyeDUxMlwiLFxyXG4gICAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICBdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbiAgICB9KSxcclxuICAgIHByZWxvYWQoKSxcclxuICBdLFxyXG5cclxuICBzZXJ2ZXI6IHtcclxuICAgIHByb3h5OiB7XHJcbiAgICAgIFwiL2FwaS9cIjoge1xyXG4gICAgICAgIHRhcmdldDogXCJodHRwOi8vbG9jYWxob3N0OjUwNjVcIixcclxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgZGVmaW5lOiB7XHJcbiAgICBcInByb2Nlc3MuZW52XCI6IHByb2Nlc3MuZW52LFxyXG4gICAgLy8gZ2xvYmFsOiB7fSxcclxuICB9LFxyXG5cclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcclxuICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmMvXCIpLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHRlc3Q6IHtcclxuICAgIGdsb2JhbDogdHJ1ZSxcclxuICAgIGVudmlyb25tZW50OiBcImpzZG9tXCIsXHJcbiAgICBzZXR1cEZpbGVzOiBbXCIuL3NyYy9zZXR1cFRlc3QuanNcIl0sXHJcbiAgfSxcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBK1csT0FBTyxXQUFXO0FBQ2pZLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sMkJBQTJCO0FBQ2xDLE9BQU8sYUFBYTtBQUNwQixTQUFTLGVBQWU7QUFFeEIsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sVUFBVTtBQVBqQixJQUFNLG1DQUFtQztBQVN6QyxJQUFJLHNCQUFzQixVQUFVO0FBRXBDLElBQU8sc0JBQVEsYUFBYTtBQUFBO0FBQUE7QUFBQSxFQUkxQixPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUE7QUFBQSxJQUNSLFdBQVc7QUFBQTtBQUFBO0FBQUEsSUFFWCxlQUFlO0FBQUE7QUFBQSxJQUVmO0FBQUEsSUFDQSx1QkFBdUIsS0FBSztBQUFBLEVBQzlCO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixzQkFBc0I7QUFBQSxJQUV0QixRQUFRO0FBQUEsTUFDTixjQUFjO0FBQUEsTUFDZCxZQUFZO0FBQUE7QUFBQSxRQUVWLFNBQVM7QUFBQTtBQUFBLFFBRVQsTUFBTTtBQUFBLFFBQ04sa0JBQWtCO0FBQUEsTUFDcEI7QUFBQSxNQUNBLFNBQVM7QUFBQSxRQUNQLGNBQWMsQ0FBQyxnQ0FBZ0M7QUFBQSxRQUMvQywrQkFBK0IsS0FBSyxPQUFPO0FBQUEsTUFDN0M7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUlBLGVBQWU7QUFBQSxRQUNiO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsTUFDQSxVQUFVO0FBQUEsUUFDUjtBQUFBLFVBQ0UsYUFBYTtBQUFBLFVBQ2Isa0JBQWtCO0FBQUEsVUFDbEIsU0FBUztBQUFBLFVBQ1QsYUFBYTtBQUFBLFVBQ2IsT0FBTztBQUFBLFVBQ1AsV0FBVztBQUFBLFVBQ1gsSUFBSTtBQUFBLFVBQ0osWUFBWTtBQUFBLFVBQ1osTUFBTTtBQUFBLFVBQ04sYUFDRTtBQUFBLFVBQ0YsT0FBTztBQUFBLFlBQ0w7QUFBQSxjQUNFLEtBQUs7QUFBQSxjQUNMLE9BQU87QUFBQSxjQUNQLE1BQU07QUFBQSxZQUNSO0FBQUEsWUFDQTtBQUFBLGNBQ0UsS0FBSztBQUFBLGNBQ0wsT0FBTztBQUFBLGNBQ1AsTUFBTTtBQUFBLGNBQ04sU0FBUztBQUFBLFlBQ1g7QUFBQSxZQUNBO0FBQUEsY0FDRSxLQUFLO0FBQUEsY0FDTCxPQUFPO0FBQUEsY0FDUCxNQUFNO0FBQUEsWUFDUjtBQUFBLFlBQ0E7QUFBQSxjQUNFLEtBQUs7QUFBQSxjQUNMLE9BQU87QUFBQSxjQUNQLE1BQU07QUFBQSxZQUNSO0FBQUEsWUFDQTtBQUFBLGNBQ0UsS0FBSztBQUFBLGNBQ0wsT0FBTztBQUFBLGNBQ1AsTUFBTTtBQUFBLFlBQ1I7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELFFBQVE7QUFBQSxFQUNWO0FBQUEsRUFFQSxRQUFRO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxTQUFTO0FBQUEsUUFDUCxRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsTUFDaEI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sZUFBZSxRQUFRO0FBQUE7QUFBQSxFQUV6QjtBQUFBLEVBRUEsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBO0FBQUEsTUFFTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxRQUFRO0FBQUEsSUFDdkM7QUFBQSxFQUNGO0FBQUEsRUFDQSxNQUFNO0FBQUEsSUFDSixRQUFRO0FBQUEsSUFDUixhQUFhO0FBQUEsSUFDYixZQUFZLENBQUMsb0JBQW9CO0FBQUEsRUFDbkM7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
