
class Layer {
	
	constructor() {
		this.canvas = document.createElement("canvas");
		this.canvas.addEventListener("contextmenu", event => event.preventDefault());

		this.canvas.style.visibility = "visible";
		this.canvas.style.position = "absolute";
		this.canvas.style.left = 0;
		this.canvas.style.top = 0;
		this.canvas.style["z-index"] = 0;

		this.context = this.canvas.getContext("2d");
		
		this._redraw = function() {};
	}
	
	get width()  { return this.canvas.width;  }
	get height() { return this.canvas.height; }
	
	set width(val) {
		this.canvas.width = val;
		this._redraw(this);
	}

	set height(val) {
		this.canvas.height = val;
		this._redraw(this);
	}
	
	get visible() {
		return this.canvas.style.visibility == "visible";
	}
	
	set visible(val) {
		this.canvas.style.visibility = val ? "visible" : "hidden";
	}
	
	redraw(func) {
		this._redraw = func;
		this._redraw(this);
	}

	hide() {
		this.visible = false;
	}
	
	show() {
		this.visible = true;
	}
	
	toggle() {
		this.visible = this.visible ? false : true;
	}

	fill(color) {
		this.context.fillStyle = color;
		this.context.fillRect(0, 0, this.width, this.height);
	}
	
	clear() {
		this.context.clearRect(0, 0, this.width, this.height);		
	}
	
	square(posn, size, color) {
		this.context.fillStyle = color;
		this.context.fillRect(posn.x, posn.y, size, size);
	}
	
	sprite(posn, sprite, rotation=0, scale=0) {
		sprite.drawOnLayer(this, posn);
	}
}

Layer.World = class extends Layer {
	constructor() {
		this.super();
	}
}

Layer.UI = class extends Layer {
	constructor() {
		this.super();
	}
}