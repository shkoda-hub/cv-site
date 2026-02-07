"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleFieldProps {
  count?: number;
  mousePosition?: { x: number; y: number };
}

export default function ParticleField({ count = 1000, mousePosition }: ParticleFieldProps) {
  const mesh = useRef<THREE.Points>(null);
  const originalPositions = useRef<Float32Array | null>(null);

  const [positions, colors, sizes] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Spread particles in a large sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 2 + Math.random() * 4;

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi) - 2;

      // Gradient from indigo to cyan with variation
      const colorChoice = Math.random();
      if (colorChoice < 0.4) {
        // Indigo
        colors[i3] = 0.39;
        colors[i3 + 1] = 0.4;
        colors[i3 + 2] = 0.95;
      } else if (colorChoice < 0.7) {
        // Cyan
        colors[i3] = 0.13;
        colors[i3 + 1] = 0.83;
        colors[i3 + 2] = 0.93;
      } else if (colorChoice < 0.9) {
        // Purple
        colors[i3] = 0.66;
        colors[i3 + 1] = 0.33;
        colors[i3 + 2] = 0.97;
      } else {
        // White highlights
        colors[i3] = 1;
        colors[i3 + 1] = 1;
        colors[i3 + 2] = 1;
      }

      // Random sizes for depth effect
      sizes[i] = Math.random() * 3 + 1;
    }

    return [positions, colors, sizes];
  }, [count]);

  // Store original positions
  useMemo(() => {
    originalPositions.current = positions.slice();
  }, [positions]);

  useFrame((state) => {
    if (!mesh.current) return;

    const time = state.clock.elapsedTime;
    const positionArray = mesh.current.geometry.attributes.position.array as Float32Array;
    const original = originalPositions.current;

    if (!original) return;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const offset = i * 0.005;

      // Flowing wave animation
      positionArray[i3] = original[i3] + Math.sin(time * 0.3 + offset + original[i3 + 1]) * 0.15;
      positionArray[i3 + 1] = original[i3 + 1] + Math.cos(time * 0.2 + offset) * 0.15;
      positionArray[i3 + 2] = original[i3 + 2] + Math.sin(time * 0.25 + offset) * 0.1;

      // Mouse interaction - repel particles
      if (mousePosition) {
        const dx = mousePosition.x * 3 - positionArray[i3];
        const dy = -mousePosition.y * 3 - positionArray[i3 + 1];
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 2) {
          const force = (2 - dist) * 0.15;
          positionArray[i3] -= dx * force * 0.1;
          positionArray[i3 + 1] -= dy * force * 0.1;
        }
      }
    }

    mesh.current.geometry.attributes.position.needsUpdate = true;

    // Slow rotation
    mesh.current.rotation.y = time * 0.02;
    mesh.current.rotation.x = Math.sin(time * 0.1) * 0.1;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
