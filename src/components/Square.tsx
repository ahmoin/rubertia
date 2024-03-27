import React from "react";
import * as THREE from "three";

interface SquareProps {
  position: THREE.Vector3;
  rotation: THREE.Euler;
  color: THREE.Color;
}

const Square: React.FC<SquareProps> = ({ position, rotation, color }) => {
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
        <meshStandardMaterial metalness={0} roughness={0} color={color} />
      </mesh>
      <mesh position={new THREE.Vector3(0, 0, -0.01)}>
        <shapeGeometry args={[squareShape]} />
        <meshStandardMaterial
          metalness={0}
          roughness={0}
          color="black"
          side={THREE.FrontSide}
        />
      </mesh>
    </group>
  );
};

export default Square;
