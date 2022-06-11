const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.end('We will send you all the promotion');
})
.post((req, res, next) => {
    res.end('Will add the promotion: ' + req.body.name + 
    ' with Detals: ' + req.body.description)
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('You can not update the promotion');
})
.delete((req, res, next) => {
    res.end('Will delete this promtion');
});

promoRouter.route('/:promoId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.end('We will send you the promo with the id: ' + req.params.promoId);
})
.post((req, res, next) => {
    res.end('Will add the promotion: ' + req.params.promoId + 
    ' with Detals: ' + req.body.description)
})
.put((req, res, next) => {
    res.end('Will update the promo: ' + req.params.promoId);
})
.delete((req, res, next) => {
    res.end('Will delete this promtion: ' + req.params.promoId);
});

module.exports = promoRouter;