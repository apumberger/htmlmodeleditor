class ModelNode {
    constructor(public name: string, public canvasName: string) { }
    getName() {
        return "<h1>" + this.name + "</h1>";
    }

    printNode() {
    	return "<script>" +
    		"var canvas = document.getElementById('" + this.canvasName + "');\n" +
      		"var context = canvas.getContext('2d');\n" + 
      		"context.beginPath();\n" +
			    "context.rect(188,50,200,100);\n" +
    		  "context.lineWidth = 4;\n" +
      		"context.strokeStyle = 'black';\n" +
      		"context.stroke();\n</script>";
    }
};
