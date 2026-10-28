import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    base: './',
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY || ''),
      'process.env': {},
      global: 'globalThis',
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    build: {
      sourcemap: false,
      minify: 'esbuild',
      target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
      assetsInlineLimit: 4096,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (
                id.includes('three') ||
                id.includes('@react-three') ||
                id.includes('@react-spring') ||
                id.includes('framer-motion') ||
                id.includes('motion')
              ) {
                return 'vendor-visuals';
              }
              if (id.includes('firebase')) {
                return 'vendor-firebase';
              }
              if (id.includes('lucide-react')) {
                return 'vendor-icons';
              }
              if (id.includes('react') || id.includes('react-dom') || id.includes('zustand')) {
                return 'vendor-framework';
              }
            }
          },
        },
      },
    },
  };
});
