objects = []
status1 = ""

function setup() {

    canvas = createCanvas(600, 500);
    canvas.center();
    object_detector = ml5.objectDetector("cocossd", modelloaded);
    document.getElementById("status").innerHTML = "Status : Detecting object";
    video = createCapture(VIDEO);
    video.hide()  ;
}

function preload() {
     sound = loadSound("sound.mp3")
}

function draw() {
    image(video, 0, 0, 600, 500);
    
    stroke("red");
    noFill()

    if (status1 != "") {
        object_detector.detect(video, gotresults);
        for (i = 0; i < objects.length; i++) {
        
            confidence = (objects[i].confidence*100).toFixed(2);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            text(objects[i].label +" "+ confidence + "%", objects[i].x + 20, objects[i].y + 20);
            if(objects[i].label == "person"){
        document.getElementById("status").innerHTML = "Status : Baby detected";
                sound.stop();
            }else{
                sound.play();
        document.getElementById("status").innerHTML = "Status : Baby not detected";

            }

            
        }
        if(objects.length == 0 ){
            sound.play();
    document.getElementById("status").innerHTML = "Status : Baby not detected";

        }
    }


}


function modelloaded() {
    console.log("Model is loaded");
    status1 = true;


}

function gotresults(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        objects = results;
        
        document.getElementById("status").innerHTML = "Status : Objects detected";
    }
}