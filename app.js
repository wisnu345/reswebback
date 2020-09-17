const express = require('express')
const bodyParser = require('body-parser')
const productsRouter = require('./src/routes/products')
const categoriesRouter = require('./src/routes/category')
const historiesRouter = require('./src/routes/history')
const usersRouter = require('./src/routes/users')
const cors = require('cors')

const PORT = 3000

const app = express()
app.use(express.static('./src/uploads/'))
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/products', productsRouter)
app.use('/category', categoriesRouter)
app.use('/history', historiesRouter)
app.use('/users', usersRouter)


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})