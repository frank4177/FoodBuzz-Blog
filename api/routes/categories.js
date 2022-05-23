const router = require("express").Router();
const Category = require("../models/Category");

//DELETE CATEGORIES
router.post("/", async (req, res) => {
  const newCat = new Category(req.body);
  try {
    const saveCat = await newCat.save();
    res.status(200).json(saveCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET CATEGORIES
router.get("/", async (req, res) => {
    try {
      const Cats = await Category.find();
      res.status(200).json(Cats);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;