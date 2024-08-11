import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dynamicFileReplacementPlugin from './src/plugins/dynamicFileReplacementPlugin.js'
import jsonData from './src/widget/widget.json'

const getReplacements = () => {
  const data = jsonData
  const replacements = {}
  for (const [key, valueObject] of Object.entries(data)) {
    if (valueObject && typeof valueObject === 'object' && 'value' in valueObject) {
      replacements[key] = valueObject.value
    }
  }
  
  return replacements
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dynamicFileReplacementPlugin(
      getReplacements(),
      {
        files: ['src/widget/widget.css', 'src/widget/widget.js'],
        outputDir: 'public',
      }
    ),
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  }
})
