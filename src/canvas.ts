class ModelCanvas {
    constructor(public name: string, public width:number, public height:number) { }

    getCanvas () {
    	return "<canvas id=\"" + this.name +"\" width=\"" + this.width + "\" height=\"" + this.height + "\"></canvas>";

    }
    getName() {
    	return this.name;
    }
};
