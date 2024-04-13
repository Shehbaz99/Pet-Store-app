const userModel= require("../models/user_model");
const { petsModel } = require("../models/pets_model");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const userController = {
  createAccount:  async function(req, res ){
    try {
        const userData = req.body;
        const newUser = userModel(userData); 
        await newUser.save();
        
        return res.json({success:true, data:newUser, message:"Account created"})
    } catch (error) {
        console.log(error)
        return res.json({success: false, message: error })
    }
},
  
  
  
  
  LogIn: async (req, res) => {
    try {
      const { email, password } = req.body;
      const foundUser = await userModel.findOne({ email: email });
      if (!foundUser) {
        return res.json({ success: false, message: "User not found" });
      }

      const passwordMatch = bcrypt.compareSync(password, foundUser.password);
      if (!passwordMatch) {
        return res.json({ success: false, message: "Password is incorrect" });
      }

      // Generate a JWT token
      const token = jwt.sign({ userID: foundUser._id }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Token expires in 1 hour (you can adjust as needed)
      });

      // Return the token in the response along with the user data
      return res.json({ success: true, data: foundUser, token: token });
    } catch (error) {
      console.error(error);
      return res.json({ success: false, message: error });
    }
  },

  fetchUser: async function (req, res) {
    try {
      const userId = req.params.id;

      // Fetch the user by ID
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      // Fetch products associated with the user using the sellerId
      const products = await petsModel.find({ sellerId: userId });

      return res.json({ success: true, user, products });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: "An error occurred while fetching the user and products." });
    }
  },


  fetchLoggedInUser: async function (req, res) {
    try {
      // Retrieve the logged-in user data from your authentication system
      // This could be based on session, token, or any other authentication mechanism you're using

      // For example, you could retrieve the user ID from the session or token
      const userId = req.session.userId; // Assuming you have session-based authentication

      // Fetch the user from the database based on the user ID
      const loggedInUser = await userModel.findById(userId);

      if (!loggedInUser) {
        throw "Logged-in user not found";
      }

      // Return the logged-in user as a response
      return res.json({ success: true, data: loggedInUser });
    } catch (error) {
      return res.json({ success: false, message: error });
    }
  },



  updateUser: async function (req, res) {
    try {
      const userId = req.params.id;
      const updateData = req.body;

      const updatedUser = await userModel.findOneAndUpdate(
        { _id: userId },
        updateData,
        { new: true }
      );

      if (!updatedUser) {
        throw "user not found!";
      }

      return res.json({ success: true, data: updatedUser, message: "User updated!" });
    }
    catch (ex) {
      return res.json({
        success: false, data: updatedUser
        , message: "update ni ho raha"
      });
    }
  },

  deleteUser: async function (req, res) {
    try {
      const userId = req.params.id;
      const deletedUser = await userModel.findByIdAndDelete(userId);

      if (!deletedUser) {
        throw "User not found!";
      }

      return res.json({ success: true, message: "User deleted!" });
    } catch (error) {
      return res.json({ success: false, message: error });
    }
  },
};


module.exports = userController;