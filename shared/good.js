var Good = function(name, price, amount) {
    var that = {};

    that.name = name;
    that.price = price;
    that.amount = amount;
    that.demand = 50; // 0 - 100

    return that;
}
module.exports = Good;