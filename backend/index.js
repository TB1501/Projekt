import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { coachApp } from "./models/coachAppModel.js";
import clientRoutes from "./routes/clientRoutes.js";
import cors from "cors";

const app = express();

//Middleware for parsing request body
app.use(express.json());

//Allow all origins with default of cors(*)
app.use(cors());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(200).send("The request was successful");
});

app.use("/clients", clientRoutes);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
