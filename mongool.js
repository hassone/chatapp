var MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost/new') 
.then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));