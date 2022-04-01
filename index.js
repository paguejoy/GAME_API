
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const cors = require('cors')
const PORT = process.env.PORT || 3000


// DB
mongoose.connect(process.env.MONGO_URL, 
	{useNewUrlParser: true, useUnifiedTopology: true});

// DB Notif
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log(`Connected to Database`));


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

const userRoutes = require('./routes/userRoutes')
const heroRoutes = require('./routes/heroRoutes')


app.use('/api/users', userRoutes)
app.use('/api/heroes', heroRoutes)


app.listen(PORT, () => console.log(`Server at port ${PORT}`))