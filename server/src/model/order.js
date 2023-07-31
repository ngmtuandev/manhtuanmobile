import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderItem: [
      {
        name: {
          type: String,
        },
        total: {
          type: Number,
        },
        price: {
          type: Number,
        },
        discount: {
          type: Number,
        },
        image: {
          type: String,
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    fullName: {
      type: String,
      min: 2,
    },
    address: {
      type: String,
    },
    phone: {
      type: Number,
    },

    feeShip: {
      type: Number,
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
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
