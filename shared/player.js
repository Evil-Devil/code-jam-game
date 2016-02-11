var Player = function() {

    var that = {};
    var name;
    var money = 0;

    that.getName = function() {
        return name;
    };

    that.setName = function(setName) {
        name = setName;
    };

    that.getMoney = function() {
        return money;
    }

    that.setMoney = function(amount) {
        money = amount;
    }

    return that;
};