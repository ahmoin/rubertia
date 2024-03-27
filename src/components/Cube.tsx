import React from "react";
import * as THREE from "three";
import Square from "./Square";

interface CubeProps {
  position: THREE.Vector3;
  colors: THREE.Color[];
}

const Cube: React.FC<CubeProps> = ({ position, colors }) => {
  return (
    <group position={position}>
      <Square
        position={new THREE.Vector3(0, 0, 0.5)}
        rotation={new THREE.Euler()}
        color={colors[0]}
      />
      <Square
        position={new THREE.Vector3(0, 0, -0.5)}
        rotation={new THREE.Euler(0, Math.PI, 0)}
        color={colors[1]}
      />
      <Square
        position={new THREE.Vector3(0, 0.5, 0)}
        rotation={new THREE.Euler(-Math.PI / 2, 0, 0)}
        color={colors[2]}
      />
      <Square
        position={new THREE.Vector3(0, -0.5, 0)}
        rotation={new THREE.Euler(Math.PI / 2, 0, 0)}
        color={colors[3]}
      />
      <Square
        position={new THREE.Vector3(0.5, 0, 0)}
        rotation={new THREE.Euler(0, Math.PI / 2, 0)}
        color={colors[4]}
      />
      <Square
        position={new THREE.Vector3(-0.5, 0, 0)}
        rotation={new THREE.Euler(0, -Math.PI / 2, 0)}
        color={colors[5]}
      />
    </group>
  );
};

export default Cube;
