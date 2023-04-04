const db = require('../models');
const Transacoes = db.transacoes;

const getPagination = (page, size) => {
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: transacoes } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, transacoes, totalPages, currentPage };
};

// Creates and saves a new transaction
exports.create = (req, res) => {
    // Validates a request
    if (!req.body) {
        res.status(400).send({
            message: "Os dados não podem ser vazios!"
        });
    }

    // Creates a new transaction
    const transacao = new Transacoes({
        tipo: req.body.tipo,
        data: req.body.data,
        produto: req.body.produto,
        valor: req.body.valor,
        vendedor: req.body.vendedor,
        usuario: req.body.usuario
    });

    // Saves transaction created at database
    Transacoes.create(transacao.dataValues)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocorreu algum erro durante a criação da transação!"
            });
        });
};

// Fetches all transactions
exports.findAll = (req, res) => {

    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    Usuarios.findAndCountAll({ order: [['id', 'ASC']], limit, offset })
        .then(data => {
            const response = getPagingData(data, page, limit);
            res.send(response);
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocorreu algum erro durante a busca das transações!"
            });
        });
};
