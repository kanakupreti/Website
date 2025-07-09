import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
let renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
  color: 0xff6347,
  wireframe: true,
});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);
const PointLight = new THREE.PointLight(0xffffff);
PointLight.position.set(5, 5, 5);
// scene.add(PointLight);
const AmbientLight = new THREE.AmbientLight(0xffffff);
scene.add(PointLight, AmbientLight);
const lightHelper = new THREE.PointLight(PointLight);
const gridHelper = new THREE.GridHelper(200, 50);

scene.add(lightHelper, gridHelper);
const controls = new OrbitControls(camera, renderer.domElement);
// function addStar() {
//   const geometry = new THREE.SphereGeometry(0, 25, 24, 24);
//   const material = new THREE.MeshStandardMaterial({
//     color: 0xff6347,
//     wireframe: true,
//   });
//   const star = new THREE.Mesh(geometry, material);

//   const [x, y, z] = Array(3)
//     .fill()
//     .map(() => THREE.MathUtils.randFloatSpread(100));
//   star.position.set(x, y, z);
//   scene.add(star);
// }
// Array(200).fill().forEach(addStar);

// const spaceTexture = new THREE.TextureLoader().load();
// scene.background = spaceTexture;
// const jeffTexture = new THREE.TextureLoader().load();
const geo = new THREE.BoxGeometry( 1, 1, 1 ); 
const mat = new THREE.MeshStandardMaterial( {color: 0x00ff00} ); 
const cube = new THREE.Mesh( geo, mat ); 
scene.add( cube );
//moon
const moonTexture = new THREE.TextureLoader().load();
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    color:0xffff
  })
);
scene.add(moon);
moon.position.setZ(30);
moon.position.setX(-10);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;
  cube.rotation.y += 0.01;
  cube.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.002;
  camera.position.y = t * -0.002;
}
document.body.onscroll = moveCamera;

function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  controls.update();
  renderer.render(scene, camera);
}

animate();
