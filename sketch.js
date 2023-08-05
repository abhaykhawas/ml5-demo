// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js 
=== */

let video;
let poseNet;
let poses = [];
let nose;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();
  nose = loadImage("nose.png");
  spec = loadImage("spec.png")
  textSize(16);
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  image(video, 0, 0, width, height);

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  drawSkeleton();
}
list_left = []
list_right = []
let x = 0
// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();
        //ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
        text(j, keypoint.position.x, keypoint.position.y);
        
        // if(j==2){

        // }
        // if (j == 2) {
        //   push();
        //   imageMode(CENTER);
        //   console.log(keypoint.part)
        //   // image(nose,keypoint.position.x, keypoint.position.y, 50, 50);
        //   // image(nose,keypoint.position.x, keypoint.position.y, 50, 50);
        //   pop();
        //   //text("NOSE", keypoint.position.x + -15, keypoint.position.y + 15);
        // }
 
        if (keypoint.part == 'rightEye'){
          // console.log("RE")
          // list.push([keypoint.position.x, keypoint.position.y])
          // console.log("right coor : ", keypoint.position.x, keypoint.position.y)
          list_right.push([keypoint.position.x, keypoint.position.y])
          image(spec,keypoint.position.x-30, keypoint.position.y-10, 120, 50);

        }

        if (keypoint.part == 'leftEye'){
          // console.log("LE")
          // list.push([keypoint.position.x, keypoint.position.y])
        // console.log("left coor : ", keypoint.position.x, keypoint.position.y)
        list_left.push([keypoint.position.x, keypoint.position.y])




        }
        let rE = list_right[list_right.length-1]
        let lE = list_left[list_left.length - 1]
        // if(typeof(rE) != 'underfiner' && typeof(lE) != 'underfined'){
        //   console.log("Right eye : ", typeof(rE))
        //   console.log("Left eye : ", lE[0])
        // }
    
        // if(x%100 == 0) {
        //   list_left = []
        //   list_right = []
        // }

        // image(spec,keypoint.list_right[list_right.length-1][0], keypoint.position.y, 50, 50);


        x = x +1
        // if ()
        // console.log(list_left.length)
        
        // console.log(list)
        // list = []
      }
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}