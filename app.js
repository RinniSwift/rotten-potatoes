const express = require('express')
const app = express()
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes');

const Review = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String
});

// initialize body-parser and add it to app
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));


// mock arrays of projects
// let reviews = [
// 	{ title: "Great Review", movieTitle: "Batman II"},
// 	{ title: "Awesome Movie", movieTitle: "Titanic"}
// ]


// set the express handle bars
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');



app.get('/', (req, res) => {
  Review.find()
    .then(reviews => {
      res.render('reviews-index', { reviews: reviews });
    })
    .catch(err => {
      console.log(err);
    })
})

app.get('/reviews/new', (req, res) => {
	res.render('reviews-new', {});
})

// show page for the individual movies from their unique id's
app.get('/reviews/:id', (req, res) => {
	Review.findById(req.params.id).then((review) => {
		res.render('reviews-show', { review: review })
	}).catch((err) => {
		console.log(err.message);
	})
});


// create
app.post('/reviews', (req, res) => {
	Review.create(req.body).then((review) => {
		console.log(review);
		res.redirect('/review/${review._id}')
	}).catch((err) => {
		console.log(err.message)
	})
})

Review.find()
  .then(review => {
  // Code in here is executed when the promise resolves
  })
  .catch(err => {

  });

app.listen(3000, () => {
	console.log('App listening on port 3000!')
})