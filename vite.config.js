// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  // Ensure the 'base' property is NOT set, or set to '/'
  base: '/', 
  plugins: [react()],
});