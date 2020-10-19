const mongodb = require('mongodb');
const { MongoClient } = mongodb;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect('mongodb+srv://artur:hbC8n2mEfS9IBxXx@cluster0.r74qt.mongodb.net/shop?retryWrites=true&w=majority')
  .then(client => {
    _db = client.db();
    callback(client);
  })
  .catch(err => console.log(err));
}

const getDb = () => {
  if(_db) return _db;
  throw 'No database found!';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;