var module = {exports: null};

var Engine = function (id) {

    var that = {};
    var canvas = null;
    var canvasId = id;
    var context = null;
    var mouse = null;
    var eventListener = {
        click: []
    };

    function retrieveCanvas() {
        canvas = document.getElementById(canvasId);
    }

    function retrieveContext() {
        context = canvas.getContext("2d");
        context.font = 'Verdana 14px normal';
    }

    function registerEvents() {
        canvas.addEventListener('click', doClick, false);
        //canvas.addEventListener('mousemove', mouse.move, false);
    }

    function doClick(e) {
        for (action in eventListener.click) {
            eventListener.click[action](e);
        }
    }


    that.registerListener = function(action, callback) {
        if (typeof(eventListener[action]) === 'undefined') {
            throw exception("no event listener for action: " + action);
        }
        //console.log(eventListener[action]);
        //console.log(callback);
        eventListener[action].push(callback);
    }

    that.getCanvas = function () {
        return canvas;
    }

    that.getContext = function () {
        return context;
    }

    that.init = function () {
        retrieveCanvas();
        retrieveContext();
        registerEvents();
        mouse = new Mouse(that);
    }

    that.getMouse = function () {
        return mouse;
    }

    return that;

};

var Position = function (x, y) {
    this.x = x || 0;
    this.y = y || 0;

}

var Mouse = function (engine) {
    var offsets = {x: 0, y: 0};
    var that = {};
    var position = new Position();
    var lastPosition = new Position();
    var lastClickPosition = new Position();

    function logPosition() {
        console.log("X: " + position.x + " Y: " + position.y);
    }

    function calcPosition(e) {
        position.x = e.pageX - offsets.x;
        position.y = e.pageY - offsets.y;
    }

    that.click = function (e) {
        //console.log("click in mouse executed");
        calcPosition(e);
        logPosition();
    }

    that.move = function (e) {
        calcPosition(e);
        logPosition();
    }

    that.position = function () {
        return position;
    }

    that.lastPosition = function () {
        return lastPosition;
    }

    that.lastClickPosition = function() {
        return lastClickPosition;
    }


    engine.registerListener('click', that.click);


    return that;

}