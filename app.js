const express = require('express')
const app = express()

// set the express handle bars
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', (req,res) => {
	// extend root route to render home.handlebars
	res.render('home', { msg: 'handlebars are cool!' });
})

app.listen(3000, () => {
	console.log('App listening on port 3000!')
})