import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Float, Sphere, MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei';

function FloatingObject({ position, color, size, speed, factor, distort }: any) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.005 * speed;
            meshRef.current.rotation.y += 0.005 * speed;
            meshRef.current.position.y += Math.sin(state.clock.elapsedTime * speed + position[0]) * 0.002;
        }
    });

    return (
        <Float speed={speed * 2} rotationIntensity={intensity} floatIntensity={intensity}>
            <mesh position={position} ref={meshRef}>
                {distort ? (
                    <Sphere args={[size, 64, 64]}>
                        <MeshDistortMaterial
                            color={color}
                            speed={speed * 2}
                            distort={0.4}
                            radius={size}
                            transparent
                            opacity={0.3}
                        />
                    </Sphere>
                ) : (
                    <>
                        <boxGeometry args={[size, size, size]} />
                        <MeshWobbleMaterial
                            color={color}
                            speed={speed}
                            factor={factor || 0.6}
                            transparent
                            opacity={0.2}
                            wireframe
                        />
                    </>
                )}
            </mesh>
        </Float>
    );
}

const intensity = 1.5;

function Scene() {
    const { viewport } = useThree();

    const objects = useMemo(() => {
        return [
            { position: [-viewport.width / 4, viewport.height / 4, -2], color: '#FCBE26', size: 1.5, speed: 1, distort: true },
            { position: [viewport.width / 3, -viewport.height / 5, -3], color: '#ffffff', size: 0.8, speed: 1.5, factor: 0.8 },
            { position: [-viewport.width / 5, -viewport.height / 3, -1], color: '#FCBE26', size: 0.5, speed: 0.8, factor: 1.2 },
            { position: [viewport.width / 4, viewport.height / 3, -4], color: '#ffffff', size: 1.2, speed: 1.2, distort: true },
            { position: [0, -viewport.height / 2.5, -5], color: '#FCBE26', size: 2, speed: 0.5, factor: 0.4 },
        ];
    }, [viewport]);

    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#FCBE26" />

            {objects.map((obj, i) => (
                <FloatingObject key={i} {...obj} />
            ))}
        </>
    );
}

const Floating3DObjects: React.FC = () => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
            <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
                <Suspense fallback={null}>
                    <Scene />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default Floating3DObjects;
