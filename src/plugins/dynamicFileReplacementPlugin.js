import { minify } from 'terser'
import { transform } from 'lightningcss'
import fs from 'fs'
import path from 'path'

const minifyCSS = (css) => {
  const { code } = transform({
    filename: 'widget.css',
    code: Buffer.from(css),
    minify: true,
    sourceMap: false,
  })
  return code
}

const minifyJS = async (js) => {
  const result = await minify(js)
  if (result.error) {
    throw result.error
  }
  return result.code
}

const transformFile = async (file, replacements, outputDir, projectRoot, server = null) => {
  const inputFilePath = path.resolve(file)
  const outputFilePath = path.join(outputDir, path.basename(inputFilePath))
  
  let code = fs.readFileSync(inputFilePath, 'utf-8')

  for (const [variable, replacement] of Object.entries(replacements)) {
    const regex = new RegExp(`{{\\s*${variable}\\s*}}`, 'g')
    code = code.replace(regex, replacement)
  }

  fs.mkdirSync(outputDir, { recursive: true })
  if (inputFilePath.endsWith('.css')) {
    code = minifyCSS(code)
  } else if (inputFilePath.endsWith('.js')) {
    code = await minifyJS(code)
  }
  fs.writeFileSync(outputFilePath, code, 'utf-8')

  const relativeOutputFilePath = path.relative(projectRoot, outputFilePath)
  console.log(`Transformed file saved to: ${relativeOutputFilePath}`)

  if (server) {
    server.ws.send({
      type: 'full-reload',
      path: `/${relativeOutputFilePath}`,
    })
  }
}

function dynamicFileReplacementPlugin(replacements = {}, options = {}) {
  let projectRoot = ''

  return {
    name: 'dynamic-file-replacement',
    enforce: 'post',
    configResolved(config) {
      projectRoot = config.root
    },
    handleHotUpdate({ file, server }) {
      const resolvedFile = path.resolve(file)
      const resolvedOptionFiles = options.files.map(f => path.resolve(projectRoot, f))

      if (resolvedOptionFiles.includes(resolvedFile)) {
        console.log(`Hot update detected for: ${file}`)
        transformFile(resolvedFile, replacements, options.outputDir, projectRoot, server)
      }
    },
    buildStart() {
      options.files.forEach((file) => {
        transformFile(file, replacements, options.outputDir, projectRoot)
      })
    },
  }
}

export default dynamicFileReplacementPlugin
