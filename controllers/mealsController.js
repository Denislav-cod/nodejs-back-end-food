const Meals = require("../models/mealsModel")

const getMeals = async (req, res) => {
    try {
        const meals = await Meals.find();
        res.status(200).send(meals);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const postMeal = async (req, res) => {
    const { name, description, price } = req.body;

    const meal = new Meals({
        name: name,
        description: description,
        price: price
    });

    try {
        await meal.save();
        res.status(200).send(meal);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getMeal = async (req, res) => {
    const _id = req.params.mealId;
    try {
        const meal = await Meals.findById(_id);
        if (!meal) {
            res.status(404).send("Not found");
        }
        res.status(200).send(meal);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const updateMeal = async (req, res) => {
    const _id = req.params.mealId;
    try {
        const updateMeal = await Meals.findByIdAndUpdate(_id, req.body);
        if (!updateMeal) {
            res.status(404).send("Not found");
            return
        }
        const updatedMeal = await Meals.findById(_id);
        res.status(200).send(updatedMeal);
    } catch (error) {
        res.status(500).send(error.message);
    }

}

const deleteMeal = async (req, res) => {
    const _id = req.params.mealId;
    try {
        const meal = await Meals.findByIdAndRemove(_id);
        if (!meal) {
            res.status(404).send("Not found");
        }
        res.status(200).send("Deleted successfuly");
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    getMeals,
    postMeal,
    getMeal,
    updateMeal,
    deleteMeal
}