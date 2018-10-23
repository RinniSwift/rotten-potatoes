const express = require('express')
const app = express()

// mock arrays of projects
let reviews = [
	{ title: "Great Review", movieTitle: "Batman II"},
	{ title: "Awesome Movie", movieTitle: "Titanic"}
]


// set the express handle bars
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');



app.get('/', (req,res) => {
	// extend root route to render home.handlebars
	res.render('reviews-index', { reviews: reviews });
})

app.listen(3000, () => {
	console.log('App listening on port 3000!')
})