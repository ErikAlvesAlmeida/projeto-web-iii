const express = require("express");
const routes = express.Router();

const auth = require("../middlewares/vendedorAuth");
const CarroController = require("../controllers/CarroController");

// CRIAR ROTAS AQUI
routes.get("/carro/", auth, CarroController.listarCarro);
routes.post("/carro/", auth, CarroController.cadastrarCarro);
routes.get("/carro/cadastro", auth, CarroController.screenCadastro);
routes.get("/carro/:placa", auth, CarroController.listSingleCarro);
routes.get("/carro/:placa/deletar", auth, CarroController.deleteSingleCarro);
routes.get("/carro/:placa/atualizar", auth, CarroController.screenAtualizar);
routes.post("/carro/:placa/atualizar", auth, CarroController.updateSingleCarro);

module.exports = routes;