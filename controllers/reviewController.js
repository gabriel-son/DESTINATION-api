const Review = require('../models/reviewModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');

exports.setTourUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllReviews = catchAsync(async (req, res) => {
  const reviews = await Review.find();

  res.status(200).json({
    status: 'success',
    result: reviews.length,
    data: {
      reviews
    }
  });
});
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
// exports.updateReview = factory.updateOne(Review);
// exports.deleteReview = factory.deleteOne(Review);
