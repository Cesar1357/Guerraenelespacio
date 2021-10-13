var gameState = 1;
var obstacle;
var laserr;
var nave, navei;
var ground, invisibleGround, groundImage;

var laserrsGroup, laserrImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;
var hight=0;

var gameOver, restart;
var nochei;
var obsjetosgroup;
var resetgroup;
var cieloi;
var gameOverImg,restartImg;
var edges;
var laser;




function preload(){
  nochei = loadImage("noche.jpg");
  
  //nave_running =   loadAnimation("steve.jpg");

  navei = loadAnimation("nave.png");
  //nave_jump = loadAnimation(".jpg")
  //creeperi = loadAnimation("creeper.jpg");
  
  groundImage = loadImage("ground2.png");
  
  laserrImage = loadImage("laser.png");
  
  obstacle1 = loadImage("meteorito1.png");
  obstacle2 = loadImage("meteorito2.png");
  obstacle3 = loadImage("meteorito3.png");
  obstacle4 = loadImage("meteorito3.png");
  obstacle5 = loadImage("meteorito2.png");
  obstacle6 = loadImage("meteorito1.png");

cieloi = loadImage("cielo.jpg");


  laser = loadSound("laser.mp3")
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  gameState = 0;


  nave = createSprite(windowWidth/2,height/2+200,20,50);
  nave.setCollider("circle",0,0,200);

  

  nave.addAnimation("collided", navei);
  nave.scale = 0.1;
 
  
  
  
  
  
  
  laserrsGroup = new Group();
  obstaclesGroup = new Group();
  obsjetosgroup = new Group();
  resetgroup = new Group();

  
  invisibleGround = createSprite(50000,height/2+200,100000000,10);
  invisibleGround.visible = false;
 

  
  score = 0;
}

function draw() {
  


  background(nochei);
  textSize(20);
  fill("white")
  text("Puntuación: "+ score, camera.x+300,camera.y-300);
  text("HI: "+ hight,camera.x+500,camera.y-300);
  console.log(gameState)


  if (gameState===0){
    if (keyDown("SPACE")){
      gameState = 1;
      
    }
    
    textSize(width/40);
     fill("white")
  text("Presiona la tecla espacio para empezar",width/4+80,height/2-50);

    
   
  }
  
  if (gameState===1){
    textSize(width/90);
      

  
   

    if (keyDown("RIGHT_ARROW")){
      nave.x = nave.x + 20;
 
     }
     if (keyDown("LEFT_ARROW")){
      nave.x = nave.x - 20;
 
     }

     if(nave.x > windowWidth){
        nave.x = 0;
    }

     if(nave.x < 0){
      nave.x = windowWidth;

    }
     
    
    
   
   
   
  
    nave.collide(invisibleGround);
    spawnlaserrs();
    spawnObstacles();
    
    
    
  
    if(obstaclesGroup.isTouching(nave)){
        gameState = 2;

    }

    if(laserrsGroup.collide(obstaclesGroup)){
      score = score + 10;
      obstacle.lifetime = 1;
      laserr.lifetime = 1;

    
  }


}
   else if(gameState === 2) {
    
    gameOver = createSprite(windowWidth/2,height/2-100);
    gameOver.addImage(gameOverImg);
  
    restart = createSprite(windowWidth/2,height/2-50);
    restart.addImage(restartImg);

    resetgroup.add(restart);
    obsjetosgroup.add(gameOver);

    nave.collide(invisibleGround);    
  

    

    
    
    if (score>hight){
      
          hight=score;

    }
    
   
    obstaclesGroup.setVelocityYEach(0);
    laserrsGroup.setVelocityYEach(0);


    
    
    //establece ciclo de vida a los obsjetos del juego para que nunca se destruyan
    obstaclesGroup.setLifetimeEach(-1);
    laserrsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {      
      reset();
    }
  }
  
 
  
  drawSprites();
  
}

function spawnlaserrs() {
  //escribe aquí el código para apareer las nubes
  if (keyDown("SPACE")) {
    laserr = createSprite(nave.x,nave.y,40,10);
    laserr.addImage(laserrImage);
    laserr.scale = 0.2;
    laserr.velocityY = -10;
    laser.play();

     //asigna ciclo de vida a la variable
    laserr.lifetime = height+10;
    
    //ajusta la profundidad
    laserr.depth = nave.depth;
    nave.depth = nave.depth + 1;
    
    //agrega cada nube al grupo
    laserrsGroup.add(laserr);
  }
 
  
}

function spawnObstacles(){ 
if (frameCount % 50 === 0) {
 
    obstacle = createSprite(20,camera.y-500,10,40);
    obstacle.x = Math.round(random(0,windowWidth));

    obstacle.velocityY = 10;
   


    
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //asigna escala y ciclo de vida al obstáculo           
    obstacle.scale = 0.5;
    obstacle.lifetime = height+5;
    //agrega cada obstáculo al grupo
    obstaclesGroup.add(obstacle);
    
    
   
  
  
    
  
  }
  

  
}






function reset(){
  gameState = 1;
  gameOver.visible = false;
  restart.visible = false;
  
  resetgroup.destroyEach();
  obsjetosgroup.destroyEach();

  obstaclesGroup.destroyEach();
  laserrsGroup.destroyEach();
  
  score = 0;
  nave.x = windowWidth/2;
 
  
    
    
};
    






