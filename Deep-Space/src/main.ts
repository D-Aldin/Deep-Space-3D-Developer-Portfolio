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
scene.add(new THREE.HemisphereLight(0xffffff, 0x666677, 2));

const clock = new THREE.Clock();
const loader = new GLTFLoader();
let galaxy: THREE.Object3D | null = null;

function createStarTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d")!;
  const glow = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  glow.addColorStop(0.0, "rgba(255, 255, 255, 1)");
  glow.addColorStop(0.18, "rgba(255, 255, 255, 1)");
  glow.addColorStop(0.4, "rgba(255, 255, 255, 0.45)");
  glow.addColorStop(0.7, "rgba(255, 255, 255, 0.10)");
  glow.addColorStop(1.0, "rgba(255, 255, 255, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, 64, 64);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

async function loadGalaxy() {
  try {
    const loadedModel = await loader.loadAsync("/models/milky.glb");
    const model = loadedModel.scene;
    model.updateMatrixWorld(true);
    const starTexture = createStarTexture();
    scene.add(model);
    // scene.add(starTexture);
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
