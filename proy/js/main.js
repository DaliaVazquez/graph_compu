import * as THREE from "/build/three.module.js";
import Stats from "/js/jsm/libs/stats.module.js";
import {OrbitControls} from "/js/jsm/controls/OrbitControls.js";
import {OBJLoader} from "/js/jsm/loaders/OBJLoader.js";
import {MTLLoader} from "/js/jsm/loaders/MTLLoader.js";
import * as dat from "/js/jsm/libs/dat.gui.module.js";
import { EffectComposer } from '/js/postprocessing/EffectComposer.js';
import { RenderPass } from '/js/postprocessing/RenderPass.js';
import { UnrealBloomPass } from '/js/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from '/js/postprocessing/ShaderPass.js';
import { Lensflare, LensflareElement } from '/js/jsm/objects/Lensflare.js';

"use strict";
const ENTIRE_SCENE = 0, BLOOM_SCENE = 1;

    const bloomLayer = new THREE.Layers();
    bloomLayer.set( BLOOM_SCENE );

    const param3 = {
        exposure: 1,
        bloomStrength: 5,
        bloomThreshold: 0,
        bloomRadius: 0,
        scene: "Scene with Glow"
    };

    const darkMaterial = new THREE.MeshBasicMaterial( { color: "black" } );
    const materials = {};

let renderer, gui, gui2, scene, camera1, camera2,camera3, camera4, mesh,mesh1, mesh2, mesh3, stats, cameraControls, r, entra;
let multiview = false, camAway = 250.0;
var obj2;
const radius = 6371;
const tilt = 0.41;
const rotationSpeed = 0.8;

const cloudsScale = 1.005;
let geometry, meshPlanet, meshClouds;
let dirLight;

let composer;

const textureLoader = new THREE.TextureLoader();

let d=1, dPlanet;

const clock = new THREE.Clock();
let textureFlare0,textureFlare1,textureFlare2,color;

