// The video
let video;
// For displaying the label
let label = "geenPlant";
// The classifier
let classifier;
let modelURL = "https://teachablemachine.withgoogle.com/models/37NXtoFDI/";

let counter = 0


// STEP 1: Load the model!
function preload() {
    classifier = ml5.imageClassifier(modelURL + 'model.json');
}

function setup() {
    createCanvas(640, 480);
    // Create the video
    video = createCapture(VIDEO);
    video.hide();
    
    // STEP 2: Start classifying
    classifyVideo();
}

// STEP 2 classify the videeo!
function classifyVideo() {
    classifier.classify(video, gotResults);
}

function draw() {
    background(0);
    // Draw the video
    image(video, 0, 0);

    // STEP 4: Draw the label
    textSize(32);
    textAlign(CENTER, CENTER);
    fill(255);
    text(label, width / 2, height - 16);

    // If statements to check labels
    if (label == "geenPlant") {
        // Do nothing, keep classifying
    } else {
        counter++
        if (counter == 100) {
            const plantText = document.createElement('p');
            plantText.innerHTML = `Ik weet zeker dat dit een ${label} is!`;
            document.body.appendChild(plantText);  

            const canvas = document.querySelector('.p5Canvas');
            const video = document.querySelector('video');
            canvas.remove();

            video.pause();
            video.removeAttribute('src');

            passLabel(label);
        } 
    } 
}

// STEP 3: Get the classification!
function gotResults(error, results) {
    // Something went wrong!
    if (error) {
        console.error(error);   
        return;
    }

    // Store the label and classify again!
    label = results[0].label;

    if (counter > 100) {
        console.log("stop")
        return;
    } else {
        classifyVideo();
    }    
}

function passLabel(label) {
    let plantNaam = label;
    localStorage.setItem("plant", plantNaam)
    window.location.href = "/sensor-test/index.html"
}
