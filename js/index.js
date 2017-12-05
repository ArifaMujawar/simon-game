const RED ="RED";
const BLUE="BLUE";
const YELLOW="YELLOW";
const GREEN="GREEN";

var myTimer=0;
var  lightSpeed, simonSpeed;
var GREENbeep = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3')
GREENbeep.playbackRate = 1.25;
var REDbeep = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
REDbeep.playbackRate = 1.25;
var YELLOWbeep = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
YELLOWbeep.playbackRate = 1.25;
var BLUEbeep = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
BLUEbeep.playbackRate = 1.25;
var WrongSound = new Audio ('https://s3-us-west-2.amazonaws.com/s.cdpn.io/41203/beep.mp3');
WrongSound.playbackRate = 1.25;

var simon={
   Sequence: [],
   userInput: [],
   step:0,//to check number of steps (20)
   host:1,// to check if user clicked button
   strict:0,
   start:false, //to check if pgm is started
   lock :false, // comp to play seq
   colors : [RED,BLUE,YELLOW,GREEN],
   generateRandomColor : function(){
       let rand = simon.colors[Math.floor(Math.random()*4)];
       console.log("Random: "+rand);
       return rand;
   },
   checkSequence: function(){
   
     for(var item=0;item<simon.Sequence.length;item++){
        if(simon.Sequence[item] !== simon.userInput[item]){
               return 1;
           }
     }
     return 0;
   }
 };

$('#start').click(function(){
   simon.strict=0;
   simon.start = true;
  getSpeed(simon.Sequence.length);
   setTimeout(settingFunction,800);
   console.log("User Click should happen now!");
 });

$(document).ready(function(){
   if(simon.start=== true){
     if(simon.host===1){
         console.log("Late btn press");
          simon.userInput=[];
          console.log("Sequence should be:"+simon.Sequence);
        }
     $('#count').html("!!");
      }
 });


$(".SimonButton").click(function(e){
  //check if start is clicked
  if(simon.start === true){
     var userClick= e.target.id;
    if(userClick === undefined){
       console.log("Should show error");
       }else{
      animate(userClick);   
      simon.userInput.push(userClick);
      console.log("UserSequence "+simon.userInput);
      mainFunction();   
       }
  
  }else{
    alert("Press Start button.");
  }
    });



function mainFunction(){
    if(simon.step<=20 && simon.Sequence.length === simon.userInput.length){
      CheckAgainst();
      return;
     }else if(simon.step > 20 ){
       $('#text').html("OMG, You Won!!");
       console.log("You Won!!");
       alert("You Won!!");
       return;
     }
}
function CheckAgainst(){
 
         //check seq against user choice
         console.log("CHecking for against");
         var flag= simon.checkSequence();
         if(flag===1){
            //show seq and wait for user
          setTimeout(function(){
            WrongSound.play();
           $('#text').html("Wrong, Try Again!!");
          },200); 
            console.log("Not same array");
           if(simon.strict===1){
             setTimeout(settingFunction,1500);
             }else{
              simon.userInput=[];
              
               console.log("Sequence should be: "+simon.Sequence);
                 getSpeed(simon.Sequence.length);
               setTimeout(showSequence(0),2000);
               }
            
            }else{
               console.log("Same Array");
               simon.userInput=[];
                getSpeed(simon.Sequence.length);
               //show next rand color and wait for user
               var rand= simon.generateRandomColor();
                simon.Sequence.push(rand);
                 simon.step++;
                $('#count').html(simon.step);
                 console.log("sequence is "+simon.Sequence);
             setTimeout(showSequence(0),1500);
              
            }
}

$('#Restart').click(function(){
  // game restarts and return to single step
  simon.strict=0;
  simon.start=true;
  setTimeout(settingFunction,1500);
});


$('#strict').click(function(){
  // if game is played wrong starts again
  simon.strict=1;
 setTimeout(settingFunction,1500);
  $('#strict').css('background-color', '#99ccff');
});

$('#stop').click(function(){
  //reloads page
    window.location.reload(true);
    simon.start=false;
});

function settingFunction(){
  simon.userInput=[];
  simon.Sequence=[];
  simon.step=0;
  simon.host= 1;
  
  
  var rand= simon.generateRandomColor();
  simon.Sequence.push(rand);
  simon.step++;
  $('#count').html(simon.step);
  console.log("sequence is "+simon.Sequence);
   showSequence(0);
}
function  playButton(color){
     
  switch(color) {
    
    case RED :  
               setTimeout(function(){     
               REDbeep.play();
                $('#RED').css('background-color', '#ff6666')
                },300);
                setTimeout(function(){     
                $('#RED').css('background-color', 'red');
                },  lightSpeed);
                break;
    case BLUE :  
               setTimeout(function(){     
               BLUEbeep.play();
               $('#BLUE').css('background-color', "#0099ff")
                },300);
               setTimeout(function(){     
               $('#BLUE').css('background-color', 'blue');
               },  lightSpeed);
                break;
    case YELLOW :    
                 setTimeout(function(){     
                  YELLOWbeep.play();
                  $('#YELLOW').css('background-color', "#ffff00")
                       },300);
                   setTimeout(function(){     
                  $('#YELLOW').css('background-color', 'goldenrod');
                  }, lightSpeed );
                 break;
    case GREEN:
                setTimeout(function(){     
                 GREENbeep.play();
                 $('#GREEN').css('background-color', "#009933")
                  },300);
                 setTimeout(function(){     
                 $('#GREEN').css('background-color', 'green');
                 },  lightSpeed);
                 break;
               }
         
}

function getSpeed(step){
if (step >=4 && step < 8) {
      simonSpeed = 800;
      lightSpeed = 800;
    }
    else if (step >= 8 && step < 12) {
      simonSpeed = 600;
      lightSpeed = 600;
    }
    else if (step >= 12) {
      simonSpeed = 450;
      lightSpeed = 450;
    }
    else {
      simonSpeed = 1000; 
      lightSpeed = 1000;
     
    }

}


 function showSequence(index){  
   $('#text').html("");
   if(index < simon.Sequence.length){
      playButton(simon.Sequence[index]);
     setTimeout(function(){
       var newIndex= index+1;
       showSequence(newIndex);
       if(index +1 === simon.Sequence.length){
          return;
          }
     }, simonSpeed);
      }
   }



function animate(userClick){


  if(userClick === RED){
      REDbeep.play();
   }else if(userClick === BLUE){
       BLUEbeep.play();
   }else if(userClick === YELLOW){
       YELLOWbeep.play();
    }else{
       GREENbeep.play();
            }
  }