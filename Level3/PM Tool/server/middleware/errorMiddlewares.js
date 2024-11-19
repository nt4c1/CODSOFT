// Middleware for handling requests to undefined routes
const routeNotFound = (req, res, next) => {
    const error = new Error(`Route not found: ${req.originalUrl}`);
    res.status(404);
    next(error); // Forward the error to the error-handling middleware
  };
  
  // Middleware for handling errors
  const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;
  
    // Handling specific error types
    if (err.name === "CastError" && err.kind === "ObjectId") {
      statusCode = 404;
      message = "Resource not found";
    } else if (err.name === "ValidationError") {
      statusCode = 400;
      message = "Validation error: " + err.message;
    } else if (err.name === "UnauthorizedError") {
      statusCode = 401;
      message = "Unauthorized access";
    }
  
    // Log the error details (can be sent to a logging service)
    console.error(`[${new Date().toISOString()}] ${statusCode} - ${message}`);
  
    // Return a structured error response
    res.status(statusCode).json({
      status: false,
      message: message,
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
  };
  
  export { routeNotFound, errorHandler };
  