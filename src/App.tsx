import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import Cube from "./components/Cube";

const sizes = {
  width: "100vw",
  height: "100vh",
};

interface CubeProps {
  position: THREE.Vector3;
  colors: THREE.Color[];
}

function App() {
  const rubiksRef = useRef<THREE.Group>(null);
  let spinDuration = 250;
  let isSkippingTween = false;
  let shuffleIterations = 50;

  function turnLayer(axis: THREE.Vector3, layer: number): Promise<void> {
    return new Promise<void>((resolve) => {
      if (isSkippingTween) {
        for (const tweenPlaying of TWEEN.getAll()) {
          tweenPlaying.end();
        }
        resolve();
      } else {
        if (TWEEN.getAll().length > 0) {
          resolve();
          return;
        }
      }

      const rotationDirection = Math.random() < 0.5 ? -2 : 2;

      const cubePromises: Promise<void>[] = [];

      if (rubiksRef.current && rubiksRef.current.children) {
        rubiksRef.current.children.forEach((cube) => {
          let shouldRotate = false;
          const { x, y, z } = axis;

          cube.position.round();
          switch (true) {
            case x !== 0 && cube.position.x === layer:
              shouldRotate = true;
              break;
            case y !== 0 && cube.position.y === layer:
              shouldRotate = true;
              break;
            case z !== 0 && cube.position.z === layer:
              shouldRotate = true;
              break;
            default:
              break;
          }
          if (cube && shouldRotate) {
            const start = { rotation: 0 };
            const prev = { rotation: 0 };
            const end = { rotation: Math.PI / rotationDirection };

            const rotationTween = new TWEEN.Tween(start)
              .to(end, spinDuration)
              .easing(TWEEN.Easing.Quadratic.InOut)
              .onUpdate(({ rotation }) => {
                cube.position.applyAxisAngle(axis, rotation - prev.rotation);
                cube.rotateOnWorldAxis(axis, rotation - prev.rotation);

                prev.rotation = rotation;
              });

            cubePromises.push(
              new Promise<void>((resolve) => {
                rotationTween.onComplete(() => {
                  resolve();
                });
                rotationTween.start();
              })
            );
          }
        });
      }

      Promise.all(cubePromises).then(() => {
        resolve();
      });
    });
  }

  async function shuffleCube(iterations: number): Promise<void> {
    for (let i = 0; i < iterations; i++) {
      const randomLayer = Math.random() < 0.5 ? -1 : 1;
      const randomAxis = axes[Math.floor(Math.random() * 3)];
      await turnLayer(randomAxis, randomLayer);
    }
  }

  const axes = [
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(0, 1, 0),
    new THREE.Vector3(0, 0, 1),
  ];

  const settings = {
    "Shuffle Cube": () => shuffleCube(shuffleIterations),
    "Spin Duration": spinDuration,
    "Skip Tween": isSkippingTween,
    "Shuffle Iterations": shuffleIterations,
  };

  const gui = new GUI();
  gui.add(settings, "Shuffle Cube");
  gui.add(settings, "Spin Duration", 0, 1000).onChange((value) => {
    spinDuration = value;
  });
  gui.add(settings, "Skip Tween").onChange((value) => {
    isSkippingTween = value;
  });
  gui.add(settings, "Shuffle Iterations", 0, 200, 1).onChange((value) => {
    shuffleIterations = value;
  });

  const rubiksColors: THREE.Color[][][][] = [
    [
      [
        [
          new THREE.Color(0x009e60),
          new THREE.Color(0x0051ba),
          new THREE.Color(0x000000),
          new THREE.Color(0xffd500),
          new THREE.Color(0x000000),
          new THREE.Color(0xff5800),
        ],
        [
          new THREE.Color(0x009e60),
          new THREE.Color(0x0051ba),
          new THREE.Color(0x000000),
          new THREE.Color(0xffd500),
          new THREE.Color(0x000000),
          new THREE.Color(0xff5800),
        ],
        [
          new THREE.Color(0x009e60),
          new THREE.Color(0x0051ba),
          new THREE.Color(0x000000),
          new THREE.Color(0xffd500),
          new THREE.Color(0x000000),
          new THREE.Color(0xff5800),
        ],
      ],
      [
        [
          new THREE.Color(0x009e60),
          new THREE.Color(0x0051ba),
          new THREE.Color(0x000000),
          new THREE.Color(0xffd500),
          new THREE.Color(0x000000),
          new THREE.Color(0xff5800),
        ],
        [
          new THREE.Color(0x009e60),
          new THREE.Color(0x0051ba),
          new THREE.Color(0x000000),
          new THREE.Color(0xffd500),
          new THREE.Color(0x000000),
          new THREE.Color(0xff5800),
        ],
        [
          new THREE.Color(0x009e60),
          new THREE.Color(0x0051ba),
          new THREE.Color(0x000000),
          new THREE.Color(0xffd500),
          new THREE.Color(0x000000),
          new THREE.Color(0xff5800),
        ],
      ],
      [
        [
          new THREE.Color(0x009e60),
          new THREE.Color(0x0051ba),
          new THREE.Color(0xffffff),
          new THREE.Color(0xffd500),
          new THREE.Color(0x000000),
          new THREE.Color(0xff5800),
        ],
        [
          new THREE.Color(0x009e60),
          new THREE.Color(0x0051ba),
          new THREE.Color(0xffffff),
          new THREE.Color(0xffd500),
          new THREE.Color(0x000000),
          new THREE.Color(0xff5800),
        ],
        [
          new THREE.Color(0x009e60),
          new THREE.Color(0x0051ba),
          new THREE.Color(0xffffff),
          new THREE.Color(0xffd500),
          new THREE.Color(0x000000),
          new THREE.Color(0xff5800),
        ],
      ],
    ],
    [
      [
        [
          new THREE.Color(0x009e60),
          new THREE.Color(0x0051ba),
          new THREE.Color(0x000000),
          new THREE.Color(0xffd500),
          new THREE.Color(0x000000),
          new THREE.Color(0x000000),
        ],
        [
          new THREE.Color(0x009e60),
          new THREE.Color(0x0051ba),
          new THREE.Color(0x000000),
          new THREE.Color(0xffd500),
          new THREE.Color(0x000000),
          new THREE.Color(0x000000),
        ],
        [
          new THREE.Color(0x009e60),
          new THREE.Color(0x0051ba),
          new THREE.Color(0x000000),
          new THREE.Color(0xffd500),
          new THREE.Color(0x000000),
          new THREE.Color(0x000000),
        ],
      ],
      [
        [
          new THREE.Color(0x009e60),
          new THREE.Color(0x0051ba),
          new THREE.Color(0x000000),
          new THREE.Color(0xffd500),
          new THREE.Color(0x000000),
          new THREE.Color(0x000000),
        ],
        [
          new THREE.Color(0x009e60),
          new THREE.Color(0x0051ba),
          new THREE.Color(0x000000),
          new THREE.Color(0xffd500),
          new THREE.Color(0x000000),
          new THREE.Color(0x000000),
        ],
        [
          new THREE.Color(0x009e60),
          new THREE.Color(0x0051ba),
          new THREE.Color(0x000000),
          new THREE.Color(0xffd500),
          new THREE.Color(0x000000),
          new THREE.Color(0x000000),
        ],
      ],
      [
        [
          new THREE.Color(0x009e60),
          new THREE.Color(0x0051ba),
          new THREE.Color(0xffffff),
          new THREE.Color(0xffd500),
          new THREE.Color(0x000000),
          new THREE.Color(0x000000),
        ],
        [
          new THREE.Color(0x000000),
          new THREE.Color(0x000000),
          new THREE.Color(0xffffff),
          new THREE.Color(0x000000),
          new THREE.Color(0x000000),
          new THREE.Color(0x000000),
        ],
        [
          new THREE.Color(0x009e60),
          new THREE.Color(0x0051ba),
          new THREE.Color(0xffffff),
          new THREE.Color(0xffd500),
          new THREE.Color(0x000000),
          new THREE.Color(0x000000),
        ],
      ],
    ],
    [
      [
        [
          new THREE.Color(0x009e60),
          new THREE.Color(0x0051ba),
          new THREE.Color(0x000000),
          new THREE.Color(0xffd500),
          new THREE.Color(0xc41e3a),
          new THREE.Color(0x000000),
        ],
        [
          new THREE.Color(0x009e60),
          new THREE.Color(0x0051ba),
          new THREE.Color(0x000000),
          new THREE.Color(0xffd500),
          new THREE.Color(0xc41e3a),
          new THREE.Color(0x000000),
        ],
        [
          new THREE.Color(0x009e60),
          new THREE.Color(0x0051ba),
          new THREE.Color(0x000000),
          new THREE.Color(0xffd500),
          new THREE.Color(0xc41e3a),
          new THREE.Color(0x000000),
        ],
      ],
      [
        [
          new THREE.Color(0x009e60),
          new THREE.Color(0x0051ba),
          new THREE.Color(0x000000),
          new THREE.Color(0xffd500),
          new THREE.Color(0xc41e3a),
          new THREE.Color(0x000000),
        ],
        [
          new THREE.Color(0x009e60),
          new THREE.Color(0x0051ba),
          new THREE.Color(0x000000),
          new THREE.Color(0xffd500),
          new THREE.Color(0xc41e3a),
          new THREE.Color(0x000000),
        ],
        [
          new THREE.Color(0x009e60),
          new THREE.Color(0x0051ba),
          new THREE.Color(0x000000),
          new THREE.Color(0xffd500),
          new THREE.Color(0xc41e3a),
          new THREE.Color(0x000000),
        ],
      ],
      [
        [
          new THREE.Color(0x009e60),
          new THREE.Color(0x0051ba),
          new THREE.Color(0xffffff),
          new THREE.Color(0xffd500),
          new THREE.Color(0xc41e3a),
          new THREE.Color(0x000000),
        ],
        [
          new THREE.Color(0x009e60),
          new THREE.Color(0x0051ba),
          new THREE.Color(0xffffff),
          new THREE.Color(0xffd500),
          new THREE.Color(0xc41e3a),
          new THREE.Color(0x000000),
        ],
        [
          new THREE.Color(0x009e60),
          new THREE.Color(0x0051ba),
          new THREE.Color(0xffffff),
          new THREE.Color(0xffd500),
          new THREE.Color(0xc41e3a),
          new THREE.Color(0x000000),
        ],
      ],
    ],
  ];

  const rubiksSize = 3;

  const rubiksCubes: CubeProps[] = [];

  for (let x = 0; x < rubiksSize; x++) {
    for (let y = 0; y < rubiksSize; y++) {
      for (let z = 0; z < rubiksSize; z++) {
        const colors = rubiksColors[x][y][z];
        let position = new THREE.Vector3(
          x - Math.floor(rubiksSize / 2),
          y - Math.floor(rubiksSize / 2),
          z - Math.floor(rubiksSize / 2)
        );

        rubiksCubes.push({ colors, position });
      }
    }
  }

  const anim = (t?: number) => {
    TWEEN.update(t);
    requestAnimationFrame(anim);
  };
  anim();

  return (
    <div
      style={{
        width: sizes.width,
        height: sizes.height,
        backgroundColor: "#444444",
      }}
    >
      <Canvas
        style={{ width: sizes.width, height: sizes.height }}
        camera={{
          position: [0, 3, 4],
          fov: 70,
        }}
      >
        <OrbitControls />

        <ambientLight />
        <directionalLight
          color={0xffffff}
          intensity={3}
          position={new THREE.Vector3(0, 3, 0)}
        />
        <directionalLight
          color={0xffffff}
          intensity={3}
          position={new THREE.Vector3(1, 2, 1)}
        />
        <directionalLight
          color={0xffffff}
          intensity={3}
          position={new THREE.Vector3(-1, -2, -1)}
        />
        <group ref={rubiksRef}>
          {rubiksCubes.map((cube, index) => (
            <Cube key={index} colors={cube.colors} position={cube.position} />
          ))}
        </group>
      </Canvas>
    </div>
  );
}

export default App;
