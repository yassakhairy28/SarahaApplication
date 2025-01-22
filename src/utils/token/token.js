import jwt from "jsonwebtoken";

export const gnrateToken = ({ payload, secretKey }) => {
  return jwt.sign(payload, secretKey);
};

export const verifyToken = ({ token, secretKey, options = {} }) => {
  return jwt.verify(token, secretKey, options);
};
