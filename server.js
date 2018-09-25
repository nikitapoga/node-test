const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

app.set('view engine', 'hbs');
app.use(express.static(__dirname+ '/public'));


app.use( (req,res,next)=> {
	var log = new Date().toString();
	fs.appendFile('server.log', log + '\n', (err) => {
		console.log(err);
	});

	
	next();
});


app.use( (req,res,next) =>{

	res.render('maintain.hbs', {
		pageTitle: 'Home page',
		wel : 'Привет'
		
	});


} );



hbs.registerPartials(__dirname +'/views/partials');

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});



app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home page',
		wel : 'Привет'
		
	});
});

app.get('/about', (req,res) => {
	res.render('about.hbs', {
		pageTitle: 'About page'
		
	});
});


app.get('/bad', (req,res) => {
	res.send({
		eror: 'Hui'
	});
});

app.listen(3000,  () => {

	console.log('Server is started');
});