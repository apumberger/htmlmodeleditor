var ModelNode = (function () {
    function ModelNode(name, canvasName) {
        this.name = name;
        this.canvasName = canvasName;
    }
    ModelNode.prototype.getName = function () {
        return "<h1>" + this.name + "</h1>";
    };
    ModelNode.prototype.printNode = function () {
        return "<script>" +
            "var canvas = document.getElementById('" + this.canvasName + "');\n" +
            "var context = canvas.getContext('2d');\n" +
            "context.beginPath();\n" +
            "context.rect(188,50,200,100);\n" +
            "context.lineWidth = 4;\n" +
            "context.strokeStyle = 'black';\n" +
            "context.stroke();\n</script>";
    };
    return ModelNode;
})();
;
