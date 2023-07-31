import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderItem: [
    {
      name: {
        type: String,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      discount: {
        type: Number,
      },
      image: {
        type: String,
        require: true,
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        require: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  infoRecived: {
    fullName: {
      type: String,
      required: true,
      min: 2,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      require: true,
    },
    phone: {
      type: Number,
      required: true,
    },
  },
  itemPrice: {
    type: Number,
    require: true,
  },
  feeShip: {
    type: Number,
    require: true,
  },
  paymentMethod: {
    type: String,
    require: true,
  },
  totalPyament: {
    type: Number,
    required: true,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  paidAt: {
    type: Date,
  },
  isDelivered: {
    type: Boolean,
    default: false,
  },
  deliveredAt: {
    type: Date,
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
