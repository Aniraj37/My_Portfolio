import { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import CanvasLoader from "../Loader";

// Floating animation wrapper with upward shift
const FloatingGroup = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.position.y = 0.15 + Math.sin(t * 0.5) * 0.015; // Throttled floating
  });

  return (
    <group ref={ref} rotation={[0, Math.PI * 1.25, 0]}>
      {children}
    </group>
  );
};

const SafeModel = ({
  modelPath,
  position,
  rotation = [0, 0, 0],
  scale,
}: {
  modelPath: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale: number;
}) => {
  const { scene } = useGLTF(modelPath);
  return (
    <group position={position} rotation={rotation}>
      <primitive object={scene} scale={scale} />
    </group>
  );
};

const FloatingAstronautLaptop = ({ isMobile }: { isMobile: boolean }) => {
const astronautPos: [number, number, number] = isMobile ? [0, -1.0, 0] : [0, -1.1, 0]; 
  const laptopPos: [number, number, number] = isMobile ? [0.3, 0.0, 0.8] : [0.2, 0., 0.85];

  return (
    <FloatingGroup>
      <SafeModel
        modelPath="/models/astronaut.glb"
        position={astronautPos}
        scale={isMobile ? 0.38 : 0.45}
      />
      <SafeModel
        modelPath="/models/laptop.glb"
        position={laptopPos}
        rotation={[0, Math.PI, -0.1]}
        scale={isMobile ? 0.0033 : 0.0035} 
      />
    </FloatingGroup>
  );
};

const Scene = ({ isMobile }: { isMobile: boolean }) => (
  <group>
    <hemisphereLight intensity={1} groundColor="#1f1f1f" />
    <ambientLight intensity={0.5} />
    <pointLight position={[0, 3, 3]} intensity={1.2} />
    <FloatingAstronautLaptop isMobile={isMobile} />
  </group>
);

const ComputersCanvas = ({ cameraPosition = [0, 0.2, 4.5] as [number, number, number] }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [frameLoop, setFrameLoop] = useState<"always" | "demand">("always");
  const [showCanvas, setShowCanvas] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowCanvas(true);
      setTimeout(() => setFrameLoop("demand"), 2000);
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  return showCanvas ? (
    <Canvas
      style={{ display: "block", height: "100%", width: "100%" }}
      dpr={[1, 1.5]}
      frameloop={frameLoop}
      shadows={false}
      camera={{ position: cameraPosition, fov: 30 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
        <Scene isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  ) : null;
};

export default ComputersCanvas;
