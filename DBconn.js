import mongoose from "mongoose";
import { config } from "dotenv";
config({
  path:'./constant/config.env'
})
const DBconn = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      dbName: "Blog-2023",
    })
    .then(() => {
      console.log("Mongodb connected successfully");
    })
    .catch(() => {
      console.warn("Mongodb unable to connect");
    });
};
export default DBconn;
