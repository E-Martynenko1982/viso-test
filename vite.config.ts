import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@mui/styled-engine': resolve(__dirname, 'node_modules', '@mui', 'styled-engine-sc'),
    },
  },
});
