import mongoose from "mongoose";

const connectMogoose = async () => {
  try {
    const conect = await mongoose.connect(
      "mongodb+srv://nguyenmanhtuancomputer:manhtuan123@cluster0.mwo3fay.mongodb.net/?retryWrites=true&w=majority"
    );
    if (conect.connection.readyState === 1)
      console.log("Mongoose connection successful");
    else console.log("DB Connecting");
  } catch (error) {
    console.log(error);
  }
};
export default connectMogoose;
