import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({

  plugins: [react()],
  
  resolve: {
    alias: {
      'sass': 'sass-embedded',
    },
  },
  
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ["legacy-js-api"],
        //additionalData: `
        //  @import "src/styles/variables.scss";
        //  @import "src/styles/global.scss";
        //  @import "src/styles/responsive.scss";
        //`
      },
    },
  },
})
