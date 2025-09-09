import { Sphere, Sparkles, MeshDistortMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import { Mesh } from "three";

export default function ExplodingStar() {
  const meshRef = useRef<Mesh>(null);
  const [xPosition, setXPosition] = useState(8); // position X par défaut

  // Mettre à jour la position X selon la taille de l'écran
  useEffect(() => {
    const updatePosition = () => {
      const width = window.innerWidth;

      if (width < 640) {
        // mobile (sm)
        setXPosition(2);
      } else if (width < 1024) {
        // tablette (md)
        setXPosition(6);
      } else {
        // desktop (lg et +)
        setXPosition(10);
      }
    };

    updatePosition(); // initial
    window.addEventListener("resize", updatePosition);

    return () => window.removeEventListener("resize", updatePosition);
  }, []);

  // Rotation cible à atteindre
  const targetRotation = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  // Rotation actuelle (interpolée)
  const currentRotation = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normaliser entre -1 et 1
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;
      const maxRotation = 0.5;

      targetRotation.current.x = y * maxRotation; // rotation X (haut/bas)
      targetRotation.current.y = x * maxRotation; // rotation Y (gauche/droite)
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;

    currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.1;
    currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.1;

    meshRef.current.rotation.x = currentRotation.current.x;
    meshRef.current.rotation.y = currentRotation.current.y;
    meshRef.current.rotation.z += 0.001;
  });

  return (
    // Retirer la div ici
    <Sphere ref={meshRef} args={[1.4, 10, 128]} position={[xPosition, 9, 0]}>
      <MeshDistortMaterial
        color="#2A7B9B"
        distort={1.5}
        speed={0.5}
        roughness={0.2}
        emissive="#57C785"
        emissiveIntensity={1}
        metalness={0.1}
        transparent
        opacity={0.2}
        depthWrite={false}
      />
      <Sparkles count={50} scale={5} size={0.2} speed={1.5} color="#EDDD53" />
    </Sphere>
  );
};
