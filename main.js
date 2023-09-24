object = [];
status = "";

function preload() {
    video = createVideo("Bugatti divo.mp4");
}

function setup() {
    canvas = createCanvas(600, 400);
    canvas.center();
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = "Status : Objects detecting";
}

function modelLoaded(){
    console.log("Model loaded successfully");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0.5);
}

function gotResults(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        object = results;
    }
}

function draw() {
    image(video, 0, 0, 600, 400);
    if(status != ""){
        objectDetector.detect(video, gotResults);
        for(i = 0; i < object.length; i++){
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("Object").innerHTML = "No. of objects : " + object.length;
            fill('white');
            percent = Math.floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%", object[i].x + 15, object[i].y + 15);
            noFill();
            stroke('white');
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }
}

function vstop(){
    video.stop();
}

function vpause(){
    video.pause();
}