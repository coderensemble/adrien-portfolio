// components/InteractiveSphere.tsx
import { Canvas } from "@react-three/fiber";
import { ExplodingStar } from "./ExplodingStar";

export const ThreeScene = () => {
  return (
    <Canvas
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
      }}
      camera={{ position: [0, 0, 15], fov: 70 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <ExplodingStar />
    </Canvas>
  );
};
