"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { useGLTF, PresentationControls, OrbitControls, Center, ContactShadows } from "@react-three/drei";
import { Suspense, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { ErrorBoundary } from "react-error-boundary";

// 必须在 Canvas 内部调用 useThree，显式清除 WebGL renderer 的默认灰色清屏色
function TransparentBackground() {
    const { gl } = useThree();
    useEffect(() => {
        gl.setClearColor(0x000000, 0); // alpha=0 完全透明
    }, [gl]);
    return null;
}

function Model({ url }: { url: string }) {
    // Enable DRACO loader by passing the path to the decoder.
    // Must be absolute from domain root to survive dynamic routes like /brands/[slug]
    const { scene } = useGLTF(url, '/draco/');
    return <primitive object={scene} />;
}

// Preload the specific models we use to prevent Suspense popping
useGLTF.preload("/models/gw4-draco.glb", '/draco/');

export default function Packaging3DViewerInner({ url, heroMode = false }: { url: string, heroMode?: boolean }) {
    return (
        <ErrorBoundary fallbackRender={({ error }: { error: any }) => (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 border border-red-500/50 p-6 text-center z-50">
                <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">3D Render Error</h3>
                <p className="text-sm text-red-400 font-mono break-words max-w-full">{error.message}</p>
            </div>
        )}>
            <Canvas
                dpr={[1, 2]}
                camera={{ position: [0, 0, 3.0], fov: 60 }}
                gl={{ alpha: true, antialias: true }}
                style={{ background: 'transparent' }}
                className="w-full h-full absolute inset-0 touch-none"
            >
                <Suspense fallback={null}>
                    <TransparentBackground />
                    {/* Multi-directional lighting to replace missing HDR Environment */}
                    <ambientLight intensity={2.5} />
                    <hemisphereLight intensity={1.5} color="#ffffff" groundColor="#404040" />
                    <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={3} castShadow shadow-mapSize={[1024, 1024]} />
                    <pointLight position={[-10, 5, -10]} intensity={2} color="#ffffff" />
                    <directionalLight position={[0, -5, 10]} intensity={1.5} color="#ffffff" />
                    
                    {heroMode ? (
                        <>
                            <OrbitControls
                                autoRotate
                                autoRotateSpeed={1.5}
                                enableZoom={false}
                                enablePan={false}
                                minPolarAngle={Math.PI / 4}
                                maxPolarAngle={(Math.PI * 2) / 3}
                            />
                            <Center>
                                <group scale={2.5}>
                                    <Model url={url} />
                                </group>
                                <ContactShadows position={[0, -1.2, 0]} opacity={0.5} scale={20} blur={3} far={6} color="#000000" />
                            </Center>
                        </>
                    ) : (
                        <PresentationControls
                            speed={1.5}
                            global
                            zoom={0.8}
                            polar={[-0.1, Math.PI / 4]}
                        >
                            <group scale={1.2}>
                                <Center>
                                    <Model url={url} />
                                    <ContactShadows position={[0, -0.6, 0]} opacity={0.6} scale={10} blur={2.5} far={4} color="#000000" />
                                </Center>
                            </group>
                        </PresentationControls>
                    )}
                </Suspense>
            </Canvas>
        </ErrorBoundary>
    );
}
