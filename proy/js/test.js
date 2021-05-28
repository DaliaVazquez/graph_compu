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


"use strict";

        let renderer, scene, camera, cameraControls, mesh, mesh1, mesh2, mesh3,mesh4, stats, gui, num_fig;

        function init() {
            // RENDERER ENGINE
            renderer = new THREE.WebGLRenderer({antialias: true});
            renderer.setClearColor(new THREE.Color(0, 0, 0,));
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);
            num_fig=0;

            // SCENE
            scene = new THREE.Scene();
            createMenub()
            // CAMERA
            let fov = 60;
            let aspect = window.innerWidth / window.innerHeight;
            let near = 0.1;
            let far = 10000;
            camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
            camera.position.set(0, 0, 8);
            cameraControls = new OrbitControls(camera, renderer.domElement);

            // MODELS
            let geometry = new THREE.PlaneGeometry( 15, 15, 10,10 );
            let material = new THREE.MeshBasicMaterial({color: "purple", wireframe: true,side: THREE.DoubleSide, opacity: 0.5,
            transparent: true,
            visible:false});
            
            mesh1 = meshs(geometry, material,"plano");
            mesh1.rotation.x = 90 * Math.PI / 180;

            // SCENE GRAPH
            scene.add(mesh1);

            // GUI
            gui = new dat.GUI();

            // model
            let model1 = modelos(mesh1);
            
            // objet Menu
            let CubelMenu = gui.addFolder("General Menu");
            let params2 = {
                listColors: ["White", "Red", "Yellow"],
                defaultItem: "White",
               
               
            }
            gui.add(params2, "defaultItem", params2.listColors).name("Color List").onChange(function(item) {
                mesh1.material.color = new THREE.Color(params2.defaultItem.toLowerCase());
            });
            menu_general(CubelMenu,mesh1,model1);

            //rotMenu.open();
            gui.close()
            
            // STATS
            stats = new Stats();
            stats.showPanel(0); // FPS
            document.body.appendChild(stats.dom);

            // ANIMATION
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
            //mesh.rotation.y = mesh.rotation.y + 1 * Math.PI / 180;
        }
        function createMenub() {
            const b_piramide = document.getElementById( "b_piramide" );
            const b_diamante = document.getElementById( "b_diamante" );
            const b_espejo= document.getElementById( "b_espejo" );
            const b_casita= document.getElementById( "b_casita" );
            const b_trapecio= document.getElementById( "b_trapecio" );
            const b_corazon= document.getElementById( "b_corazon" );
            const b_zorro= document.getElementById( "b_zorro" );
            const b_mesa= document.getElementById( "b_mesa" );
            const b_arcade= document.getElementById( "b_arcade" );
            const b_estrella= document.getElementById( "b_estrella" );

            b_piramide.addEventListener( 'click', function () {
                num_fig++;
                crea(piramide(), ": piramide");
            } );
            b_diamante.addEventListener( 'click', function () {
                num_fig++;
                crea(diamante(), ": diamante");
            } );
            b_espejo.addEventListener( 'click', function () {
                num_fig++;
                crea(espejo(), ": silla");
            } );
            
            b_casita.addEventListener( 'click', function () {
                num_fig++;
                crea(casita(), ": casita");
            } );
 
            b_trapecio.addEventListener( 'click', function () {
                num_fig++;
                crea(trapecio(), ": trapecio");
            } );
            b_corazon.addEventListener( 'click', function () {
                num_fig++;
                crea(corazon(), ": corazon");
            } );
            b_zorro.addEventListener( 'click', function () {
                num_fig++;
                crea(zorro(), ": zorro");
            } );
            b_mesa.addEventListener( 'click', function () {
                num_fig++;
                crea(mesa(), ": mesa");
            } );
            b_arcade.addEventListener( 'click', function () {
                num_fig++;
                crea(arcade(), ": arcade");
            } );
            
            b_estrella.addEventListener( 'click', function () {
                num_fig++;
                crea(estrella(), ": estrella");
            } );
        }
        function crea(figura, nombre) {
            let meshfig=figura;
            scene.add(meshfig);
            let modelfig = modelos(meshfig);
            let figMenu = gui.addFolder("figura num "+num_fig+nombre);
            menu(figMenu,meshfig,modelfig);
        }
        function piramide() {
            var pts = [
                new THREE.Vector3(0.5, 0.5, 0.5),
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(0, 0, 1),
                new THREE.Vector3(1, 0, 1),
                new THREE.Vector3(1, 0, 0),
            ];
            let geometry =  new THREE.BufferGeometry().setFromPoints(pts);
            geometry.setIndex([
                0, 1, 2,
                0, 2, 3, 
                0, 3, 4,
                0, 4, 1,
                1, 3, 2,
                1, 4, 3,

            ]);

            geometry.computeVertexNormals();
            let material = new THREE.MeshBasicMaterial({color: "purple", wireframe: true, opacity: 0.5,
            transparent: true});
            let mesh = new THREE.Mesh(geometry, material);
            mesh.name = "piramide";
            return mesh;
        }
        function diamante() {
            var pts = [new THREE.Vector3(0.5,0.5,0.5), 
                        new THREE.Vector3(0,0,0), 
                        new THREE.Vector3(0,0,1), 
                        new THREE.Vector3(1,0,1), 
                        new THREE.Vector3(1,0,0),
                        new THREE.Vector3(0.5,-0.5,0.5)];

            let geometry = new THREE.BufferGeometry().setFromPoints(pts);

            geometry.setIndex([0,1,2,0,2,3,0,3,4,0,4,1,1,3,2,1,4,3,5,2,1,5,4,3,5,3,2,5,1,4]);

            geometry.computeVertexNormals();

            let material = new THREE.MeshBasicMaterial({color: "green", wireframe: true, opacity: 0.5,transparent: true});

            let mesh = new THREE.Mesh(geometry, material);

            mesh.name = "diamante";
            return mesh;
        }
        function estaca() { 
           var pts = [
              new THREE.Vector3(0.1, 0.1, 0.1),
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(0, 0, 0.1),
                new THREE.Vector3(1, 0, 1),
                new THREE.Vector3(1, 0, 1),
            ];
            let geometry =  new THREE.BufferGeometry().setFromPoints(pts);
            geometry.setIndex([
                0, 1, 2,
                1, 2, 3, 
                0, 3, 4,
                0, 4, 1,
                1, 3, 2,
                1, 4, 3,

            ]);

            geometry.computeVertexNormals();
            let material = new THREE.MeshBasicMaterial({color: "red", wireframe: true, opacity: 0.5,transparent: true});
            let mesh = new THREE.Mesh(geometry, material);
            mesh.name = "estaca";
            return mesh;
        }
        function casita() { 
            var pts = [new THREE.Vector3(0.5,0.5,0.5), 
                        new THREE.Vector3(0,0,0), 
                        new THREE.Vector3(0,0,1), 
                        new THREE.Vector3(1,0,1), 
                        new THREE.Vector3(1,0,0),
                        new THREE.Vector3(0,-1,0),
                        new THREE.Vector3(0,-1,1),
                        new THREE.Vector3(1,-1,1),
                        new THREE.Vector3(1,-1,0)];

            let geometry = new THREE.BufferGeometry().setFromPoints(pts);

            geometry.setIndex([0,1,2,0,2,3,0,3,4,0,4,1,1,3,2,1,4,3  ,6,3,2,6,7,3,7,8,3,8,4,3,8,5,4,5,1,4,5,6,1,6,2,1, 8,7,6,6,5,8]);

            geometry.computeVertexNormals();

            let material = new THREE.MeshBasicMaterial({color: "green", wireframe: true, opacity: 0.5,transparent: true});

            let mesh = new THREE.Mesh(geometry, material);

            mesh.name = "casita";
            return mesh;
        }

        function corazon() { 
            var pts = [
                new THREE.Vector3(0, 3, 0),
                new THREE.Vector3(1, 4, 0),
                new THREE.Vector3(2, 3, 0),
                new THREE.Vector3(3, 4, 0),
                new THREE.Vector3(4, 3, 0),
                new THREE.Vector3(2, 1, 0),
                new THREE.Vector3(2, 3, 0.6),
                new THREE.Vector3(2, 3, -0.6),

                
            ];
            let geometry =  new THREE.BufferGeometry().setFromPoints(pts);
            geometry.setIndex([
                0, 1, 2,
                2, 3, 4, 
                0, 4, 5,

                2, 1, 6, 
                3,2, 6,


                6, 1, 0,
                6, 0, 5, 
                
                6, 5, 4,
                6, 4, 3, 

                2, 1, 7, 
                3,2, 7,


                7, 1, 0,
                7, 0, 5, 
                
                7, 5, 4,
                7, 4, 3, 


                
                
            ]);

            geometry.computeVertexNormals();
            let material =  new THREE.MeshBasicMaterial({color: "rgb(255, 51, 125)", wireframe: true, opacity: 0.5,
            transparent: true});
            let mesh = new THREE.Mesh(geometry, material);
            mesh.name = "corazon";
            return mesh;
        }

        function zorro() { 
             var pts = [
                new THREE.Vector3(0, 2, 0),
                new THREE.Vector3(1, 3, 0),
                new THREE.Vector3(2, 2, 0),
                new THREE.Vector3(3, 3, 0),
                new THREE.Vector3(4, 2, 0),
                new THREE.Vector3(2, 0.5, 0),
                new THREE.Vector3(2, 2, 2),

                
            ];
            let geometry =  new THREE.BufferGeometry().setFromPoints(pts);
            geometry.setIndex([
                0, 1, 2,
                2, 3, 4, 
                0, 4, 5,

                2, 1, 6, 
                3,2, 6,


                6, 1, 0,
                6, 0, 5, 
                
                6, 5, 4,
                6, 4, 3, 
                
                
            ]);

            geometry.computeVertexNormals();
            let material =  new THREE.MeshBasicMaterial({color: "rgb(252, 109, 38)", wireframe: true, opacity: 0.5,
            transparent: true});
            let mesh = new THREE.Mesh(geometry, material);
            mesh.name = "zorro";
	        return mesh;
        }
        function trapecio() { 
            var pts = [new THREE.Vector3(0.5,0,0.5),
                    new THREE.Vector3(0.5,0,-0.5),
                    new THREE.Vector3(-0.5,0,-0.5),
                    new THREE.Vector3(-0.5,0,0.5),
                    new THREE.Vector3(1,-1,1),
                    new THREE.Vector3(1,-1,-1),
                    new THREE.Vector3(-1,-1,-1),
                    new THREE.Vector3(-1,-1,1)];

            let geometry = new THREE.BufferGeometry().setFromPoints(pts);

            geometry.setIndex([1,2,0,2,3,0, 4,0,3,7,4,3, 2,1,6,1,5,6, 3,2,7,7,2,6, 1,0,4,1,4,5, 6,5,4,6,4,7]);

            geometry.computeVertexNormals();

            let material = new THREE.MeshBasicMaterial({color: "green", wireframe: true, opacity: 0.5,transparent: true});

            let mesh = new THREE.Mesh(geometry, material);

            mesh.name = "trapecio";
	        return mesh;
        }

        function mesa() { 
            var pts = [new THREE.Vector3(0,0,0), //0
            new THREE.Vector3(0,0,3),  //1
            new THREE.Vector3(4,0,3),  //2
            new THREE.Vector3(4,0,0),  //3 
            new THREE.Vector3(0,1,0), //4
            new THREE.Vector3(0,1,3),  //5
            new THREE.Vector3(4,1,0),  //6
            new THREE.Vector3(4,1,3),  //7
            new THREE.Vector3(0,-4,0),  //8
            new THREE.Vector3(1,-4,0),  //9 
            new THREE.Vector3(0,-4,3),  //10
            new THREE.Vector3(1,-4,3),  //11
            new THREE.Vector3(1,0,3),  //12
            new THREE.Vector3(1,0,0),  //13
            new THREE.Vector3(3,-4,0),  //14
            new THREE.Vector3(4,-4,0),  //15
            new THREE.Vector3(3,-4,3),  //16
            new THREE.Vector3(4,-4,3),  //17
            new THREE.Vector3(3,0,3),  //18
            new THREE.Vector3(3,0,0)  //19
            ];

            let geometry = new THREE.BufferGeometry().setFromPoints(pts);


            geometry.setIndex([4,0,1,4,1,5,  5,6,4,7,6,5  ,6,2,3,2,6,7,  4,6,0,6,3,0, 5,1,7,7,1,2,  0,2,1,0,3,2 
            ,8,10,0,0,10,1,  13,9,8,13,8,0,  13,11,9,13,12,11,  12,1,11,1,10,11,  8,9,11,8,11,10,
            15,14,3,14,19,3,   17,15,3,17,3,2,  16,17,2,16,2,18, 14,16,19,19,16,18,  14,15,17,14,17,16]);

            geometry.computeVertexNormals();

            let material = new THREE.MeshBasicMaterial({color: "green", wireframe: true, opacity: 0.5,transparent: true});

            let mesh = new THREE.Mesh(geometry, material);

            mesh.name = "mesa";
	        return mesh;
        }

        function arcade() { 
               var pts = [
                new THREE.Vector3(0, 1, 0),
                new THREE.Vector3(1, 1, 0),
                new THREE.Vector3(1, 2, 0),
                new THREE.Vector3(0, 2, 0),
                new THREE.Vector3(0, 2, -0.5),//4
                new THREE.Vector3(1, 2, -0.5),//5
                new THREE.Vector3(1, 1, -0.5),
                new THREE.Vector3(0, 1, -0.5),
                
                new THREE.Vector3(0, 2, -1),//8
                new THREE.Vector3(1, 2, -1),//9

                new THREE.Vector3(1, 1.5, -0.5),//10
                
                new THREE.Vector3(0, 1.5, -0.5),//11



                
                
            ];
            let geometry =  new THREE.BufferGeometry().setFromPoints(pts);
            geometry.setIndex([
                
                0,2, 3, 
                0, 1, 2,

                3, 2, 4, 
                4, 2, 5,

                3, 4, 7, 
                3, 7, 0,
                
                7, 1, 0,
                7, 6, 1,

                2, 1, 6,
                2, 6, 5,

                
                9,8,5,
                4,5,8,

                5,10,9,
                4,8,11,

                8,10,11,
                8,9,10,
               
                10,6,11,
                6,7,11

                
                
            ]);

            geometry.computeVertexNormals();
            let material =  new THREE.MeshBasicMaterial({color: "rgb(51, 255, 207)", wireframe: true, opacity: 0.5,
            transparent: true});
            let mesh = new THREE.Mesh(geometry, material);
            mesh.name = "arcade";
            return mesh;
        }
        function espejo() { 
            var pts = [
                new THREE.Vector3(0, 1, 0),
                new THREE.Vector3(1, 1, 0),
                new THREE.Vector3(1, 2, 0),
                new THREE.Vector3(0, 2, 0),
                new THREE.Vector3(0, 2, -0.5),//4
                new THREE.Vector3(1, 2, -0.5),//5
                new THREE.Vector3(1, 1, -0.5),
                new THREE.Vector3(0, 1, -0.5),
                
                new THREE.Vector3(0, 2, -1),//8
                new THREE.Vector3(1, 2, -1),//9

                new THREE.Vector3(1, 1.5, -0.5),//10
                
                new THREE.Vector3(0, 1.5, -0.5),//11 

                new THREE.Vector3(0, 3, 0),//12
                new THREE.Vector3(1, 3, 0),//13


                
                
            ];
            let geometry =  new THREE.BufferGeometry().setFromPoints(pts);
            geometry.setIndex([
                
                0,2, 3, 
                0, 1, 2,

                3, 2, 4, 
                4, 2, 5,

                3, 4, 7, 
                3, 7, 0,
                
                7, 1, 0,
                7, 6, 1,

                2, 1, 6,
                2, 6, 5,

                
                9,8,5,
                4,5,8,

                5,10,9,
                4,8,11,

                8,10,11,
                8,9,10,
               
                10,6,11,
                6,7,11,


                
                12,2,13,
                12,3,2,

                13,2,5,
                12,4,3,

                13,5,4,
                12,13,4
                



                
                
            ]);

            geometry.computeVertexNormals();
            let material =  new THREE.MeshBasicMaterial({color: "rgb(129, 255, 51)", wireframe: true, opacity: 0.5,
            transparent: true});
            let mesh = new THREE.Mesh(geometry, material);
            mesh.name = "silla";
            return mesh;
        }
        
        function estrella() { 
            var pts = [new THREE.Vector3(0,0,0), //0
            new THREE.Vector3(0,0,1),  //1
            new THREE.Vector3(1,0,0),  //2
            new THREE.Vector3(1,0,1),  //3 
            new THREE.Vector3(0,1,0), //4
            new THREE.Vector3(0,1,1),  //5
            new THREE.Vector3(1,1,0),  //6
            new THREE.Vector3(1,1,1),  //7
            new THREE.Vector3(0.5,1.5,0.5),  //8
            new THREE.Vector3(-0.5,0.5,0.5),  //9 
            new THREE.Vector3(0.5,-0.5,0.5),  //10
            new THREE.Vector3(1.5,0.5,0.5),  //11
            new THREE.Vector3(.5,.5,1.5),  //12
            new THREE.Vector3(.5,0.5,-0.5),  //13
            ];


            let geometry = new THREE.BufferGeometry().setFromPoints(pts);

            geometry.setIndex([5,4,9,4,0,9,0,1,9,1,5,9,
            7,3,11,3,2,11,2,6,11,6,7,11,
            3,1,10,1,0,10,0,2,10,2,3,10,
            5,7,8,7,6,8,6,4,8,4,5,8,
            1,3,12,3,7,12,7,5,12,5,1,12,
            2,0,13,0,4,13,4,6,13,6,2,13]);

            geometry.computeVertexNormals();

            let material = new THREE.MeshBasicMaterial({color: "green", wireframe: true, opacity: 0.5,transparent: true});

            let mesh = new THREE.Mesh(geometry, material);

            mesh.name = "estrella";

            return mesh;
        }

        function meshs(geometry3, material3, name) {
            let creaMesh = new THREE.Mesh(geometry3, material3);
            creaMesh.name = name;
            return creaMesh;
        }

        function modelos(mesh) {
            let model = {
                rotY: mesh.rotation.y * Math.PI / 180,
                rotX: mesh.rotation.x * Math.PI / 180,
                rotZ: mesh.rotation.z * Math.PI / 180,
                posHomeX: function() {
                    mesh.position.x = 0;
                },
                posHomeY: function() {
                    mesh.position.y = 0;
                },
                posHomeZ: function() {
                    mesh.position.z = 0;
                },
                rotHomeY: function() {
                    model.rotY = 0;
                    mesh.rotation.y = 0;
                },
                rotHomeX: function() {
                    model.rotX = 0;
                    mesh.rotation.x = 0;
                },
                rotHomeZ: function() {
                    model.rotZ = 0;
                    mesh.rotation.z = 0;
                },
                
                listColors: ["White", "Red", "Yellow"],
                defaultItem: "White",
                colorPalette: [1, 1, 1],
                opacity: 0.5,
               
            }
            return model;
        }
        function menu_general(objMenu,mesh,model) {// General Info Menu
            let generalMenu = objMenu.addFolder("General Info Menu");
            let txfMeshName = generalMenu.add(mesh, "name").name("Model's Name")
            .onChange(function(event) {

            }).onFinishChange(function(event) {

            });

            const parameters = {
                colorPalette: [1, 1, 1],
                opacity: 0.50,
                visible:false,
            };
            let fondo=generalMenu.addColor( parameters, "colorPalette").name("Fondo").listen().onChange(function(color) {
                renderer.setClearColor(new THREE.Color(color[0]/255, color[1]/255, color[2]/255));
            });
            // Appearance Menu
            let appearMenu = objMenu.addFolder("Plano Appearance Menu");
            let chbWireframe = appearMenu.add(mesh.material, "wireframe").setValue(true).name("Wireframe").onChange(function(value) {

            });
            let visible = appearMenu.add(mesh.material, "visible").setValue(true).name("visible").onChange(function(value) {

            });
            let listColors = appearMenu.add(model, "defaultItem", model.listColors).name("Color List").onChange(function(item) {
                mesh.material.color = new THREE.Color(model.defaultItem.toLowerCase());
                model.colorPalette = [mesh.material.color.r * 255, mesh.material.color.g * 255, mesh.material.color.b * 255];
            });

            let transparencia=appearMenu.add( parameters, "opacity", 0, 1, 0.01 ).name("transparencia").onChange(function() {
                mesh.material.opacity = parameters.opacity;
            });

            let colorPalette = appearMenu.addColor(model, "colorPalette").name("Color Palette").listen().onChange(function(color) {
                mesh.material.color = new THREE.Color(color[0]/255, color[1]/255, color[2]/255);
            });
            
        }
        function menu(objMenu,mesh,model) {// General Info Menu
            let generalMenu = objMenu.addFolder("General Info Menu");
            let txfMeshName = generalMenu.add(mesh, "name").name("Model's Name")
            .onChange(function(event) {

            }).onFinishChange(function(event) {

            });
            
            // Position Menu
            let positionMenu = objMenu.addFolder("Model's Position Menu");
            let sliderPosX = positionMenu.add(mesh.position, "x").min(-5).max(5).step(0.5).setValue(0).name("X").listen().onChange(function(value) {
            
            });
            let btnPosHomeX = positionMenu.add(model, "posHomeX").name("HOME").onChange(function(event) {

            });
            let sliderPosY = positionMenu.add(mesh.position, "y").min(-5).max(5).step(0.5).setValue(0).name("Y").listen().onChange(function(value) {
            
            });
            let btnPosHomeY = positionMenu.add(model, "posHomeY").name("HOME").onChange(function(event) {

            });
            let sliderPosZ = positionMenu.add(mesh.position, "z").min(-5).max(5).step(0.5).setValue(0).name("Z").listen().onChange(function(value) {
            
            });
            let btnPosHomeZ = positionMenu.add(model, "posHomeZ").name("HOME").onChange(function(event) {

            });
            // Orientation Menu
            let rotMenu = objMenu.addFolder("Model's Rotation Menu");
            let sliderRotY = rotMenu.add(model, "rotY").min(-180).max(180).step(10).setValue(0).name("Y (deg)").listen().onChange(function(value) {
                mesh.rotation.y = model.rotY * Math.PI / 180;
            });;
            let btnRotHomeY = rotMenu.add(model, "rotHomeY").name("HOME").onChange(function(event) {

            });

            let sliderRotX = rotMenu.add(model, "rotX").min(-180).max(180).step(10).setValue(0).name("X (deg)").listen().onChange(function(value) {
                mesh.rotation.x = model.rotX * Math.PI / 180;
            });;
            let btnRotHomeX = rotMenu.add(model, "rotHomeX").name("HOME").onChange(function(event) {

            });

            let sliderRotZ = rotMenu.add(model, "rotZ").min(-180).max(180).step(10).setValue(0).name("Z (deg)").listen().onChange(function(value) {
                mesh.rotation.z = model.rotZ * Math.PI / 180;
            });;

            let btnRotHomeZ = rotMenu.add(model, "rotHomeZ").name("HOME").onChange(function(event) {

            });
            

            // Appearance Menu
            let appearMenu = objMenu.addFolder("Model's Appearance Menu");
            let chbWireframe = appearMenu.add(mesh.material, "wireframe").setValue(true).name("Wireframe").onChange(function(value) {

            });
            let listColors = appearMenu.add(model, "defaultItem", model.listColors).name("Color List").onChange(function(item) {
                mesh.material.color = new THREE.Color(model.defaultItem.toLowerCase());
                //model.colorPalette = [mesh.material.color.r * 255, mesh.material.color.g * 255, mesh.material.color.b * 255];
            });
            const parameters = {
                opacity: 0.50
            };

            let transparencia=appearMenu.add( parameters, "opacity", 0, 1, 0.01 ).name("transparencia").onChange(function() {
                mesh.material.opacity = parameters.opacity;
            });
            let colorPalette = appearMenu.addColor(model, "colorPalette").name("Color Palette").listen().onChange(function(color) {
                mesh.material.color = new THREE.Color(color[0]/255, color[1]/255, color[2]/255);
            });

            
        }

        // EVENT LISTENERS & HANDLERS
        document.addEventListener("DOMContentLoaded", init);

        window.addEventListener("resize", function() {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        });