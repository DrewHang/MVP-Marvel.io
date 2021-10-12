import React, { useEffect, useRef, useState } from 'react';
import Header from './Header.jsx';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GwenInfo from './GwenInfo.jsx'
import Homepage from './Homepage.jsx'
import * as dat from 'dat.gui';

export default function App() {

  const [page, setPage] = useState(true)
  const modelRef = useRef();

  const handlePage = () => {
    setPage(false)
  }

  const renderModel = () => {
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
    const light = new THREE.PointLight(color, 3);
    const helper = new THREE.PointLightHelper( light, 30);
    light.position.set(5, 50, -10);

    const light3 = new THREE.PointLight(color, 6);
    const helper3 = new THREE.PointLightHelper( light3, 30);
    light3.position.set(5, 250, -500);

    const light2 = new THREE.PointLight(color, 7);
    const helper2 = new THREE.PointLightHelper( light2, 30);
    light2.position.set(5, 240, 5);


    const ambientLight = new THREE.AmbientLight(0xFFFFFF);
    ambientLight.intensity = .85;

    group.add(light, light2, light3, helper, helper2, helper3, ambientLight);
    // group.add(ambientLight);
    scene.add(group);

    // scene.add(ambientLight)
    // scene.add(light, light2, light3);
    // scene.add( helper, helper2, helper3 );

    // camera.position.z = 500;
    // camera.position.y = 200;

    const controls = new OrbitControls( camera, renderer.domElement );
    camera.position.set( 0, 450, 550 );

    const animate = function () {
      requestAnimationFrame( animate );

      group.rotateY(0.01);

      controls.update();
      renderer.render( scene, camera );
    };

    animate();
  }

  useEffect(() => {
    renderModel()
  }, []);

  return (
    <>
      <Header />
      <Homepage pageStatus={page} handlePage={handlePage}/>
      <div style={!page ? {width: '100vw', height:'100vh', transitionProperty: 'opacity', transitionDuration: '2s'} :
      {width: '100vw', height:'100vh', opacity: '0'}} ref={modelRef}>
      <GwenInfo />
      </div>
    </>
  )
}