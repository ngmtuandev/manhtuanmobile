import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authMiddleware = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];
  //   console.log(token);
  jwt.verify(token, process.env.SECRET_TOKEN, (err, data) => {
    if (err) {
      console.log(data);
      res.status(500).json({
        status: 1,
        mess: "Token hết hạn",
      });
    } else {
      if (data?.isAdmin) {
        next();
      } else {
        res.status(500).json({
          status: 1,
          mess: "Bạn không phải admin",
        });
      }
    }
  });
};
