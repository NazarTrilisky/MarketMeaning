'use strict';

/* Manges happy/sad face logo events */
class Faces {
	/* Add logo image mood change on mouse-over */
	add_face_handler_weather() {
		var logo_img = window.document.getElementById("logo_img");
		var rain_obj = new Rain();
		var sun_obj = new Sun();
		const SHOW_DELAY = 100;  // ms

		logo_img.addEventListener("mousemove", (event_obj) => {
			var rect_img_obj = logo_img.getBoundingClientRect();
			var img_min_y = rect_img_obj.top;
			var img_max_y = rect_img_obj.height + img_min_y;
			var percent_down = (event_obj.pageY - img_min_y) / rect_img_obj.height;

			if (percent_down < 0.4) {
				setTimeout(rain_obj.createRain, SHOW_DELAY);
				setTimeout(sun_obj.hide_sun(), SHOW_DELAY);
				window.document.body.style.backgroundColor = "#7799BB";
			}
			else if (percent_down < 0.6) {
				setTimeout(rain_obj.removeRain, SHOW_DELAY);
				setTimeout(sun_obj.hide_sun(), SHOW_DELAY);
				window.document.body.style.backgroundColor = "";
			}
			else {
				setTimeout(rain_obj.removeRain, SHOW_DELAY);
				setTimeout(sun_obj.show_sun(), SHOW_DELAY);
				window.document.body.style.backgroundColor = "#AAAAFF";
			}
		});

		logo_img.addEventListener("mouseleave", () => {
			setTimeout(rain_obj.removeRain, SHOW_DELAY);
			setTimeout(sun_obj.hide_sun(), SHOW_DELAY);
			window.document.body.style.backgroundColor = "";
		});
	}
	
	/* Add logo image weather change on mouse-over */
	add_face_handler_moods() {
		var logo_img = window.document.getElementById("logo_img");
		const SHOW_DELAY = 100;  // ms

		logo_img.addEventListener("mousemove", (event_obj) => {
			var rect_img_obj = logo_img.getBoundingClientRect();
			var img_min_y = rect_img_obj.top;
			var img_max_y = rect_img_obj.height + img_min_y;
			var percent_down = (event_obj.pageY - img_min_y) / rect_img_obj.height;
			if (percent_down < 0.2) { event_obj.target.src = "images/logo_1.png"; }
			else if (percent_down < 0.4) { event_obj.target.src = "images/logo_2.png"; }
			else if (percent_down < 0.6) { event_obj.target.src = "images/logo_3.png"; }
			else if (percent_down < 0.8) { event_obj.target.src = "images/logo_4.png"; }
			else { event_obj.target.src = "images/logo_5.png"; }
		});

		logo_img.addEventListener("mouseleave", () => {
			logo_img.src = "images/logo_1.png";
		});
	}
}