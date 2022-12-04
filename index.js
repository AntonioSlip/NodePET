const express = require("express");
const app = express();
const mongoose = require("mongoose");
const DB_CONNECT = require("./db/configDB");
const UserRouters = require("./routes/userRoutes");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(UserRouters);

mongoose.connect(DB_CONNECT)
.then(() => {
    app.listen(3000, () => {
        console.log("Conectado com o mongoDB!!!");
    });
}).catch((err) => {
    console.log(err);
});

