'use strict';

const NUM_DROPS = 400;

/* simulates falling rain drops */
class Rain {
	// function to generate a random number range
	static randRange(minNum, maxNum) {
	  	return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
	}

	// function to remove the drops
	removeRain() {
		for (let i=1; i<NUM_DROPS; i++) {
			$('#drop'+i).remove();
		}
	}

	// function to generate drops
	createRain() {
		for (let i=1; i<NUM_DROPS; i++) {
			var dropLeft = Rain.randRange(0, window.innerWidth);
			var dropTop = Rain.randRange(-500, window.innerHeight);
			$('.rain').append('<div class="drop" id="drop'+i+'"></div>');
			$('#drop'+i).css('left', dropLeft);
			$('#drop'+i).css('top', dropTop);
		}
	}
}