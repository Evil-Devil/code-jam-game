var Engine = function(id) {

    var that = {};
    var canvas = null;
    var canvasId = id;
    var context = null;
    var mouse = null;

    function retrieveCanvas() {
        canvas = document.getElementById(canvasId);
    }

    function retrieveContext() {
        context = canvas.getContext("2d");
        context.font = 'Verdana 14px normal';
    }

    function registerEvents() {
        canvas.addEventListener('click', mouse.click, false);
        //canvas.addEventListener('mousemove', mouse.move, false);
    }

    function onClick(e) {
    }

    function onMouseMove(e) {
        console.log(e);
    }

    that.getCanvas = function() {
        return canvas;
    }

    that.getContext = function() {
        return context;
    }

    that.init = function() {
        retrieveCanvas();
        retrieveContext();
        mouse = new Mouse(canvas.offsetLeft, canvas.offsetTop);
        registerEvents();
    }

    that.getMouse = function() {
        return mouse;
    }

    return that;

};

var Mouse = function(offsetX, offsetY) {
    var offsets = {x: offsetX || 0, y: offsetY || 0};
    var that = {};
    var position = new Position();

    function logPosition() {
        console.log("X: " + position.x + " Y: " + position.y);
    }

    function calcPosition(e) {
        position.x = e.pageX - offsets.x;
        position.y = e.pageY - offsets.y;
    }

    that.click = function(e) {
        calcPosition(e);
        logPosition();
    }

    that.move = function(e) {
        calcPosition(e);
        logPosition();
    }

    that.position = function() {
        return position;
    }

    return that;

}