const mongoose = require('mongoose');


const MealSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Meals", MealSchema);