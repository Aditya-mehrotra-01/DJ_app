song1="";
song2="";
leftWristX = "";
RightWristX = "";
leftWristY = "";
RightWristY = "";
scoreLeftWrist = "";
song1_status = "";
song2_status = "";
scoreRightWrist="";
function setup() {
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
    
}
function preload() {
 song1= loadSound("music.mp3");
 song2=loadSound("music2.mp3");
}
function draw() {
    image(video,0,0,600,500);
    fill("#FF0000");
    stroke("#FF0000");

    

    song1_status=song1.isPlaying();
    song2_status=song2.isPlaying();

    if(scoreRightWrist >0.2) {
        circle(RightWristX,RightWristY,20);

        song2.stop();
        if (song1_status == false) {
            song1.play();
            document.getElementById("song").innerHTML="Playing song 1"; 
        }
    }
    if(scoreLeftWrist >0.2 ) {
        circle(leftWristX,leftWristY,20);

        song1.stop();

        if(song2_status == false) {
            song2.play();
            document.getElementById("song").innerHTML=" Playing song 2";
        }
    }

}
function modelLoaded() {
    console.log("PoseNet is initalized");
}
function gotPoses(results) {
    if ( results.length > 0) {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
       console.log(" Score left wrist = " + scoreLeftWrist);
       scoreRightWrist = results[0].pose.keypoints[10].score;
       console.log(" Score right wrist = " + scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        RightWristX = results[0].pose.rightWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        RightWristY = results[0].pose.rightWrist.y;
        console.log("left wrist x = " + leftWristX + "left wrist y = " + leftWristY);
        console.log("right wrist x = " + RightWristX + "right wrist y = " + RightWristY);
    }
}