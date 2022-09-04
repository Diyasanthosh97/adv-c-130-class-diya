song="";
leftWristX=0;
rightWristY=0;
leftWristY=0;
rightWristX=0;
function preload(){
    song=loadSound("song2.mp4");

}
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on("pose",gotposes);
}
function draw(){
    image(video,0,0,600,500);
    fill("#FF0000");
    stroke("#FF0000");
    if(scoreright > 0.2){
        circle(rightWristX,rightWristY,20);
        if(rightWristY>0 && rightWristY<=100){
            document.getElementById("btnspeed").innerHTML="speed=0.5x";
song.rate(0.5);
        }
        if(rightWristY>100 && rightWristY<=200){
            document.getElementById("btnspeed").innerHTML="speed=1x";
song.rate(1);
    }
    if(rightWristY>200 && rightWristY<=300){
        document.getElementById("btnspeed").innerHTML="speed=1.5x";
song.rate(1.5);
}
if(rightWristY>300 && rightWristY<=400){
    document.getElementById("btnspeed").innerHTML="speed=2x";
song.rate(2);
}
if(rightWristY>400 && rightWristY<=500){
    document.getElementById("btnspeed").innerHTML="speed=2.5x";
song.rate(2.5);
}
}
        
    if(scoreLeft > 0.2){
        circle(leftWristX,leftWristY,20);
        numleftY=Number(leftWristY);
        removedec=floor(numleftY);
        volume=removedec/500;
        document.getElementById("btnvol").innerHTML="volume:"+volume;
        song.setVolume(volume);
    }
}
function play(){
song.play();
song.setVolume(1);
song.rate(1);
}
function modelLoaded(){
    console.log("model is successfully loaded");
}
function gotposes(results){
    if(results.length>0){
        console.log("results");
        scoreright=results[0].pose.keypoints[10].score;
        scoreLeft=results[0].pose.keypoints[9].score;
        console.log(scoreLeft);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("right wrist x="+rightWristX+"right wrist y"+rightWristY+"left wrist x"+leftWristX+"left wrist y"+leftWristY);
    }
}