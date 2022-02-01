const express = require('express')
const db = require('./database/db')
const cors = require('cors')
const morgan = require('morgan')
const authRoutes = require('./routes/auth')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const filterRoutes = require('./routes/filter')
const cartRoutes = require('./routes/carts')
const userRoutes = require('./routes/users')
const cookieParser = require('cookie-parser')


require('dotenv/config')
db()


const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())


app.use('/api/auth/', authRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/product', productRoutes)
app.use('/api/carts', cartRoutes)
app.use('/api/users', userRoutes)
app.use('/uploads', express.static('uploads'))
app.use('/api/filter/', filterRoutes)

app.listen(process.env.PORT || 5000, () => console.log(`listening...${process.env.PORT}`))
