const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carroSchema = Schema({
    placa: String,
    nome: String,
    marca: String,
    valor: Number,
});

module.exports = mongoose.model("Carro", carroSchema);