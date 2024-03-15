import React from 'react';
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

const sizes = {
  width: '100vw',
  height: '100vh',
};

const Box: React.FC = () => {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={0xff0000} />
    </mesh>
  );
};

function App() {
  return (
    <Canvas
      style={{ width: sizes.width, height: sizes.height }}
      gl={{ alpha: false }}
      camera={{
        position: [0, 0, 3],
        fov: 75,
      }}
    >
      <OrbitControls />
      <Box />
    </Canvas>
  );
}

export default App
