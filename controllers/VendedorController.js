const VendedorModel = require("../models/VendedorModel");
const bcrypt = require("bcryptjs");

class VendedorController{
    // LISTAR VENDEDORES
    static async listarVendedor(req, res){
        const salvo = req.query.s;
        const deletado = req.query.d;
        const atualizar = req.query.a;
        const existe = req.query.e;
        const vendedores = await VendedorModel.find();
        res.render("vendedor/list_vendedor", { vendedores, salvo, deletado, atualizar, existe });
    }

    // CADASTRAR VENDEDORES
    static async cadastrarVendedor(req, res){
        const dados = req.body;
        const existe = await VendedorModel.findOne({email: dados.email});
        const salt = bcrypt.genSaltSync();
        if(existe){
            res.redirect("/vendedor?e=2");
        } else{
            const hash = bcrypt.hashSync(dados.senha, salt);
            const novoVendedor = new VendedorModel({
                cpf: dados.cpf,
                nome: dados.nome,
                idade: dados.idade,
                email: dados.email,
                senha: hash,    
            });
            await novoVendedor.save();
            res.redirect("/vendedor?s=1");
        }
    }

    // CADASTRAR TELA
    static async screenCadastro(req, res){
        res.render("vendedor/cad_vendedor");
    }

    // LISTAR VENDEDOR INDIVIDUAL
    static async listSingleVendedor(req, res){
        const email = req.params.email;
        let humaninho;
        const lista_vendedor = await VendedorModel.find();
        for (const element of lista_vendedor) {
            if(element.email == email){
                humaninho = element;
                break
            }
        };
        if (humaninho == undefined){
            res.send("Pessoa não encontrada.");
        } else{
            res.render("vendedor/vendedor", humaninho);
        }
    }

    // DELETAR UM ÚNICO VENDEDOR
    static async deleteSingleVendedor(req, res){
        const email = req.params.email;
        await VendedorModel.findOneAndDelete({email: email});
        res.redirect("/vendedor?d=1");
    }

     // ATUALIZAR ÚNICO USER
     static async updateSingleVendedor(req, res){
        const dados = req.body;
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(dados.senha, salt);
        await VendedorModel.findOneAndUpdate({email: dados.email},
            {
                email: dados.email,
                cpf: dados.cpf,
                idade:dados.idade,
                nome: dados.nome,
                senha: hash,
            }
            );
        res.redirect("/vendedor?a=1");
    }

    // ATUALIZAR TELA
    static async screenAtualizar(req, res){
        const email = req.params.email; 
        const vendedor = await VendedorModel.findOne({email: email});
        res.render("vendedor/att_vendedor", {vendedor});
    }

    // LOGIN
    static async login(req,res){
        const vendedor = req.body;
        const pessoa = await VendedorModel.findOne({email: vendedor.email});
        if(pessoa){
            const senha = bcrypt.compareSync(vendedor.senha, pessoa.senha);
            if(senha){
                req.session.vendedor = pessoa.email;
                res.redirect("/");
                console.log("Chegou aqui");
            }
            else{
                res.send("E-mail e/ou senha inválido(s)");
            }
        } else{
            res.send("E-mail e/ou senha inválido(s)");
        }   
    }

    // SCREEN LOGIN
    static async screenLogin(req, res){
        res.render("vendedor/login");
    }    
    // LOGOUT
    static async logout(req,res){
        req.session.usuario = undefined;
        res.redirect("/vendedor/login");
    }
}

module.exports = VendedorController;