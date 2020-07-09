const express = require('./node_modules/express');
const morgan = require('./node_modules/morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const destinationRouter = require('./routes/destinationRoute');
const reviewRouter = require('./routes/reviewRoutes');

// Start express app
const app = express();

// 1) GLOBAL MIDDLEWARES

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// 3) ROUTES
app.use('/api/v1/destinations', destinationRouter);
app.use('/api/v1/reviews', reviewRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
