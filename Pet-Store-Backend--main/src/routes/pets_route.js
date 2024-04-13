const  PetsRoutes = require('express').Router();
const  petsController = require('../controllers/pets_controller');

// Routes
 PetsRoutes.post("/addPet", petsController.createPets);
 PetsRoutes.get("/category/:id",  petsController.fetchPetsByCategory);
 PetsRoutes.get("/getAll",  petsController.fetchAllPets);
 PetsRoutes.put("/update/:id", petsController.updatePets);
 PetsRoutes.delete("/delet/:id", petsController.deletePets);
 
module.exports=  PetsRoutes