const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const mealsRouter = require('./routers/meals');
const userRouter = require('./routers/user');


dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());


app.get("/", (req, res) => {
    res.redirect("/meals");
});

app.use("/meals", mealsRouter);

app.use("/user", userRouter);

mongoose.connect(process.env.DB_CONNECTION)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`This is runnig on port: ${PORT}`);
        })
    })
    .catch((error) => {
        console.log(error);
    });

