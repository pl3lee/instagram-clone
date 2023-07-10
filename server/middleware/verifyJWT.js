import jwt from "jsonwebtoken";
export const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.status(401).json({ message: "Missing token" });
    return;
  }
  jwt.verify(token, process.env.JWTSECRET, (err, decoded) => {
    if (err) {
      res.status(403).json({ message: "Invalid token" });
      return;
    }
    req.decodedId = decoded.id;
    next();
  });
};
