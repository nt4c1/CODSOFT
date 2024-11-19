import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { errorHandler, routeNotFound } from "./middlewares/errorMiddlewaves.js";
import routes from "./routes/index.js";
import { dbConnection } from "./utils/index.js";
import winston from "winston";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

dbConnection()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => {
    console.error("Database connection failed", err);
    process.exit(1); // Exit process with failure
  });

const PORT = process.env.PORT || 5000;

const app = express();

// Security middleware
app.use(
  helmet({
    contentSecurityPolicy: isProduction ? undefined : false,
    crossOriginEmbedderPolicy: isProduction,
  })
);

// Rate limiting for production
if (isProduction) {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
  });
  app.use(limiter);
}

// CORS configuration
app.use(
  cors({
    origin: isProduction ? process.env.CORS_ORIGIN?.split(",") : ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Logging setup
if (isProduction) {
  const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [
      new winston.transports.File({ filename: "error.log", level: "error" }),
      new winston.transports.File({ filename: "combined.log" }),
    ],
  });
  app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
  });
} else {
  app.use(morgan("dev"));
}

// API routes
app.use("/api", routes);

// Error handling middleware
app.use(routeNotFound);
app.use(errorHandler);

// Server initialization
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} in ${process.env.NODE_ENV} mode`);
});
