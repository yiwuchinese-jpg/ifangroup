"use client";

import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, PresentationControls, OrbitControls } from "@react-three/drei";
import { Suspense, useEffect } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { ErrorBoundary } from "react-error-boundary";

function Model({ url }: { url: string }) {
    // Enable DRACO loader by passing the path to the decoder.
    // Ensure the Draco files are physically present in public/draco/
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
            <Canvas dpr={1} camera={{ position: [0, 0, 4], fov: 45 }}>
                {heroMode ? (
                    <OrbitControls
                        autoRotate
                        autoRotateSpeed={1.0}
                        enableZoom={false}
                        enablePan={false}
                        minPolarAngle={Math.PI / 3}
                        maxPolarAngle={Math.PI / 2}
                    />
                ) : (
                    <PresentationControls
                        speed={1.5}
                        global
                        zoom={0.8}
                        polar={[-0.1, Math.PI / 4]}
                    >
                        <Stage environment="studio" intensity={0.8} adjustCamera={2} shadows={false}>
                            <Model url={url} />
                        </Stage>
                    </PresentationControls>
                )}

                {heroMode && (
                    <Stage environment="studio" intensity={0.8} adjustCamera={2} shadows={false}>
                        <Model url={url} />
                    </Stage>
                )}
            </Canvas>
        </ErrorBoundary>
    );
}
