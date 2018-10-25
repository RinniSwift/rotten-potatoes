const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes');

const Review = mongoose.model('Review', {
	title: String,
	movieTitle: String,
  	description: String
});

module.exports = Review;