var presents = 0

var presentInc = new Object()
presentInc.click = 1
presentInc.sec = 0

console.log("Initiated")
console.log("-==*  Cheating, are we?  *==-")

incrementSecs(presentInc.sec)

function addToShop(shopType, name, tooltip, display, cost, gain) {
//If button type is "Manual", then create a click-based item. 
if (shopType == "manual") {

	var btn = document.createElement("BUTTON")
	btn.innerHTML = '<img src="graphics/buildings/'+display+'" height="50" alt="'+name+'" onError="javascript:this.src=`graphics/error.png`"/>'
	btn.style.backgroundColor = "black"
	btn.title = name+'\n"'+tooltip+'"\nCost: '+cost+', Presents: '+gain
	btn.id = "buildings"
	btn.onclick = function () {
		buyItem(cost, gain)
	}
}
//Else, create a time-based item.
else
{
	if (shopType == "timer") {
		var btn = document.createElement("BUTTON")
		btn.innerHTML = '<img src="graphics/buildings/'+display+'" height="50" alt="'+name+'" onError="javascript:this.src=`graphics/error.png`"/>'
		btn.style.backgroundColor = "black"
		btn.title = name+'\n"'+tooltip+'"\nCost: '+cost+', Presents/Sec: '+gain
		btn.id = "buildings"
		btn.onclick = function () {
			buyAutoItem(cost, gain)
		}
	}
}
document.getElementById("shop").appendChild(btn);	
}

function buyItem(cost, gain) {
if (presents >= cost) {
presents = (presents - cost)
presentInc.click = (presentInc.click + gain)
update()
}
}

function buyAutoItem(cost, gain) {
if (presents >= cost) {
presents = (presents - cost)
presentInc.sec = (presentInc.sec + gain)
update()
}
}	

function increment(increment) {
	presents = (presents+increment)
	update()
}

function incrementSecs() {
	setTimeout(incrementSecs, 1000/presentInc.sec)
    if (presentInc.sec>0) {
	presents = (presents+presentInc.sec)
	update()
	}
}

function update() {
	document.getElementById("counter").innerHTML = "<b>Presents: " + presents + "</b>"
	document.getElementById("ppsCounter").innerHTML = "PpS: " + presentInc.sec
}