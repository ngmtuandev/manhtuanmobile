import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    nameProduct: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    type: {
      type: String,
      require: true,
    },
    totalStock: {
      type: Number,
      require: true,
    },
    rate: {
      type: Number,
      require: true,
    },
    desc: {
      type: String,
      min: 4,
    },
    dateManufature: {
      type: Date,
    },
    discount: {
      type: Number,
    },
    sell: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
