const express = require('express')
const methodOverride = require('method-override')
const app = express()

const Review = require('./models/review');

const reviews = require('./controllers/reviews')(app, Review);

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

// edit
app.get('/reviews/:id/edit', (req, res) => {
	Review.findById(req.params.id, function(err, review) {
		res.render('reviews-edit', { review: review });
	})
})


// create
app.post('/reviews', (req, res) => {
	Review.create(req.body).then((review) => {
		console.log(review);
		res.redirect('/reviews/${review._id}')
	}).catch((err) => {
		console.log(err.message)
	})
})

app.use(methodOverride('_method'))

app.put('/reviews/:id', (req, res) => {
	Review.findByIdAndUpdate(req.params.id, req.body)
		.then(review => {
			res.redirect('/')
		})
		.catch(err => {
			console.log(err.message)
		})
})

app.delete('/reviews/:id', function (req, res) {
	console.log("Delete review")
	Review.findByIdAndRemove(req.params.id).then((review) => {
		res.redirect('/');
	}).catch((err) => {
		console.log(err.message);
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