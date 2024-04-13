const categoryModel = require('../models/category_model')
const categoryController = {
    createCategory: async function(req,res){
        try {
            const categoryData = req.body;
            const newCategory = new categoryModel(categoryData);

            await newCategory.save();
            return res.json({success:true,data: newCategory, message: 'category created successfully'})
            
        } catch (error) {
            return res.json({success:false, message:error});
        }
    },

    fetchAllCategories: async function(req,res){
        try {
            const categories = await categoryModel.find();
            return res.json({success:true, data:categories});
            
        } catch (error) {
            return res.json({success:false, message:error});
            
        }
    },

    fetchCategoryById: async function(req, res){
        try { 
            const id = req.params.id;
            const foundCategory = await categoryModel.findById(id);
            if(!foundCategory){
            return res.json({success:false, message:"category not found"});

            }
            return res.json({success:true, data: foundCategory})
        
        } catch (error) {
            return res.json({success:false, message:error});
    
            
        }
    
    }
 
};

module.exports = categoryController;