var nodemailer = require('nodemailer');
function Email(id, assunto, emailNome) {
    console.log(`Dados por email ${id} ${assunto}`);
    // Vamos criar a conta que irá mandar os e-mails
    var conta = nodemailer.createTransport({
        service: 'stylesuporte@gmail.com', // Existem outros services, você pode procurar
        // na documentação do nodemailer como utilizar
        // os outros serviços
        auth: {
            user: 'stylesuporte@gmail.com', // Seu usuário no Gmail
            pass: '@meumundoeoseu' // A senha da sua conta no Gmail :-)
        }
    });

    conta.sendMail({
        from: `${emailNome} <stylesuporte@gmail.com>`, // Quem está mandando
        to: 'Chamado telegram <mouralol23@gmail.com>', // Para quem o e-mail deve chegar
        subject: `Chamado ID: ${id} `, // O assunto
        html: `<h1> Chamado aberto por  ${emailNome}!</h1>\n<h2>Assunto: ${assunto}</h2>`, // O HTMl do nosso e-mail
    }, function (err) {
        if (err)
            throw err;
        console.log('E-mail enviado!');
    });
}
