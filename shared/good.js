var Good = function(name, price, amount) {
    var that = {};
    var name = name;
    var price = price;
    var amount = amount;
    var demand = 50; // 0 - 100

    that.getName = function() {
        return name;
    };

    that.getPrice = function() {
        return price;
    }

    return that;
}
module.exports = Good;