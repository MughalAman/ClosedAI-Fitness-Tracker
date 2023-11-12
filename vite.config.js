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
})

/*
const app = initializeapp(firebaseConfig);
export const storage = getStorage(app);
export const database = getDatabase(app);*/