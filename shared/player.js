var Player = function(index, socket) {

    var that = {};
    var name;
    var money = 0;
    var socket = socket;

    that.onNameChanged = null;

    that.getName = function() {
        return name;
    };

    that.getSocket = function() {
        return socket;
    };

    that.setName = function(setName) {
        if (that.onNameChanged != undefined) {
            that.onNameChanged(setName, name);
        }
        name = setName;
    }

    that.index = index;

    that.getIndex = function() {
        return that.index;
    };

    that.getMoney = function() {
        return money;
    }

    that.setMoney = function(amount) {
        money = amount;
    }

    that.getSocket = function() {
        return socket;
    };

    that.pay = function(amount) {
        console.log(amount);
        this.setMoney(this.getMoney() - amount);
    }

    return that;
};
module.exports = Player;