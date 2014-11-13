'use strict';

module.exports = function(user, jwt, jwtSecret, toolsbelt, crypt, async) {

    var _user, _username, _password, _token, _response;

    var _checkUserExistence = function(callback) {
        user.findUser(_username, function(error, user) {
            if(error) {
                _response = {
                    status: 500,
                    body: error
                };

                callback(_response);
            } else {
                if(!user) {
                    _response = {
                        status: 404,
                        body: 'Username does not exist'
                    };

                    callback(_response);
                } else {
                    _user = user;
                    callback();
                }
            }
        });
    };

    var _validatePassword = function(callback) {
        var match = crypt.match(_password, _user.password);

        if(!match) {
            _response = {
                status: 401,
                body: 'Username and password are not consistent'
            };

            callback(_response);
        } else {
            callback();
        }
    };

    var _encodeToken = function(callback) {
        var expires = toolsbelt.normalizeDate(toolsbelt.aWeekLater());
        var payload = {
            username: _username,
            expires: expires
        };

        jwt.encode(jwtSecret, payload, function(err, token) {
            if(err) {
                _response = {
                    status: 500,
                    body: err
                };
                callback(_response);
            } else {
                _response = {
                    status: 200,
                    body: {
                        username: _username,
                        token: token
                    }
                };
                callback();
            }
        });
    };

    var postRoute = function(req, res) {
        if(!req.body || !req.body.username || !req.body.password) {
            return res.status(404).send('Need more parameters');
        }

        _username = req.body.username;
        _password = req.body.password;

        async.series(
            [
                _checkUserExistence,
                _validatePassword,
                _encodeToken
            ],
            function(error) {
                if(error) {
                    return res.status(error.status).send(error.body);
                } else {
                    if(_response) {
                        return res.status(_response.status).send(_response.body);
                    } else {
                        return res.status(500).send('something happened');
                    }
                }
            }
        );
    };

    return {
        postRoute: postRoute
    };
};
