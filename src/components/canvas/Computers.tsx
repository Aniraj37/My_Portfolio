import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber"; // --- Simply an empty canvas that allows you to play around ---
import { OrbitControls, Preload, SpotLight, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";

// - this function focuses on building threeJS model
const Computers = ({ isMobile }: {isMobile: boolean}) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");
  return (
    // --- For 3d Models always use mesh ---
    <mesh>
      <hemisphereLight intensity={1.5} groundColor="#1f1" />
      <pointLight intensity={5} />
      <SpotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <primitive
        object={computer.scene}
        scale={isMobile ? 50 : 60}
        position={isMobile ? [0, -3, -2] : [0.4, -2.8, -1.5]}
        // rotation={[-0.01, -0.2, -0.1]}
        rotation={[0.07, 0.5, -0.02]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {

  const [isMobile, setIsMobile] = useState(false)

  
  useEffect(() => {
    // -- Add a listener for changes to the screen size --

    const mediaQuery = window.matchMedia('(max-width: 500px)');
    
    // -- Set the initial value of the 'isMobile' state value --
    setIsMobile(mediaQuery.matches);

    // -- Define a callback function to handle changes to media query --
    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    }

    // -- Add the callback function as a Listener for changes to the media query -- 
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    // -- Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    }

  })
  
  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}>
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile = {isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};
export default ComputersCanvas;
