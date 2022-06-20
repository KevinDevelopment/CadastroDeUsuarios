const Sequelize = require("sequelize");
const connection = require("./database");

const Cadastro = connection.define('Cadastro_func', {
    nome_completo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    data_entrada: {
        type: Sequelize.DATE,
        allowNull: false
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sexo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    identidade: {
        type: Sequelize.STRING,
        allowNull: false
    },
    orgao_expedidor: {
        type: Sequelize.STRING,
        allowNull: false
    },
    data_expedicao: {
        type: Sequelize.DATE,
        allowNull: false
    },
    estado_civil: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nacionalidade: {
        type: Sequelize.STRING,
        allowNull: false
    },
    naturalidade: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nome_mae: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nome_pai: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    nome_companheiro: {
        type: Sequelize.STRING,
        allowNull: false
    },
    endereco_completo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    bairro: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cidade: {
        type: Sequelize.STRING,
        allowNull: false
    },
    uf: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cep: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telefone_residencial: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telefone_comercial: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telefone_celular: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email_institucional: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email_pessoal: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tipos: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Cadastro.sync({force: false}).then(() => {
    console.log("Tabela criada com sucesso!")
}).catch((erro) => {
    console.log(`Ops!, houve um erro ${erro}`)
});

module.exports = Cadastro;