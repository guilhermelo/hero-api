var dao = require('./heros.dao');

exports.createHero = function(req, res, next) {
    var hero = {
        name: req.body.name,
        description: req.body.description
    };

    dao.create(hero, function(err, hero) {
        if(err) {
            res.json({
                error: err
            });
        }
        
        res.json({
            message: 'Herói criado com sucesso'
        });
    });
}

exports.getHeros = function(req, res, next) {
    dao.get({}, function(err, heros) {
        if(err) {
            res.json({
                error: err
            });
        }

        res.json({
            heros: heros
        });
    });
}

exports.getHero = function(req, res, next) {
    dao.get({_id: req.params.id}, function(err, heros) {
        if(err) { 
            res.json({
                error: err
            })
        }
        res.json({
            heros: heros
        });
    });
}

exports.updateHero = function(req, res, next) {
    var hero = {
        name: req.body.name,
        description: req.body.description
    }

    dao.update({_id: req.params.id}, hero, function(err, hero) {
        if(err) {
            res.json({
                error : err
            });
        }

        res.json({
            message : "Herói atualizado com sucesso"
        });
    });
}

exports.removeHero = function(req, res, next) {
    dao.delete({_id: req.params.id}, function(err, hero) {
        if(err) {
            res.json({
                error : err
            });
        }

        res.json({
            message : "Herói deletado com sucesso"
        });
    })
}