//////////////////////////////////// Socket.Io //////////////////////////////////// 

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
    
    CubeX = dataCube[0].x * -0.07 + 15; 
    CubeY = dataCube[0].y * -0.07 + 15;
    CubeZ = dataCube[0].z  * -0.03;
    SphereX = dataCube[1].x * -0.07 + 15;
    SphereY = dataCube[1].y * -0.07 + 15;
    SphereZ = dataCube[1].z * -0.03;
    BallX = CubeX;
    BallY = CubeY;
    BallZ = CubeZ;
   //console.log(CubeX);

});


//////////////////////////////////// Three JS //////////////////////////////////// 
window.addEventListener('load', init, false);
function init() {
  console.log('Init Functions');
  createWorld();
  createGrid();
  createSkin();
  createLife();
};

var Theme = {
  _gray:0x222222,
  _dark:0x000000,   // Background
  _cont:0x444444,   // Lines
  _blue:0x000FFF,
  _red:0xF00000,    //
  _cyan:0x00FFFF,   // Material
  _white:0xF00589   // Lights
};

//Create variable
var scene, camera, renderer, container;
var _width, _height;
var _ambientLights, _lights, _rectAreaLight;
var _skin;
var mat;
var geo;
var geo02;
var geo03;
var groupMoon = new THREE.Object3D();
var groupMoon02 = new THREE.Object3D();
var groupMoon03 = new THREE.Object3D();

//Create the scene, camera and render
function createWorld() {
  _width = window.innerWidth;
  _height= window.innerHeight;

  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(Theme._dark, 150, 320);
  scene.background = new THREE.Color(Theme._dark);
  scene.add(groupMoon);
  scene.add(groupMoon02);
  scene.add(groupMoon03);

  camera = new THREE.PerspectiveCamera(20, _width/_height, 1, 1000);
  camera.position.set(0,-10,120);

  renderer = new THREE.WebGLRenderer({antialias:true, alpha:false});
  renderer.setSize(_width, _height);
  renderer.shadowMap.enabled = true;

  document.body.appendChild(renderer.domElement);

  window.addEventListener('resize', onWindowResize, false);
  console.log('Create world');
}

function onWindowResize() {
  _width = window.innerWidth;
  _height = window.innerHeight;
  renderer.setSize(_width, _height);
  camera.aspect = _width / _height;
  camera.updateProjectionMatrix();
};

var uniforms = {
  time: {
    type: "f",
    value: 0.0
  },
  RGBr: {
    type: "f",
    value: 0.0
  },
  RGBg: {
    type: "f",
    value: 0.0
  },
  RGBb: {
    type: "f",
    value: 0.0
  },
  RGBn: {
    type: "f",
    value: 0.0
  },
  RGBm: {
    type: "f",
    value: 0.0
  },
  morph: {
    type: 'f',
    value: 0.0
  },
  psize: {
    type: 'f',
    value: 3.0
  }
}

var options = {
  perlin: {
    //Set the speed of the shader
    time: 40.0,
    //Set the deformation of the balls
    morph: 30.0,
  },
  chroma: {
    //Set the color of the shader
    RGBr: 2.5,
    RGBg: 4.5,
    RGBb: 4.5,
    RGBn: 4.5,
    RGBm: 1.0
  },
  camera: {
    zoom: 150,
    speedY: 1.6,
    speedX: 1.0,
    guide: false
  },
  sphere: {
    wireframe: false,
    points: false,
    psize: 3
  }
}

