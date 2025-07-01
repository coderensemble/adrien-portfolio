import React, { useEffect, useRef, useContext } from "react";
import {
  Vector2,
  SRGBColorSpace,
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  DirectionalLight,
  AmbientLight,
  IUniform,
  UniformsUtils,
  UniformsLib,
  MeshPhongMaterial,
  SphereGeometry,
  Mesh,
} from "three";
import { motion, useMotionValue, useSpring } from "framer-motion";
import innerHeight from "ios-inner-height";
import vertShader from "./sphereVertShader";
import fragShader from "./sphereFragShader";
import { usePrefersReducedMotion } from "../Background/usePrefersReducedMotion";
import { useInViewport } from "../Background/useInViewport";
import { media, rgbToThreeColor } from "../Background/style";
import { cleanScene, removeLights, cleanRenderer } from "../Background/three";
import { ThemeContext } from "../../theme/ThemeProvider";

type Props = React.ComponentPropsWithoutRef<"canvas">;

const DisplacementSphere: React.FC<Props> = (props) => {
  const { theme } = useContext(ThemeContext);
  const rgbBackground = theme === "light" ? "250 250 250" : "17 17 17";

  const width = useRef<number>(0);
  const height = useRef<number>(0);

  const start = useRef<number>(Date.now());
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef<Vector2>(new Vector2(0.8, 0.5));
  const renderer = useRef<WebGLRenderer>(null);
  const camera = useRef<PerspectiveCamera>(null);
  const scene = useRef<Scene>(null);
  const lights = useRef<(DirectionalLight | AmbientLight)[]>(null);
  const uniforms = useRef<Record<string, IUniform<number>> | null>(null);
  const material = useRef<MeshPhongMaterial>(null);
  const geometry = useRef<SphereGeometry>(null);
  const sphere = useRef<Mesh>(null);

  // Hooks framer-motion pour gérer la rotation animée en X et Y
  const rotationX = useMotionValue(0);
  const rotationY = useMotionValue(0);

  // Application d’un ressort à la valeur de rotation pour fluidifier l’animation
  const springX = useSpring(rotationX, { stiffness: 30, damping: 20, mass: 2 });
  const springY = useSpring(rotationY, { stiffness: 30, damping: 20, mass: 2 });

  // Hooks personnalisés pour détecter la préférence de mouvement et si le canvas est visible à l'écran
  const prefersReducedMotion = usePrefersReducedMotion();
  const isInViewport = useInViewport(canvasRef);

  // Initialisation de la scène three.js, caméra, renderer, matériau, géométrie, etc.
  useEffect(() => {
    if (typeof window === "undefined") return;

    width.current = window.innerWidth;
    height.current = window.innerHeight;
    start.current = Date.now();
    mouse.current = new Vector2(0.8, 0.5);

    renderer.current = new WebGLRenderer({
      canvas: canvasRef.current!,
      powerPreference: "high-performance",
    });

    renderer.current.setSize(width.current, height.current);
    renderer.current.setPixelRatio(1);
    renderer.current.outputColorSpace = SRGBColorSpace;

    camera.current = new PerspectiveCamera(55, width.current / height.current, 0.1, 200);
    camera.current.position.z = 52;

    scene.current = new Scene();

    material.current = new MeshPhongMaterial();
    material.current.onBeforeCompile = (shader) => {
      uniforms.current = UniformsUtils.merge([
        UniformsLib.common,
        UniformsLib.lights,
        shader.uniforms,
        { time: { value: 0 } },
      ]);

      shader.uniforms = uniforms.current;
      shader.vertexShader = vertShader;
      shader.fragmentShader = fragShader;
    };

    geometry.current = new SphereGeometry(32, 160, 128);
    sphere.current = new Mesh(geometry.current, material.current);
    sphere.current.position.z = 0;
    scene.current.add(sphere.current);

    return () => {
      cleanScene(scene.current!);
      cleanRenderer(renderer.current!);
    };
  }, []);

  // Configuration des lumières et fond selon le thème
  useEffect(() => {
    const dirLight = new DirectionalLight(rgbToThreeColor("0 250 0"), 0.6);
    const ambientLight = new AmbientLight(rgbToThreeColor("250 10 110"), theme === "light" ? 0.95 : 0.4);

    dirLight.position.set(100, 100, 200);

    lights.current = [dirLight, ambientLight];
    scene.current!.background = rgbToThreeColor(rgbBackground);
    lights.current.forEach((light) => scene.current!.add(light));

    return () => {
      removeLights(lights.current!);
    };
  }, [rgbBackground, theme]);

  // Gestion du redimensionnement de la fenêtre et adaptation du canvas
  useEffect(() => {
    const handleResize = () => {
      const canvasHeight = innerHeight();
      const windowWidth = window.innerWidth;
      const fullHeight = canvasHeight + canvasHeight * 0.3;

      if (canvasRef.current) {
        canvasRef.current.style.height = `${fullHeight}px`;
      }

      renderer.current?.setSize(windowWidth, fullHeight);
      if (camera.current) {
        camera.current.aspect = windowWidth / fullHeight;
        camera.current.updateProjectionMatrix();
      }

      if (prefersReducedMotion) {
        renderer.current?.render(scene.current!, camera.current!);
      }

      if (!sphere.current) return;

      if (windowWidth <= media.mobile) {
        sphere.current.position.set(14, 10, 0);
      } else if (windowWidth <= media.tablet) {
        sphere.current.position.set(18, 14, 0);
      } else {
        sphere.current.position.set(22, 16, 0);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [prefersReducedMotion]);

  // Synchronisation des rotations de la sphère avec les valeurs animées framer-motion
  // et gestion du mouvement de la souris
  useEffect(() => {
    if (!sphere.current) return;

    // Mise à jour de la rotation X selon la valeur springX
    const unsubscribeX = springX.onChange((x) => {
      if (sphere.current) sphere.current.rotation.x = x;
    });

    // Mise à jour de la rotation Y selon la valeur springY
    const unsubscribeY = springY.onChange((y) => {
      if (sphere.current) sphere.current.rotation.y = y;
    });

    // Handler pour mettre à jour rotationX et rotationY au mouvement de la souris
    const onMouseMove = (event: MouseEvent) => {
      const posX = event.clientX / window.innerWidth / 2; // Divisé par 2 pour limiter la rotation max
      const posY = event.clientY / window.innerHeight / 2;

      rotationX.set(posY);
      rotationY.set(posX);
    };

    // Ajoute l’event listener seulement si pas de réduction du mouvement et si visible
    if (!prefersReducedMotion && isInViewport) {
      window.addEventListener("mousemove", onMouseMove);
    }

    // Cleanup à la suppression du composant ou changement d’état
    return () => {
      unsubscribeX();
      unsubscribeY();
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [prefersReducedMotion, isInViewport, rotationX, rotationY, springX, springY]);

  // Animation de la scène (mise à jour du temps dans le shader et rotation continue)
  useEffect(() => {
    let animation: number;

    const animate = () => {
      animation = requestAnimationFrame(animate);

      if (uniforms.current) {
        uniforms.current.time.value = 0.00005 * (Date.now() - start.current);
      }

      if (sphere.current) {
        sphere.current.rotation.z += 0.001; // Rotation continue sur Z
      }

      renderer.current?.render(scene.current!, camera.current!);
    };

    // Lancement de l’animation uniquement si l’animation n’est pas réduite et que l’élément est visible
    if (!prefersReducedMotion && isInViewport) {
      animate();
    } else {
      // Sinon, rendu statique
      renderer.current?.render(scene.current!, camera.current!);
    }

    // Nettoyage de l’animation à la suppression du composant
    return () => {
      cancelAnimationFrame(animation);
    };
  }, [prefersReducedMotion, isInViewport]);

// On extrait les props d'événements de drag incompatibles
const { onDrag, onDragEnd, onDragStart, ...restProps } = props;

  // Rendu du canvas avec animation de l’opacité
  return (
    <motion.canvas
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 3, ease: [0.4, 0.0, 0.2, 1] }}
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen z-[-1]"
      {...restProps} // on ne transmet plus onDrag ni onDragEnd ni onDragStart
    />
  );
};

export default DisplacementSphere;
