import * as THREE from "/build/three.module.js";
import Stats from "/js/jsm/libs/stats.module.js";
import {OrbitControls} from "/js/jsm/controls/OrbitControls.js";

"use strict";

let renderer, scene, camera1, camera2,camera3, camera4, mesh, stats, cameraControls;
let multiview = false;

function init(event) {
    // RENDERER ENGINE
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setClearColor(new THREE.Color(0, 0, 0));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setScissorTest(true);
    document.body.appendChild(renderer.domElement);

    // SCENE
    scene = new THREE.Scene();

    // CAMERA 1 (PERSPECTIVE VIEW)
    let fovy = 60.0;    // Field ov view
    let aspectRatio = window.innerWidth / window.innerHeight;
    let nearPlane = 0.1;
    let farPlane = 10000.0;
    camera1 = new THREE.PerspectiveCamera(fovy, aspectRatio, nearPlane, farPlane);
    camera1.position.set(1, 1, 3);
    cameraControls = new OrbitControls(camera1, renderer.domElement);

     // CAMERA 2 (TOP VIEW)
     aspectRatio = window.innerWidth/ window.innerHeight;
     camera2 = new THREE.PerspectiveCamera(fovy, aspectRatio, nearPlane, farPlane);
     camera2.position.set(0, 3, 0);
     camera2.lookAt(0, 0, 0);
     camera2.up.set(0, 0, 1);

    // CAMERA 3 (left VIEW)
    camera3 = new THREE.PerspectiveCamera(fovy, aspectRatio, nearPlane, farPlane);
    camera3.position.set(3, 0, 0);
    camera3.lookAt(0, 0, 0);
    camera3.up.set(0, 0, 1);
    // CAMERA 4 (left VIEW)
    camera4 = new THREE.PerspectiveCamera(fovy, aspectRatio, nearPlane, farPlane);
    camera4.position.set(0, 0, 3);
    camera4.lookAt(0, 0, 0);
    camera4.up.set(0, 0, 1);
            
    // MODEL
    let geometry = new THREE.ConeGeometry();
    let material = new THREE.MeshBasicMaterial({wireframe: true});
    mesh = new THREE.Mesh(geometry, material);

    // SCENE HIERARCHY
    scene.add(mesh);

    // SETUP STATS
    stats = new Stats();
    stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(stats.dom);

    // DRAW SCENE IN A RENDER LOOP (ANIMATION)
    renderLoop();
}

function renderLoop() {
    stats.begin();
    if(!multiview) {
        // CAMERA 1 (PERSPECTIVE VIEW)
        camera1.aspect = window.innerWidth / window.innerHeight;
        camera1.updateProjectionMatrix();
        renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
        renderer.setScissor(0, 0, window.innerWidth, window.innerHeight);
        renderer.render(scene, camera1); // DRAW SCENE
    }
    else {
      // CAMERA 1 (PERSPECTIVE VIEW)
      camera1.aspect = window.innerWidth / window.innerHeight;
      camera1.updateProjectionMatrix();
      renderer.setViewport(window.innerWidth/2, 0, window.innerWidth/2, window.innerHeight/2);
      renderer.setScissor(window.innerWidth/2, 0, window.innerWidth/2, window.innerHeight/2);
      renderer.render(scene, camera1); // DRAW SCENE
      
      // CAMERA 2 (TOP VIEW)
      camera2.aspect = window.innerWidth / window.innerHeight;
      camera2.updateProjectionMatrix();
      renderer.setViewport(0, 0, window.innerWidth/2, window.innerHeight/2);
      renderer.setScissor(0, 0, window.innerWidth/2, window.innerHeight/2);
      renderer.render(scene, camera2); // DRAW SCENE
      // CAMERA 3 (left VIEW)
      camera3.aspect = window.innerWidth / window.innerHeight;
      camera3.updateProjectionMatrix();
      renderer.setViewport(0, window.innerHeight/2, window.innerWidth/2, window.innerHeight/2);
      renderer.setScissor(0, window.innerHeight/2, window.innerWidth/2, window.innerHeight/2);
      renderer.render(scene, camera3); // DRAW SCENE
       // CAMERA 4 (rigth VIEW)
       camera4.aspect = window.innerWidth / window.innerHeight;
       camera4.updateProjectionMatrix();
       renderer.setViewport(window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/2);
       renderer.setScissor(window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/2);
       renderer.render(scene, camera4); // DRAW SCENE
    }
    updateScene();
    stats.end();
    stats.update();
    requestAnimationFrame(renderLoop);
}

function updateScene() {
    
}

// EVENT LISTENERS & HANDLERS

document.addEventListener("DOMContentLoaded", init);

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    cameraControls.update();
    renderer.setSize(window.innerWidth, window.innerHeight);
}, false);

document.addEventListener("keydown", (ev) => {
    if(ev.keyCode == 32) {
        multiview = !multiview;
    }
});