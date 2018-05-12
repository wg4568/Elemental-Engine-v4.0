class Canvas {
	constructor(id, fullscreen=false) {
		this.id = id;
		
		this.div = document.getElementById(this.id);
		this.div.style.position = "relative";
		
		this.fullscreen = fullscreen;
		
		this.layers = [];

		this.onLoad = function(c) {};
		this.onResize = function(c) {};

		var parent = this;
		window.addEventListener("load", function() {
			if (parent.fullscreen) parent.fullscreenLayers();
			parent.onLoad(parent);
			parent.onResize(parent);
		});

		if (this.fullscreen) {
			document.body.style.margin = 0;

			window.addEventListener("resize", function(event) {
				parent.fullscreenLayers();
				parent.onResize(parent);
			});
		}
	}
	
	fullscreenLayers() {
		this.layers.forEach(function(layer) {
			layer.width  = window.innerWidth;
			layer.height = window.innerHeight;
		});
	}
	
	addLayer(layer) {
		this.layers.push(layer);
		this.div.appendChild(layer.canvas);
	}
}