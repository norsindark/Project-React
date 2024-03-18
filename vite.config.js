import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
// =========================================================

// import { defineConfig } from 'vite';

// export default defineConfig({
//   server: {
//     proxy: {
//       '/products.json': {
//         target: 'http://localhost:3000',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/products.json/, ''),
//       },
//     },
//   },
// });
