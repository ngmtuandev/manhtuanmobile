import Product from "../model/product.js";

const productController = {
  createProduct: async (req, res, next) => {
    const {
      nameProduct,
      price,
      image,
      type,
      totalStock,
      rate,
      desc,
      discount,
    } = req.body;
    try {
      if (
        !nameProduct ||
        !price ||
        !image ||
        !type ||
        !totalStock ||
        !rate ||
        !desc ||
        !discount
      ) {
        res.status(500).json({
          status: -1,
          mess: "Thông tin sản phẩm không hợp lệ",
        });
      } else {
        const findProduct = await Product.findOne({ nameProduct: nameProduct });
        if (findProduct) {
          res.status(500).json({
            status: 1,
            mess: "Sản phẩm này đã tồn tại",
          });
        } else {
          const newProduct = await Product.create({
            nameProduct,
            price: +price,
            image,
            type,
            totalStock: +totalStock,
            rate,
            desc,
            discount: +discount,
          });
          if (newProduct) {
            res.status(500).json({
              status: 0,
              mess: "Tạo sản phẩm thành công",
              data: newProduct,
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
  updateProduct: async (req, res, next) => {
    const idPrd = req.params.id;
    try {
      if (!idPrd) {
        res.status(500).json({
          status: 1,
          mess: "Sản phẩm không hợp lệ",
        });
      } else {
        const findPrd = await Product.findById(idPrd);
        if (!findPrd) {
          res.status(500).json({
            status: 1,
            mess: "Sản phẩm không tồn tại",
          });
        } else {
          const updatedPrd = await Product.findByIdAndUpdate(idPrd, req.body, {
            new: true,
          });
          res.status(500).json({
            status: 0,
            mess: "Cập nhập thành công",
            data: updatedPrd,
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
  deletePrpduct: async (req, res) => {
    try {
      const idPrd = req.params.id;
      if (!idPrd) {
        res.status(500).json({
          status: 1,
          mess: "Sản phẩm không hợp lệ",
        });
      } else {
        const findPrd = await Product.findById(idPrd);
        if (!findPrd) {
          res.status(500).json({
            status: 1,
            mess: "Sản phẩm này không tồn tại",
          });
        } else {
          await Product.findByIdAndDelete(idPrd);
          res.status(200).json({
            status: 0,
            mess: "Xóa sản phẩm thành công",
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
  detailProduct: async (req, res) => {
    const idPrd = req.params.id;
    try {
      if (!idPrd) {
        res.status(500).json({
          status: 1,
          mess: "Sản phẩm không hợp lệ",
        });
      } else {
        const findPrd = await Product.findById(idPrd);
        if (!findPrd) {
          res.status(500).json({
            status: 1,
            mess: "Sản phẩm không tồn tại",
          });
        } else {
          res.status(200).json({
            status: 1,
            mess: "Lấy sản phẩm thành công",
            data: findPrd,
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
  getAllProduct: async (req, res) => {
    try {
      const { limit, page, sort, filter } = req.query;
      const totalProduct = await Product.count();

      if (filter) {
        const allPrdFilter = await Product.find({
          [filter[1]]: { $regex: filter[0] },
        })
          .limit(limit)
          .skip(page * limit);
        return res.status(200).json({
          status: 0,
          mess: "Lọc sản phẩm thành công",
          data: allPrdFilter,
          totalPrd: totalProduct,
          pageCurrent: +(+page + 1) || 0,
          totalPage: Math.ceil(totalProduct / limit) || 0,
        });
      }

      if (sort) {
        console.log(sort[1]);
        const allPrdSort = await Product.find()
          .limit(limit)
          .skip(page * limit)
          .sort({ [sort[1]]: sort[0] });
        return res.status(200).json({
          status: 0,
          mess: "Sắp xếp sản phẩm thành công",
          data: allPrdSort,
          totalPrd: totalProduct,
          pageCurrent: +(+page + 1) || 0,
          totalPage: Math.ceil(totalProduct / limit) || 0,
        });
      }

      const allPrd = await Product.find()
        .limit(limit)
        .skip(page * limit);

      if (!allPrd) {
        res.status(500).json({
          status: -1,
          mess: "Lấy sản phẩm lỗi",
        });
      } else {
        res.status(200).json({
          status: 0,
          mess: "Lấy toàn bộ sản phẩm thành công",
          data: allPrd,
          totalPrd: totalProduct,
          pageCurrent: +(+page + 1) || 0,
          totalPage: Math.ceil(totalProduct / limit) || 0,
        });
      }
    } catch (error) {
      res.status(500).json({
        status: -1,
        mess: error.message,
      });
    }
  },
  getAllProductType: async (req, res) => {
    const type = req.params.type;
    try {
      if (!type) {
        res.status(500).json({
          status: 1,
          mess: "Không hợp lệ",
        });
      } else {
        const findPrd = await Product.find({ type: type });
        if (!findPrd) {
          res.status(500).json({
            status: 1,
            mess: "Sản phẩm không tồn tại",
          });
        } else {
          res.status(200).json({
            status: 1,
            mess: "Chon sản phẩm theo kiểu thành công",
            data: findPrd,
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
};

export default productController;
