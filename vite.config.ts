import { defineConfig, loadEnv } from 'vite';

import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import eslint from 'vite-plugin-eslint';

export default defineConfig(({ mode }) => {
  const envDir = process.cwd() + '/env';
  const env = loadEnv(mode, envDir, '');

  return {
    envDir,
    server: {
      host: '0.0.0.0',
      port: 8080,
      proxy: {
        // http://localhost:xxxx/api-reporte/proforma -> http://some-domain/proforma
        '/api-reporte': {
          target: env.VITE_BILLING_REPORT_HOST,
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api-reporte/, ''),
          secure: false,
          xfwd: true,
        },
      },
      hmr: {
        overlay: false,
      },
    },
    plugins: [react(), tsconfigPaths(), eslint()],
  };
});
