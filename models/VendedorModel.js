const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vendedorSchema = Schema({
    cpf: String,
    nome: String,
    idade: Number,
    email: String,
    senha: String,
});

module.exports = mongoose.model("Vendedor", vendedorSchema);