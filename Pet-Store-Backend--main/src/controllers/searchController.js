const { petsModel } = require("../models/pets_model");
// const userModel = require("../models/user_model");

const searchPets = async (req, res) => {
  try {
    const { breeds, prices } = req.query; // Use plural names to indicate arrays

    const query = {};

    if (breeds && Array.isArray(breeds)) {
      // If breeds parameter is present and is an array
      query.breed = { $in: breeds.map(breed => new RegExp(breed, 'i')) };
    }

    if (prices && Array.isArray(prices)) {
      // If prices parameter is present and is an array
      query.price = { $in: prices };
    }

    const pets = await petsModel.find(query);

    if (pets.length === 0) {
      return res.status(404).json({ message: 'Result Not found' });
    }

    return res.status(200).json(pets);
  } catch (err) {
    console.error('Error searching pets:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { searchPets };
