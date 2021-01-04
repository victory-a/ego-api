/* eslint-disable no-undef */
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });

const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const colors = require("colors");

const config = require("./config");
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware");
const { auth, user, data } = require("./routes");

const app = express();

connectDB();

// Body parser
app.use(express.json());
app.use(cors());

// Logger
if (config.ENV === "development") {
  app.use(morgan("dev"));
}

// Mount routers
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", user);
app.use("/api/v1/data", data);

app.use(errorHandler);

const server = app.listen(
  config.PORT,
  console.log(`Server running in ${config.ENV} mode on port ${config.PORT}`)
);

// Handle global unhandled promise rejectioxns
process.on("unhandledRejection", (err, data) => {
  console.log(`Error: ${err.message}`.red);
  server.close(() => process.exit(1));
});
