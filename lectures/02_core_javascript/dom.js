// DOM Manipulation

// 1. javascript 를 이용한 방식
var colorsNode = document.getElementById("colors");
// <ul id="colors">
//   <li>black</li>
//   <li>white</li>
// </ul>

var newListNode = document.createElement("li");
// <li></li>

var newTextNode = document.createTextNode("blue");
// "blue"

newListNode.appendChild(newTextNode);
// <li>blue</li>

colorsNode.appendChild(newListNode);
// <ul id="colors">
//   <li>black</li>
//   <li>white</li>
//   <li>blue</li>
// </ul>


// 2. jQuery 를 이용한 방식
$("#colors").append("<li>red</li>");
