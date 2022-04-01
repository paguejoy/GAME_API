

# Documentation

## Step 1: Initialize node package manager and install all dependencies for this project
* Express
* Nodemon
* Mongoose
* Dotenv
* Cors
* JSONWEBTOKEN
* Crypto-js

```

npm init -y

npm i express mongoose nodemon dotenv cors jsonwebtoken crypto-js

```

## Step 2: Import installed packages using `require()` directive and store in a constant variable
```
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const cors = require('cors')
const PORT = process.env.PORT || 3000
```


## Step 3: Create .gitignore and .env files to exclude from pushing to remote repo and hide sensitive information

```

//write in your cli

touch .gitignore .env

```

##### Write inside .gitignore
```

node_modules
.env

```

##### Wite other sensitive informamtion in .env file. Example:
```

admin_password=pw@1234

```

## Step 4: Add another line of script under script property in package.json for faster development
```

"start": "nodemon index.js"

```

## Step 5: Store your MongoDB connection string in .env file and use it to this project. Example:
```

MONGO_URL=<connection_string_from_mongodb>

```

## Step 6: Follow steps from Mongoose Documentation on Quick Start Page.
[Mongoose](https://mongoosejs.com/docs/5.x/docs/index.html "Quick Start Page")

```

// DB
mongoose.connect(process.env.MONGO_URL, 
	{useNewUrlParser: true, useUnifiedTopology: true});

// DB Notification
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log(`Connected to Database`));

```

## Step 7: Add Express.js JSON Parsers
[express.json()](https://expressjs.com/en/4x/api.html#express.json "Express JSON")
```

app.use(express.json())

```

[express..urlencoded()](https://expressjs.com/en/4x/api.html#express.urlencoded "Express URLEncoded")
```

app.use(express.urlencoded({extended:true}))

```

## Step 8: Create models folder from the root directory and a file for each model. Import mongoose to be able to use Schema.
[Mongoose](https://mongoosejs.com/docs/5.x/docs/index.html "Quick Start Page")

Define properties and their types in each Schema.
```

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({})

```


Export Model to be used in other modules
```

module.exports = mongoose.model(`User`, userSchema);

```

## Step 9: Create routes folder from the root directory and a file/s. Import express to be able to use Router() which handles the request object.
[Express.Router()](https://expressjs.com/en/4x/api.html#router.route "Router()")
```

const express = require('express');
const router = express.Router();

```

## Step 10: Define each route with HTTP method with pathname and callback function.
[Express.Method()](https://expressjs.com/en/4x/api.html#router.METHOD "Method()")
```

router.get('/', (req, res) => {})
router.post('/', (req, res) => {})
router.put('/', (req, res) => {})
router.patch('/', (req, res) => {})
router.delete('/', (req, res) => {})

```

## Step 11: Export Router from routes and import it in Index.js file
```
//routes

module.exports = router;

```

```
//Index.js

const userRoutes = require('./routes/userRoutes')
const heroRoutes = require('./routes/heroRoutes')


app.use('/api/users', userRoutes)
app.use('/api/heroes', heroRoutes)

```

## Step 12: Create controllers folder from the root directory and a file/s. Import model module to be able to use model methods of Mongoose ODM. Create functions and export each function using module.exports
[Mongoose.Methods](https://mongoosejs.com/docs/5.x/docs/api/model.html "Model Methods")
```

const User = require('./../models/User')

module.exports.allUsers = async () => {

	return await User.find().then(users => users)
}

```

## Step 13: Import all exported functions from controllers to routes, and call each function in their corresponding routes. Send the response back to client.
```

const { allUsers } = require('./../controllers/userControllers');

router.get('/', (req, res) => {

	allUsers().then(response => res.send(response))
})


```

## Step 14: Create auth.js file from the root directory. Import jsonwebtoken package and create functions for each jsonwebtoken's method. Export each function using module.exports
[JSONWEBTOKEN](https://www.npmjs.com/package/jsonwebtoken "JSONWEBTOKEN Methods")
Read documentation on each method and their corresponding parameters.
```

const { sign, verify, decode } = require('jsonwebtoken')

module.exports.createAccessToken = () => {
	return sign()
}


module.exports.verifyToken = () => {
	return verify()
}


module.exports.decodeToken = () => {
	return decode()
}


```

## Step 15: Test each route in POSTMAN by using http://localhost:3000/api/users and update each HTTP method on each request that matches the routes in the project
~[POSTMAN](postman.jpg)