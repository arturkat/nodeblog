const config = require('./config')
const mongoose = require('mongoose')

module.exports = () => {
    return new Promise((resolve, reject) => {
        mongoose.Promise = global.Promise;
        mongoose.set('debug', true);

        mongoose.connection
            .on('error', error => reject(error))
            .on('close', () => console.log('Database connection closed.'))
            .once('open', () => resolve(mongoose.connections[0]));

        var dbLogin = config.database.login;
        var dbPassword = config.database.password;
        mongoose.connect(`mongodb://${dbLogin}:${dbPassword}@ds121371.mlab.com:21371/blog`);
        //useMongoClient: true
    });
};



