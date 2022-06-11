const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/confusion';
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log('Connectd correctly to server');

    Dishes.create({
        name: 'Uthappizza',
        description: 'test'
    })
    .then((dish) => {
        console.log(dish);
        return Dishes.findByIdAndUpdate(dish._id, {
            $set: { description: 'Updated test' },
        },{
            new: true
        }    
        ).exec();
    })
    .then((dishe) => {
        console.log(dishe);

        dishe.comments.push({
            rating: 5,
            comment: 'I\'m getting a sinking feeling!',
            author: 'Liunardo di caprio'
        });
        return dishe.save();
    })
    .then((dishe) => {
        console.log(dishe.comments);
        return Dishes.remove({});
    })
    .then(() => {
        return mongoose.connection.close();
    })
    .catch((err) => console.log(err));
})