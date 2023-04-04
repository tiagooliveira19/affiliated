module.exports = (sequelize, Sequelize) => {

    return sequelize.define("transacoes", {
        tipo: {
            type: Sequelize.INTEGER
        },
        data: {
            type: "DATETIME"
        },
        produto: {
            type: Sequelize.STRING
        },
        valor: {
            type: Sequelize.FLOAT
        },
        vendedor: {
            type: Sequelize.STRING
        },
        usuario: {
            type: Sequelize.STRING
        },
        createdAt: {
            type: "DATETIME",
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
        },
        updatedAt: {
            type: "DATETIME",
            allowNull: true
        }
    });
};
