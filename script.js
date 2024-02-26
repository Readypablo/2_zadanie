var terrain =document.getElementById('Terrain');
var menu = document.getElementById('menu');
var absol = document.getElementById('absol');

function strat(){

    menu.style.display = 'none';
    absol.style.display = 'block';
    terrain.style.display = 'block';
}








var colision = [];

terrain.width = window.innerWidth;
terrain.height = window.innerHeight;

var square =  terrain.getContext('2d'),
squareSpeed= 5;

var squareCoordinate={
    x: window.innerWidth/2,
    y: window.innerHeight/2,

    maxSpeed: 2,
    dy:0,
    dd:2
}

var up = false,
left =false,
right= false;

function controlPlayer (){
    document.onkeydown = function (e){

        if ( e.keyCode == 38 ){
            if(grav()==0){
                var timer = setInterval(function(){

                    var i = 0 ; 
                    colision.forEach(function(item){
                        if(item.y + item.h >= squareCoordinate.y && item.y <= squareCoordinate.y && item.y - 46 <= squareCoordinate.y && squareCoordinate.x < item.x + item.w - 12 && squareCoordinate.x > item.x - 12 ){
                            i++;
                        }
                    })
                    if(!i){
                        squareCoordinate.y -= 1* squareSpeed *2;
                    }
 
                })
                setTimeout(function(){
                    clearInterval(timer);
                }, 100);
    
            }
          
        }

        if ( e.keyCode == 37 ){
        left = true;
        }

        if ( e.keyCode == 39 ){
            right = true;
            }

    }

            if(left){
                var i = 0 ; 
                colision.forEach(function(item){
                    if( squareCoordinate.x < item.x + item.w && item.y -24 < squareCoordinate.y && item.y + item.h > squareCoordinate.y){
                        i++;
                    }
                })
                if( !i)
                {
                    squareCoordinate.x -= 1* squareSpeed;
                }  
            }

            if(right){
                var i = 0 ; 
                colision.forEach(function(item){
                    if( squareCoordinate.x > item.x - 34 && item.y  < squareCoordinate.y -24 && item.y + item.h > squareCoordinate.y){
                        i++;
                    }
                })
                    if( !i)
                    {
                        squareCoordinate.x += 1* squareSpeed;
                    }
            }

            document.onkeyup = function(e){
                if(e.keyCode ==38 ) up = false;
                if(e.keyCode ==37 ) left = false;
                if(e.keyCode ==39 ) right = false;
            }


}


function grav(){
        var i = 0 ; 
        colision.forEach(function(item){
        if(item.y + item.h -46 >= squareCoordinate.y && item.y - 46 <=  squareCoordinate.y && squareCoordinate.y && squareCoordinate.x < item.x + item.w - 12 && squareCoordinate.x > item.x -12)
                {
                i++; 
                }
        })

    if( squareCoordinate.y +46 <= window.innerHeight - 100  && !i){
        squareCoordinate.dy += squareCoordinate.dy <= squareCoordinate.maxSpeed ? squareCoordinate.dd : 0
        squareCoordinate.y += squareCoordinate.dy ; 
    }
    else{
        return 0 ;
    }
}

function getColision (x,y,w,h){
    colision.push({w:w, h:h , x:x, y:y})
}




var dirtImage = new Image();
dirtImage.src = "pol.png";
dirt = terrain.getContext('2d');

dirtImage.onload = function (){
    var patt = dirt.createPattern(dirtImage, "repeat");
    dirt.fillStyle= patt;
}

var playerIm = new Image();
playerIm.src="player.svg";
var player =  terrain.getContext('2d');

var block = terrain.getContext('2d');
var block1 = terrain.getContext('2d');
var block2 = terrain.getContext('2d');
var block3 = terrain.getContext('2d');
getColision(200,window.innerHeight -300 , 400, 50);
getColision(600,window.innerHeight -200 , 400, 50);
getColision(700,window.innerHeight -350 , 400, 50);
getColision(1300,window.innerHeight -350 , 400, 50);

setInterval(function(){
square.clearRect(0,0, window.innerWidth , window.innerHeight);
square.drawImage(playerIm,  squareCoordinate.x, squareCoordinate.y , 48, 56 , )
dirt.fillRect(0, window.innerHeight -100 , window.innerWidth ,100);
controlPlayer();
grav();

 block.fillRect(200, window.innerHeight - 300 , 400, 50);
 block1.fillRect(600,window.innerHeight -200 , 400, 50);
 block2.fillRect(700,window.innerHeight -350 , 400, 50);
 block3.fillRect(1300,window.innerHeight -350 , 400, 50);
},1000/120);



