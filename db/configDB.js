require("dotenv").config();

const DB_PASS = process.env.PASSWORD;

const DB_CONNECT = `mongodb+srv://admin:${DB_PASS}@cluster0.nx26lsj.mongodb.net/?retryWrites=true&w=majority`;

module.exports = DB_CONNECT;