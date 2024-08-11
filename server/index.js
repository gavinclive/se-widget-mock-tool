import express, { json } from 'express'
import { readFile, writeFile } from 'fs'
import { join } from 'path'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
app.use(json())
app.use(cors())

const widgetFilePath = join(__dirname, '../src/widget/widget.json')

app.get('/api/widget', (req, res) => {
  readFile(widgetFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading widget file.' })
    }
    res.json(JSON.parse(data))
  })
})


app.post('/api/widget', (req, res) => {
  const removeNullValues = (obj) => Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      acc[key] = removeNullValues(value)
    } else if (value !== null) {
      acc[key] = value
    }
    return acc
  }, {})

  const newData = removeNullValues(req.body)

  writeFile(widgetFilePath, JSON.stringify(newData, null, 2), 'utf8', (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error writing to widget file.' })
    }
    res.json({ message: 'Widget file updated successfully!' })
  })
})

const port = 3000
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
