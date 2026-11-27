import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import "./style.css";

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

const clock = new THREE.Clock();
const loader = new GLTFLoader();
let galaxy: THREE.Group | null = null;

async function loadGalaxy() {
  try {
    const loadedModel = await loader.loadAsync("/models/milky.glb");
    galaxy = loadedModel.scene;
    scene.add(galaxy);
  } catch (error) {
    console.error("Error loading galaxy model:", error);
  }
}

function animate() {
  requestAnimationFrame(animate);
  if (galaxy) {
    galaxy.rotation.y += 0.001;
    galaxy.position.z = 2;
  }
  renderer.render(scene, camera);
}

loadGalaxy();
animate();
