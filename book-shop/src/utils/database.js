const { MongoClient } = require('mongodb');

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(process.env.DB_URI, { useUnifiedTopology: true })
  .then(client => {
    _db = client.db();
    callback(client);
  })
  .catch(err => console.error(err));
}

const getDb = () => {
  if(_db) return _db;
  throw 'No database found!';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;