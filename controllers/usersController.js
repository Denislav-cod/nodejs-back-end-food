const Users = require("../models/usersModel");

const registration = (req, res) => {

}

const login = (req, res) => {
    const {name, password} = req.body;
    if(!name || !password) {
        res.status(400).send("The name or password should be popylneni")
    }
}

module.exports =  {
    registration,
    login
}