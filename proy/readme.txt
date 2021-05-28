Hello World Threejs

Includes:
Resize Window
Full Window Size Render
Camera's Orbit Control
Stats Performance Panell

Code:
main.js:

import * as THREE from "/build/three.module.js";
import Stats from "/js/jsm/libs/stats.module.js";
import {OrbitControls} from "/js/jsm/controls/OrbitControls.js";

// CAMERA
camera = new THREE.PerspectiveCamera(fovy, aspectRatio, nearPlane, farPlane);
controls = new OrbitControls(camera, renderer.domElement);

// EVENT HANDLERS
function windowResizeHandler (event) {
    ...
    controls.update();
    ...
}