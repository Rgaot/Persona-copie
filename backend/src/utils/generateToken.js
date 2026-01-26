import jwt from 'jsonwebtoken';

const generateToken = (userId, res) => {
  const token = jwt.sign({userId}, process.env.JWT_SECRET, {
    expiresIn: "1h"
  });

  res.cookie("jwt", token, {
    sameSite: "strict",
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    maxAge: 0.25 * 60 * 60 * 1000
  });

  return token;
}

export default generateToken;