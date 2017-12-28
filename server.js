const express = require('express')
const hbs = require('hbs')
const fs = require('fs')
const app = express()
const port = process.env.PORT || 3000

// middleware
// takes abs path. specify __dirname stores path of project directory
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

//app.use how you register middleware
app.use((req, res, next) => {
	// next when middle function is done
	// req: everything taht comes from the client
	const now = new Date().toString()
	const log = `${now}: ${req.method} ${req.url}`
	console.log(log)
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('unable to append to server.log')
		}
	})
	next()	
})

app.use((req, res, next) => {
	res.render('maintenance.hbs')
// 	// next()	
})

// add middleware to teach express how to read  something
app.use(express.static(__dirname+ '/public'))

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear()
})
hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase()
})
app.get('/', (req, res) => {
	//get this as body data
	// res.send('<h1>Hello Express</h1>')
	// res.send({
	// 	name: 'Kary',
	// 	likes: ['bite', 'sleep']
	// })
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMsg: 'Welcome',
		currentYear: new Date().getFullYear()
	})
})

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page',
		msg: 'About page content',
		currentYear: new Date().getFullYear()
	})
})

app.get('/projects', (req, res) => {
	res.render('projects.hbs', {
		pageTitle: 'Projects head',
	})
})

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'errorMsg'
	})
})

app.get('/maintenance', (req, res) => {
	res.render('maintenance.hbs', {
		pageTitle: 'Maintenance Page',
		msg: 'Maintenance Mode',
		currentYear: new Date().getFullYear()
	})
})

//bind to a port on our machine
app.listen(port, () => {
	console.log(`server is up at ${port}`)
})