const http = require('http')
const app = require('./app/app')

const server = http.createServer(app)
const port = process.env.PORT || 3000

server.listen(port, () => {
    console.log(`serevr listen on http://localhost:${port}`)
})
