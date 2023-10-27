import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Reflector } from 'three/examples/jsm/objects/Reflector';


// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  antialias: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 2.0;
renderer.shadowMap.enabled =true;
camera.position.setZ(20);
camera.position.setY(.18);
camera.position.setX(30);

renderer.render(scene, camera);

//ground

// const planeGeometry = new THREE.PlaneGeometry( 200, 100 );
// const Material = new THREE.MeshBasicMaterial( {color: 0x6d6f73, side: THREE.DoubleSide} );
// const plane = new THREE.Mesh( planeGeometry, Material );
// plane.rotation.x += Math.PI / 2;
// plane.position.y = 0;
// plane.position.x = 14;
// plane.receiveShadow = true;
// plane.shadowSide = THREE.FrontSide;
// scene.add( plane );

// Lights

const pointLight = new THREE.PointLight(0xd9d7d7);
pointLight.position.set(0, 4, 2);
pointLight.shadow.camera.near = 5;
pointLight.shadow.camera.far = 60;
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;
pointLight.castShadow = true

const pointLight1 = new THREE.PointLight(0xffffff);
pointLight1.position.set(0, 2, 13);

scene.add(pointLight, pointLight1);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  // scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

// const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background =new THREE.Color(0x6d6f73);

// Avatar

const jeffTexture = new THREE.TextureLoader().load('jeff.png');

const jeff = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: jeffTexture }));

// scene.add(jeff);


// mug
const gltfloader = new GLTFLoader();
gltfloader.load('Mug.gltf',(gltfscene) => {
  const mug = gltfscene.scene;
  mug.castShadow = true;
  mug.position.set(0.2,0,3.2);
  mug.rotation.y+= -1.5;
  mug.scale.set(.8, .8, .8);
  scene.add(mug)

})

gltfloader.load('Jellyfish.gltf',(gltfscene) => {
  const fish = gltfscene.scene;
  fish.position.set(-2,0,-1);
  fish.scale.set(.02, .02, .02);
  // scene.add(fish)

})

gltfloader.load('Psyche.gltf',(gltfscene) => {
  const psyche = gltfscene.scene;
  psyche.position.set(-.7,0,14);
  psyche.rotation.y +=-1.2;
  psyche.scale.set(.2, .2, .2);
  scene.add(psyche)

})

gltfloader.load('Exhibition kiosk.gltf',(gltfscene) => {
  const ek = gltfscene.scene;
  ek.castShadow = true;
  ek.position.set(0,0,9.5);
  ek.rotation.y += -1.7;
  ek.scale.set(.5, .5, .5);
  scene.add(ek)

})

gltfloader.load('Mobile low.gltf',(gltfscene) => {
  const mobile = gltfscene.scene;
  mobile.position.set(0.15,0,11);
  mobile.rotation.y += -1.6;
  mobile.scale.set(0.4, 0.4, 0.4);
  scene.add(mobile)

})

gltfloader.load('TV.gltf',(gltfscene) => {
  const tv = gltfscene.scene;
  tv.traverse(function(node) {
    if(node.isMesh){
      node.castShadow = true;

    }
  })
  tv.position.set(.2,0,10);
  tv.rotation.y+= -1.6;
  tv.scale.set(.5, .5, .5);
  scene.add(tv)

})

gltfloader.load('Cap low.gltf',(gltfscene) => {
  const cap = gltfscene.scene;
  cap.position.set(-0.9,0,-2);
  cap.rotation.y+= -1.5;
  cap.scale.set(.8, .8, .8);
  scene.add(cap);

})

const mirrorBack1 = new Reflector(
  new THREE.PlaneGeometry(200, 100),
  {
      color: new THREE.Color(0x7f7f7f),
      textureWidth: window.innerWidth * window.devicePixelRatio,
      textureHeight: window.innerHeight * window.devicePixelRatio
  }
)

mirrorBack1.position.y = -0.01
mirrorBack1.rotation.x+= -Math.PI/2
mirrorBack1.position.z = 1
scene.add(mirrorBack1)






// Moon

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

// scene.add(moon);

moon.position.z = -5;
moon.position.setX(-10);

jeff.position.z = -5;
jeff.position.x = 2;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  // mug.rotation.x += 0.03;

  jeff.rotation.y += 0.01;
  jeff.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0000;
  camera.rotation.y = t * -0.0000;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  moon.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();
