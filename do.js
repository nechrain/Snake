var canvas, ctx;
var modal=document.getElementById('exampleModal');
var bestscore=0;
let count=0; 
var tab=[];




// laison entre cnavas et windows chrome 

window.onload = function() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    document.addEventListener("keydown", keyDownEvent);
   
}
// Vitesse de jeu 
var x = 10;
setInterval(draw, 1000 / x );

// taille du careau
var gridSize = (tileSize = 23); // 20 x 20 = 400
var nextX = (nextY = 0);   // position initial 

// snake
var defaultTailSize = 3; // taille inital du serpent 
var tailSize = defaultTailSize;
var snakeTrail = []; // chemin de snake 
var snakeX = 10; // 
var snakeY = 10;

// apple aleatoirement 
appleX = Math.floor(Math.random() * gridSize);
appleY = Math.floor(Math.random() * gridSize);

  // dessiner snake 
  function draw() {
    // move snake in next pos
    snakeX += nextX;
    snakeY += nextY;

 // snake over game world? modification d'affichage
 if (snakeX < 0) {
    snakeX = gridSize - 1;
  }
  if (snakeX > gridSize - 1) {
    snakeX = 0;
  }

  if (snakeY < 0) {
    snakeY = gridSize - 1;
  }
  if (snakeY > gridSize - 1) {
    snakeY = 0;
  }
  

 //snake bite apple?
 if (snakeX == appleX && snakeY == appleY) {
    tailSize++;
   count++;
   localStorage.setItem('score',count);
   document.getElementById('score').innerHTML=count;

  appleX = Math.floor(Math.random() * gridSize);
  appleY = Math.floor(Math.random() * gridSize);
}

//paint background
ctx.fillStyle = "#A09EDC";
ctx.fillRect(0, 0, canvas.width, canvas.height);

 // paint snake
 ctx.fillStyle = "yellow";
 for (let i = 0; i < snakeTrail.length; i++) {
   ctx.fillRect(
     snakeTrail[i].x * tileSize*1.1,
     snakeTrail[i].y * tileSize*1.1,
     tileSize,
     tileSize
   );
  

   //snake bites it's tail?
   if (snakeTrail[i].x == snakeX && snakeTrail[i].y == snakeY) {

   tailSize = defaultTailSize;
   
  
  }
}

// paint apple
ctx.fillStyle = "red";
ctx.fillRect(appleX * tileSize*1.1, appleY * tileSize*1.1, tileSize*1.1, tileSize*1.1);

//set snake trail
snakeTrail.push({ x: snakeX, y: snakeY });
while (snakeTrail.length > tailSize) {
  snakeTrail.shift();
}
}

function pause(){
  nextY = 0; // 
  nextX = 0;

}

var hs=0;
  
  for(let j=0;j<localStorage.length;j++){
    var v=localStorage.getItem('score');
    tab[j]=v;
    if(tab[j]>hs)
      max=tab[j];
  }
 
  console.log(hs);

// input
function keyDownEvent(e) {
  switch (e.keyCode) {
    case 37:
      nextX = -1;
      nextY = 0;
      break;
    case 38:
      nextX = 0;
      nextY = -1;
      break;
    case 39:
      nextX = 1;
      nextY = 0;
      break;
    case 40:
      nextX = 0;
      nextY = 1;
      break;
       
  }
  }

