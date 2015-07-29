var ModelCanvas = (function () {
    function ModelCanvas(name, width, height) {
        this.name = name;
        this.width = width;
        this.height = height;
    }
    ModelCanvas.prototype.getCanvas = function () {
        return "<canvas id=\"" + this.name + "\" width=\"" + this.width + "\" height=\"" + this.height + "\"></canvas>";
    };
    ModelCanvas.prototype.getName = function () {
        return this.name;
    };
    return ModelCanvas;
})();
;
