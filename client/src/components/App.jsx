import React, { useEffect, useRef, useState, useReducer } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui';
import Header from './Header.jsx';
import GwenInfo from './GwenInfo.jsx'
import Homepage from './Homepage.jsx'


export default function App() {
  const [page, setPage] = useState(true);
  const [lightbulb, setlightbulb] = useState(true);
  const modelRef = useRef();
  const ambientRef = useRef({});

  const handlePage = () => {
    setPage(false)
  }

  const toggleLightOff = () => {
    setlightbulb(!lightbulb)
    ambientRef.current.ambient.intensity = 0;
    ambientRef.current.lightOne.intensity = 0;
    ambientRef.current.lightTwo.intensity = 0;
    ambientRef.current.lightThree.intensity = 0;
  }

  const toggleLightOn = () => {
    setlightbulb(!lightbulb)
    ambientRef.current.ambient.intensity = .85;
    ambientRef.current.lightOne.intensity = 3;
    ambientRef.current.lightTwo.intensity = 7;
    ambientRef.current.lightThree.intensity = 6;
  }

  const renderGwenModel = (ambient, lightOne, lightTwo, lightThree) => {
    const scene = new THREE.Scene();
    scene.environment = new THREE.Color(0xFFFFFF)
    const camera = new THREE.PerspectiveCamera(75, modelRef.current.clientWidth / modelRef.current.clientHeight, 0.1, 10000);


    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor( 0x000000, 0 );
    renderer.setSize( modelRef.current.clientWidth, modelRef.current.clientHeight );
    renderer.setPixelRatio(window.devicePixelRatio * 2);

    modelRef.current.appendChild( renderer.domElement );

    const group = new THREE.Group()

    const loader = new GLTFLoader();


    loader.load(
      // resource URL
      'spider_gwen/scene.gltf',
      // called when the resource is loaded
      function ( gltf ) {

        group.add(gltf.scene)

        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Group
        gltf.scenes; // Array<THREE.Group>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object

      },
      // called while loading is progressing
      function ( xhr ) {

        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

      },
      // called when loading has errors
      function ( error ) {

        console.log( 'An error happened' );

      }
    );
    const color = 0xFFFFFF;
    const intensity = 5;

    let light = new THREE.PointLight(color, 3);
    ambientRef.current.lightOne = light
    // const helper = new THREE.PointLightHelper( light, 30);
    light.position.set(5, 50, -10);

    let light2 = new THREE.PointLight(color, 7);
    ambientRef.current.lightTwo = light2
    // const helper2 = new THREE.PointLightHelper( light2, 30);
    light2.position.set(5, 240, 5);

    let light3 = new THREE.PointLight(color, 6);
    ambientRef.current.lightThree = light3
    // const helper3 = new THREE.PointLightHelper( light3, 30);
    light3.position.set(5, 250, -500);


    const ambientLight = new THREE.AmbientLight(0xFFFFFF);
    ambientLight.intensity = .85;
    ambientRef.current.ambient = ambientLight;


    group.add(light, light2, light3, ambientLight);

    scene.add(group);

    const controls = new OrbitControls( camera, renderer.domElement );
    camera.position.set( 0, 390, 550 );

    window.addEventListener( 'resize', onWindowResize, false );

    function onWindowResize(){

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

    }


    const animate = function () {
      requestAnimationFrame( animate );

      group.rotateY(0.01);

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
      <Header pageStatus={page} toggleLightOn={toggleLightOn} toggleLightOff={toggleLightOff} lightbulb={lightbulb} />
      <Homepage pageStatus={page} handlePage={handlePage}/>
      <div style={!page ? {width: '100vw', height:'100vh', position: 'fixed',
      transitionProperty: 'opacity', transitionDuration: '2s',
      backgroundImage: 'url(./background.png)', backgroundRepeat:'no-repeat', backgroundSize: 'cover'} :
      {width: '100vw', height:'100vh', opacity: '0'}} ref={modelRef}>
      <GwenInfo />
      </div>
    </>
  )
}