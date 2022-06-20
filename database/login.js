const Sequelize = require("sequelize");
const connection = require("./database");



const Login = connection.define('Users', {
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Login.sync({force: false}).then(() => {
    console.log("Tabela de login criada com sucesso!")
}).catch((erro) => {
    console.log(`Ops, houve um erro ${erro}`)
});

module.exports = Login;