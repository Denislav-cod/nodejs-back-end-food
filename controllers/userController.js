const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const dotenv = require('dotenv');

// get config vars
dotenv.config();

const registration = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).send({ error: "Fill all the inputs" });

    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        name: name,
        email: email,
        password: hashedPassword
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
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({ error: "Fill all the unputs" });

    }

    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).send({ error: "Not found" });

        }

        const compare = await bcrypt.compare(password, user.password);

        if (!compare) {
            return res.status(401).send({ error: "Wrong password" })
        }
        const token = jwt.sign({id: user.id, name: user.name, cart: user.cart}, process.env.SECRET);
        if(!token){
            return res.status(400).send(token)
        }
        user.token = token;
        user.save();
        res.status(200).json({ token: token });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}


module.exports = {
    registration,
    login
}