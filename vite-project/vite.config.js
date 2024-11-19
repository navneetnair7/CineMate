import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.JPG'],
  server: {
    hmr: {
      overlay: false, // Optionally disable the error overlay
    },
  },
  plugins: [react()],
})
