const express = require('express');
const app = express();
const mongoose = require("mongoose");
mongoose.connect(`mongodb+srv://webiii:PPJ93G4YGiHgv5@cluster0.swiinto.mongodb.net/?retryWrites=true&w=majority`);

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get("/", function (req, res) {
    res.render("index");
});

app.listen("999", function () {
    console.log("Servidor iniciado.");

});  