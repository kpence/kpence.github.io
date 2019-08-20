var button = document.getElementById("enter");
var input = document.getElementById("userinput");
var ul = document.querySelector("ul");
var lis = document.getElementsByTagName("li");

function inputLength() {
	return input.value.length;
}

function createListElement() {
	var li = document.createElement("li");
	li.appendChild(document.createTextNode(input.value));
	ul.appendChild(li);
	input.value = "";
  li.addEventListener("click",toggleDoneAfterClick);
  addDeleteButtonToListElement(li);
}

function addListAfterClick() {
	if (inputLength() > 0) {
		createListElement();
	}
}

function removeListElement(event) {
  var li = event.target.parentNode;
  ul.removeChild(li);
}

function addDeleteButtonToListElement(li) {
  var deleteButton = document.createElement("button");
  deleteButton.appendChild(document.createTextNode("x"));
  deleteButton.classList.add("delete");

  deleteButton.addEventListener("click", removeListElement);
  li.insertBefore(deleteButton,li.firstChild);
}

function addListAfterKeypress(event) {
	if (inputLength() > 0 && event.keyCode === 13) {
		createListElement();
	}
}

function toggleDoneAfterClick(event) {
  event.target.classList.toggle("done");
}

button.addEventListener("click", addListAfterClick);

input.addEventListener("keypress", addListAfterKeypress);

for (let li of lis) {
  li.addEventListener("click",toggleDoneAfterClick);
  addDeleteButtonToListElement(li);
}

