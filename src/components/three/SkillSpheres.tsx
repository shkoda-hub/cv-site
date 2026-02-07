"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { skills, categoryColors, type Skill } from "@/data/skills";

function OrbitRing({ radius, color }: { radius: number; color: string }) {
  const geometry = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [radius]);

  const material = useMemo(() => {
    return new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.3 });
  }, [color]);

  return <primitive object={new THREE.Line(geometry, material)} />;
}

interface SkillNodeProps {
  skill: Skill;
  orbitRadius: number;
  orbitSpeed: number;
  initialAngle: number;
}

function SkillNode({ skill, orbitRadius, orbitSpeed, initialAngle }: SkillNodeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const categoryColor = categoryColors[skill.category];
  const size = 0.12 + skill.level * 0.025;

  useFrame((state) => {
    if (!groupRef.current || !meshRef.current) return;
    const time = state.clock.elapsedTime;
    const angle = initialAngle + time * orbitSpeed;

    groupRef.current.position.x = Math.cos(angle) * orbitRadius;
    groupRef.current.position.z = Math.sin(angle) * orbitRadius;
    groupRef.current.position.y = Math.sin(time * 2 + initialAngle) * 0.15;

    meshRef.current.rotation.y = time * 0.5;
    meshRef.current.rotation.x = time * 0.3;
  });

  return (
    <group ref={groupRef}>
      {/* Glow */}
      <mesh scale={size * 2.5}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color={categoryColor} transparent opacity={0.15} />
      </mesh>

      {/* Main sphere */}
      <mesh ref={meshRef} scale={size}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color={categoryColor}
          emissive={categoryColor}
          emissiveIntensity={0.6}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Label */}
      <Html center position={[0, -size - 0.25, 0]} style={{ pointerEvents: "none" }}>
        <div className="text-white text-xs font-medium whitespace-nowrap bg-black/50 px-2 py-1 rounded">
          {skill.name}
        </div>
      </Html>
    </group>
  );
}

function CenterCore() {
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (coreRef.current) {
      coreRef.current.rotation.y = time * 0.5;
      coreRef.current.rotation.x = Math.sin(time * 0.3) * 0.3;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = time * 0.4;
      ringRef.current.rotation.x = time * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -time * 0.3;
      ring2Ref.current.rotation.y = time * 0.2;
    }
  });

  return (
    <group>
      {/* Inner glow */}
      <mesh scale={0.6}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.2} />
      </mesh>

      {/* Core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.35, 2]} />
        <meshStandardMaterial
          color="#6366f1"
          emissive="#6366f1"
          emissiveIntensity={1}
          wireframe
        />
      </mesh>

      {/* Ring 1 */}
      <mesh ref={ringRef}>
        <torusGeometry args={[0.55, 0.015, 16, 100]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Ring 2 */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.65, 0.01, 16, 100]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#a855f7"
          emissiveIntensity={0.6}
        />
      </mesh>
    </group>
  );
}

export default function SkillSpheres() {
  const backendSkills = skills.filter((s) => s.category === "backend");
  const frontendSkills = skills.filter((s) => s.category === "frontend");
  const devopsSkills = skills.filter((s) => s.category === "devops");
  const toolsSkills = skills.filter((s) => s.category === "tools");

  const orbits = [
    { skills: backendSkills, radius: 1.5, speed: 0.25, color: categoryColors.backend },
    { skills: frontendSkills, radius: 2.2, speed: -0.2, color: categoryColors.frontend },
    { skills: devopsSkills, radius: 2.9, speed: 0.15, color: categoryColors.devops },
    { skills: toolsSkills, radius: 3.6, speed: -0.12, color: categoryColors.tools },
  ];

  return (
    <group rotation={[0.4, 0, 0]}>
      {/* Lights */}
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#6366f1" />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />

      <CenterCore />

      {orbits.map((orbit, orbitIndex) => (
        <group key={orbitIndex}>
          <OrbitRing radius={orbit.radius} color={orbit.color} />
          {orbit.skills.map((skill, skillIndex) => (
            <SkillNode
              key={skill.name}
              skill={skill}
              orbitRadius={orbit.radius}
              orbitSpeed={orbit.speed}
              initialAngle={(skillIndex / orbit.skills.length) * Math.PI * 2}
            />
          ))}
        </group>
      ))}
    </group>
  );
}