function init(event) {
    r=0;
    entra=false;
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
    camera1.position.set(0, 0, camAway);
    cameraControls = new OrbitControls(camera1, renderer.domElement);

     // CAMERA 2 (TOP VIEW)
     aspectRatio = window.innerWidth/ window.innerHeight;
     camera2 = new THREE.PerspectiveCamera(fovy, aspectRatio, nearPlane, farPlane);
     camera2.position.set(0., camAway, 0.);  
     camera2.up.set(0., 0., 1.);    

    // CAMERA 4 (left VIEW)
     camera4 = new THREE.PerspectiveCamera(fovy, aspectRatio, nearPlane, farPlane);
     camera4.position.set(0, 0., 0.); 
     camera4.up.set(0., 1., 0.);    
       
     //sun
 
 
     let geometry16 = new THREE.SphereGeometry (30, 50, 25);
     let material16 = new THREE.MeshBasicMaterial({color: "orange", wireframe: false, transparent: true, opacity: 0.1});
     let mesh16 = new THREE.Mesh(geometry16, material16);
 
     scene.add(mesh16);
 
     mesh16.position.set(0,200,800);
    
    // MODEL luna
    let mtlLoader2 = new MTLLoader();
    mtlLoader2.load('./assets/obj/Moon_3D_Model/moon.mtl', function(materials) {
        materials.preload();
        var objLoader2 = new OBJLoader();
        objLoader2.setMaterials(materials);
        objLoader2.load('./assets/obj/Moon_3D_Model/moon.obj', function (object) {
            //object.position.x = object.position.x - 0.1;
            object.position.set(130, 0, 0);
            object.scale.set(0.2, 0.2, 0.2);
            
            mesh2 = object;
            //mesh2.position.set(130, 0, 0);
            // SCENE HIERARCHY
            scene.add(mesh2);
            
        });
    });

    //mundo
    //************************************************************************************************** */
    const materialNormalMap = new THREE.MeshPhongMaterial( {

        specular: 0x333333,
        shininess: 15,
        map: textureLoader.load( "/textures/planets/earth_atmos_2048.jpg" ),
        specularMap: textureLoader.load( "/textures/planets/earth_specular_2048.jpg" ),
        normalMap: textureLoader.load( "/textures/planets/earth_normal_2048.jpg" ),

        // y scale is negated to compensate for normal map handedness.
        normalScale: new THREE.Vector2( 0.85, - 0.85 )

    } );
    // planet

    geometry = new THREE.SphereGeometry( 70, 50, 25 );

    meshPlanet = new THREE.Mesh( geometry, materialNormalMap );
    meshPlanet.rotation.y = 0;
    meshPlanet.rotation.z = tilt;
    scene.add( meshPlanet );

    // clouds

    const materialClouds = new THREE.MeshLambertMaterial( {

        map: textureLoader.load( "/textures/planets/earth_clouds_1024.png" ),
        transparent: true

    } );

    meshClouds = new THREE.Mesh( geometry, materialClouds );
    meshClouds.scale.set( cloudsScale, cloudsScale, cloudsScale );
    meshClouds.rotation.z = tilt;
    scene.add( meshClouds );
    //fondo
    /////////////////////////////////////////////////////////////////////
		/*const urls = [
			"https://images.pexels.com/photos/6807016/pexels-photo-6807016.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
			"https://images.pexels.com/photos/6807016/pexels-photo-6807016.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
			"https://images.pexels.com/photos/6807016/pexels-photo-6807016.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", 
			"https://images.pexels.com/photos/6807016/pexels-photo-6807016.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
			"https://images.pexels.com/photos/6807016/pexels-photo-6807016.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", 
			"https://images.pexels.com/photos/6807016/pexels-photo-6807016.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
		];

		const textureCube = new THREE.CubeTextureLoader().load( urls);

		scene.background = textureCube;*/

    // stars

    const rad = 50, starsGeometry = [ new THREE.BufferGeometry(), new THREE.BufferGeometry() ];

    const vertices1 = [];
    const vertices2 = [];

    const vertex = new THREE.Vector3();

    for ( let i = 0; i < 250; i ++ ) {

        vertex.x = Math.random() * 2 - 1;
        vertex.y = Math.random() * 2 - 1;
        vertex.z = Math.random() * 2 - 1;
        vertex.multiplyScalar( rad );

        vertices1.push( vertex.x, vertex.y, vertex.z );

    }

    for ( let i = 0; i < 1500; i ++ ) {

        vertex.x = Math.random() * 2 - 1;
        vertex.y = Math.random() * 2 - 1;
        vertex.z = Math.random() * 2 - 1;
        vertex.multiplyScalar( rad );

        vertices2.push( vertex.x, vertex.y, vertex.z );

    }

    starsGeometry[ 0 ].setAttribute( 'position', new THREE.Float32BufferAttribute( vertices1, 3 ) );
    starsGeometry[ 1 ].setAttribute( 'position', new THREE.Float32BufferAttribute( vertices2, 3 ) );

    const starsMaterials = [
        new THREE.PointsMaterial( { color: 0x555555, size: 2.5, sizeAttenuation: false } ),
        new THREE.PointsMaterial( { color: 0x555555, size: 1, sizeAttenuation: false } ),
        new THREE.PointsMaterial( { color: 0x333333, size: 2, sizeAttenuation: false } ),
        new THREE.PointsMaterial( { color: 0x3a3a3a, size: 1, sizeAttenuation: false } ),
        new THREE.PointsMaterial( { color: 0x1a1a1a, size: 2, sizeAttenuation: false } ),
        new THREE.PointsMaterial( { color: 0x1a1a1a, size: 1, sizeAttenuation: false } )
    ];

    for ( let i = 10; i < 30; i ++ ) {

        const stars = new THREE.Points( starsGeometry[ i % 2 ], starsMaterials[ i % 6 ] );

        stars.rotation.x = Math.random() * 6;
        stars.rotation.y = Math.random() * 6;
        stars.rotation.z = Math.random() * 6;
        stars.scale.setScalar( i * 10 );

        stars.matrixAutoUpdate = false;
        stars.updateMatrix();

        scene.add( stars );

    }
    
	///////////////////////////////////////////////////////////////////////////////////////

    // LIGHTS 
    /*var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
    keyLight.position.set(-100, 0, 100);
    var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
    fillLight.position.set(100., 0., 100.);
    var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
    backLight.position.set(100., 0., -100.).normalize();*/
    color= new THREE.Color( 0, 1, 0 );
    
    dirLight = new THREE.DirectionalLight( 0xffffff );
    dirLight.position.set( 0, 200, 700 );
    scene.add( dirLight );
    // SCENE HIERARCHY
    textureFlare0 = textureLoader.load( "textures/lensflare/hexangle.png" );
    textureFlare1 = textureLoader.load( "textures/lensflare/lensflare0.png" );
    textureFlare2 = textureLoader.load( "textures/lensflare/lensflare3.png" );
    const lensflare = new Lensflare();
    lensflare.addElement( new LensflareElement( textureFlare0, 512, 0,color) );
    lensflare.addElement( new LensflareElement( textureFlare1, 512, 0 ) );
    lensflare.addElement( new LensflareElement( textureFlare2, 60, 1 ) );
    dirLight.add( lensflare );
    
   /* scene.add(keyLight);
    scene.add(fillLight);
    scene.add(backLight);*/

    // GUI
    gui = new dat.GUI();
    gui.domElement.id = 'gui';
    gui.hide();

    

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
        Hom: function() {
           console.log("d=0");
           d=1;
        },
        sun: function() {
            console.log("sun");
            color= new THREE.Color( "rgb(51, 75, 255)" );
            mesh16.material.color =new THREE.Color( color );
            dirLight.clear();
            const lensflare2 = new Lensflare();
            lensflare2.addElement( new LensflareElement( textureFlare0, 512, 0,color) );
            lensflare2.addElement( new LensflareElement( textureFlare1, 512, 0,color ) );
            lensflare2.addElement( new LensflareElement( textureFlare2, 60, 1 ) );
            dirLight.add( lensflare2 );
        },
        sun2: function() {
            console.log("sun");
            color= new THREE.Color( "rgb(150, 221, 243)" );
            mesh16.material.color =new THREE.Color( color );
            dirLight.clear();
            const lensflare3 = new Lensflare();
            lensflare3.addElement( new LensflareElement( textureFlare0, 512, 0,color) );
            lensflare3.addElement( new LensflareElement( textureFlare1, 512, 0,color ) );
            lensflare3.addElement( new LensflareElement( textureFlare2, 60, 1,color ) );
            dirLight.add( lensflare3 );
        },
        sun3: function() {
            console.log("sun");
            color= new THREE.Color( "rgb(255, 255, 255)" );
            mesh16.material.color =new THREE.Color( color );
            dirLight.clear();
            const lensflare4 = new Lensflare();
            lensflare4.addElement( new LensflareElement( textureFlare0, 512, 0,color) );
            lensflare4.addElement( new LensflareElement( textureFlare1, 512, 0,color ) );
            lensflare4.addElement( new LensflareElement( textureFlare2, 60, 1,color ) );
            dirLight.add( lensflare4 );
        },
        sun4: function() {
            console.log("sun");
            color= new THREE.Color( "rgb(252, 250, 137)" );
            mesh16.material.color =new THREE.Color( color );
            dirLight.clear();
            const lensflare5 = new Lensflare();
            lensflare5.addElement( new LensflareElement( textureFlare0, 512, 0,color) );
            lensflare5.addElement( new LensflareElement( textureFlare1, 512, 0 ) );
            lensflare5.addElement( new LensflareElement( textureFlare2, 60, 1 ) );
            dirLight.add( lensflare5 );
        },
        sun5: function() {
            console.log("sun");
            color= new THREE.Color( "rgb(255, 251, 0)" );
            mesh16.material.color =new THREE.Color( color );
            dirLight.clear();
            const lensflare6 = new Lensflare();
            lensflare6.addElement( new LensflareElement( textureFlare0, 512, 0,color) );
            lensflare6.addElement( new LensflareElement( textureFlare1, 512, 0 ) );
            lensflare6.addElement( new LensflareElement( textureFlare2, 60, 1 ) );
            dirLight.add( lensflare6 );
        },
        sun6: function() {
            console.log("sun");
            color= new THREE.Color( "rgb(255, 131, 0)" );
            mesh16.material.color =new THREE.Color( color );
            dirLight.clear();
            const lensflare7 = new Lensflare();
            lensflare7.addElement( new LensflareElement( textureFlare0, 512, 0,color) );
            lensflare7.addElement( new LensflareElement( textureFlare1, 512, 0 ) );
            lensflare7.addElement( new LensflareElement( textureFlare2, 60, 1 ) );
            dirLight.add( lensflare7 );
        },
        sun7: function() {
            console.log("sun");
            color= new THREE.Color( "rgb(255, 0, 0)" );
            mesh16.material.color =new THREE.Color( color );
            dirLight.clear();
            const lensflare8 = new Lensflare();
            lensflare8.addElement( new LensflareElement( textureFlare0, 512, 0,color) );
            lensflare8.addElement( new LensflareElement( textureFlare1, 512, 0 ) );
            lensflare8.addElement( new LensflareElement( textureFlare2, 60, 1 ) );
            dirLight.add( lensflare8 );
        },
        speed: {
            d: 2
        },
        listColors: ["White", "Red", "Yellow"],
        defaultItem: "White",
    };
   
    gui.add(params, "play").name("ORBIT").listen().onChange(function(value) {
       

   });
   gui.add(params, "stop").name("STOP").listen().onChange(function(value) {
       

   });
    gui.add(params.speed, 'd', 1, 15).name("Speed").listen().onChange(function(value) {
        d=value;
    });
    gui.add(params, "Hom").name("normal").onChange(function(event) {

    });

    // GUI2
    gui2 = new dat.GUI();
    gui2.domElement.id = 'gui2';
    gui2.hide();
    
    let tempMenu = gui2.addFolder("Temperaturas de superficie");
    gui2.add(params, "sun").name("30.000 - 60.000 K").listen().onChange(function(value) { 
    });
    gui2.add(params, "sun3").name("7.500 - 30.000 K").listen().onChange(function(value) { 
    });
    gui2.add(params, "sun4").name("6.000 - 7.500 K").listen().onChange(function(value) { 
    });
    gui2.add(params, "sun5").name("5.000 - 6.000 K").listen().onChange(function(value) { 
    });
    gui2.add(params, "sun6").name("3.500 - 5.000K").listen().onChange(function(value) { 
    });
    gui2.add(params, "sun7").name("< 3.500 K").listen().onChange(function(value) { 
    });
    gui2.open();
    // SETUP STATS
    stats = new Stats();
    stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(stats.dom);

    // DRAW SCENE IN A RENDER LOOP (ANIMATION)
    // postprocessing
    composer = new EffectComposer( renderer );
    renderLoop();
}


