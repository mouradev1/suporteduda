const AbriChamados = require('./Chamado/index');
const updade_status = require('./Chamado/update');
const Busca_Status = require('./Chamado/status')
const Meus_Chamados = require('./Chamado/Meus_Chamados')
const TelegramBot = require('node-telegram-bot-api');
const token = 'token do bot';
var bot = new TelegramBot(token, { polling: true });
data = new Date();
console.log(`Bot Ativo ${data}`);
var chatId = 0;
bot.on('message', function (msg) {
    console.log('msg', msg);
    let start = msg.text.toLowerCase().indexOf('/start');
    let cha = msg.text.toLowerCase().indexOf('/cha');
    let update = msg.text.toLowerCase().indexOf('/update');
    let ping = msg.text.toLowerCase().indexOf('/ping');

});

bot.onText(/\/start/, (msg) => {
    chatId = msg.chat.id;
    var mensagem = `Olá  *${msg.from.first_name}*\nBem Vindo ao Suporte Duda\nAbaixo você vera minhas funcionalidades\n1- comando /cha para pode criar chamados\n2-Comando /status + o id do seu chamado
    para pode ver o status do seu chamado`;
    bot.sendMessage(chatId, mensagem, { parse_mode: "Markdown" });
});

function Data(data) { //Captura da Data atual, verifica codigo 
    var data = new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0].replace('T', ' ');
    return data;
}

const adm = [`401155205`, `16637242663`]

function StatusVazio(msg) { // msg do status vazio
    chatId = msg.chat.id;
    bot.sendMessage(chatId, `${msg.from.first_name} Não foi informado o ID do chamado. `);
}

bot.onText(/\/cha/, (msg) => { 
    chatId = msg.chat.id;
    var nome = msg.from.first_name.replace(/[^a-zA-Z ]/g, "");
    var id_telegram = msg.from.id;
    var assunto = msg.text.toLowerCase();
    assunto = assunto.replace('/cha','');
    if (assunto.length <= 8) {
        bot.sendMessage(chatId, `${msg.from.first_name} por gentileza adiciona o assunto do chamado!`);
    } else {
        var status = "aberto";
        var data = Data(data);
        cha = [{ // ARRAY COM OS DADOS 
            nome: nome,
            id_telegram: id_telegram,
            assunto: assunto,
            status: status,
            data: data
        }]
        AbriChamados(cha, (err, result) => {
            if (err) { 
                bot.sendMessage(id_telegram, 'Erro ao cadastrar o chamado');
            } else {
                bot.sendMessage(id_telegram, result);
            }
        })

    };
});

bot.onText(/\/status/, (msg) => {
    chatId = msg.chat.id;
    var text = msg.text;
    text = text.replace(/.\D/g, '');
    console.log(text)
    if (text == "") {
        StatusVazio(msg); //Retorno chamado vazio
    } else {
        Dados_Status = [{
            id: text
        }]
        Busca_Status(Dados_Status, (err, retorno) => {
            if (err) {
                bot.sendMessage(chatId, err);
            } else {
                bot.sendMessage(chatId, retorno);
            }
        })

    };
});

bot.onText(/\/update/, (msg) => {
    chatId = msg.chat.id;
    var text = msg.text;
    text = text.replace(/\D/g, '');
    const verifica = adm.filter(function (item) {
        if (item == chatId) {
            return item;
        }
    })
    if (text == "") {
        StatusVazio(msg); //Retorno chamado vazio
    } else if (verifica == chatId) {
        id = text
        info = [{
            id: id
        }]
        updade_status(info, (err, retorno) => {
            if (err) {
                bot.sendMessage(chatId, err);
            } else {
                bot.sendMessage(chatId, retorno);
            }
        })
    } else {
        bot.sendMessage(chatId, `Sinto muito ${msg.from.first_name} Você não tem permissão pra atualizar chamados. `);
    }
});

bot.onText(/\/todos/, (msg) => {
    chatId = msg.chat.id;
    var id_telegram = msg.from.id;
    var text = msg.text;
    text = text.replace(/.\D/g, '');
    if (text == "") {
        bot.sendMessage(chatId, `${msg.from.first_name} favor informa a quantidade do chamado a ser listada!`);
    } else {
        info = [{
            id_telegram:id_telegram,
            quantidade:text,
            nome:msg.from.first_name
        }]
        Meus_Chamados(info,(err,retorno)=>{
            if(err){
                bot.sendMessage(chatId, 'Ola, algo deu errado procure o administrador');
            }else{
                bot.sendMessage(chatId, retorno);
            }
        })
    }
});
