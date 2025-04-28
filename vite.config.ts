import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      // Proxy requests starting with /api to XAMPP server in the Pokerlist directory
      '/api': {
        target: 'http://localhost:80', // Target your XAMPP Apache port
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/Pokerlist/api') // Corrected: Rewrite /api to /Pokerlist/api
      },
      // New proxy rule for the external poker API
      '/pokerlist-api': {
        target: 'https://pokerlist.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/pokerlist-api/, '/pl/pokerclubs.php'),
      },
      '/pokerlist-api-detail': {
        target: 'https://pokerlist.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/pokerlist-api-detail/, '/pl/pokerclub.php'),
      }
    }
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
