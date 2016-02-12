var Good = function(name) {
    var that = {};
    var name = name;

    that.getName = function() {
        return name;
    };

    return that;
}
