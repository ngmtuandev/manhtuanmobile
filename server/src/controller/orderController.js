import Order from "../model/order.js";

const orderController = {
  createOrder: async (req, res, next) => {
    const { phone, address, fullName, paymentMethod, totalPyament, orderItem } =
      req.body;
    try {
      if (
        !address ||
        !fullName ||
        !paymentMethod ||
        !totalPyament ||
        !orderItem
      ) {
        res.status(500).json({
          status: -1,
          mess: "Thông tin sản đơn hàng không hợp lệ",
        });
      } else {
        const newOrder = await Order.create({
          phone,
          address,
          fullName,
          paymentMethod,
          totalPyament,
          orderItem,
        });
        console.log(newOrder);
        if (newOrder) {
          res.status(500).json({
            status: 0,
            mess: "Thêm đơn hàng thành công",
            data: newOrder,
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

export default orderController;
