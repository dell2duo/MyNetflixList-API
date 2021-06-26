const express = require("express"); //servidor node
const route = require("./routes"); //arquivo de rotas
const cors = require("cors"); //middleware de autorização de acesso

// const mailController = require("./controllers/mailer.controller");

const app = express(); //cria o servidor

app.use(express.json()); //indica o uso do padrão JSON para requisições
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // atualmente qualquer um consegue utilizar essa api

app.use(route, () => {}); //uso do arquivo routes para rotas

app.listen(process.env.PORT || 3333); //indica a porta 3333 para uso do express

// const interval = 1; //minutos
// const milli = 60000; //1 minuto em millisegundos

// setInterval(() => {
//   mailController.mail();
// }, interval * milli);
