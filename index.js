const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.listen(PORT, ()=> {
    console.log(`This is runnig on port: ${PORT}`);
})