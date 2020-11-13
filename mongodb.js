//CRUD
// const mongodb =require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID } = require('mongodb');   //destructuring mongodb object

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

// const id = new ObjectID();
// console.log(id.toHexString().length());
// console.log(id.getTimestamp());

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if(error) {
        return console.log('unable to connect to database');
    }

    const db = client.db(databaseName);

   
    
});

 //  db.collection('users').updateOne({
    //     _id: new ObjectID("5fadf3c732f6fb250ab119b7")
    // }, {
    //     $set: {
    //         name: 'john'
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error);
    // });

// db.collection('users').insertOne({
    //     name: 'Marlon',
    //     age: '35'
    // }, (error, result) => {
    //     if(error) {
    //         return console.log('unable to insert user')
    //     }

    //     console.log(result.ops)
    // });

    // db.collection('users').insertMany([
    //     {
    //         name: 'Marx',
    //         age: 4
    //     }, {
    //         name: 'onyx',
    //         age: 3
    //     }
    // ], (error, result) => {
    //     if(error) {
    //         return console.log('unable to insert users');
    //     }

    //     console.log(result.ops);
    // });