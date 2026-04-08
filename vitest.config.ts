import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['src/test/setup.ts'],
    alias: {
      'framer-motion': '/Users/dartheryon/Projects/Personal/calculadoraServ-FE/src/test/framer-motion-mock.tsx',
    },
  },
});
