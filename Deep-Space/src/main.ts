import * as THREE from "three";

const CONFIG = {
  // Camera position
  camStartZ: 3.5,
  camStartY: 0.8,
  introDolly: 1.5,

  // Intro
  IntroDuration: 3.5,
  IntroSpin: 0.8,
};

// ---------------------------------------------------------------
// Scene and Camera
// ---------------------------------------------------------------

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, CONFIG.camStartY, CONFIG.camStartZ + CONFIG.introDolly);

// ---------------------------------------------------------------
// Renderer
// ---------------------------------------------------------------

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 2;

function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
