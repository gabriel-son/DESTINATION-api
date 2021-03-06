const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A destination must have a name'],
    unique: true,
    trim: true,
    maxlength: [40, 'A destination name must have less or equal then 40 characters'],
    minlength: [10, 'A destination name must have more or equal then 10 characters']
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0'],
    set: val => Math.round(val * 10) / 10
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  country: {
    type: String,
    required: [true, 'A destination must have a country'],
    enum: ["Nigeria", "Ethiopia", "Egypt", "Democratic Republic of the Congo", "Tanzania", "South Africa", "Kenya", "Algeria", "Sudan", "Morocco", "Uganda", "Mozambique",
      "Ghana", "Angola", "Somalia", "Ivory Coast", "Madagascar", "Cameroon", "Burkina Faso", "Niger", "Malawi", "Zambia", "Mali", "Senegal", "Zimbabwe", "Chad", "Tunisia", "Rwanda",
      "Benin", "Burundi", "South Sudan", "Eritrea", "Sierra Leone", "Togo", "Libya", "Central African Republic", "Mauritania", "Republic of the Congo", "Liberia", "Namibia",
      "Botswana", "Lesotho", "Gambia", "Gabon", "Guinea-Bissau", "Mauritius", "Equatorial Guinea", "Eswatini"
    ]
  },
  summary: {
    type: String,
    trim: true,
    required: [true, 'A destination must have a description']
  },
  description: {
    type: String,
    trim: true
  },
  imageCover: {
    type: String,
    required: [true, 'A destination must have a cover image']
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  },
}, {
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
});

destinationSchema.index({
  price: 1,
  ratingsAverage: -1
});

// Virtual populate
destinationSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'destination',
  localField: '_id'
});

const  destination = mongoose.model('Destination', destinationSchema);

module.exports = destination;