var Transport = function (id) {
    var that = {};
    var destination = null;
    var velocity = 0.25;

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

        var distance = Math.sqrt(Math.pow(destination.x-that.position.x,2)+Math.pow(destination.y-that.position.y,2));
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
        if (null !== that.owner) {
            that.owner.pay(10);
        }
    }

    that.setPosition = function(x, y) {
        that.position = new Position(x,y);
    };

    that.setDestination = function (x, y) {
        destination = new Position(x,y);
    };

    that.update = function(delta) {
        if (null !== destination) {
            move(delta);
        }
    }

    that.draw = function (gfx) {
        gfx.fontSize('21px');
        gfx.drawCircle(that.position.x, that.position.y, 15, '#0000FF');
        gfx.write(that.position.x - 10.5, that.position.y + 9, '#FFF', "T");
    };

    return that;

};
module.exports = Transport;