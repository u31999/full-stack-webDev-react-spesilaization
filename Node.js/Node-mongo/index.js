const MongoClient = require('mongodb');
const assert = require('assert');
const dbOpr = require('./opertions');

const url = 'mongodb://localhost:27017/';
const dbname = 'confusion';
MongoClient.connect(url)
.then((client) => {
    console.log('Connect correctly to database');

    const db = client.db(dbname);

    dbOpr.insertDocument(db, {name: 'vadonut', description: "test"}, "dishes")
    .then((result) => {

        console.log('Insert Document:\n', result.ops);

       return dbOpr.findDocument(db, 'dishes');
    })
    .then((docs) => {
        console.log('Found documents:\n', docs);

        return dbOpr.updateDocument(db, {name : 'vadonut',  description: "test"}, 
        { description: "updated test"}, 'dishes')
    })
    .then((result) => {
        console.log('Updated document"\n', result.result);

        return dbOpr.findDocument(db, 'dishes')
    })
    .then((docs) => {
        console.log('Found updated document:\n', docs);

        return db.dropCollection('dishes')
    })
     .then((result)=>{
        console.log('Droped collection: ', result);

        client.close();
    })
    .catch((err) => console.log(err));
})
.catch((err) => console.log(err));