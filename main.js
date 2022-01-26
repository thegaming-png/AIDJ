song="";
leftScore =0;
rightScore=0;

leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(300, 300);
    video.hide()
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotResult);
}


function draw() 
{
    image(video, 0, 0, 600, 500);
    fill("#ff0000");
    stroke("#ff0000");
    // console.log(leftScore);

    if(leftScore > 0.02){
        circle(leftWristX, leftWristY, 20);
        console.log(leftScore);
        leftX=Math.floor(Number(leftWristY));
        leftX = leftX / 500;
        song.setVolume(leftX);
        document.getElementById("volume").innerHTML = "Volume : " + leftX;
    }

    if(rightScore > 0.2)
    {
        circle(rightWristX, rightWristY, 20);
        if(rightWristY > 0 && rightWristY <= 100)
        {
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        }
        else if(rightWristY > 100 && rightWristY <= 200){
            document.getElementById("speed").innerHTML = "Speed = 1x";
            song.rate(1);
        }
        else if(rightWristY > 200 && rightWristY <= 300){
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }
        else if(rightWristY > 300 && rightWristY <= 400){
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2);
        }
        else if(rightWristY > 400 && rightWristY <= 500){
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }
    }
}

function preload()
{
    song = loadSound("music.mp3");
}

function play()
{
    song.play();
}

function gotResult(results){
    if(results.length > 0)
    {
        leftWristX = results[0].pose.leftWrist.x + 200;
        leftWristY = results[0].pose.leftWrist.y + 95;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        leftScore = results[0].pose.keypoints[9].score;
        rightScore = results[0].pose.keypoints[10].score;
    }
    // console.log(results);
}  

function modelLoaded(){
    console.log("model Loaded");
}