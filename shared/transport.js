var Transport = function (id) {
    var that = {};
    var destination = null;
    var velocity = 0.25;
    that.stock = [];

    that.setOwner = function(player) {
        that.owner = player;
    };

    that.getOwner = function() {
        return that.owner;
    };

    that.owner = null;
    that.position = new Position();
    that.id = id;


    function move(delta) {

        if (destination == null)
            return;

        var distance = Math.sqrt(Math.pow(destination.x-that.position.x,2)+Math.pow(destination.y-that.position.y,2));

        if (distance == 0)
            return;

        var distX = (destination.x - that.position.x) / distance;
        var distY = (destination.y - that.position.y) / distance;

        that.position.x += (distX  * velocity * delta);
        that.position.y += (distY * velocity * delta);

        if (distX != 0 || distY != 0) {
            that.owner.getSocket().emit(MessageTypes.MOVE_TRANSPORT, {position: that.position, id: that.id});
        }

        if (Math.sqrt(Math.pow(destination.x-that.position.x,2)+Math.pow(destination.y-that.position.y,2)) >= distance) {
            destination = null;
            //console.log("destination reached");
            return;
        }
    }

    that.click = function(e) {
        destination = new Position(e.layerX, e.layerY);
        //console.log(destination);
    };

    that.setPosition = function(x, y) {
        that.position = new Position(x,y);
    };

    that.setDestination = function (x, y) {
        if (destination == null || destination.x != x || destination.y != y) {
            destination = new Position(x, y);
            if (null !== that.owner) {
                that.owner.pay(10);
            }
        }
    };

    that.update = function(delta) {
        console.log(that.position);
        if (null !== destination) {
            move(delta);
        }
    }

    that.draw = function (gfx, engine) {

        gfx.drawImageScaled(that.position.x, that.position.y, 80, 80, engine.getImage('karren.png'));
    };

    return that;

};
module.exports = Transport;