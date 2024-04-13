// const userController = require('../controllers/user_controller');

// const UserRoutes = require('express').Router();
// UserRoutes.post("/createAccount", userController.createAccount);
// UserRoutes.post("/LogIn", userController.LogIn);
// UserRoutes.put("/:id", userController.updateUser);

// module.exports= UserRoutes


const userController = require('../controllers/user_controller');

const UserRoutes = require('express').Router();
UserRoutes.post("/createAccount", userController.createAccount);
UserRoutes.post("/LogIn", userController.LogIn);
UserRoutes.get("/:id", userController.fetchUser);
UserRoutes.get("/user", userController.fetchLoggedInUser);
UserRoutes.delete('/user/:id', userController.deleteUser);
UserRoutes.put("/:id/update", userController.updateUser);

module.exports = UserRoutes;
