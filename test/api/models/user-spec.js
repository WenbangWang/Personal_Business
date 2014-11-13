'use strict';

var sinon = require('sinon');
var expect = require('chai').expect;
var testUtil = require(process.cwd() + '/test/api/test-utils');

describe('user model', function() {

    var user;
    var mockUserModel, mockError, mockDocument;
    var mockUsername, callback;
    var spy, stub;
    var errorMessage, document;

    beforeEach(function() {
        mockUserModel = testUtil.generateMockUserModel();
        mockError = 'error';
        mockDocument = 'document';
        mockUsername = 'test user';

        errorMessage = document = '';

        callback = function(err, doc) {
            errorMessage = err;
            document = doc;
        };

        user = require(process.cwd() + '/instrument/api/models/user')(mockUserModel);
    });

    afterEach(function() {
        if(spy) {
            spy.restore();
        }

        if(stub) {
            stub.restore();
        }
    });

    describe('findUser()', function() {

        it('should call mockUserModel.findOne with correct arguments', function() {
            var conditions = {username: mockUsername};
            var fields = {_id: 0, username: 1, password: 1};
            spy = sinon.stub(mockUserModel, 'findOne');

            user.findUser(mockUsername, callback);

            expect(spy.calledWith(conditions, fields)).to.equal(true);
        });

        it('should call the callback with the error message when error happened during findUser phase', function() {
            var mockErrorMessage = 'Error happened during findUser phase: ' + mockError;
            stub = sinon.stub(mockUserModel, 'findOne').callsArgWith(2, mockError);

            user.findUser(mockUsername, callback);

            expect(errorMessage).to.equal(mockErrorMessage);
        });

        it('should call the callback with the returned document', function() {
            stub = sinon.stub(mockUserModel, 'findOne').callsArgWith(2, null, mockDocument);

            user.findUser(mockUsername, callback);

            expect(document).to.equal(mockDocument);
        });
    });
});