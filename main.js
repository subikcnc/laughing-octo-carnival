import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({color: 0xff0000})
const mesh = new THREE.Mesh(geometry, material)
// mesh.position.y = 1;
// mesh.position.z = 1;

// Adding the object to the scene
scene.add(mesh)

const sizes = {
    width: 800,
    height: 600
}
// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height) // The initial value is the field of view and the second is the aspect
camera.position.z = 3;
scene.add(camera)

// Webgl Renderer
const renderer = new THREE.WebGLRenderer({
    canvas,
})

renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

// Time
const clock = new THREE.Clock();

// Animation
const tick = () => {
   const elapsedTime = clock.getElapsedTime()

    // Update object
    mesh.rotation.y = elapsedTime;
    // Render
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick)
}

tick();
