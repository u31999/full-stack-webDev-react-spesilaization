const express = require('express');
const cors = require('cors');
const app = express();

const whitelist = ['http://localhost:3000', 'https://localhost:3443'];

let corsOptionDelegate = (req, callbask) => {
    let corsOption;

    if(whitelist.indexOf(req.header('origin')) !== -1) {
        corsOption = { origin: true };
    } else {
        corsOption = { origin: false };
    }
    callbask(null, corsOption);
} 

exports.cors = cors();
exports.corsWithOption = cors(corsOptionDelegate);