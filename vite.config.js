import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';  // Impor modul path

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Menetapkan alias '@' untuk folder 'src'
    }
  }
});