skinElement = function(geo_frag = 5) {
  //Set the size of the balls
  var geo_size = 10;
  var geo_size = 30;
  if (geo_frag>=5) geo_frag = 5;

  //Create the geometry
  geo = new THREE.IcosahedronBufferGeometry(geo_size,geo_frag);
  geo02 = new THREE.IcosahedronBufferGeometry(geo_size,geo_frag);
  geo03 = new THREE.IcosahedronBufferGeometry(geo_size,geo_frag);
  
  //Create the material
  mat = new THREE.ShaderMaterial({
    uniforms: uniforms,
    //attributes: attributes,
    side:THREE.DoubleSide,
    //CGrab the shaders
    vertexShader: document.getElementById( 'noiseVertexShader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
    wireframe:options.sphere.wireframe
  });
  this.point = new THREE.Points(geo, mat);
  this.mesh = new THREE.Mesh(geo, mat);
  this.point02 = new THREE.Points(geo02, mat);
  this.mesh02 = new THREE.Mesh(geo02, mat);
  this.point03 = new THREE.Points(geo03, mat);
  this.mesh03 = new THREE.Mesh(geo03, mat);
};

function createSkin() {
  _skin = new skinElement();5
  _skin.mesh.scale.set(0.1,0.1,0.1);
  _skin.mesh02.scale.set(0.1,0.1,0.1);
  _skin.mesh03.scale.set(0.3,0.3,0.3);
  _skin.mesh.position.set(-10, 1, 1); 
  _skin.mesh02.position.set(10, 1, 1); 
  _skin.mesh03.position.set(1, 1, 1); 
  scene.add(_skin.mesh);
  scene.add(_skin.mesh02);
  scene.add(_skin.mesh03);
};

var gridHelper;

function createGrid(_gridY = -20) {
  gridHelper = new THREE.GridHelper(200, 20, Theme._cont, Theme._gray);
  gridHelper.position.y = _gridY;
  scene.add(gridHelper);
};

var frame = Date.now();

function createLife() {
  var time = Date.now();

  uniforms.time.value = (options.perlin.time / 10000) * (time - frame);
  uniforms.morph.value = (options.perlin.morph);

  //TweenMax.to(camera.position, 2, {z:300-options.camera.zoom});

  _skin.mesh.rotation.y += options.camera.speedY/100;
  _skin.mesh.rotation.z += options.camera.speedX/100;
  
  if(dataCube){
    //Move the position of the ball based on data
    _skin.mesh.position.set(CubeX, CubeY, CubeZ); 
    _skin.mesh02.position.set(SphereX, SphereY, SphereZ); 
    _skin.mesh03.position.set(BallX, BallY, BallZ); 

    //Scale the ball based on data
    _skin.mesh.scale.set(CubeZ*0.1,CubeZ*0.1,CubeZ*0.1);
    _skin.mesh02.scale.set(SphereZ*0.1,SphereZ*0.1,SphereZ*0.1);
    _skin.mesh03.scale.set(CubeZ*0.25,CubeZ*0.25,CubeZ*0.25);
  };


  //Fusion of the two balls if the distance become small enough
  let fusion = CubeX - SphereX + CubeY - SphereY;
  
  //Hide/Show the balls
  if (fusion > -10){
      _skin.mesh.visible = false;
      _skin.mesh02.visible = false;
      _skin.mesh03.visible = true;
      //console.log("fusion")
      //console.log(fusion)
  }else{
    _skin.mesh.visible = true;
    _skin.mesh02.visible = true;
    _skin.mesh03.visible = false;
  };

  _skin.point.rotation.y = _skin.mesh.rotation.y;
  _skin.point.rotation.z = _skin.mesh.rotation.z;
  gridHelper.rotation.y = _skin.mesh.rotation.y;

  mat.uniforms['RGBr'].value = options.chroma.RGBr/10;
  mat.uniforms['RGBg'].value = options.chroma.RGBg/10;
  mat.uniforms['RGBb'].value = options.chroma.RGBb/10;
  mat.uniforms['RGBn'].value = options.chroma.RGBn/100;
  mat.uniforms['RGBm'].value = options.chroma.RGBm;
  mat.uniforms['psize'].value = options.sphere.psize;

  gridHelper.visible = options.camera.guide;

  mat.wireframe = options.sphere.wireframe;

  camera.lookAt(scene.position);

  requestAnimationFrame(createLife);
  renderer.render(scene, camera);
};

