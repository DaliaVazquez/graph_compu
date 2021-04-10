import * as THREE from '/build/three.module.js';
import {OrbitControls} from '/js/jsm/controls/OrbitControls.js';
import Stats from '/js/jsm/libs/stats.module.js';
import dat from '/js/jsm/libs/dat.gui.module.js';

"using strict";

let renderer, scene, camera, cameraControl, mesh, stats,entra,r;

function init() {
    entra=true;
    // RENDERER
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    //renderer.setClearColor(new THREE.Color(0.2, 0.2, 0.35));
    document.body.appendChild(renderer.domElement);

    // SCENE
    scene = new THREE.Scene();

    // CAMERA
    let fov = 60;
    let aspect = window.innerWidth / window.innerHeight;
    let near = 0.1;
    let far = 10000;
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    camera.position.set(0, 0, 3);
    cameraControl = new OrbitControls(camera, renderer.domElement);
    camera.lookAt(0,0,0);
    r=0;

    // MODELS
    let geometry = new THREE.ConeGeometry();
    let material = new THREE.MeshBasicMaterial({color: "yellow", wireframe: false});
    mesh = new THREE.Mesh(geometry, material);
    mesh.name = "Cube";
    mesh.position.set(0, 0.5, 0);

     // WORLD AXES
     let worldAxes = new THREE.AxesHelper(10);

    // SCENE GRAPH
    scene.add(mesh);
    scene.add(worldAxes);

    // GUI
    let gui = new dat.GUI();

     // SHOW/HIDE WORLD-AXES
     gui.add(worldAxes, "visible").name("World Axes").setValue(false).listen().onChange(function(value) {
 
     });

     // SHOW/HIDE WORLD-AXES
     let params =  {
         play: function() {
            console.log("play");
            entra=true;
         },
         stop: function() {
            console.log("stop");
            entra=false;
        },
        home: function() {
            console.log("home");
            r=0;
            camera.position.set(0, 0, 3);
            camera.lookAt(mesh.position);
        }
         
     };
     gui.add(params, "play").name("ORBIT").listen().onChange(function(value) {
        

    });
    gui.add(params, "stop").name("STOP").listen().onChange(function(value) {
        

    });
    gui.add(params, "home").name("HOME").listen().onChange(function(value) {
    });

    // STATS
    stats = new Stats();
    stats.showPanel(0);
    document.body.appendChild(stats.dom);

    // RENDER LOOP
    renderLoop();
}

function renderLoop() {
    stats.begin();
    renderer.render(scene, camera); // DRAW SCENE
    updateScene();
    stats.end();
    stats.update();
    requestAnimationFrame(renderLoop);
    
}

function updateScene() {
   if(entra){
        r = r + .5 * Math.PI / 180;
        camera.lookAt(mesh.position);
        camera.position.x = 3 * Math.cos( r );
        camera.position.z = 3 * Math.sin( r );
        camera.position.y = 3 * Math.sin( r );/**/

    }
}

// EVENT LISTENERS & HANDLERS
document.addEventListener("DOMContentLoaded", init);

window.addEventListener("resize", function() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});


class Floor extends THREE.Mesh {
    constructor() {
        super();
        this.geometry = new THREE.PlaneGeometry(10, 10, 10, 10);
        this.material = new THREE.MeshBasicMaterial();
        this.rotation.x = -0.5 * Math.PI;
        this.wireframeHelper = new THREE.LineSegments(new THREE.WireframeGeometry(this.geometry));
        this.wireframeHelper.material.color = new THREE.Color(0.2, 0.2, 0.2);
        this.add(this.wireframeHelper);
        this.visible = false;
    }
}