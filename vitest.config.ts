// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
// import path from 'path';

export default defineConfig({
 plugins: [react()],
 test: {
   environment: 'jsdom',
   globals: true,
   setupFiles: ['./tests/setupTests.ts'],
   coverage: {
     reporter: ['text', 'json', 'html'],
   },
 },
 resolve: {
   alias: {
     //'@': path.resolve(__dirname, './src'),
     // '@features': path.resolve(__dirname, './src/redux/features'),
     // '@hooks': path.resolve(__dirname, './src/hooks'),
     // '@store': path.resolve(__dirname, './src/redux/store'),
   },
 },
});
