var module = {exports: null};

var Engine = function (id) {

    var baseImgPath = 'client/img/';
    var that = {};
    var canvas = null;
    var canvasId = id;
    var context = null;
    var mouse = null;
    var eventListener = {
        click: []
    };
    var preloaded = false;
    var loadedImages = {
        images: [],
        indexNames: {}
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


    that.registerListener = function (action, callback) {
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
    that.preloaded = function () {
        return preloaded;
    }
    that.preloader = function (imagefiles) {
        // Initialize variables
        loadcount = 0;
        loadtotal = imagefiles.length;

        // Load the images
        for (var i = 0; i < imagefiles.length; i++) {
            // Create the image object
            var image = new Image();

            // Add onload event handler
            image.onload = function () {
                loadcount++;
                if (loadcount == loadtotal) {
                    // Done loading
                    preloaded = true;
                }
            };

            // Set the source url of the image
            image.src = baseImgPath + imagefiles[i];

            // Save to the image array
            loadedImages.images[i] = image;
            loadedImages.indexNames[imagefiles[i]] = i;
        }

        // Return an array of images
        return loadedImages;
    }

    that.getImage = function (name) {
        if (typeof loadedImages.indexNames[name] === 'undefined') {
            throw Error('image not found');
        }
        return loadedImages.images[loadedImages.indexNames[name]];
    }

    that.loadImage = function (source, callback) {
        var img = new Image();
        img.onload = function (callback) {
            console.log("image " + source + " loaded");
            callback(true)
        }
        img.src = source;
        return img;
    }

    return that;

};

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

    that.lastClickPosition = function () {
        return lastClickPosition;
    }


    engine.registerListener('click', that.click);


    return that;

}