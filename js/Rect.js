var Rect = (function() {
    // "private" variables 
    var x, y, width, height, color, opacity, id, dir, dir_x, dir_y, rate_opacity, speed_x, speed_y;

    // constructor
    function Rect() {
        this.dir = -1;
        this.opacity = 1;
        this.dir_x = 1;
        this.dir_y = 1;
        this.rate_opacity = 0.01;
        this.speed_x = this.speed_y = 1;
    };

    // add the methods to the prototype so that all of the 
    // Foo instances can access the private static

    Rect.prototype.draw = function() {
        var rect_chart = d3.select("#rect"+this.id);
        rect_chart.attr("x", this.x - this.width/2)
            .attr("y", this.y - this.height/2)
            .attr("width", this.width)
            .attr("height", this.height)
            .attr("fill", this.color)
            .attr("opacity",this.opacity);
    };

    Rect.prototype.onTimer = function() {
        this.opacity += this.dir*this.rate_opacity;
        this.x += this.dir_x*this.speed_x;
        this.y += this.dir_y*this.speed_y;
        if(this.x > CX+R/2 || this.x < CX-R/2) this.dir_x = -this.dir_x;
        if(this.y > CY+R/2 || this.y < CY-R/2) this.dir_y = -this.dir_y;
        if(this.opacity < 0.15){
            this.opacity = 0.15;
            this.dir = 1;
        }else if(this.opacity > 1){
            this.opacity = 1;
            this.dir = -1;
        }
        this.draw();
    };

    return Rect;
})();