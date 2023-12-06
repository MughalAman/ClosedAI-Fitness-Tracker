/// <reference types="vitest" />
/// <reference types="vite/client" />


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/*
import { initializeapp } from 'firebase/app'
import { getStorage, ref } from 'firebase/storage'
import { getDatabase } from 'firebase/database'
*/
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    css: true,
    setupFiles: '.src/tests/setup.js',
  }
})

/*
const app = initializeapp(firebaseConfig);
export const storage = getStorage(app);
export const database = getDatabase(app);*/