import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

const sizes = {
  width: "100vw",
  height: "100vh",
};

interface SquareProps {
  position: THREE.Vector3;
  color: THREE.Color;
  rotation: THREE.Euler;
}

interface CubeProps {
  position: THREE.Vector3;
  colors: THREE.Color[];
}

const Square: React.FC<SquareProps> = ({ position, color, rotation }) => {
  const squareShape = new THREE.Shape();
  const x = 0,
    y = 0;
  squareShape.moveTo(x - 0.4, y + 0.5);

  squareShape.lineTo(x + 0.4, y + 0.5);
  squareShape.bezierCurveTo(
    x + 0.5,
    y + 0.5,
    x + 0.5,
    y + 0.5,
    x + 0.5,
    y + 0.4
  );

  squareShape.lineTo(x + 0.5, y - 0.4);
  squareShape.bezierCurveTo(
    x + 0.5,
    y - 0.5,
    x + 0.5,
    y - 0.5,
    x + 0.4,
    y - 0.5
  );

  squareShape.lineTo(x - 0.4, y - 0.5);
  squareShape.bezierCurveTo(
    x - 0.5,
    y - 0.5,
    x - 0.5,
    y - 0.5,
    x - 0.5,
    y - 0.4
  );

  squareShape.lineTo(x - 0.5, y + 0.4);
  squareShape.bezierCurveTo(
    x - 0.5,
    y + 0.5,
    x - 0.5,
    y + 0.5,
    x - 0.4,
    y + 0.5
  );

  return (
    <group position={position} rotation={rotation}>
      <mesh scale={new THREE.Vector3(0.9, 0.9, 0.9)}>
        <shapeGeometry args={[squareShape]} />
        <meshStandardMaterial attach="material" color={color} />
      </mesh>
      <mesh position={new THREE.Vector3(0, 0, -0.01)}>
        <shapeGeometry args={[squareShape]} />
        <meshBasicMaterial
          attach="material"
          color="black"
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

const Cube: React.FC<CubeProps> = ({ position, colors }) => {
  return (
    <group position={position}>
      <Square
        position={new THREE.Vector3(0, 0, 0.5)}
        color={colors[0]}
        rotation={new THREE.Euler()}
      />
      <Square
        position={new THREE.Vector3(0, 0, -0.5)}
        color={colors[1]}
        rotation={new THREE.Euler(0, Math.PI, 0)}
      />
      <Square
        position={new THREE.Vector3(0, 0.5, 0)}
        color={colors[2]}
        rotation={new THREE.Euler(-Math.PI / 2, 0, 0)}
      />
      <Square
        position={new THREE.Vector3(0, -0.5, 0)}
        color={colors[3]}
        rotation={new THREE.Euler(Math.PI / 2, 0, 0)}
      />
      <Square
        position={new THREE.Vector3(0.5, 0, 0)}
        color={colors[4]}
        rotation={new THREE.Euler(0, Math.PI / 2, 0)}
      />
      <Square
        position={new THREE.Vector3(-0.5, 0, 0)}
        color={colors[5]}
        rotation={new THREE.Euler(0, -Math.PI / 2, 0)}
      />
    </group>
  );
};

function App() {
  const settings = {
    Shuffle: function () {
      console.log("Shuffle");
    },
  };
  const gui = new GUI();
  gui.add(settings, "Shuffle");

  const rubiksColors: THREE.Color[][][] = [
    [
      [
        new THREE.Color("green"),
        new THREE.Color("blue"),
        new THREE.Color("black"),
        new THREE.Color("yellow"),
        new THREE.Color("black"),
        new THREE.Color("orange"),
      ],
      [
        new THREE.Color("green"),
        new THREE.Color("blue"),
        new THREE.Color("black"),
        new THREE.Color("black"),
        new THREE.Color("black"),
        new THREE.Color("orange"),
      ],
      [
        new THREE.Color("green"),
        new THREE.Color("blue"),
        new THREE.Color("white"),
        new THREE.Color("black"),
        new THREE.Color("black"),
        new THREE.Color("orange"),
      ],
    ],
    [
      [
        new THREE.Color("green"),
        new THREE.Color("blue"),
        new THREE.Color("black"),
        new THREE.Color("yellow"),
        new THREE.Color("black"),
        new THREE.Color("black"),
      ],
      [
        new THREE.Color("green"),
        new THREE.Color("blue"),
        new THREE.Color("black"),
        new THREE.Color("black"),
        new THREE.Color("black"),
        new THREE.Color("black"),
      ],
      [
        new THREE.Color("green"),
        new THREE.Color("blue"),
        new THREE.Color("white"),
        new THREE.Color("black"),
        new THREE.Color("black"),
        new THREE.Color("black"),
      ],
    ],
    [
      [
        new THREE.Color("green"),
        new THREE.Color("blue"),
        new THREE.Color("black"),
        new THREE.Color("yellow"),
        new THREE.Color("red"),
        new THREE.Color("black"),
      ],
      [
        new THREE.Color("green"),
        new THREE.Color("blue"),
        new THREE.Color("black"),
        new THREE.Color("black"),
        new THREE.Color("red"),
        new THREE.Color("black"),
      ],
      [
        new THREE.Color("green"),
        new THREE.Color("blue"),
        new THREE.Color("white"),
        new THREE.Color("black"),
        new THREE.Color("red"),
        new THREE.Color("black"),
      ],
    ],
  ];

  const rubiksSize = 3;

  const rubiksCubes: CubeProps[] = [];

  for (let x = 0; x < rubiksSize; x++) {
    for (let y = 0; y < rubiksSize; y++) {
      for (let z = 0; z < rubiksSize; z++) {
        const colors = rubiksColors[x][y];
        let position = new THREE.Vector3(
          x - Math.floor(rubiksSize / 2),
          y - Math.floor(rubiksSize / 2),
          z - Math.floor(rubiksSize / 2)
        );
        rubiksCubes.push({ colors, position });
      }
    }
  }

  return (
    <Canvas
      style={{ width: sizes.width, height: sizes.height }}
      gl={{ alpha: false }}
      camera={{
        position: [0, 3, 4],
        fov: 75,
      }}
    >
      <OrbitControls />
      <ambientLight />
      {rubiksCubes.map((cube, index) => (
        <Cube key={index} colors={cube.colors} position={cube.position} />
      ))}
    </Canvas>
  );
}

export default App;
