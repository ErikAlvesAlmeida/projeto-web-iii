const express = require('express');
const app = express();
const vendedorRoutes = require("./routes/VendedorRoutes");
const carroRoutes = require("./routes/CarroRoutes");
require('dotenv/config');
const session = require('express-session');
const mongoose = require("mongoose");
const auth = require('./middlewares/vendedorAuth');
app.use(session({
    secret: 'ifpe',
    saveUninitialized:false,
    resave: false
}));
mongoose.connect(process.env.MONGO_URI);

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(vendedorRoutes);
app.use(carroRoutes);

app.get("/", auth, function (req, res) {
    res.render("index");
});

app.listen(process.env.PORT, function(){
    console.log("Servidor iniciado.");
});