function renderLoop() {
    stats.begin();
    if(!multiview) {
        gui.hide();
        gui2.hide();
        // CAMERA 1 (PERSPECTIVE VIEW)
        camera1.aspect = window.innerWidth / window.innerHeight;
        camera1.updateProjectionMatrix();
        renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
        renderer.setScissor(0, 0, window.innerWidth, window.innerHeight);
        renderer.render(scene, camera1); // DRAW SCENE
    }
    else {
        gui.show();
        gui2.show();
        let t=window.innerWidth/2+window.innerWidth/4;
      // CAMERA 1 (PERSPECTIVE VIEW)
      camera1.aspect = t / window.innerHeight;
      camera1.updateProjectionMatrix();
      renderer.setViewport(0, 0, t, window.innerHeight);
      renderer.setScissor(0, 0, t, window.innerHeight);
      renderer.render(scene, camera1); // DRAW SCENE
      
      // CAMERA 2 (TOP VIEW)
      camera2.aspect = window.innerWidth / window.innerHeight;
      camera2.lookAt(dirLight.position);  
      camera2.updateProjectionMatrix();
      renderer.setViewport(t, window.innerHeight/4, window.innerWidth/4, window.innerHeight/4);
      renderer.setScissor(t, window.innerHeight/4, window.innerWidth/4, window.innerHeight/4);
      
      renderer.render(scene, camera2); // DRAW SCENE
      
       // CAMERA 4 (rigth VIEW)
       camera4.aspect = window.innerWidth / window.innerHeight;
       camera4.lookAt(mesh2.position); 
       camera4.zoom=3;
       camera4.updateProjectionMatrix();
       renderer.setViewport(t, window.innerHeight/2+ window.innerHeight/4, window.innerWidth/4, window.innerHeight/4);
       renderer.setScissor(t, window.innerHeight/2+ window.innerHeight/4, window.innerWidth/4, window.innerHeight/4);
       renderer.render(scene, camera4); // DRAW SCENE
    }
    updateScene();
    stats.end();
    stats.update();
    
    requestAnimationFrame(renderLoop);
    
}

function updateScene() {
    if(entra){
         r = r + .05*d * Math.PI / 180;
         mesh2.position.x = 130 * Math.sin( r );
         mesh2.position.z = 130 * Math.cos( r );
         render();
     }
 }
// EVENT LISTENERS & HANDLERS

function render() {

    // rotate the planet and clouds
    const delta = clock.getDelta();

    meshPlanet.rotation.y += rotationSpeed * delta*d;
    meshClouds.rotation.y += 1.25 * rotationSpeed * delta*d;

    composer.render( delta );

}

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