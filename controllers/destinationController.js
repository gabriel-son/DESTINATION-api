const Destination = require('../models/destinationModel');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');

exports.aliasTopDestinations = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,ratingsAverage,summary';
  next();
};

 exports.getAllDestinations = catchAsync(async (req, res, next) => {
  //EXECUTE QUERY
  const features = new APIFeatures(Destination.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();


  const destination = await features.query;

  //SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: destination.length,
    data: {
      destination
    }
  });
});
exports.getDestination = catchAsync(async (req, res, next) => {
  const destination  = await Destination.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      destination
    }
  });
});


exports.createDestination = catchAsync(async (req, res, next) => {
  const newDestination = await Destination.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      tour: newDestination 
    }
  });
});
// exports.updateDestination = factory.updateOne(Destination);
// exports.deleteDestination = factory.deleteOne(Destination);

exports.getDestinationStats = catchAsync(async (req, res, next) => {
  const stats = await Destination.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } }
    },
    {
      $group: {
        _id: { $toUpper: '$country' },
        numDestinations: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
      }
    },
    {
      $sort: { _id: 1 }
    }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      stats
    }
  });
});

