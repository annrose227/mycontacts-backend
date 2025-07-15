const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.Authorization || req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res.status(401);
    throw new Error("Token is missing or invalid");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(decoded); // ✅ Terminal output like your reference

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401);
    throw new Error("User is not authorized");
  }
});

module.exports = validateToken;
