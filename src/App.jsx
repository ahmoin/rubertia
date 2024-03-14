import './App.css'
import { useRef, useEffect } from 'react';
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

function App() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    
    const scene = new THREE.Scene();

    // CAMERA
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 80000);
    camera.position.set(-600, 550, 1300);

    // LIGHTS
    const ambientLight = new THREE.AmbientLight(0x7c7c7c, 3.0);

    const light = new THREE.DirectionalLight(0xFFFFFF, 3.0);
    light.position.set(0.32, 0.39, 0.7);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // CONTROLS
    const cameraControls = new OrbitControls(camera, renderer.domElement);
    cameraControls.addEventListener('change', () => renderer.render(scene, camera));

    // MATERIAL
    const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0xdc2626, flatShading: true, side: THREE.DoubleSide });

    // CUBE
    const cubeSize = 300;
    const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const cube = new THREE.Mesh(geometry, cubeMaterial);

    scene.add(cube);
    scene.add(light);
    scene.add(ambientLight);

    // EVENT HANDLERS

    function render() {
      console.log("rendering")
      renderer.render(scene, camera);
    }

    render();

    window.addEventListener('resize', () => {
      const canvasWidth = window.innerWidth;
      const canvasHeight = window.innerHeight;

      renderer.setSize(canvasWidth, canvasHeight);

      camera.aspect = canvasWidth / canvasHeight;
      camera.updateProjectionMatrix();

      render();
    });

    // CLEANUP
    return () => {
      cubeMaterial.dispose();
      renderer.dispose();
      geometry.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} />
  );
}

export default App;