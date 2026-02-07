"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

interface FloatingObjectProps {
  position: [number, number, number];
  scale?: number;
  color: string;
  speed?: number;
  distort?: number;
  geometry?: "icosahedron" | "torus" | "octahedron" | "dodecahedron";
}

function FloatingObject({
  position,
  scale = 1,
  color,
  speed = 1,
  distort = 0.4,
  geometry = "icosahedron",
}: FloatingObjectProps) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.elapsedTime;
    mesh.current.rotation.x = time * 0.15 * speed;
    mesh.current.rotation.y = time * 0.2 * speed;
  });

  const GeometryComponent = {
    icosahedron: <icosahedronGeometry args={[1, 1]} />,
    torus: <torusGeometry args={[1, 0.4, 16, 32]} />,
    octahedron: <octahedronGeometry args={[1, 0]} />,
    dodecahedron: <dodecahedronGeometry args={[1, 0]} />,
  };

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh ref={mesh} position={position} scale={scale}>
        {GeometryComponent[geometry]}
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          speed={3}
          distort={distort}
          transparent
          opacity={0.7}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

function GlowRing({ position, color, size }: { position: [number, number, number]; color: string; size: number }) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = state.clock.elapsedTime * 0.3;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.2;
  });

  return (
    <mesh ref={mesh} position={position}>
      <torusGeometry args={[size, 0.02, 16, 100]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.8}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

export default function FloatingObjects() {
  return (
    <group>
      {/* Main floating objects */}
      <FloatingObject
        position={[-4, 1.5, -3]}
        scale={0.6}
        color="#6366f1"
        speed={0.6}
        geometry="icosahedron"
      />
      <FloatingObject
        position={[4, -1, -4]}
        scale={0.5}
        color="#22d3ee"
        speed={0.8}
        geometry="octahedron"
      />
      <FloatingObject
        position={[3, 2.5, -5]}
        scale={0.4}
        color="#a855f7"
        speed={0.5}
        geometry="dodecahedron"
      />
      <FloatingObject
        position={[-3, -2, -3]}
        scale={0.35}
        color="#10b981"
        speed={0.7}
        geometry="torus"
      />
      <FloatingObject
        position={[0, 3, -6]}
        scale={0.3}
        color="#f59e0b"
        speed={0.9}
        geometry="icosahedron"
      />

      {/* Decorative rings */}
      <GlowRing position={[-2, 0, -2]} color="#6366f1" size={0.8} />
      <GlowRing position={[2.5, 1, -3]} color="#22d3ee" size={0.6} />

      {/* Ambient lighting for objects */}
      <pointLight position={[-4, 2, -2]} intensity={0.5} color="#6366f1" />
      <pointLight position={[4, -1, -3]} intensity={0.5} color="#22d3ee" />
    </group>
  );
}
