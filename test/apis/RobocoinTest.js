'use strict';

var Robocoin = require('../../apis/Robocoin');
var sinon = require('sinon');
var assert = require('assert');
var Config = require('../../lib/Config');

describe('Robocoin', function () {

    it('includes a nonce, key and signature with every request', function (done) {

        var config = new Config({
            'robocoin.testMode': '1',
            'robocoin.secret': 'gpNrX0HZii0UK4MNp2tm',
            'robocoin.baseUrl': 'https://www.somefutureurl.net/api/0',
            'robocoin.key': 'KmHKNmEXpWC4fzRnscic'
        });
        Robocoin.clearInstance();
        var robocoin = Robocoin.getInstance(config);

        sinon.stub(robocoin, '_request')
            .callsArg(1);
        sinon.stub(robocoin, '_getNonce')
            .returns(1403062498);

        robocoin._post('/some-endpoint', { someParam: 'someValue' }, function (err, res) {

            var expectedOptions = {
                url: 'https://www.somefutureurl.net/api/0/some-endpoint',
                form: {
                    someParam: 'someValue',
                    nonce: 1403062498
                },
                method: 'POST',
                json: true,
                headers: {
                    'X-API-key': 'KmHKNmEXpWC4fzRnscic',
                    'X-API-signature': '85450aee42105dc8472e289e18ed2abd8bf61e23e504ee5ba5422c8790012606'
                }
            };

            assert(robocoin._request.calledWith(expectedOptions));

            done(err);
        });
    });
});