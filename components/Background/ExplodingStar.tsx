import { Sphere, Sparkles, MeshDistortMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { Mesh } from "three";

export const ExplodingStar = () => {
  const meshRef = useRef<Mesh>(null); // Remplacer 'null!' par le type approprié();

  // Rotation cible à atteindre
  const targetRotation = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  // Rotation actuelle (interpolée)
  const currentRotation = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normaliser entre -1 et 1
      const x = (event.clientX / window.innerWidth) * 2 - 1; // -1 à 1
      const y = (event.clientY / window.innerHeight) * 2 - 1; // -1 à 1

      // Multiplier par amplitude de rotation souhaitée (radians)
      const maxRotation = 0.5;

      targetRotation.current.x = y * maxRotation; // rotation X (haut/bas)
      targetRotation.current.y = x * maxRotation; // rotation Y (gauche/droite)
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;

    // Interpolation pour un mouvement fluide
    currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.1;
    currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.1;

    // Appliquer la rotation sur la mesh
    meshRef.current.rotation.x = currentRotation.current.x;
    meshRef.current.rotation.y = currentRotation.current.y;

    // Rotation continue lente autour de Z
    meshRef.current.rotation.z += 0.001;
  });

  return (
    <Sphere ref={meshRef} args={[2.5, 128, 128]} position={[10, 3.5, 0]}>
      <MeshDistortMaterial
        color="#2A7B9B"
        attach="material"
        distort={2}
        speed={1.5}
        roughness={0.2}
        emissive="#57C785"
        emissiveIntensity={1}
        metalness={0.1}
        transparent={true} // <- activer la transparence
        opacity={0.2} // <- réduire l’opacité (0 = invisible, 1 = opaque)
        depthWrite={false}
      />
      <Sparkles count={50} scale={5} size={0.2} speed={1.5} color="#EDDD53" />
    </Sphere>
  );
};
