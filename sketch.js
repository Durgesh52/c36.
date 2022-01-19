var balloon, background;
var backgroundImg, balloonImage1 ,balloonImage2;
var balloonHeight;
var database, height;

function preload() {
  backgroundImg = loadImage("Images/cityImage.png")
  balloonImage1 = loadAnimation("Images/HotAirBallon01.png");
  balloonImage2 = loadAnimation("Images/HotAirBallon01.png", "Images/HotAirBallon02.png", "Images/HotAirBallon03.png");
}

function setup(){
   database = firebase.database();
   console.log(database);
    createCanvas(800,800);

balloon = createSprite (250,650, 150, 150)
  balloon.addAnimation("balloon", balloonImage1);
  balloon.scale = 0.4;

  var balloonHeight=database.ref('balloon/height'); 
  balloonHeight.on("value",readHeight, showError); 
  textSize(20);

}

function draw(){

    background(backgroundImg);
  
        if(keyDown(LEFT_ARROW)){
            updateHeight(-2,0);
            balloon.addAnimation("balloon", balloonImage2);
        }
        else if(keyDown(RIGHT_ARROW)){
            updateHeight(2,0);
            balloon.addAnimation("balloon", balloonImage2);
        }
        else if(keyDown(UP_ARROW)){
            updateHeight(0,-2);
            balloon.addAnimation("balloon", balloonImage2);
            balloon.scale=balloon.scale -0.005;
        }
        else if(keyDown(DOWN_ARROW)){
            updateHeight(0,2);
            balloon.addAnimation("balloon", balloonImage2);
            balloon.scale=balloon.scale +0.005;
        }
        drawSprites();
    }

    
    function updateHeight(x,y)
    { 
        database.ref('balloon/height').set({ 
            'x': height.x + x , 
            'y': height.y + y
         }) 
    }

    function readHeight(data)
    { 
        height = data.val(); 
        console.log(height.x); 
        balloon.x = height.x; 
        balloon.y = height.y; 
    }

    function showError()
    { 
        console.log("Error in writing to the database"); 
    }
