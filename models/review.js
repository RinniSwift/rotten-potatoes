const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes');

const Review = mongoose.model('Review', {
	title: String,
  	description: String,
  	movieTitle: String
});

module.exports = Review;