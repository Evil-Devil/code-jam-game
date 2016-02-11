var Engine = function(canvasId) {

    var that = {};
    var canvas = null;
    var canvasId = canvasId;
    var context = null;

    function retrieveCanvas() {
        canvas = document.getElementById(canvasId);
    };

    function retrieveContext() {
        context = canvas.getContext("2d");
    }

    that.getCanvas = function() {
        return canvas;
    };

    that.getContext = function() {
        return context;
    }

    that.init = function() {
        retrieveCanvas();
        retrieveContext();
    }

    return that;

};