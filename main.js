song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftWrist = 0;
song1_status = "";
song2_status = "";

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelloaded);
    posenet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);
    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();
    fill("yellow");
    stroke("orange");
    if (scoreleftWrist > 0.01) {
        circle(leftWristX, leftWristY, 20);
        song1.stop();
        if (song2_status == false) {
            song2.play();
            document.getElementById("song_name").innerHTML = "playing - peter pan song";
        }
    }
}

function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function modelloaded() {
    console.log("poseNet is initialized");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreleftWrist);
    }
}