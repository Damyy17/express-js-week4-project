const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello world!')
})

app.listen(port, () => {
    console.log(`Runnning Express Server on port - ${port}`)
})

const userRoutes = require('./src/routes/usersRoutes')
const booksRoutes = require('./src/routes/booksRoutes')

app.use(express.json())

app.use('/', userRoutes);
app.use('/', booksRoutes)
