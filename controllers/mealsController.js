const Meals = require("../models/mealsModel")

const getMeals = async (req, res) => {
    try {
        const meals = await Meals.find();
        res.status(200).send(meals);
    }catch(error){
        res.status(500).send(error.message);
    }
}

const postMeal = (req, res) => {

}

const getMeal = (req, res) => {

}

const updateMeal = (req, res) => {

}

const deleteMeal = (req, res) => {

}

module.exports = {
    getMeals,
    postMeal,
    getMeal,
    updateMeal,
    deleteMeal
}