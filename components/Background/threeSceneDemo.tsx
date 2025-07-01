import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import { Mesh, MeshStandardMaterial } from 'three';


const InteractiveSphere = () => {
  const sphereRef = useRef<Mesh>(null);
  // position cible normalisée de la souris (-0.5 à 0.5)
  const targetRotation = useRef({ x: -0.5, y: 0.5 });
  // rotation courante pour interpolation
  const currentRotation = useRef({ x: -1, y: 1 });

  useEffect(() => {
  const handleMouseMove = (event: MouseEvent) => {
    targetRotation.current.x = (event.clientY / window.innerHeight - 0.5) * Math.PI;
    targetRotation.current.y = (event.clientX / window.innerWidth - 0.5) * Math.PI;
  };
  window.addEventListener('mousemove', handleMouseMove, { capture: true });
  return () => window.removeEventListener('mousemove', handleMouseMove, { capture: true });
}, []);


  useFrame(({clock}) => {
  if (!sphereRef.current) return;

  // Rotation automatique constante (exemple : rotation autour de z)
const t = clock.getElapsedTime();

  // Exemple : couleur arc-en-ciel en fonction du temps
  const r = 0.5 + 0.5 * Math.sin(t);
  const g = 0.5 + 0.5 * Math.sin(t + 2);
  const b = 0.5 + 0.5 * Math.sin(t + 4);

const material = sphereRef.current.material as MeshStandardMaterial;
  material.color.setRGB(r, g, b);


  const lerpAmount = 0.1;
  currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * lerpAmount;
  currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * lerpAmount;

  sphereRef.current.rotation.x = currentRotation.current.x;
  sphereRef.current.rotation.y = currentRotation.current.y;
});


  return (
    <mesh ref={sphereRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial color="royalblue" />
    </mesh>
  );
};

export const ThreeScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} />
      <InteractiveSphere />
      <OrbitControls/>
    </Canvas>
  );
};
