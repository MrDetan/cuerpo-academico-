import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function liveEventsApiPlugin() {
  return {
    name: 'live-events-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const eventsPath = path.resolve(__dirname, 'src/data/liveEvents.json')

        if (req.url === '/api/events' && req.method === 'POST') {
          let body = ''
          req.on('data', chunk => { body += chunk })
          req.on('end', () => {
            try {
              // Parse to validate JSON
              const parsed = JSON.parse(body)
              fs.writeFileSync(eventsPath, JSON.stringify(parsed, null, 2), 'utf-8')
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: true, message: 'Eventos guardados en disco y sincronizados en vivo' }))
            } catch (err) {
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: false, error: err.message }))
            }
          })
          return
        }

        if (req.url === '/api/events' && req.method === 'GET') {
          if (fs.existsSync(eventsPath)) {
            const data = fs.readFileSync(eventsPath, 'utf-8')
            res.setHeader('Content-Type', 'application/json')
            res.end(data)
            return
          }
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify([]))
          return
        }

        next()
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), liveEventsApiPlugin()],
})
