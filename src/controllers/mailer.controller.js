const nodemailer = require("nodemailer");
const connection = require("../database/connection");

const email = process.env.EMAIL_USER;
const password = process.env.EMAIL_PASSWORD;

async function mail() {
  var today = new Date();
  console.log(today);
  console.log(today.getDate());
  // connection("notificacoes").where({ data: today.getDate() });

  // const transporter = nodemailer.createTransport({
  //   host: "smtp.gmail.com",
  //   port: 587,
  //   auth: { user: email, pass: password },
  // });

  // transporter
  //   .sendMail({
  //     from: email,
  //     to: email,
  //     subject: "Teste",
  //     text: "Email teste dessa porra.",
  //   })
  //   .then(() => {
  //     res.status(200).json("Email enviado com sucesso!");
  //   })
  //   .catch((err) => {
  //     res.status(400).json(err);
  //   });
}

module.exports = {
  mail,
};
