const express = require('express')
require('dotenv/config')

const app = express()

app.get('/', (req, res) => {
    res.send('Welcome...')
})

app.listen(process.env.PORT || 5000, () => console.log(`listening...${process.env.PORT}`))