import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  plugins: [react()],
  base: './',
  server: { host: '127.0.0.1', port: 5178, strictPort: true },
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: 'react', test: /node_modules\/(react|react-dom|scheduler)\// },
            {
              name: 'motion',
              test: /node_modules\/(motion|motion-dom|motion-utils|framer-motion)\//,
            },
          ],
        },
      },
    },
  },
});
