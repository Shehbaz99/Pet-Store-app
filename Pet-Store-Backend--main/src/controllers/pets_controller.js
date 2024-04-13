// Import required modules and models
const { petsModel } = require("../models/pets_model");
const userModel = require("../models/user_model");
const multer = require("multer");
const path = require("path");

// Set the storage engine for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/pets");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

// Custom file filter function
function fileFilter(req, file, cb) {
  const allowedFileExtensions = [".jpg", ".jpeg", ".png", ".gif"];

  // Check if the file extension is allowed
  const fileExtension = path.extname(file.originalname).toLowerCase();
  if (allowedFileExtensions.includes(fileExtension)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Invalid file type. Only JPG, JPEG, PNG, and GIF files are allowed."));
  }
}

// Create the multer middleware
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB file size limit
    files: 10, // Allow up to 10 files in a single request
  },
  fileFilter: fileFilter,
}).array("petImages", 10); 
// Controller functions
const petsController = {
  createPets: async function (req, res) {
    try {
      // multer middleware to handle file uploads
      upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
  
          return res.json({ success: false, message: "File upload error: " + err.message });
        } else if (err) {
        
          return res.json({ success: false, message: "Unexpected error: " + err.message });
        }

        const petsData = req.body;

        // Fetch the seller's information using the sellerId from petsData
        const sellerId = petsData.sellerId;
        const seller = await userModel.findById(sellerId);

        if (!seller) {
          return res.json({
            success: false,
            message: "Seller with the specified ID was not found.",
          });
        }

        // Update the petsData with seller's information
        petsData.sellerName = seller.username;
        petsData.sellerNumber = seller.phoneNumber;

        const fileUrls = req.files.map((file) => file.path);
        petsData.images = fileUrls;

        const newPet = new petsModel(petsData);
        await newPet.save();

        // Show the sellerName and sellerNumber to the buyer in the response
        return res.json({
          success: true,
          data: {
            pet: newPet,
            sellerName: seller.username,
            sellerNumber: seller.phoneNumber,
          },
          message: "Pets Created",
        });
      });
    } catch (error) {
      return res.json({ success: false, message: "Unexpected error: " + error });
    }
  },


  // Get all pets
  fetchAllPets: async function (req, res) {
    try {
      const pets = await petsModel.find();
      return res.json({ success: true, data: pets });
    } catch (error) {
      return res.json({ success: false, message: error });
    }
  },

  
  // Get by category
  fetchPetsByCategory: async function (req, res) {
    try {
      
      const pets = await petsModel.find();
      return res.json({ success: true, data: pets });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },

  updatePets: async function (req, res) {
    try {
      const petId = req.params.id;
      const updatedData = req.body;
      const updatedPet = await petsModel.findByIdAndUpdate(petId, updatedData, { new: true });

      if (!updatedPet) {
        return res.json({
          success: false,
          message: "Pet with the specified ID was not found.",
        });
      }

      return res.json({
        success: true,
        data: updatedPet,
        message: "Pet updated successfully.",
      });
    } catch (error) {
      return res.json({ success: false, message: error });
    }
  },

  deletePets: async function (req, res) {
    try {
      const petId = req.params.id;
      const deletedPet = await petsModel.findByIdAndDelete(petId);

      if (!deletedPet) {
        return res.json({
          success: false,
          message: "Pet with the specified ID was not found.",
        });
      }

      return res.json({
        success: true,
        data: deletedPet,
        message: "Pet deleted successfully.",
      });
    } catch (error) {
      return res.json({ success: false, message: error });
    }
  },
  

};


module.exports = petsController;
