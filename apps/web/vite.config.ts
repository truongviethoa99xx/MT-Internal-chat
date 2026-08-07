import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@mtm/shared': fileURLToPath(new URL('../../packages/shared/src', import.meta.url)),
    },
  },
  server: { port: 5173 },
});
