import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const isUserMiddleware = (req, res, next) => {
  console.log("header", req.headers);
  const token = req.headers.token.split(" ")[1];
  const idUser = req.params.id;
  jwt.verify(token, process.env.SECRET_TOKEN, (err, data) => {
    if (err) {
      console.log(data);
      res.status(500).json({
        status: 1,
        mess: "Token lỗi",
      });
    } else {
      if (data?.isAdmin || String(data?.id) === String(idUser)) {
        next();
      } else {
        res.status(500).json({
          status: 1,
          mess: "Bạn phải sở hữu tài khoản hoặc là admin",
        });
      }
    }
  });
};
