import jwt from "jsonwebtoken";

export const cookieOptions = {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    sameSite: "none",
    httpOnly: true,
    secure: true,
  };
  const sendToken = (res, user, code, message) => {
    // console.log(process.env.SECRET_KEY);
    // console.log(user);
    const token = jwt.sign({ _id: user.id }, process.env.SECRET_KEY);
    // console.log(token);
  
    return res.status(code).cookie("bookie-token", token, cookieOptions).json({
      success: true,
      message,
      user,
    });
  };
  export {sendToken};