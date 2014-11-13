'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var collectionName = 'user';

var userSchema = new Schema({
    userId: Number,
    username: String,
    password: String
}, {collection: collectionName});

var userModel = mongoose.model('user', userSchema);

module.exports = function(model) {
    if(model === undefined) {
        model = userModel;
    }

    var findUser = function(username, callback) {
        var conditions = {username: username};
        var fields = {_id: 0, username: 1, password: 1};

        model.findOne(conditions, fields, function(error, user) {
            if(error) {
                var errorMessage = 'Error happened during findUser phase: ' + error;
                callback(errorMessage);
            } else {
                callback(null, user);
            }
        });
    };

    return {
        findUser: findUser
    };
};