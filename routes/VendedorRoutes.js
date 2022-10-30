const express = require("express");
const routes = express.Router();

const auth = require("../middlewares/vendedorAuth");
const VendedorController = require("../controllers/VendedorController");

// CRIAR ROTAS AQUI
routes.get("/vendedor/", auth, VendedorController.listarVendedor);
routes.post("/vendedor/", VendedorController.cadastrarVendedor);
routes.get("/vendedor/cadastro", VendedorController.screenCadastro);
routes.get("/vendedor/login", VendedorController.screenLogin);
routes.post("/vendedor/login", VendedorController.login);
routes.get("/vendedor/:email", auth, VendedorController.listSingleVendedor);
routes.get("/vendedor/:email/deletar", auth, VendedorController.deleteSingleVendedor);
routes.get("/vendedor/:email/atualizar", auth, VendedorController.screenAtualizar);
routes.post("/vendedor/:email/atualizar", auth, VendedorController.updateSingleVendedor);
routes.post("/vendedor/logout", VendedorController.logout);

module.exports = routes;