import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import GUI from "lil-gui";

// Debug
const gui = new GUI({width: 360});

// CURSOR
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

/**
 *  GALAXY
*/
const parameters = {}
parameters.count = 1000
parameters.size = .02;
parameters.radius = 5;
parameters.branches = 3;
let geometry = null;
let material = null;
let points = null;

const generateGalaxy = () => {
  // Destroy old galaxy
  if(geometry !== null){
    geometry.dispose();
    material.dispose();
    scene.remove(points)
  }
  geometry = new THREE.BufferGeometry()
  const positions = new Float32Array(parameters.count*3)

  for(let i=0; i<parameters.count; i++) {
    const i3 = i * 3;

    const radius = Math.random() * parameters.radius;
    const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2

    if(i < 20) {
      console.log(i, branchAngle)
    }

    positions[i3] = Math.cos(branchAngle) * radius
    positions[i3+1] = 0
    positions[i3+2] = Math.sin(branchAngle) * radius;

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    // Material
    material = new THREE.PointsMaterial({
      size: parameters.size,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })

  }
  // Points
  points = new THREE.Points(geometry, material)
  scene.add(points)
}

generateGalaxy()

gui.add(parameters, 'count').min(500).max(100000).step(100).onFinishChange(generateGalaxy)
gui.add(parameters, 'size').min(.001).max(.1).step(.001).onFinishChange(generateGalaxy)
gui.add(parameters, 'radius').min(.01).max(20).step(.01).onFinishChange(generateGalaxy)
gui.add(parameters, 'branches').min(2).max(20).step(1).onFinishChange(generateGalaxy)


/* PARTICLES */
// Textures
// const textureLoader = new THREE.TextureLoader();
// const particleTexture = textureLoader.load("./star.png");

// // Particles
// // Geometry
// const particlesGeometry = new THREE.BufferGeometry();
// const count = 5000; // Particles count is 500

// // Adding vertices to
// const positions = new Float32Array(count * 3); // count*3 items in the array
// const colors = new Float32Array(count * 3);

// for (let i = 0; i < count * 3; i++) {
//   positions[i] = (Math.random() - 0.5) * 10;
//   colors[i] = Math.random();
// }

// particlesGeometry.setAttribute(
//   "position",
//   new THREE.BufferAttribute(positions, 3),
// );
// particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

// // console.log(particlesGeometry.attributes.position.array);

// // Material
// const particlesMaterial = new THREE.PointsMaterial({
//   size: 0.02, // size of the particle
//   sizeAttenuation: true, // make size of particle small if it is farther from the camera
// });
// particlesMaterial.color = new THREE.Color("papayawhip");
// particlesMaterial.transparent = true;
// particlesMaterial.alphaMap = particleTexture;
// particlesMaterial.map = particleTexture;
// // particlesMaterial.depthTest = false;
// particlesMaterial.depthWrite = false;
// // particlesMaterial.blending = THREE.AdditiveBlending;
// particlesMaterial.vertexColors = true;

// // Points
// const particles = new THREE.Points(particlesGeometry, particlesMaterial);
// scene.add(particles);

/* CUBE */ 

// Object
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: "rebeccapurple" });
// const mesh = new THREE.Mesh(geometry, material);
// // mesh.position.y = 1;
// // mesh.position.z = 1;

// // Adding the object to the scene
// // scene.add(mesh);
// gui.add(mesh.position, "y").min(-3).max(3).step(0.01).name("elevation");
// gui.add(mesh, "visible");
// gui.add(material, "wireframe");
// gui.addColor(material, "color");

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
// camera.lookAt(mesh.position);
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

  // Update Particles
  // particles.position.y = elapsedTime * 0.03;
  // for (let i = 0; i < count; i++) {
  //   const i3 = i * 3;
  //   const x = particlesGeometry.attributes.position.array[i3];
  //   particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(
  //     elapsedTime * 0.1 + x,
  //   );
  // }

  // particlesGeometry.attributes.position.needsUpdate = true;

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
  // camera.lookAt(mesh.position);
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
