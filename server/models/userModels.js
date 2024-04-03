const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const MONGO_URI = 'mongodb+srv://nicolettesookar:databasePassword@atlascluster.hxrfuna.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster';

mongoose.connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'water-fountains'
  })
    .then(() => console.log('Connected to Mongo DB.'))
    .catch(err => console.log(err));

    const Schema = mongoose.Schema;

    const SALT_WORK_FACTOR = 10

    const userSchema = new Schema({
        username: String,
        password: String
    })


    userSchema.pre('save',  function(next){
      console.log('i am in the prefunction')
      console.log(this)
      bcrypt
        .genSalt(SALT_WORK_FACTOR)
        .then(result => bcrypt.hash(this.password, result))
        .then(hash => {
          this.password = hash
          return next()
        })
    })

    const Users = mongoose.model('users', userSchema);

    module.exports = {
        Users 
      };