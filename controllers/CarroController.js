const CarroModel = require("../models/CarroModel");

class CarroController{
    // LISTAR CARROS
    static async listarCarro(req, res){
        const salvo = req.query.s;
        const deletado = req.query.d;
        const atualizar = req.query.a;
        const existe = req.query.e;
        const carros = await CarroModel.find();
        res.render("carro/list_carro", { carros, salvo, deletado, atualizar, existe });
    }

    // CADASTRAR CARRO
    static async cadastrarCarro(req, res){
        const dados = req.body;
        const existe = await CarroModel.findOne({placa: dados.placa});
        if(existe){
            res.redirect("/carro?e=2");
        } else{
            const novoCarro = new CarroModel({
                placa: dados.placa,
                nome: dados.nome,
                marca: dados.marca,
                valor: dados.valor,  
            });
            await novoCarro.save();
            res.redirect("/carro?s=1");
        }
    }

    // CADASTRAR TELA
    static async screenCadastro(req, res){
        res.render("carro/cad_carro");
    }

    // LISTAR CARRO INDIVIDUAL
    static async listSingleCarro(req, res){
        const placa = req.params.placa;
        let carro;
        const lista_carro = await CarroModel.find();
        for (const element of lista_carro) {
            if(element.placa == placa){
                carro = element;
                break
            }
        };
        if (carro == undefined){
            res.send("Carro não encontrado.");
        } else{
            res.render("carro/carro", carro);
        }
    }

    // DELETAR UM ÚNICO CARRO
    static async deleteSingleCarro(req, res){
        const placa = req.params.placa;
        await CarroModel.findOneAndDelete({placa: placa});
        res.redirect("/carro?d=1");
    }

     // ATUALIZAR ÚNICO CARRO
     static async updateSingleCarro(req, res){
        const dados = req.body;
        await CarroModel.findOneAndUpdate({placa: dados.placa},
            {
                marca:dados.marca,
                nome: dados.nome,
                placa: dados.placa,
                valor: dados.valor
            }
            );
        res.redirect("/carro?a=1");
    }

    // ATUALIZAR TELA
    static async screenAtualizar(req, res){
        const placa = req.params.placa; 
        const carro = await CarroModel.findOne({placa: placa});
        res.render("carro/att_carro", {carro});
    }

}

module.exports = CarroController;