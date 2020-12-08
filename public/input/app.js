let socket = io('/input');

//////////////////////////////////// PoseNet //////////////////////////////////// 
//posenet variable
let video;
let poseNet;
let pose;
let skeleton;
let checked = 1;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}
  
function gotPoses(poses) { 
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}
   
function modelLoaded() {
  console.log('poseNet ready');
}
  
function draw() {
  image(video, 0, 0);
  
  if (pose) {
    let eyeR = pose.rightEye;
    let eyeL = pose.leftEye;
    let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);

   //Fusion of the ball if the hand are too close to each other
    let handClose = pose.leftWrist.x - pose.rightWrist.x;

    if (handClose < 100){
      fill(255, 0, 255);
      let halfX = (pose.rightWrist.x + pose.leftWrist.x )/2
      let halfY = (pose.rightWrist.y + pose.leftWrist.y )/2
      ellipse(halfX, halfY, d*4);
    }else{
      fill(0, 0, 255);
      ellipse(pose.rightWrist.x, pose.rightWrist.y, d);
      ellipse(pose.leftWrist.x, pose.leftWrist.y, d);
    }

    //Draw the skeleton
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      fill(0, 255, 0);
      ellipse(x, y, 16, 16);
    }
    
    for (let i = 0; i < skeleton.length; i++) {
      let a = skeleton[i][0];
      let b = skeleton[i][1];
      strokeWeight(2);
      stroke(255);
      line(a.position.x, a.position.y, b.position.x, b.position.y);
    }

//////////////////////////////////// Socket.Io //////////////////////////////////// 

    let elementP = [];
    
    let eleLeftx = pose.keypoints[9].position.x;
    let eleLefty = pose.keypoints[9].position.y;
    let eleRightx = pose.keypoints[10].position.x;
    let eleRighty = pose.keypoints[10].position.y;
    /*
    elementP = [{
      name : "left",
      x : eleLeftx,
      y : eleLefty,
      z : d
    },{
      name : "right",
      x : eleRightx,
      y : eleRighty,
      z : d
    }];

    
    //console.log(elementP);
    //console.log(d);
    socket.emit('dataPosition', elementP);
    */
   
    socket.on('connect', function() {
      //console.log('sending position to server');
            
      elementP = [{
        name : "left",
        x : eleLeftx,
        y : eleLefty,
        z : d
        },{
        name : "right",
        x : eleRightx,
        y : eleRighty,
        z : d
      }];
      socket.emit('dataPosition', elementP);
      //console.log(elementP);
      //console.log(d);
    });       
  }
}
