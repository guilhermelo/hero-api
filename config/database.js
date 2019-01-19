var mongoose = require('mongoose');

var chalk = require('chalk');

var dbURL = require('./properties').DB;

var connected = chalk.bold.cyan;
var error = chalk.bold.yellow;
var disconnected = chalk.bold.red;
var termination = chalk.bold.magenta;

module.exports = function() {
    mongoose.connect(dbURL, { useNewUrlParser: true });

    mongoose.connection.on('connected', function() {
        console.log(connected("Conectado: ", dbURL)); 
    });

    mongoose.connection.on('error', function(err){
        console.log(error("Ocorreu um erro na conexão", error));
    });

    mongoose.connection.on('disconnected', function(){
        console.log(disconnected("Desconectado"));
    });

    process.on('SIGINT', function() {
        mongoose.connection.close(function() {
            console.log(termination("Desconectado"));
            process.exit(0);
            
        })
    });
}
