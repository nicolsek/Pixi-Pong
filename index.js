var app = new PIXI.Application(); //Initialize the app.
var canvasView = document.getElementById("renderCanvas"); //Find the DIV element for the renderer.

canvasView.append(app.view); //Append the view.

//Load a texture.
PIXI.loader.add('cute', 'Cute.jpg').load(function(loader, resources) {

  //Create a texture form the image
  var cute = new PIXI.Sprite(resources.cute.texture); //From the texture named.

  //Setup the position.
  cute.x = app.renderer.width / 2;
  cute.y = app.renderer.height / 2;

  // Anchor to the center
  cute.anchor.x = 0.5;
  cute.anchor.y = 0.5;

  app.stage.addChild(cute);

  //Add the thing to the stage.
  app.ticker.add(function() {
    cute.rotation += 0.01;
  });
});
