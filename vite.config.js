import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        libro: resolve(__dirname, 'libro-de-reclamaciones/index.html'),
        privacidad: resolve(__dirname, 'politica-de-privacidad/index.html'),
      },
    },
  },
});
