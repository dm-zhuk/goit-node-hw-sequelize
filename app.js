import express from "express";
import sequelizeRouter from "./routes/sequelizeRouter.js";

const app = express();
app.use(express.json());
app.use("/api/sequelize", sequelizeRouter);
app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});
app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});
app.listen(3000, () => {
  console.log("Server is running. Use our API on port: 3000");
});

// sequelize.close();
