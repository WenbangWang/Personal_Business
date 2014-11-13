'use strict';

var expect = require('chai').expect;
var async = require('async');
var sinon = require('sinon');
var testUtil = require(process.cwd() + '/test/api/test-utils');

describe('login handler: /login', function() {

    var mainHandler;
    var req, res;
    var mockUser, mockJwt, mockJwtSecret, mockToolsbelt, mockCrypt, mockError;
    var spy, stub;
    var user;
    var expires, payload, token;

    beforeEach(function() {
        req = {
            body: {
                username: 'user',
                password: 'password'
            }
        };
        res = testUtil.generateEmptyResponse();
        mockCrypt = testUtil.generateMockCrypt();
        mockUser = testUtil.generateMockUser();
        mockJwt = testUtil.generateMockJwt();
        mockToolsbelt = testUtil.generateMockToolsbelt();
        mockJwtSecret = 'secret';
        mockError = 'error';

        user = {
            username: req.body.username,
            password: 'Encrypted'
        };
        expires = 'expires';
        payload = {
            username: req.body.username,
            expires: expires
        };
        token = 'token';

        mainHandler = require(process.cwd() + '/instrument/api/handlers/login/main-handler')(mockUser, mockJwt, mockJwtSecret, mockToolsbelt, mockCrypt, async);
    });

    afterEach(function() {
        if(spy) {
            spy.restore();
            spy.reset();
        }

        if(stub) {
            stub.restore();
            stub.reset();
        }
    });

    describe('postRoute()', function() {

        it('should return 404 when no require body is provided', function() {
            req = {};

            mainHandler.postRoute(req, res);

            expect(res.resCode).to.equal(404);
            expect(res.resBody).to.equal('Need more parameters');
        });

        it('should return 404 when empty require body is provided', function() {
            req.body = null;

            mainHandler.postRoute(req, res);

            expect(res.resCode).to.equal(404);
            expect(res.resBody).to.equal('Need more parameters');
        });

        it('should return 404 when no username is provided', function() {
            req.body.username = null;

            mainHandler.postRoute(req, res);

            expect(res.resCode).to.equal(404);
            expect(res.resBody).to.equal('Need more parameters');
        });

        it('should return 404 when no password is provided', function() {
            req.body.password = null;

            mainHandler.postRoute(req, res);

            expect(res.resCode).to.equal(404);
            expect(res.resBody).to.equal('Need more parameters');
        });

        it('should return response object when everything is fine', function() {
            var responseBody = {
                username: req.body.username,
                token: token
            };
            sinon.stub(mockUser, 'findUser').callsArgWith(1, null, user);
            sinon.stub(mockCrypt, 'match').returns(true);
            sinon.stub(mockToolsbelt, 'normalizeDate').returns(expires);
            sinon.stub(mockJwt, 'encode').callsArgWith(2, null, token);

            mainHandler.postRoute(req, res);

            expect(res.resCode).to.equal(200);
            expect(res.resBody).to.eql(responseBody);
        });
    });

    describe('checkUserExistence()', function() {

        it('should return 500 when error happened during findUser phase', function() {
            stub = sinon.stub(mockUser, 'findUser').callsArgWith(1, mockError);

            mainHandler.postRoute(req, res);

            expect(res.resCode).to.equal(500);
            expect(res.resBody).to.equal(mockError);
        });

        it('should return 404 when no such user was found', function() {
            var _errorMessage = 'Username does not exist';
            stub = sinon.stub(mockUser, 'findUser').callsArgWith(1, null, null);

            mainHandler.postRoute(req, res);

            expect(res.resCode).to.equal(404);
            expect(res.resBody).to.equal(_errorMessage);
        });
    });

    describe('validatePassword()', function() {

        var _user;

        beforeEach(function() {
            _user = {
                username: req.body.username,
                password: 'Encrypted'
            };

            sinon.stub(mockUser, 'findUser').callsArgWith(1, null, _user);
        });

        afterEach(function() {
            mockUser.findUser.restore();
        });

        it('should call mockCrypt.match with correct arguments', function() {
            spy = sinon.stub(mockCrypt, 'match');

            mainHandler.postRoute(req, res);

            expect(spy.calledWith(req.body.password, _user.password));
        });

        it('should return 401 when the password is not correct', function() {
            var _errorMessage = 'Username and password are not consistent';
            stub = sinon.stub(mockCrypt, 'match').returns(false);

            mainHandler.postRoute(req, res);

            expect(res.resCode).to.equal(401);
            expect(res.resBody).to.equal(_errorMessage);
        });
    });

    describe('encodeToken()', function() {

        beforeEach(function() {
            sinon.stub(mockUser, 'findUser').callsArgWith(1, null, user);
            sinon.stub(mockCrypt, 'match').returns(true);
            sinon.stub(mockToolsbelt, 'normalizeDate').returns(expires);
        });

        afterEach(function() {
            mockUser.findUser.restore();
            mockCrypt.match.restore();
            mockToolsbelt.normalizeDate.restore();
        });

        it('should call mockJwt.encode with correct arguments', function() {
            spy = sinon.stub(mockJwt, 'encode');

            mainHandler.postRoute(req, res);

            expect(spy.calledWith(mockJwtSecret, payload)).to.equal(true);
        });

        it('should return 500 when error happened during encode phase', function() {
            stub = sinon.stub(mockJwt, 'encode').callsArgWith(2, mockError);

            mainHandler.postRoute(req, res);

            expect(res.resCode).to.equal(500);
            expect(res.resBody).to.equal(mockError);
        });
    });
});