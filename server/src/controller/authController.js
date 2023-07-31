import jwt from "jsonwebtoken";
import User from "../model/user.js";
import bcrypt from "bcrypt";

const authController = {
  register: async (req, res, next) => {
    const { name, email, password, confirmPassword, phone } = req.body;
    try {
      if (!name || !email || !password || !confirmPassword || !phone) {
        res.status(500).json({
          status: -1,
          mess: error.message,
        });
      } else {
        if (String(password) !== String(confirmPassword)) {
          res.status(500).json({
            status: 1,
            mess: "Mật khẩu xác nhận bạn nhập không đúng",
          });
        } else {
          const createSalt = await bcrypt.genSaltSync(10);
          const passwordHash = await bcrypt.hashSync(password, createSalt);
          const findUser = await User.findOne({ email: email });
          if (findUser) {
            res.status(500).json({
              status: 1,
              mess: "Người dùng đã tồn tại",
            });
          } else {
            const newUser = await User.create({
              name,
              email,
              password: passwordHash,
              confirmPassword: passwordHash,
              phone,
            });
            res.status(201).json({
              status: 0,
              data: newUser,
            });
          }
        }
      }
    } catch (error) {
      res.status(500).json({
        status: -1,
        mess: error.message,
      });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        res.status(500).json({
          status: 1,
          mess: "Không hợp lệ",
        });
      } else {
        const findUser = await User.findOne({ email: email });
        if (!findUser) {
          res.status(500).json({
            status: 1,
            mess: "Không tồn tại người dùng này",
          });
        } else {
          const comparePassword = bcrypt.compareSync(
            password,
            findUser?.password
          );
          console.log(comparePassword);
          if (!comparePassword) {
            res.status(500).json({
              status: 1,
              mess: "Mật khẩu không chính xác",
            });
          } else {
            const token = await jwt.sign(
              {
                id: findUser?._id,
                isAdmin: findUser?.isAdmin,
              },
              process.env.SECRET_TOKEN,
              { expiresIn: "3d" }
            );
            const refreshToken = await jwt.sign(
              {
                id: findUser?._id,
                isAdmin: findUser?.isAdmin,
              },
              process.env.SECRET_REFRESH_TOKEN,
              { expiresIn: "100d" }
            );

            res.cookie("refreshToken", refreshToken, {
              HttpOnly: true,
            });

            res.status(200).json({
              status: 0,
              data: findUser,
              token: token,
            });
          }
        }
      }
    } catch (error) {
      res.status(500).json({
        status: -1,
        mess: error.message,
      });
    }
  },
};

export default authController;
