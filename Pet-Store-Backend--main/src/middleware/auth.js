const jwt = require('jsonwebtoken');
const userModel = require('../models/user_model');
const JWT_SECRET = process.env.JWT_SECRET; 

console.log("JWT_SECRET:", JWT_SECRET);


const checkUserAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith('Bearer')) {
    try {
      // Get Token from header
      const token = authorization.split(' ')[1];

      // Verify Token and extract user ID
      const { userID } = jwt.verify(token, process.env.JWT_SECRET);

      // Get User from Token
      const user = await userModel.findById(userID).select('-password');
      if (!user) {
        return res.status(401).send({ "status": "failed", "message": "User not found" });
      }

      // Attach the user object and token to the request for further usage
      req.user = user;
      req.token = token;

      next();
    } catch (error) {
      console.log(error);
      return res.status(401).send({ "status": "failed", "message": "Unauthorized User" });
    }
  } else {
    return res.status(401).send({ "status": "failed", "message": "Unauthorized User, No Token" });
  }
};

module.exports = checkUserAuth;
