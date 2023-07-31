import express from "express";
import dotenv from "dotenv";
import connectMogoose from "./connectmongoose.js";
import cors from "cors";

dotenv.config();
const app = express();

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Hello, world");
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectMogoose();

app.listen(port, () => {
  console.log("Server listening on port " + port);
});
