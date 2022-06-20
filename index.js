const express = require("express");
const app = express();
const connection = require("./database/database");
const model = require("./database/form");
const Login = require("./database/login");


//conexão com o banco de dados
connection.authenticate().then(() => {
    console.log("Conexão estabelecida com sucesso!")
}).catch((erro) => {
    console.log(`Ops!, houve um erro ${erro}`)
});

//configurações do express
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

//rota formulario de login
app.get("/login", (request, response) => {
    response.render("login")
});


//rota para se cadastrar
app.post("/Register", (request, response) => {
    const { email, password } = request.body

    Login.create({
        email: email,
        password: password
    }).then(() => {

        if (email == '' && password == '') {
            console.log("Dados invalidos, insira novamente!")
            response.render("login")
        }
        else {
            console.log("Dados inseridos com sucesso!")
            response.redirect("/view")
        }

    }).catch((erro) => {
        console.log(`Não foi possivel cadastrar este usuario ${erro}`)
    })
});




//rota que contem o formulario de cadastro
app.get("/view", (request, response) => {
    response.render("form")
});

//cria a tabela no banco de dados
app.post("/inserir", (request, response) => {
    const { nome, data1, cpf, sexo, identidade, orgao_expedidor, data2, estado_civil,
        nacionalidade, naturalidade, nome_mae, nome_pai, nome_companheiro, endereco,
        bairro, cidade, uf, cep, tel_res, tel_com, tel_cel, email_int, email_pes, tipos, descricao } = request.body
    model.create({

        nome_completo: nome,
        data_entrada: data1,
        cpf: cpf,
        sexo: sexo,
        identidade: identidade,
        orgao_expedidor: orgao_expedidor,
        data_expedicao: data2,
        estado_civil: estado_civil,
        nacionalidade: nacionalidade,
        naturalidade: naturalidade,
        nome_mae: nome_mae,
        nome_pai: nome_pai,
        nome_companheiro: nome_companheiro,
        endereco_completo: endereco,
        bairro: bairro,
        cidade: cidade,
        uf: uf,
        cep: cep,
        telefone_residencial: tel_res,
        telefone_comercial: tel_com,
        telefone_celular: tel_cel,
        email_institucional: email_int,
        email_pessoal: email_pes,
        tipos: tipos,
        descricao: descricao

    }).then(() => {
        console.log("Dados inseridos com sucesso!!")
    }).catch((erro) => {
        console.log(`Ops, houve um erro!! ${erro}`)
    })
    response.redirect("/list")
});

//lista todos os funcionarios cadastrados no banco 
app.get("/list", (request, response) => {

    model.findAll({
        raw: true, order: [
            ['id', 'DESC']
        ]
    }).then((form) => {
        response.render("result", {
            form: form
        });
    })


})

//ver os detalhes do funcionario pelo ID 
app.get("/detalhes/:id", (request, response) => {
    const { id } = request.params
    model.findOne({
        where: {
            id: id
        }
    }).then((cadastro) => {

        if (cadastro != undefined) {
            response.render("detalhes", {
                cadastro: cadastro
            })
        }
        else {
            response.redirect("/view")
        }

    })

});

//rota para deletar os dados do formulario
app.get("/delete/:id", (request, response) => {
    const { id } = request.params;
    model.destroy({
        where: {
            id: id
        }
    }).then(() => {
        console.log("Dados deletados com sucesso!")
        response.redirect("/list")
    }).catch((erro) => {
        console.log(`Ops, houve um erro! ${erro}`)
    })

});

//formulario de alteração
app.get("/editar", (request, response) => {

    response.render("editar");
})

//rota para alterar os dados do formulario
app.post("/atualizar", (request, response) => {

    const { id, nome, data1, cpf, sexo, identidade, orgao_expedidor, data2, estado_civil,
        nacionalidade, naturalidade, nome_mae, nome_pai, nome_companheiro, endereco,
        bairro, cidade, uf, cep, tel_res, tel_com, tel_cel, email_int, email_pes, tipos, descricao } = request.body


    model.update({

        nome_completo: nome,
        data_entrada: data1,
        cpf: cpf,
        sexo: sexo,
        identidade: identidade,
        orgao_expedidor: orgao_expedidor,
        data_expedicao: data2,
        estado_civil: estado_civil,
        nacionalidade: nacionalidade,
        naturalidade: naturalidade,
        nome_mae: nome_mae,
        nome_pai: nome_pai,
        nome_companheiro: nome_companheiro,
        endereco_completo: endereco,
        bairro: bairro,
        cidade: cidade,
        uf: uf,
        cep: cep,
        telefone_residencial: tel_res,
        telefone_comercial: tel_com,
        telefone_celular: tel_cel,
        email_institucional: email_int,
        email_pessoal: email_pes,
        tipos: tipos,
        descricao: descricao

    }, {
        where: {
            id: id
        }
    }).then((form) => {
        console.log("dados editados com sucesso!")
        response.redirect("/list")
    }).catch((erro) => {
        console.log(`Ops!, houve um erro ${erro}`)
    })

});

//servidor rodando na porta setada
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
});