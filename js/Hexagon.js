var Hexagon = (function() {
    // "private" variables 
    var cx, cy, r, color, opacity, id, dir, dir_x, dir_y, rate_opacity, speed_x, speed_y;;

    // constructor
    function Hexagon() {
        this.dir = -1;
        this.opacity = 1;
        this.dir_x = 1;
        this.dir_y = 1;
        this.rate_opacity = 0.01;
        this.speed_x = this.speed_y = 1;
    };

    // add the methods to the prototype so that all of the 
    // Foo instances can access the private static

    Hexagon.prototype.draw = function() {
        var i;
        var str = "";
        for(i = 0; i < 6; i++){
            var x = this.cx + Math.cos(i*PI/3)*this.r;
            var y = this.cy - Math.sin(i*PI/3)*this.r;
            str += x+","+y;
            if(i < 5) str += " ";
        }
        var vis = d3.select('#hexagon' + this.id);
        vis.attr("points",str)
            .attr("fill",this.color)
            .attr("opacity",1);
    };

    Hexagon.prototype.onTimer = function() {
        this.opacity += this.dir*this.rate_opacity;
        this.cx += this.dir_x*this.speed_x;
        this.cy += this.dir_y*this.speed_y;
        if(this.cx > CX+R/2 || this.cx < CX-R/2) this.dir_x = -this.dir_x;
        if(this.cy > CY+R/2 || this.cy < CY-R/2) this.dir_y = -this.dir_y;
        if(this.opacity < 0.15){
            this.opacity = 0.15;
            this.dir = 1;
        }else if(this.opacity > 1){
            this.opacity = 1;
            this.dir = -1;
        }
        this.draw();
    };

    return Hexagon;
})();