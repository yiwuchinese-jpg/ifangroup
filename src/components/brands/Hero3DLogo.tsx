"use client";

import { useRef, useState } from"react";
import { Canvas, useFrame } from"@react-three/fiber";
import { Text3D, Center, Float, Environment, ContactShadows } from"@react-three/drei";
import * as THREE from"three";

function SpinningText({ text }: { text: string }) {
 const textRef = useRef<THREE.Mesh>(null);
 const [hovered, setHovered] = useState(false);

 useFrame((state, delta) => {
 if (textRef.current) {
 // Base slow rotation
 textRef.current.rotation.y += delta * 0.2;

 // Speed up and scale up on hover
 if (hovered) {
 textRef.current.rotation.y += delta * 0.5;
 textRef.current.scale.lerp(new THREE.Vector3(1.1, 1.1, 1.1), 0.1);
 } else {
 textRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
 }
 }
 });

 return (
 <Center>
 <Float
 speed={2} // Animation speed
 rotationIntensity={0.2} // XYZ rotation intensity
 floatIntensity={0.5} // Up/down float intensity
 >
 <Text3D
 ref={textRef}
 font="/Inter_Bold.json"
 size={2.5}
 height={0.4}
 curveSegments={12}
 bevelEnabled
 bevelThickness={0.05}
 bevelSize={0.02}
 bevelOffset={0}
 bevelSegments={5}
 onPointerOver={() => setHovered(true)}
 onPointerOut={() => setHovered(false)}
 >
 {text}
 {/* Elegant Glossy Material */}
 <meshStandardMaterial
 color="#ffffff"
 roughness={0.15}
 metalness={0.05}
 />
 </Text3D>
 </Float>
 </Center>
 );
}

export default function Hero3DLogo({ text }: { text: string }) {
 return (
 <div className="w-full h-48 md:h-64 mb-8 cursor-pointer relative z-20">
 <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
 <ambientLight intensity={1.5} />
 <spotLight position={[10, 15, 10]} angle={0.2} penumbra={1} intensity={2.5} castShadow />
 <pointLight position={[-10, 5, -10]} intensity={2} color="#ffffff" />

 {/* Manual lights to compensate for removed Environment */}
 <directionalLight position={[0, -5, 10]} intensity={1.5} color="#ffffff" />
 <hemisphereLight intensity={1.0} color="#ffffff" groundColor="#404040" />

 <SpinningText text={text} />

 {/* Contact shadows for grounding the text */}
 <ContactShadows
 position={[0, -2.5, 0]}
 opacity={0.5}
 scale={20}
 blur={2}
 far={4.5}
 />
 </Canvas>
 </div>
 );
}
