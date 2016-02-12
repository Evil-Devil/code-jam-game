var Transport = function () {
    var that = {};
    var position = new Position();
    var destination = null;
    var velocity = 0.25;
    var owner = null;

    that.setOwner = function(player) {
        owner = player;
    };

    that.getOwner = function() {
        return owner;
    };


    function move(delta) {

        var distance = Math.sqrt(Math.pow(destination.x-position.x,2)+Math.pow(destination.y-position.y,2));
        var distX = (destination.x - position.x) / distance;
        var distY = (destination.y - position.y) / distance;

        position.x += (distX  * velocity * delta);
        position.y += (distY * velocity * delta);

        if (Math.sqrt(Math.pow(destination.x-position.x,2)+Math.pow(destination.y-position.y,2)) >= distance) {
            destination = null;
            //console.log("destination reached");
            return;
        }
    }

    that.click = function(e) {
        destination = new Position(e.layerX, e.layerY);
        //console.log(destination);
        if (null !== owner) {
            owner.pay(10);
        }
    }

    that.setPosition = function(x, y) {
        position = new Position(x,y);
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
        gfx.drawCircle(position.x, position.y, 15, '#0000FF');
        gfx.write(position.x - 10.5, position.y + 9, '#FFF', "T");
    };

    return that;

}