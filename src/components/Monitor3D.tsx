"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Html, Float } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

function MonitorModel({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    // Subtle floating animation
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.05;
    groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.02;
  });

  return (
    <group ref={groupRef}>
      {/* Monitor body */}
      <RoundedBox
        args={[4.2, 3.2, 0.3]}
        radius={0.1}
        smoothness={4}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.8} />
      </RoundedBox>

      {/* Screen bezel */}
      <RoundedBox
        args={[3.9, 2.9, 0.1]}
        radius={0.05}
        smoothness={4}
        position={[0, 0, 0.15]}
      >
        <meshStandardMaterial color="#0d0d0d" metalness={0.3} roughness={0.5} />
      </RoundedBox>

      {/* Screen glow */}
      <mesh position={[0, 0, 0.2]}>
        <planeGeometry args={[3.7, 2.7]} />
        <meshBasicMaterial color="#33ff33" transparent opacity={0.03} />
      </mesh>

      {/* HTML Content */}
      <Html
        transform
        occlude
        position={[0, 0, 0.21]}
        style={{
          width: "740px",
          height: "540px",
        }}
        distanceFactor={1}
      >
        <div
          className="w-full h-full bg-[#0a0a0a] overflow-hidden"
          style={{
            boxShadow: "inset 0 0 50px rgba(51, 255, 51, 0.1)",
          }}
        >
          {/* Scanlines overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: "repeating-linear-gradient(0deg, rgba(0,0,0,0.15), rgba(0,0,0,0.15) 1px, transparent 1px, transparent 2px)",
            }}
          />
          {/* Content */}
          <div className="relative z-0 h-full overflow-auto">
            {children}
          </div>
        </div>
      </Html>

      {/* Stand neck */}
      <mesh position={[0, -1.8, -0.1]}>
        <cylinderGeometry args={[0.15, 0.2, 0.5, 16]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.8} />
      </mesh>

      {/* Stand base */}
      <mesh position={[0, -2.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 0.05, 32]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.8} />
      </mesh>

      {/* Power LED */}
      <mesh position={[1.8, -1.4, 0.16]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial color="#33ff33" />
      </mesh>

      {/* Screen reflection/glow */}
      <pointLight position={[0, 0, 1]} intensity={0.3} color="#33ff33" />
    </group>
  );
}

function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 100;

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }

  useFrame((state) => {
    if (!particlesRef.current) return;
    particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#33ff33" transparent opacity={0.5} />
    </points>
  );
}

interface Monitor3DProps {
  children: React.ReactNode;
}

export default function Monitor3D({ children }: Monitor3DProps) {
  return (
    <div className="w-full h-screen">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.5} />
        <pointLight position={[-5, 5, 5]} intensity={0.3} />

        <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
          <MonitorModel>{children}</MonitorModel>
        </Float>

        <FloatingParticles />
      </Canvas>
    </div>
  );
}
