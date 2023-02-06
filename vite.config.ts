import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';

import tsconfigPaths from 'vite-tsconfig-paths';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  if (mode === 'development') {
    return {
      server: {
        port: 3005,
      },
      plugins: [react(), tsconfigPaths(), eslint()],
    };
  }

  return {
    plugins: [react(), tsconfigPaths(), eslint()],
  };
});
