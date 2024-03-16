import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const sizes = {
  width: '100vw',
  height: '100vh',
};

interface BoxProps {
  position: [number, number, number];
  color: string;
  size: number;
}

const Box: React.FC<BoxProps> = ({ position, color, size }) => {
  return (
    <mesh position={position} scale={size}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color}/>
    </mesh>
  );
};

function App() {
  const rubiksColors: string[] = [
    '#FF0000',
    '#00FF00',
    '#0000FF',
  ];

  const rubiksSize = 3;
  const cubeSize = 1;

  const rubiksCubes: { position: [number, number, number]; color: string; size: number }[] = [];

  for (let x = 0; x < rubiksSize; x++) {
    for (let y = 0; y < rubiksSize; y++) {
      for (let z = 0; z < rubiksSize; z++) {
        const color = rubiksColors[y];
        rubiksCubes.push({
          position: [
            x * cubeSize,
            y * cubeSize,
            z * cubeSize,
          ],
          color: color,
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
      <directionalLight position={[3, 5, 3]} />
      {rubiksCubes.map((box, index) => (
        <Box key={index} position={box.position} color={box.color} size={box.size} />
      ))}
    </Canvas>
  );
}

export default App;
