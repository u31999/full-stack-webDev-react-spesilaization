const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.end('Will send all the leaders details to you');
})
.post((req, res, next) => {
    res.end('Will add the leaders: ' + req.body.name + 
    ' with Details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT oppertion not supported in leader');
})
.delete((req, res, next) => {
    res.end('Deleting all the leaders');
});

leaderRouter.route('/:leaderId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.end('Will send you the details of leader: ' + req.params.leaderId + ' to you');
})
.post((req, res ,next) => {
    res.statusCode = 403;
    res.end('The POST opertion is not allowd in leader with ID : ' + req.params.leaderId);
})
.put((req, res, next) => {
    res.end('The leader : ' + req.params.leaderId + ' will be updated');
})
.delete((req, res, next) => {
    res.end('Will delete the leader: ' + req.params.leaderId)
});

module.exports = leaderRouter;