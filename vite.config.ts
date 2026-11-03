import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// GitHub Pages project site: https://<username>.github.io/<repo-name>/
// BASE_PATH is set automatically by the GitHub Actions workflow to "/<repo-name>/".
// For a custom domain, build with BASE_PATH=/ (see README).
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? process.env.BASE_PATH || '/bunch-of-love-website/' : '/',
  server: { host: '0.0.0.0', port: 3000, allowedHosts: true },
}));
