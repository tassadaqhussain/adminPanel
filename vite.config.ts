import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    chunkSizeWarningLimit: 1024, // Set chunk size warning limit to 1MB

    minify: 'esbuild',  // Use esbuild for faster minification
    sourcemap: true,    // Enable source maps for easier debugging
  },
  define: {
    // Optional: Define additional global constants
    'process.env': {},
  },


});
