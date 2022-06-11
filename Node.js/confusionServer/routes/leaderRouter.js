const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();
const Leaders = require('../models/leaders');
const authenticate = require('../authinticate');
const cors = require('./cors');

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.options(cors.corsWithOption, (req, res) =>  res.sendStatus(200) )
.get(cors.cors, (req, res, next) => {
    Leaders.find({})
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser,
    authenticate.verifyAdmin,
    cors.corsWithOption,
     (req, res, next) => {
    console.log(req.body)
    Leaders.create(req.body)
    .then((leader) => {
        console.log('Leader has been added ', leader);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(authenticate.verifyUser,
    authenticate.verifyAdmin,
    cors.corsWithOption,
     (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT oppertion not supported in leader');
})
.delete(authenticate.verifyUser,
    authenticate.verifyAdmin,
    cors.corsWithOption,
     (req, res, next) => {
     Leaders.remove({})
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));  
});

leaderRouter.route('/:leaderId')
.options(cors.corsWithOption, (req, res) =>  res.sendStatus(200) )
.get(cors.cors,
    (req, res, next) => {
    Leaders.findById(req.params.promoId)
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser,
    authenticate.verifyAdmin,
    cors.corsWithOption,
     (req, res ,next) => {
    res.statusCode = 403;
    res.end('The POST opertion is not allowd in leader with ID : ' + req.params.leaderId);
})
.put(authenticate.verifyUser,
    authenticate.verifyAdmin,
    cors.corsWithOption,
     (req, res, next) => {
    Promotions.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
    }, { new: true })
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(authenticate.verifyUser,
    authenticate.verifyAdmin,
    cors.corsWithOption,
     (req, res, next) => {
    Promotions.findByIdAndRemove(req.params.promoId)
    .then((prom) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = leaderRouter;