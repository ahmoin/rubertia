import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

const sizes = {
  width: '100vw',
  height: '100vh',
};

interface BoxProps {
  position: THREE.Vector3;
  colors: number[][][];
  size: number;
}

const Box: React.FC<BoxProps> = ({ position, colors, size }) => {
  const geometry = new THREE.BoxGeometry(size, size, size).toNonIndexed();
  const material = new THREE.MeshStandardMaterial({ vertexColors: true });

  const colorAttribute = new THREE.Float32BufferAttribute(colors.flat().flat(), 3);
  geometry.setAttribute('color', colorAttribute);

  const edges = new THREE.EdgesGeometry(geometry);
  const lineMaterial = new THREE.LineBasicMaterial({ color: '#000000' });
  const lineSegments = new THREE.LineSegments(edges, lineMaterial);

  return (
    <group position={position}>
      <mesh>
        <bufferGeometry attach="geometry" {...geometry} />
        <meshStandardMaterial attach="material" {...material} />
      </mesh>
      <primitive object={lineSegments} />
    </group>
  );
};


function App() {
  const settings = {
    'Shuffle': function () {
      console.log("Shuffle")
    },
  }
  const gui = new GUI();
  gui.add(settings, 'Shuffle');
  console.log(gui)
  
  const rubiksColors: number[][][] = [
    [[1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1]],
    [[1, 1, 0], [1, 1, 0], [1, 1, 0], [1, 1, 0], [1, 1, 0], [1, 1, 0]],
    [[1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0]],
    [[1, 0.5, 0], [1, 0.5, 0], [1, 0.5, 0], [1, 0.5, 0], [1, 0.5, 0], [1, 0.5, 0]],
    [[0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1]],
    [[0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0]],
    [[1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1]],
    [[0, 1, 0], [1, 0, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1]],
    [[1, 1, 1], [1, 1, 1], [0, 0, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1]],
    [[1, 1, 1], [1, 1, 1], [1, 1, 1], [0, 1, 0], [1, 1, 1], [1, 1, 1]],
    [[1, 0, 1], [1, 0, 0], [0, 1, 1], [1, 0, 0], [1, 0, 0], [1, 1, 1]],
    [[1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 0, 0]],
  ];

  const rubiksSize = 3;
  const cubeSize = 1;

  const rubiksCubes: { position: THREE.Vector3; colors: number[][][]; size: number }[] = [];

  for (let x = 0; x < rubiksSize; x++) {
    for (let y = 0; y < rubiksSize; y++) {
      for (let z = 0; z < rubiksSize; z++) {
        const colors = rubiksColors;
        rubiksCubes.push({
          position: new THREE.Vector3(
            x * cubeSize,
            y * cubeSize,
            z * cubeSize,
            ),
          colors: colors,
          size: cubeSize
        });
      }
    }
  }

  return (
    <Canvas
      style={{ width: sizes.width, height: sizes.height }}
      gl={{ alpha: false }}
      camera={{
        position: [5, 5, 5],
        fov: 75,
      }}
    >
      <OrbitControls />
      <ambientLight />
      {rubiksCubes.map((box, index) => (
        <Box key={index} position={box.position} colors={box.colors} size={box.size} />
      ))}
    </Canvas>
  );
}

export default App;
