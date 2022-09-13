const express = require("express");
const { getMeals, postMeal, getMeal, updateMeal, deleteMeal } = require("../controllers/mealsController")

const router = express.Router();

router.get("/", getMeals);

router.post("/add-meal", postMeal);

router.get("/:mealId", getMeal);

router.put("/:mealId", updateMeal);

router.delete("/:mealId", deleteMeal);

module.exports = router;