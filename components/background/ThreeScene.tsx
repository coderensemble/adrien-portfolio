// src/components/ThreeScene.tsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import { Mesh } from 'three';

export const ThreeScene = () => {
  const cubeRef = useRef<Mesh>(null!);

  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} />
      
      <mesh ref={cubeRef} rotation={[0.4, 0.2, 0]}>
        <boxGeometry />
        <meshStandardMaterial color="royalblue" />
      </mesh>

      <OrbitControls />
    </Canvas>
  );
};
