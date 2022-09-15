const e = require("express");
const Users = require("../models/usersModel");

const registration = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400).send({ error: "Fill all the inputs" });
        return;
    }
    const newUser = new Users({
        name: name,
        email: email,
        password: password
    });
    try {
        const emailExisting = await Users.findOne({ email: email });
        if (emailExisting) {
            res.status(400).send({ error: "This user already registered" });
            return;
        }
        await newUser.save();
        res.status(201).send({ user: newUser });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

const login = async (req, res) => {
    const { name, password } = req.body;
    if (!name || !password) {
        res.status(400).send({ error: "Fill all the unputs" });
        return;
    }
        try {
            const user = await Users.findOne({ name: name, password: password });
            if (!user) {
                res.status(404).send({ error: "Not found" });
                return;
            }
                res.status(200).send({ user: user });
        } catch (error) {
            res.status(404).send({ error: error.message });
        }
    }


module.exports = {
    registration,
    login
}