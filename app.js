const express = require('express')
const bodyParser = require('body-parser')
const productsRouter = require('./src/routes/products')
const categoriesRouter = require('./src/routes/products')
const historiesRouter = require('./src/routes/products')
const cors = require('cors')


const PORT = 3000

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/products', productsRouter)
app.use('/category', categoriesRouter)
app.use('/history', historiesRouter)
app.use(cors())


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})