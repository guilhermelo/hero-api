var express = require('express');
var log = require('morgan')('dev');
var bodyParser = require('body-parser');

var properties = require('./config/properties');
var db = require('./config/database');

var app = express();

var herosRoutes = require('./api/heros/heros.routes');
var bodyParserURLEncoded = bodyParser.urlencoded({extended: true});

// Inicializa rotas do express
var router = express.Router();

// Conecta ao mongo
db();

// configurando app
app.use(log);
app.use(bodyParser.json());
app.use(bodyParserURLEncoded);


app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
     res.setHeader("Access-Control-Allow-Credentials", "true");
     res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
     res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
   next();
 });

// Configurando rotas do express
app.use('/api', router);

herosRoutes(router);

app.listen(properties.PORT, (req, res) => {
    console.log(`Server no ar na porta ${properties.PORT}`);
});
