import jwt from "jsonwebtoken";
import User from "../model/user.js";
import bcrypt from "bcrypt";

const userController = {
  updateUser: async (req, res, next) => {
    const idUser = req.params.id;
    try {
      if (!idUser) {
        res.status(500).json({
          status: 1,
          mess: "Thông tin người dùng không hợp lệ",
        });
      } else {
        const findUser = await User.findById(idUser);
        if (!findUser) {
          res.status(500).json({
            status: 1,
            mess: "Người dùng không tồn tại",
          });
        } else {
          const updateUser = await User.findByIdAndUpdate(idUser, req.body, {
            new: true,
          });
          res.status(500).json({
            status: 0,
            mess: "Cập nhập thành công",
            data: updateUser,
          });
        }
      }
    } catch (error) {
      res.status(500).json({
        status: -1,
        mess: error,
      });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const idUser = req.params.id;
      if (!idUser) {
        res.status(500).json({
          status: 1,
          mess: "Thông tin người dùng không hợp lệ",
        });
      } else {
        const findUser = await User.findById(idUser);
        if (!findUser) {
          res.status(500).json({
            status: 1,
            mess: "Người dùng này không tồn tại",
          });
        } else {
          await User.findByIdAndDelete(idUser);
          res.status(200).json({
            status: 0,
            mess: "Xóa người dùng thành công",
          });
        }
      }
    } catch (error) {
      res.status(500).json({
        status: -1,
        mess: error.message,
      });
    }
  },
  getOneUser: async (req, res) => {
    const idUser = req.params.id;
    try {
      if (!idUser) {
        res.status(500).json({
          status: 1,
          mess: "Thông tin người dùng không hợp lệ",
        });
      } else {
        const findUser = await User.findById(idUser);
        if (!findUser) {
          res.status(500).json({
            status: 1,
            mess: "Người dùng không tồn tại",
          });
        } else {
          res.status(200).json({
            status: 1,
            mess: "Lấy thông tin thành công",
            data: findUser,
          });
        }
      }
    } catch (error) {
      res.status(500).json({
        status: -1,
        mess: error.message,
      });
    }
  },
  getAllUser: async (req, res) => {
    try {
      const allUser = await User.find();
      if (!allUser) {
        res.status(500).json({
          status: -1,
          mess: "Lấy người dùng lỗi",
        });
      } else {
        res.status(200).json({
          status: -1,
          mess: "Lấy người dùng thành công",
          data: allUser,
        });
      }
    } catch (error) {
      res.status(500).json({
        status: -1,
        mess: error.message,
      });
    }
  },
  refreshToken: async (req, res, next) => {
    const token = req.cookies.refreshToken;
    try {
      if (!token) {
        res.status(500).json({
          status: 1,
          mess: "Token người dùng không tồn tại",
        });
      } else {
        await jwt.verify(
          token,
          process.env.SECRET_REFRESH_TOKEN,
          async (err, data) => {
            if (err) {
              res.status(500).json({
                status: 1,
                mess: "Token không hợp lệ",
              });
            } else {
              const tokenNew = await jwt.sign(
                {
                  id: data?.id,
                  isAdmin: data?.isAdmin,
                },
                process.env.SECRET_TOKEN,
                { expiresIn: "120s" }
              );
              res.status(201).json({
                status: 1,
                mess: "Tạo mới token thành công",
                tokenNew,
              });
            }
          }
        );
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: -1,
        mess: error.message,
      });
    }
  },
};

export default userController;
