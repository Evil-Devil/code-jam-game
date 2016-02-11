var Player = function() {

    var that = {};
    var name;

    that.getName = function() {
        return name;
    };

    that.setName = function(setName) {
        name = setName;
    };

    return that;
};