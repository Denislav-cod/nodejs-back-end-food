const express = require("express");
const { getMeals, postMeal, getMeal, updateMeal, deleteMeal } = require("../controllers/mealsController");
const auth = require("../middleware/auth")

const router = express.Router();

router.get("/", getMeals);

router.post("/add-meal", postMeal);

router.get("/:mealId", getMeal);

router.put("/update-meal/:mealId", updateMeal);

router.delete("/delete-meal/:mealId", deleteMeal);

module.exports = router;