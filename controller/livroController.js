const express = require('express');
const multer = require('multer');
const fs = require('fs');

const app = express();

const livro = require('../model/Livro');
const router = express.Router();

// STOREGE: Gerencia o armazenamento dos arquivos - Paramentro do diskStorage é um JSON - cb = CallBack
const storage = multer.diskStorage(

    {
        destination: (req, file, cb) => {
            cb(null, './uploads/');
        },

        filename: (req, file, cb) => {
            cb(null, Date.now().toString() + '_' + file.originalname);
        }
    }

);

// FILTER: Gerencia o tipo de arquivo que pode ser recebido

const fileFilter = (req, file, cb) => {

    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }

}
// UPLOAD: Executa o processo o processo de armazenamento
const upload = multer({

    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: fileFilter

});

router.post('/livro/cadastrarLivro', upload.array('files', 2),

    (req, res) => {

        console.log(req.files[0]);
        console.log(req.files[1]);
        console.log(req.body);
        res.send("TESTE DE ROTA DE LIVRO");

        const { titulo, preco, detalhes, tblCategoriaumId } = req.body;
        const imagem_peq = req.files[0].path;
        const imagem_grd = req.files[1].path;

        livro.create(
            {
                titulo,
                preco,
                imagem_peq,
                imagem_grd,
                detalhes,
                tblCategoriaumId
            }
        ).then(
            () => {
                res.send("DADOS ENVIADOS")
            }
        )
    }

);

router.get('/livro/listarLivros', (req, res) => {

    livro.findAll().then(
        (livros) => {
            res.send(livros)
        }
    )

});

router.get('/livro/listarLivrosCodigo/:id', (req, res) => {

    const { id } = req.params;

    livro.findByPk(id).then(
        (livroId) => {
            res.send(livroId)
        }
    )

});

router.delete('/livro/excluirLivro/:id', (req, res) => {

    const { id } = req.params;

    livro.findByPk(id)
        .then((livro) => {

            const imagem_grd = livro.imagem_grd;
            const imagem_peq = livro.imagem_peq;

            livro.destroy(
                {

                    where: { id }

                }).then(
                    () => {

                        fs.unlink(imagem_peq, (error) => {

                            if (error) {
                                console.log('ERRO AO EXLCUIR A IMAGEM: ' + error);
                            } else {
                                console.log('IMAGEM PEQUENA EXCLUIDA COM SUCESSO! ');
                            }

                        });

                        fs.unlink(imagem_grd, (error) => {

                            if (error) {
                                console.log('ERRO AO EXLCUIR A IMAGEM: ' + error);
                            } else {
                                console.log('IMAGEM GRANDE EXCLUIDA COM SUCESSO! ');
                            }
                        });

                        res.send('DADOS DE LIVROS EXCLUÌDOS COM SUCESSO')
                    }
                );
        });
 
});

module.exports = router;  