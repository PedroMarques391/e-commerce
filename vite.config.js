import tailwindcss from 'tailwindcss';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/MarquesMagazine/',
  plugins: [],
  resolve: {
    /* something */
  },
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, './index.html'),
        catalogo: resolve(__dirname, './catalogo.html'),
        checkout: resolve(__dirname, './checkout.html'),
        pedidos: resolve(__dirname, './pedidos.html'),
      },
    },
  },
});
