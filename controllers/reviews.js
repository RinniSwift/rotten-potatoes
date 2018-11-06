
module.exports = function(app, Review, Comment) {

    // we're using the database with the model: Review
    app.get('/', (req, res) => {
        Review.find()
            .then(reviews => {
                res.render('reviews-index', { reviews: reviews });
            })
            .catch(err => {
                console.log(err);
            });
    });

    app.get('/reviews/new', (req, res) => {
	res.render('reviews-new', {});
})

	// show page for the individual movies from their unique id's
	app.get('/reviews/:id', (req, res) => {
		Review.findById(req.params.id).then((review) => {
	    Comment.find({ reviewId: req.params.id }).then(comments => {
	      res.render('reviews-show', { review: review, comments: comments })
	    })
	  }).catch((err) => {
	        console.log(err.message);
	  });
	});

	// edit
	app.get('/reviews/:id/edit', (req, res) => {
		Review.findById(req.params.id, function(err, review) {
	        res.render('reviews-edit', {review: review});
	    })
	})


	// create
	app.post('/reviews', (req, res) => {
	    // we use the method create() to create the review
	    Review.create(req.body).then((review) => {
	        console.log(review);
	        // then we redirect to reviews/:id
	        res.redirect(`/reviews/${review._id}`);
	    }).catch((err) => {
	        console.log(err.message);
	    })
	})


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
	    console.log("DELETE review")
	    Review.findByIdAndRemove(req.params.id).then((review) => {
	        // remove then redirect to the homepage
	        res.redirect('/');
	    }).catch((err) => {
	        console.log(err.message);
	    })
	})


}