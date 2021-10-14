import React, { useEffect, useRef, useState, useReducer } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui';
import Header from './Header.jsx';
import HeroInfo from './HeroInfo.jsx'
import Homepage from './Homepage.jsx'


export default function App() {
  const [page, setPage] = useState(true);
  const [hero, setHero] = useState('Spider-Man')
  const [lightbulb, setlightbulb] = useState(true);
  const [helper, setHelper] = useState(true)
  const modelRef = useRef();
  const ambientRef = useRef({});
  const ambientTwoRef = useRef({});
  const helperRef = useRef({});
  const sceneRef = useRef();
  const groupRef = useRef();
  const groupTwoRef = useRef();
  const cameraRef = useRef();

  const renderSpiderMan = () => {
    setHero('Spider-Man')
    sceneRef.current.remove(groupTwoRef.current)
    sceneRef.current.add(groupRef.current)
    cameraRef.current.position.set(0, .05, .179)
  }

  const renderSpiderGwen = () => {
    setHero('Spider-Gwen')
    sceneRef.current.remove(groupRef.current)
    sceneRef.current.add(groupTwoRef.current)
    cameraRef.current.position.set(0, 390, 550)
  }

  const handlePage = () => {
    setPage(false)
  }

  const toggleHelperOn = () => {
    setHelper(!helper)
    sceneRef.current.add(helperRef.current.helperOne);
    sceneRef.current.add(helperRef.current.helperTwo);
    sceneRef.current.add(helperRef.current.helperThree);
  }

  const toggleHelperOff = () => {
    setHelper(!helper)
    sceneRef.current.remove(helperRef.current.helperOne);
    sceneRef.current.remove(helperRef.current.helperTwo);
    sceneRef.current.remove(helperRef.current.helperThree);
  }



  const toggleLightOff = () => {
    setlightbulb(!lightbulb)
    ambientRef.current.ambient.intensity = 0;
    ambientRef.current.lightOne.intensity = 0;
    ambientRef.current.lightTwo.intensity = 0;
    ambientRef.current.lightThree.intensity = 0;
    ambientTwoRef.current.ambient.intensity = 0;
    ambientTwoRef.current.lightOne.intensity = 0;
    ambientTwoRef.current.lightTwo.intensity = 0;
    ambientTwoRef.current.lightThree.intensity = 0;
  }

  const toggleLightOn = () => {
    setlightbulb(!lightbulb)
    ambientRef.current.ambient.intensity = .85;
    ambientRef.current.lightOne.intensity = 3;
    ambientRef.current.lightTwo.intensity = 7;
    ambientRef.current.lightThree.intensity = 6;
    ambientTwoRef.current.ambient.intensity = .85;
    ambientTwoRef.current.lightOne.intensity = 3;
    ambientTwoRef.current.lightTwo.intensity = 7;
    ambientTwoRef.current.lightThree.intensity = 6;
  }

  const renderGwenModel = (ambient, lightOne, lightTwo, lightThree) => {
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.environment = new THREE.Color(0xFFFFFF)
    const camera = new THREE.PerspectiveCamera(75, modelRef.current.clientWidth / modelRef.current.clientHeight, 0.1, 10000);
    cameraRef.current = camera;


    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor( 0x000000, 0 );
    renderer.setSize( modelRef.current.clientWidth, modelRef.current.clientHeight );
    renderer.setPixelRatio(window.devicePixelRatio * 2);

    modelRef.current.appendChild( renderer.domElement );

    const group = new THREE.Group()
    groupRef.current = group;

    const groupTwo = new THREE.Group()
    groupTwoRef.current = groupTwo;

    const loader = new GLTFLoader();

    const loader2 = new GLTFLoader();

    loader2.load(
      // resource URL
      'spider_gwen/scene.gltf',
      // called when the resource is loaded
      function (gltf) {
        gltf.scene.translateY(.01) // morales
        groupTwo.add(gltf.scene)
      },
      // called while loading is progressing
      function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      // called when loading has errors
      function (error) {
        console.log( 'An error happened' );
      }
    );


    loader.load(
      // resource URL
      'miles_morales/scene.gltf',
      // called when the resource is loaded
      function (gltf) {
        gltf.scene.translateY(.01) // morales
        group.add(gltf.scene)
      },
      // called while loading is progressing
      function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      // called when loading has errors
      function (error) {
        console.log( 'An error happened' );
      }
    );
    const color = 0xFFFFFF;
    const intensity = 5;

    // Spider-Gwen Lighting

    let light = new THREE.PointLight(color, 3);
    ambientRef.current.lightOne = light;

    const helper = new THREE.PointLightHelper( light, 30);
    helperRef.current.helperOne = helper;

    light.position.set(5, 50, -10);


    let light2 = new THREE.PointLight(color, 7);
    ambientRef.current.lightTwo = light2;

    const helper2 = new THREE.PointLightHelper( light2, 30);
    helperRef.current.helperTwo = helper2;

    light2.position.set(5, 240, 5);

    let light3 = new THREE.PointLight(color, 6);
    ambientRef.current.lightThree = light3

    const helper3 = new THREE.PointLightHelper( light3, 30);
    helperRef.current.helperThree = helper3;

    light3.position.set(5, 250, -500);


    const ambientLight = new THREE.AmbientLight(0xFFFFFF);
    ambientLight.intensity = .85;
    ambientRef.current.ambient = ambientLight;


    groupTwo.add(light, light2, light3, ambientLight)

    // Spider-Man Lighting

    let lightSpider = new THREE.PointLight(color, 3);
    ambientTwoRef.current.lightOne = lightSpider

    lightSpider.position.set(5, 50, -10);

    let light2Spider = new THREE.PointLight(color, 7);
    ambientTwoRef.current.lightTwo = light2Spider

    light2Spider.position.set(5, 240, 5);

    let light3Spider = new THREE.PointLight(color, 6);
    ambientTwoRef.current.lightThree = light3Spider

    light3Spider.position.set(5, 250, -500);


    const ambientLightSpider = new THREE.AmbientLight(0xFFFFFF);
    ambientTwoRef.current.ambient = ambientLightSpider
    ambientLightSpider.intensity = .85;


    group.add(lightSpider, light2Spider, light3Spider, ambientLightSpider);

    scene.add(group);

    const controls = new OrbitControls( camera, renderer.domElement );
    // camera.position.set(0, 390, 550); // Spider-Gwen Camera
    camera.position.set(0, .05, .179); // Miles Morales Camera

    window.addEventListener( 'resize', onWindowResize, false );

    function onWindowResize(){

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

    }


    const animate = function () {
      requestAnimationFrame( animate );

      group.rotateY(0.01);
      groupTwo.rotateY(0.01);

      controls.update();
      renderer.render( scene, camera );
    };

    animate();
  }

  useEffect(() => {
    renderGwenModel()
  }, []);

  return (
    <>
      <Header pageStatus={page}
        toggleLightOn={toggleLightOn}
        toggleLightOff={toggleLightOff}
        lightbulb={lightbulb}
        helper={helper}
        toggleHelperOff={toggleHelperOff}
        toggleHelperOn={toggleHelperOn}
        renderSpiderGwen={renderSpiderGwen}
        renderSpiderMan={renderSpiderMan}
        hero={hero}
        />
      <Homepage pageStatus={page} handlePage={handlePage}/>
      <div style={!page ? {width: '100vw', height:'100vh', position: 'fixed',
      transitionProperty: 'opacity', transitionDuration: '2s',
      backgroundImage: 'url(./background.png)', backgroundRepeat:'no-repeat', backgroundSize: 'cover'} :
      {width: '100vw', height:'100vh', opacity: '0'}} ref={modelRef}>
      <HeroInfo hero={hero}/>
      </div>
    </>
  )
}