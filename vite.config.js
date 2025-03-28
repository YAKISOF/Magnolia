import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    server: {
        port: 5173,
        host: true,
        watch: {
            usePolling: true
        },
        fs: {
            strict: false // Отключаем strict режим для теста
        },
        hmr: {
            protocol: 'ws',
            host: 'localhost',
            port: 5173
        }
    },
    css: {
        postcss: {
            plugins: [tailwindcss()],
        },
    },
    resolve: {
        alias: {
            assets: path.resolve(__dirname, 'src/assets'),
        },
        extensions: ['.js', '.ts', '.tsx', '.json', '.svg', '.png'],
    },
    build: {
        outDir: 'dist',
        rollupOptions: {
            output: {
                manualChunks: {
                    'react-vendor': ['react', 'react-dom', 'react-router-dom'],
                },
                inlineDynamicImports: false
            },
            external: ['yastatic.net/*']
        },
        target: 'esnext',
        minify: 'terser',
        sourcemap: false,
        cssCodeSplit: true,
        assetsInlineLimit: 0
    },
    optimizeDeps: {
        include: ['react', 'react-dom', 'react-router-dom'],
        exclude: ['yastatic.net']
    },
});