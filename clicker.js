var presents = 0;

var presentsPer = {}
presentsPer.click = 1;
presentsPer.sec = 0;

var original = presentsPer.sec;

console.log("Initiated")
console.log("-==*  Cheating, are we? GO AWAY  *==-")

incrementSecs()

function addToShop(shopType, name, tooltip, display, cost, gain) {
	let btn;
//If button type is "Manual", then create a click-based item.
	if (shopType === "manual") {

		btn = document.createElement("BUTTON");
		btn.innerHTML = '<img src="graphics/buildings/'+display+'" height="50" alt="'+name+'" alt="javascript:this.src=`graphics/error.png`"/>'
		btn.style.backgroundColor = "black"
		btn.title = name
		btn.id = "buildings"
		btn.onclick = function () {
			buyItem(cost, gain)
		}
		btn.onmousemove = function () {
			document.getElementById("shopInfo").innerHTML = '<b>'+name+'</b><br><br>"'+tooltip+'"<br><br>Cost: '+cost+', Presents: '+gain
		}
		btn.onmouseout = function () {
			document.getElementById("shopInfo").innerHTML = "Hover over a shop item to see it's stats."
		}
	} else {//Else, create a time-based item.
		if (shopType === "timer") {
			btn = document.createElement("BUTTON");
			btn.innerHTML = '<img src="graphics/buildings/'+display+'" height="50" alt="'+name+'" alt="javascript:this.src=`graphics/error.png`"/>'
			btn.style.backgroundColor = "black"
			btn.title = name
			btn.id = "buildings"
			btn.onclick = function () {
				buyAutoItem(cost, gain)
			}
			btn.onmousemove = function () {
				document.getElementById("shopInfo").innerHTML = '<b>'+name+'</b><br><br>"'+tooltip+'"<br><br>Cost: '+cost+', Presents/Sec: '+gain
			}
			btn.onmouseout = function () {
				document.getElementById("shopInfo").innerHTML = "Hover over a shop item to see it's stats."
			}
		}
	}
	document.getElementById("shop").appendChild(btn);
}

function buyItem(cost, gain) {
	if (presents >= cost) {
		presents -= cost
		presentsPer.click += gain;
		original = presentsPer.sec;
		update()
	}
}

function buyAutoItem(cost, gain) {
	if (presents >= cost) {
		presents -= cost;
		presentsPer.sec += gain
		original = presentsPer.sec;
		update()
	}
}

function increment(increment) {
	console.log("Increased by: " + increment)
	presents += increment;
	update();
	setTimeout(update, 1000)
}

function ClicksPerSecCounter() {
	let numClicks = 0, secondsSpent = 0;
	let start;
	let old = document.getElementById('present').onclick;
	document.getElementById('present').onclick = function (thisArg, argArray) {
		old.apply(thisArg, argArray);
		start = new Date().getTime();
		numClicks+=presentsPer.click;
		setTimeout(test, 1300);
	};
	setInterval(() => {
		secondsSpent++;
	}, 1000);
	function test() {
		if(start) {
			let end = new Date().getTime();
			if((end - start) >= 1000) {
				numClicks = 0;
				secondsSpent = 0;
				start = null;
				document.getElementById("ppsCounter").innerHTML = "PPS: " + (presentsPer.sec);
			}
		}
	}
	this.clicksPerSecond = function () {
		if(numClicks <= 0 || secondsSpent <= 0) {
			document.getElementById("ppsCounter").innerHTML = "PPS: " + (presentsPer.sec);
			return 0;
		}
		return numClicks / secondsSpent;
	}
}

const cpsCounter = new ClicksPerSecCounter();


function incrementSecs() {
	setTimeout(incrementSecs, 1000);
	if (presentsPer.sec>0) {
		presents+=presentsPer.sec;
		update();
	}
}



function update() {
	document.getElementById("counter").innerHTML = "<b>Presents: " + presents + "</b>"
	document.getElementById("ppsCounter").innerHTML = "PPS: " + ((presentsPer.sec) + parseInt(cpsCounter.clicksPerSecond()));
}
