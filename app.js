

const express = require('express')
const methodOverride = require('method-override')
const app = express()

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes-1');

const Review = require('./models/review');
const Comment = require('./models/comment')

// initialize body-parser and add it to app
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride('_method'))


// set the express handle bars
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');



// // app.get('/', (req, res) => {
//   Review.find()
//     .then(reviews => {
//       res.render('reviews-index', { reviews: reviews });
//     })
//     .catch(err => {
//       console.log(err);
//     })
// })
require('./controllers/reviews')(app, Review, Comment)
require('./controllers/comments')(app, Comment);

app.listen(process.env.PORT || 3000, () => {
	console.log('App listening on port 3000!')
})

module.exports = app;