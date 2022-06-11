const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();
const mongoose = require('mongoose');
const authenticate = require('../authinticate');

const Promotions = require('../models/promotions');
const cors = require('./cors');
promoRouter.use(bodyParser.json());

promoRouter.route('/')
.options(cors.corsWithOption, (req, res) =>  res.sendStatus(200) )
.get(cors.cors, (req, res, next) => {
     Promotions.find({})
    .then((promo) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser,
    authenticate.verifyAdmin,
    cors.corsWithOption,
     (req, res, next) => {
    console.log(req.body)
    Promotions.create(req.body)
    .then((promo) => {
        console.log('Promtion Created ', promo);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(authenticate.verifyUser,
    authenticate.verifyAdmin,
    cors.corsWithOption,
     (req, res, next) => {
    res.statusCode = 403;
    res.end('You can not update the promotion');
})
.delete(authenticate.verifyUser,
    authenticate.verifyAdmin,
    cors.corsWithOption,
     (req, res, next) => {
     Promotions.remove({})
    .then((promos) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promos);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

promoRouter.route('/:promoId')
.options(cors.corsWithOption, (req, res) =>  res.sendStatus(200) )
.get(cors.cors, (req, res, next) => {
     Promotions.findById(req.params.promoId)
    .then((promo) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser,
    authenticate.verifyAdmin,
    cors.corsWithOption, 
    (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/'+ req.params.promoId);
})
.put(authenticate.verifyUser,
    authenticate.verifyAdmin,
    cors.corsWithOption,
     (req, res, next) => {
    Promotions.findByIdAndUpdate(req.params.promoId, {
        $set: req.body
    }, { new: true })
    .then((promo) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
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

module.exports = promoRouter;