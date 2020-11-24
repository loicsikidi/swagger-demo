const express   = require('express')
const swaggerUI = require('swagger-ui-express')
const yamljs    = require('yamljs')
const path      = require('path')
const PORT      = 3005
const app       = express()

const equipes   = require('./src/routes/equipes')
app.use('/api/v1/equipes', equipes)

/**
 * Pages de documentation
 */
const apiSpecPath = path.join(__dirname, 'docs', 'openapi.yaml')
const exo1 = path.join(__dirname, 'docs','soluce_exo1.yaml')
const exo2 = path.join(__dirname, 'docs', 'soluce_exo2.yaml')
app.use("/default", swaggerUI.serve, (...args) => swaggerUI.setup(yamljs.load(apiSpecPath))(...args))
app.use("/solution-exo-1", swaggerUI.serve, (...args) => swaggerUI.setup(yamljs.load(exo1))(...args))
app.use("/solution-exo-2", swaggerUI.serve, (...args) => swaggerUI.setup(yamljs.load(exo2))(...args))
app.disable('x-powered-by')

console.log(`The server listen on port: ${PORT}`)
const server = app.listen(PORT)

module.exports = server