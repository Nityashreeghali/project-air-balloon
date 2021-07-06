var balloon,database;
var position,ballpos;
var balloonImg,cityImg;

function preload() {
    cityImg=loadImage("cityImage.png")
balloonImg=loadAnimation("hotairballoon1.png","hotairballoon2.png","hotairballoon3.png")

}


function setup(){
    createCanvas(1200,600);
database=firebase.database();

ballpos=database.ref("ball/position")
ballpos.on("value",readposition)

    balloon = createSprite(250,250,10,10);
    balloon.addAnimation("flyingBalloon",balloonImg);
   // balloon.scale=0.2
}

function draw(){
    background(cityImg);

if(position!==undefined){

    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
        balloon.scale=balloon.scale-0.005
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
        balloon.scale=balloon.scale+0.005
    }
    drawSprites();
}
}

function changePosition(x,y){
   database.ref("ball/position").set({
       'x':position.x+x,
       'y':position.y+y
   })
}

function readposition(data){
    position=data.val();
    balloon.x=position.x
    balloon.y=position.y
}
