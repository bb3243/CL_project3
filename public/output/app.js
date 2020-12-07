let socket = io('/output');

//declare variable to store the new position
let dataCube;
let CubeX;
let CubeY;
let CubeZ;
let SphereX;
let SphereY;
let SphereZ;

socket.on('cubePosition', (data) => {
    //console.log("got data from server");
    
    dataCube = data; 
    //console.log(dataCube);
    
    CubeX = dataCube[0].x * -0.5; 
    CubeY = dataCube[0].y * -0.5;
    CubeZ = dataCube[0].z  * -0.5;
    SphereX = dataCube[1].x * -0.5;
    SphereY = dataCube[1].y * -0.5;
    SphereZ = dataCube[1].z * -0.5;
    BallX = (CubeX + SphereX) * 0.5;
    BallY = (CubeY + SphereY) * 0.5;
    BallZ = (CubeZ + SphereZ) * 0.5;

    console.log(CubeX);
});


/*

let start = Date.now();

// grab the container from the DOM
container = document.getElementById( "container" );

//Create a scene
// Set the scene size.
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

// Set some camera attributes.
const VIEW_ANGLE = 500;
const ASPECT = WIDTH / HEIGHT;
const NEAR = 0.1;
const FAR = 10000;

const scene = new THREE.Scene();
scene.background = new THREE.Color('black');

//Create a camera
const camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
camera.position.x = 2; //6
camera.position.y = 0; //5
camera.position.z = 5;

//Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(WIDTH,  HEIGHT);
renderer.setPixelRatio( window.devicePixelRatio );
//Add the renderer to the DOM
document.body.appendChild(renderer.domElement);

//Add OrbitControls 
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// (1) Initialize the geometry
let cubeGeo = new THREE.BoxGeometry(2,2,2);
//let sphereGeo = new THREE.SphereGeometry(1, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2);
let sphereGeo = new THREE.IcosahedronGeometry(2,2);

// (2) Initialize the material

//Set the material to be a color
let material = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
let material2 = new THREE.MeshLambertMaterial({color: 0x008080});

/*
 // create a wireframe material
let material2 = new THREE.MeshBasicMaterial({color: 0xb7ff00, wireframe: true});

THREE.ImageUtils.crossOrigin = '';

material2 = new THREE.ShaderMaterial({
    uniforms: {
      time: { // float initialized to 0
            type: "f",
            value: 0.0
      }
    },
    vertexShader: document.getElementById( 'vertexShader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentShader' ).textContent
});

  // create a sphere and assign the material
let cubeGeo = new THREE.IcosahedronGeometry(20, 4);
let sphereGeo = new THREE.IcosahedronGeometry(20, 4);
let cube = new THREE.Mesh(cubeGeo, material);
let sphere = new THREE.Mesh(sphereGeo, material);
cube.position.set(-3,0,0);
sphere.position.set(3,0,0);
scene.add(cube);
scene.add(sphere);


// (3) Initialize the mesh
let cube = new THREE.Mesh(cubeGeo, material);
let sphere = new THREE.Mesh(sphereGeo, material2);
//cube.position.set(-3,0,0);
//sphere.position.set(3,0,0);


scene.add(cube);
scene.add(sphere);


//Add a Light
// create a point light
const pointLight =
  new THREE.PointLight(0xFFFFFF);

// set its position
pointLight.position.set(10, 50, 130);

// add to the scene
scene.add(pointLight);


let rotate = true;
let rotateX = 0.01;
let rotateY = 0.01;


//Define an animate function / call it repeatedly
function animate(){
    //material.uniforms['time'].value = .00025 * ( Date.now() - start); 

	if(rotate){
		cube.rotation.x += rotateX;
        cube.rotation.y += rotateY;
        sphere.rotation.x += rotateX;
		sphere.rotation.y += rotateY;
    }
    

    if(dataCube){
        cube.position.set(CubeX, CubeY, CubeZ);
        sphere.position.set(SphereX, SphereY, SphereZ);
    }


	//allow for controls to update
	controls.update();

	//call render
	renderer.render(scene, camera);

	// call animate again 
	requestAnimationFrame(animate);
}

animate();
*/
////////////////////////////////
var container,
  renderer,
  scene,
  camera,
  mesh,
  start = Date.now(),
  fov = 250;

  
  // grab the container from the DOM
  container = document.getElementById( "container" );

  // create a scene
  scene = new THREE.Scene();

  // create a camera the size of the browser window
  // and place it 100 units away, looking towards the center of the scene
  camera = new THREE.PerspectiveCamera(
    fov,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.z = 200;

  // create a wireframe material
  material = new THREE.MeshBasicMaterial( {
    color: 0xb7ff00,
    wireframe: true
  } );
  
  THREE.ImageUtils.crossOrigin = '';

  material = new THREE.ShaderMaterial({
    uniforms: {
      time: { // float initialized to 0
        type: "f",
        value: 0.0
      }
    },
    vertexShader: document.getElementById( 'vertexShader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentShader' ).textContent
  } );

  // create a sphere and assign the material
  mesh = new THREE.Mesh(new THREE.IcosahedronGeometry( 20, 4 ),material);
  mesh02 = new THREE.Mesh(new THREE.IcosahedronGeometry( 20, 4 ),material);
  mesh03 = new THREE.Mesh(new THREE.IcosahedronGeometry( 40, 8 ),material);
  scene.add(mesh);
  scene.add(mesh02);
  scene.add(mesh03);

    /*
    //Add a Light
    // create a point light
    const ambientLight =
    new THREE.AmbientLight(0xadd8e6);

    // set its position
    ambientLight.position.set(100, 500, 130);

    // add to the scene
    scene.add(ambientLight);
    */

const axesHelper = new THREE.AxesHelper( 50 );
  scene.add( axesHelper );

  // create the renderer and attach it to the DOM
  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setPixelRatio( window.devicePixelRatio );

  container.appendChild( renderer.domElement );

  render();


function render() {
  material.uniforms[ 'time' ].value = .00025 * ( Date.now() - start );
  
  if(dataCube){
    mesh.position.set(CubeX, CubeY, CubeZ); 
    mesh02.position.set(SphereX, SphereY, SphereZ); 
    mesh03.position.set(BallX, BallY, BallZ); 
  }

  


  //fusion of the two balls if the distance become small enough
  let fusion = CubeX - SphereX;

  if (fusion > -50){
      mesh.visible = false;
      mesh02.visible = false;
      mesh03.visible = true;
      console.log("fusion")
      console.log(fusion)
  }else{
    mesh.visible = true;
    mesh02.visible = true;
    mesh03.visible = false;
  }
  

  // let there be light
  renderer.render( scene, camera );
  requestAnimationFrame( render );
}





/*
// create the particle variables
var particleCount = 1800,
particles = new THREE.Geometry(),
pMaterial = new THREE.PointsMaterial({
    color: 0xFFFFFF,
    size: 20,
    map: THREE.TextureLoader("images/particle.png"),
    blending: THREE.AdditiveBlending,
    transparent: true
});

// now create the individual particles
for(var p = 0; p < particleCount; p++) {
    // create a particle with random
    // position values, -250 -> 250
    var pX = Math.random() * 500 - 250,
        pY = Math.random() * 500 - 250,
        pZ = Math.random() * 500 - 250,
        particle = new THREE.Vector3(pX, pY, pZ);

// create a velocity vector
particle.velocity = new THREE.Vector3(
    0,				// x
    -Math.random(),	// y
    0);				// z
// add it to the geometry
particles.vertices.push(particle);
}

// create the particle system
var particleSystem = new THREE.Points(particles, pMaterial);
particleSystem.sortParticles = true;

// add it to the scene
//scene.addChild(particleSystem);
scene.add(particleSystem);

// animation loop
function update() {

// add some rotation to the system
particleSystem.rotation.y += 0.01;

var pCount = particleCount;
while(pCount--) {
    // get the particle
    var particle = particles.vertices[pCount];
    
    // check if we need to reset
    if(particle.position.y < -200) {
        particle.position.y = 200;
        particle.velocity.y = 0;
    }
    
    // update the velocity
    particle.velocity.y -= Math.random() * .1;
    
    // and the position
    particle.position.addSelf(particle.velocity);
}

// flag to the particle system that we've changed its vertices. This is the dirty little secret.
particleSystem.geometry.__dirtyVertices = true;

renderer.render(scene, camera);

// set up the next call
requestAnimFrame(update);
}
requestAnimFrame(update);
*/