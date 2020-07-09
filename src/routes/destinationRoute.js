const express = require('express');
const destinationController = require('./../controllers/destinationController');
const reviewRouter = require('./../routes/reviewRoutes');

const router = express.Router();

router.use('/:destinationId/reviews', reviewRouter);

router.route('/destination-stats').get(destinationController.getDestinationStats);

router
  .route('/')
  .get(destinationController.getAllDestinations)
  .patch(destinationController.createDestination)

router
  .route('/:id')
  .get(destinationController.getDestination);

module.exports = router;
