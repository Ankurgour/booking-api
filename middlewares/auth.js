import jwt from "jsonwebtoken";
// import { ErrorHandler } from "../utils/utility.js";
const isAuthenticated = async (req, res, next) => {
  try {
    // console.log("cookie",req.cookies);
    const token = req.cookies["bookie-token"];
    if (!token)
      return res
        .status(401)
        .json({ success: false, message: "Please login to access this route" });
    const decodedData = jwt.verify(token, process.env.SECRET_KEY);
    // console.log(decodedData);
    req.user = decodedData._id;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
export {isAuthenticated}