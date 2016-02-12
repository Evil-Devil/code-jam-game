var GameObjects = function () {

    var that = {};

    var allTransports = [];
    var allWorkshops = [];
    var marketplace = null;

    that.addTransport = function (transport) {
        allTransports.push(transport);
    };

    that.getTransport = function (id) {
        for (var i = 0; i < allTransports.length; i++) {
            if (allTransports[i].id == id) {
                return allTransports[i];
            }
        }
        throw Error('received move for non existent transporter');
    };

    that.getTransportsOfPlayer = function (playerIndex) {
        var resultList = [];
        for (var i = 0; i < allTransports.length; i++) {
            if (allTransports[i].owner.index == playerIndex) {
                resultList.push(allTransports[i]);
            }
        }
        return resultList;
    };

    that.getAllTransports = function () {
        return allTransports;
    };

    that.addWorkshop = function (workshop) {
        allWorkshops.push(workshop);
    };

    that.getAllWorkshops = function () {
        return allWorkshops;
    };

    that.getWorkshopsOfPlayer = function (playerIndex) {
        var resultList = [];
        for (var i = 0; i < allWorkshops.length; i++) {
            if (allWorkshops[i].owner.index == playerIndex) {
                resultList.push(allWorkshops[i]);
            }
        }
        return resultList;
    };

    that.setMarketplace = function (setMarketplace) {
        marketplace = setMarketplace;
    };

    that.getMarketplace = function () {
        return marketplace;
    };

    return that;
};

module.exports = GameObjects;