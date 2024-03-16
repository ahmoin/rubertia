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
}

const Box: React.FC<BoxProps> = ({ position, color }) => {
  return (
    <mesh position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
};

function App() {
  const boxes: { position: [number, number, number]; color: string }[] = [];

  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        boxes.push({ position: [x, y, z], color: randomColor });
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
      {boxes.map((box, index) => (
        <Box key={index} position={box.position} color={box.color} />
      ))}
    </Canvas>
  );
}

export default App;
