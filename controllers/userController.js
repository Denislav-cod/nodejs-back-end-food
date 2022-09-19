const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const registration = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).send({ error: "Fill all the inputs" });

    }
    const newUser = new User({
        name: name,
        email: email,
        password: password
    });
    try {
        const emailExisting = await User.findOne({ email: email });
        if (emailExisting) {
            return res.status(400).send({ error: "This user already registered" });

        }
        await newUser.save();
        res.status(201).send({ user: newUser });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

const login = async (req, res) => {
    const { id, name, password } = req.body;
    if (!name || !password) {
        return res.status(400).send({ error: "Fill all the unputs" });

    }
    try {
        const user = await User.findOne({ name: name, password: password });
        if (!user) {
            return res.status(404).send({ error: "Not found" });

        }
        const token = jwt.sign({ id: id, name: name },"superdupersecret");
        user.token = token;
        res.status(200).send({token: token});
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}


module.exports = {
    registration,
    login
}