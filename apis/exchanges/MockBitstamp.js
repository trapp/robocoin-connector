'use strict';

var MockBitstamp = function () {
};

MockBitstamp.prototype.getBalance = function (callback) {
    console.log('MockBitstamp::getBalance');
    return callback(null, {
        btc_available: 0,
        fiat_available: 0,
        fee: 0
    });
};

MockBitstamp.prototype.getDepositAddress = function (callback) {
    console.log('MockBitstamp::getDepositAddress : bac123');
    callback(null, { address: 'bac123' });
};

/**
 *
 * @param amount
 * @param price Unpadded price to pay for the BTC
 * @param callback callback(err, order) - Order has datetime, id, type, usd, btc, fee, order_id
 */
MockBitstamp.prototype.buy = function (amount, price, callback) {
    console.log('MockBitstamp::buy amount: ' + amount + ' price: ' + price);

    price = price * 0.9; // correct for padding

    this.getMinimumOrders(function (err, minimumOrders) {
        if (amount < minimumOrders.minimumBuy) {
            return callback('Amount is below minimum of ' + minimumOrders.minimumBuy);
        }

        callback(null, {
            datetime: '2014-06-16 14:41:14',
            id: '9845312',
            type: 2,
            fiat: (price * amount),
            xbt: amount,
            fee: (price * amount * 0.005)
        });
    });
};

MockBitstamp.prototype.sell = function (amount, price, callback) {
    console.log('MockBitstamp::sell amount: ' + amount + ' price: ' + price);

    price = price * 1.1; // correct for padding

    this.getMinimumOrders(function (err, minimumOrders) {
        if (amount < minimumOrders.minimumSell) {
            return callback('Amount is below minimum of ' + minimumOrders.minimumSell);
        }

        callback(null, {
            datetime: '2014-06-16 14:41:14',
            id: '9845333',
            type: 2,
            fiat: (price * amount),
            xbt: amount,
            fee: (price * amount * 0.005)
        });
    });
};

/**
 *
 * @param amount
 * @param address
 * @param callback callbac(err, res) res contains id
 */
MockBitstamp.prototype.withdraw = function (amount, address, callback) {
    console.log('MockBitstamp::withdraw amount: ' + amount + ' address: ' + address);
    callback(null);
};

MockBitstamp.prototype.userTransactions = function (callback) {
    console.log('MockBitstamp::userTransactions');
    callback(null, [{
        id: 1231654531,
        datetime: '2014-06-16 14:41:14',
        type: 0,
        fiat: 0,
        xbt: 0,
        fee: 0,
        order_id: 0
    }]);
};

MockBitstamp.prototype.getMinimumOrders = function (callback) {
    return callback(null, { minimumBuy: 0.00769231, minimumSell: 0.00769231 });
};

MockBitstamp.prototype.getPrices = function (callback) {
    console.log('MockBitstamp::getPrice');
    callback(null, {
        buyPrice: (Math.floor((Math.random() * (621 - 619 + 1)) + 619)),
        sellPrice: (Math.floor((Math.random() * (621 - 619 + 1)) + 619))
    });
};

var mockBitstamp = null;

module.exports = {

    getInstance: function (config) {

        if (mockBitstamp === null) {
            mockBitstamp = new MockBitstamp();
        }

        return mockBitstamp;
    },
    clearInstance: function () {
        mockBitstamp = null;
    }
};