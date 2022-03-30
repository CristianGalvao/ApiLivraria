const express = require('express');

//importando a Categoria
const categoria = require('../model/Categoria');

//Configurações das rotas
const router = express.Router();

//Definição das rotas

//Rota de inserção de categoria (Verbo HTTP: Post)

//Metodos do verbo da rota precisa de dois parametros

//1 - A rota em si

//2 - Ação que a rota deve executar (arrow function)
router.post(

    '/categoria/cadastrarCategoria',
    (req, res) => {

        //  let{nome_categoria} = req.body;
        let { nome_categoria } = req.body;


        categoria.create(
            { nome_categoria }
        ).then(
            () => {
                res.send("DADOS DE CATEGORIA INSERIDOS COM SUCESSOS")
            }
        )



        console.log(nome_categoria);
        // res.send("ROTA POST DE CATEGORIA");
    }

);

//Rota de listagem geral de categoria (Verbo HTTP: Get)
router.get(
    '/categoria/listarCategoria',
    (req, res) => {

        categoria.findAll().then(

    
                (categorias) => {
                    res.send(categorias);
                }
            

        );
      
    }
);

//Rota de listagem por ID de categoria (Verbo HTTP: Get)
router.get(
    '/categoria/listarCategoria/:id',
    (req, res) => {

        let {id} = req.params;
        // console.log("ID: " + id);

        categoria.findByPk(id).then(
            (categoria)=>{res.send(categoria)}
        );

    }
);

//Rota de alteração de categoria (Verbo HTTP: Put)
router.put(
    '/categoria/alterarCategoria',
    (req, res) => {

        let {id, nome_categoria} = req.body; 

        categoria.update(

                {nome_categoria},
                {where: {id}}

        ).then(
            ()=>{
                res.send("ROTA DE ALTERAR CATEGORIA COM SUCESSO" );   
            }
        );

        // console.log(req.body);

    }
);

//Rota de exclusão de categoria (Verbo HTTP: Delete)
router.delete(
    '/categoria/deletarCategoria',
    (req, res) => {

        let {id} = req.body;

        categoria.destroy(

                {where: {id}}

        ).then(
            ()=>{
                res.send("CATEGORIA EXCLUÍDA COM SUCESSO");
            }
        );
    }
)

module.exports = router;