module.exports = function (){

    var generateEmptyResponse = function () {
        return {
            resCode: '',
            resBody: '',
            send: function (resCode, resBody) {
                this.resCode = resCode;
                this.resBody = resBody;
            },
            json: function (res) {
                this.resCode = res;
            },
            status: function(status) {
                this.resCode = status;
                var that = this;
                return {
                    end: function(){},
                    send: function(resBody) {
                        that.resBody = resBody
                    }
                };
            }
        };
    };

    var generateMockCrypt = function() {
        return {
            encrypt: function(){},
            decrypt: function(){},
            match: function(){}
        };
    };

    var generateMockUser = function() {
        return {
            findUser: function(){}
        };
    };

    var generateMockUserModel = function() {
        return {
            findOne: function(){}
        };
    };

    var generateMockJwt = function() {
        return {
            encode: function(){},
            decode: function(){}
        };
    };

    var generateMockToolsbelt = function() {
        return {
            normalizeDate: function(){},
            isDate: function(){},
            aWeekLater: function(){}
        };
    };

    return {
        generateEmptyResponse: generateEmptyResponse,
        generateMockCrypt: generateMockCrypt,
        generateMockUser: generateMockUser,
        generateMockUserModel: generateMockUserModel,
        generateMockJwt: generateMockJwt,
        generateMockToolsbelt: generateMockToolsbelt
    };
}();