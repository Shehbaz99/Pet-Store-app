
const  CategoryRoute = require('express').Router();
const categoryController = require('../controllers/category_controller');

 CategoryRoute.get("/",categoryController.fetchAllCategories);
 CategoryRoute.get("/:id",categoryController.fetchCategoryById);

 CategoryRoute.post("/",categoryController.createCategory);

module.exports=  CategoryRoute