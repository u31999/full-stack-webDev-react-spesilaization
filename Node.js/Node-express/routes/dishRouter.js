const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json())

dishRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.end('Will send all the dishes to you');
})
.post((req, res, next) => {
    res.end('Will add the dish: ' + req.body.name + 
    ' with Detals: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT oppertion not supported in dishes');
})
.delete((req, res, next) => {
    res.end('Deleting all the dishes');
});

dishRouter.route('/:dishId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.end('Will send you the details of dish: ' + req.params.dishId);
})
.post((req, res ,next) => {
    res.statusCode = 403;
    res.end('The POST opertion is not allowd in dish with ID : ' + req.params.dishId);
})
.put((req, res, next) => {
    res.end('The dish : ' + req.params.dishId + ' will be updated');
})
.delete((req, res, next) => {
    res.end('Will delete the dish: ' + req.params.dishId)
});

module.exports = dishRouter;