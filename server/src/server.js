import express from "express";
import dotenv from "dotenv";
import connectMogoose from "./connectmongoose.js";
import cors from "cors";
import bodyParser from "body-parser";
import AuthRouter from "./router/AuthRouter.js";
import UserRouter from "./router/UserRouter.js";
import ProductRouter from "./router/ProductRouter.js";
import OrderRouter from "./router/OrderRouter.js";
import CommentRouter from "./router/CommentRouter.js";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Hello, world");
});

connectMogoose();
app.use(cors());
app.use(
  express.urlencoded({ extended: true, limit: "50mb", parameterLimit: 50000 })
);
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());

app.use("/tai-khoan", AuthRouter);
app.use("/nguoi-dung", UserRouter);
app.use("/san-pham", ProductRouter);
app.use("/dat-hang", OrderRouter);
app.use("/binh-luan", CommentRouter);

app.listen(port, () => {
  console.log("Server listening on port " + port);
});
