var css = document.querySelector("h3");
var color1 = document.querySelector(".color1");
var color2 = document.querySelector(".color2");
var random = document.querySelector(".random");
var body = document.getElementById("gradient");

function setGradient() {
	body.style.background = 
	"linear-gradient(to right, " 
	+ color1.value 
	+ ", " 
	+ color2.value 
	+ ")";

	css.textContent = body.style.background + ";";
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
    return color;
}

function randomize() {
  var c1 = getRandomColor();
  var c2 = getRandomColor();
  color1.value = c1;
  color2.value = c2;
  setGradient();
}

color1.addEventListener("input", setGradient);

color2.addEventListener("input", setGradient);

random.addEventListener("click", randomize);


// get colors from background, assign them to the buttons
color1.value = "#ff0000";
color2.value = "#ffff00";

css.textContent = 
	"linear-gradient(to right, " 
	+ color1.value 
	+ ", " 
	+ color2.value 
	+ ")";
