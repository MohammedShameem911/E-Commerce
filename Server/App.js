require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("./db/conn");
const cookieParser = require("cookie-parser");


const Products = require("./Models/productsSchema");
const DefaultData = require("./defaultdata")
const cors = require("cors");
const router = require("./Routes/router");


app.use(express.json());
app.use(cookieParser(""));
app.use(cors());
app.use(router);



const port = 8005;

app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
}
);


DefaultData();