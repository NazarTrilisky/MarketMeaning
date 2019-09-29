'use strict';

class Sun {
	show_sun() {
		/* display the sun and rays */
		let sun_div = window.document.getElementById("sun_div");
		sun_div.style.display = "inline-block";
		let canvas = window.document.getElementById("sun_canvas");
		canvas.style.display = "inline-block";
		let ctx = canvas.getContext("2d");
		const WIDTH = 300;
		const HEIGHT = 300;
		const NUM_RAYS = 50;
		ctx.strokeStyle = "#FFFF00";
		ctx.lineWidth=1;
		let step_x = WIDTH / NUM_RAYS * 2;
		let step_y = HEIGHT / NUM_RAYS * 2;
		let y_pos = 0;
		for (let i=0; i<NUM_RAYS/2; i++) {  // rays to left border
			ctx.moveTo(WIDTH,0);
			ctx.lineTo(0,y_pos);
			ctx.stroke();
			y_pos += step_y;
		}
		let x_pos = 0;
		for (let i=0; i<NUM_RAYS/2; i++) {  // rays to bottom border
			ctx.moveTo(WIDTH,0);
			ctx.lineTo(x_pos,HEIGHT);
			ctx.stroke();
			x_pos += step_x;
		}
	}
	
	hide_sun() {
		/* hide the sun and rays */
		let sun_div = window.document.getElementById("sun_div");
		sun_div.style.display = "none";
		let canvas = window.document.getElementById("sun_canvas");
		canvas.style.display = "none";
	}
}