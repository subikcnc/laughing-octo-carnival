import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Cursor
const cursor = {
  x: 0,
  y: 0,
};
window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);
  console.log(cursor.x);
});

// Canvas
const canvas = document.querySelector("canvas");

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
// mesh.position.y = 1;
// mesh.position.z = 1;

// Adding the object to the scene
scene.add(mesh);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Resize event listener
window.addEventListener("resize", function () {
  // Update the sizes
  sizes.width = this.window.innerWidth;
  sizes.height = this.window.innerHeight;

  // Update the camera's aspect ratio
  camera.aspect = sizes.width / sizes.height;
  // We also need to update the projection matrix
  camera.updateProjectionMatrix();
  // We also need to update the renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio), 2);
});

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100,
); // The initial value is the field of view and the second is the aspect
const aspectRatio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(-1*aspectRatio,1*aspectRatio,1,-1,0.1,100)
camera.position.z = 2;
// camera.position.y = 2;
// camera.position.x = 2;
camera.lookAt(mesh.position);
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
// To disable the controls we can do
// controls.enabled = false;
controls.enableDamping = true;

// Webgl Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio), 2);
renderer.render(scene, camera);

// Time
const clock = new THREE.Clock();

// Animation
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update object
  // mesh.rotation.y = elapsedTime;
  // Render

  //   Update the controls
  controls.update();

  // Update camera
  //   camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  //   camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
  //   camera.position.y = cursor.y * 5;
  // look at should be done after positioning the camera
  camera.lookAt(mesh.position);
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
