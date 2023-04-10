'use strict'

const express = require('express');
const { engine } = require('express-handlebars');
const Handlebars = require('handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
require("dotenv").config();

/***********
* app init *
************/
// port
const port = process.env.PORT || 8000
const localhost = `http://localhost:${port}`
// init
const app = express()
// map global promise - warning avoid
mongoose.Promise = global.Promise

mongoose.connect(process.env.MONGODB_URI)
	.then(() => {
		console.log('Mongodb connected')
	})
	.catch(err => {
		console.log(err)
		process.exit()
	})

// load models
require('./models/Sample')
const Sample = mongoose.model('sample')

/**********
* engines *
***********/

app.engine('handlebars', 
			engine({ 
				extname: '.handlebars', 
				defaultLayout: "main", 
				handlebars: allowInsecurePrototypeAccess(Handlebars)
			})
		  );

// set engine
app.set('view engine', 'handlebars');

app.set('views', path.join(__dirname + '/views'));

// body parser middleware
app.use(bodyParser.urlencoded({
	extended: false
}))
app.use(bodyParser.json())

// method override
app.use(methodOverride('_method'))


/****************
* init app view *
*****************/

// Home
app.get('/', (req, res) => {
	let title = 'Sample'
	res.render('index', {
		title: title
	})
})
/***************
* app listener *
****************/
app.listen(port, (err) => {
	if (err) {
		console.log(err)
	}
	console.log(`App running on ${localhost}`)
})
