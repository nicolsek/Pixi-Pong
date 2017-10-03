var app = new PIXI.Application(); //Initialize the app.
var canvasView = document.getElementById("renderCanvas"); //Find the DIV element for the renderer.

canvasView.append(app.view); //Append the view.
