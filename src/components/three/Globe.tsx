"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Generate points on sphere surface
function generateGlobePoints(count: number, radius: number) {
  const points: THREE.Vector3[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = phi * i;

    points.push(
      new THREE.Vector3(
        Math.cos(theta) * radiusAtY * radius,
        y * radius,
        Math.sin(theta) * radiusAtY * radius
      )
    );
  }
  return points;
}

// Generate arc between two points on sphere
function generateArc(start: THREE.Vector3, end: THREE.Vector3, segments: number = 50) {
  const points: THREE.Vector3[] = [];
  const midPoint = start.clone().add(end).multiplyScalar(0.5);
  const distance = start.distanceTo(end);
  midPoint.normalize().multiplyScalar(start.length() + distance * 0.3);

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const t2 = t * t;
    const t3 = t2 * t;
    const mt = 1 - t;
    const mt2 = mt * mt;
    const mt3 = mt2 * mt;

    // Quadratic bezier
    const point = new THREE.Vector3()
      .addScaledVector(start, mt2)
      .addScaledVector(midPoint, 2 * mt * t)
      .addScaledVector(end, t2);

    points.push(point);
  }
  return points;
}

interface GlobeProps {
  radius?: number;
}

function GlobePoints({ radius = 2 }: { radius: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const globePoints = generateGlobePoints(1500, radius);
    const positions = new Float32Array(globePoints.length * 3);
    const colors = new Float32Array(globePoints.length * 3);

    globePoints.forEach((point, i) => {
      positions[i * 3] = point.x;
      positions[i * 3 + 1] = point.y;
      positions[i * 3 + 2] = point.z;

      // Gradient color based on position
      const t = (point.y / radius + 1) / 2;
      colors[i * 3] = 0.4 + t * 0.2;     // R
      colors[i * 3 + 1] = 0.4 + t * 0.4; // G
      colors[i * 3 + 2] = 0.95;          // B
    });

    return [positions, colors];
  }, [radius]);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function GlobeArcs({ radius = 2 }: { radius: number }) {
  const arcsRef = useRef<THREE.Group>(null);

  // Generate random city-like connections
  const arcs = useMemo(() => {
    const arcData: { points: THREE.Vector3[]; color: string }[] = [];
    const cities = [
      { lat: 55.75, lon: 37.62 },  // Moscow
      { lat: 51.51, lon: -0.13 },  // London
      { lat: 40.71, lon: -74.01 }, // New York
      { lat: 35.68, lon: 139.69 }, // Tokyo
      { lat: 22.32, lon: 114.17 }, // Hong Kong
      { lat: -33.87, lon: 151.21 }, // Sydney
      { lat: 52.52, lon: 13.40 },  // Berlin
      { lat: 37.77, lon: -122.42 }, // San Francisco
      { lat: 1.35, lon: 103.82 },  // Singapore
      { lat: 48.86, lon: 2.35 },   // Paris
    ];

    const colors = ["#6366f1", "#22d3ee", "#a855f7", "#10b981"];

    // Convert lat/lon to 3D
    const toVector = (lat: number, lon: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      );
    };

    // Create connections
    const connections = [
      [0, 1], [0, 6], [1, 2], [2, 7], [3, 4], [4, 8], [5, 3], [6, 9], [1, 9], [7, 2], [8, 3]
    ];

    connections.forEach(([from, to], i) => {
      const start = toVector(cities[from].lat, cities[from].lon);
      const end = toVector(cities[to].lat, cities[to].lon);
      arcData.push({
        points: generateArc(start, end, 50),
        color: colors[i % colors.length],
      });
    });

    return arcData;
  }, [radius]);

  return (
    <group ref={arcsRef}>
      {arcs.map((arc, index) => (
        <ArcLine key={index} points={arc.points} color={arc.color} delay={index * 0.2} />
      ))}
    </group>
  );
}

function ArcLine({ points, color, delay }: { points: THREE.Vector3[]; color: string; delay: number }) {
  const lineRef = useRef<THREE.Line>(null);
  const progressRef = useRef(0);

  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  const material = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    });
  }, [color]);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const cycleTime = 4;
    const t = ((time - delay) % cycleTime) / cycleTime;

    if (t < 0) {
      material.opacity = 0;
    } else if (t < 0.5) {
      material.opacity = Math.sin(t * Math.PI) * 0.8;
    } else {
      material.opacity = Math.sin(t * Math.PI) * 0.8;
    }
  });

  return <primitive object={new THREE.Line(geometry, material)} />;
}

function GlobeGlow({ radius = 2 }: { radius: number }) {
  return (
    <mesh>
      <sphereGeometry args={[radius * 1.01, 32, 32]} />
      <meshBasicMaterial
        color="#6366f1"
        transparent
        opacity={0.03}
        side={THREE.BackSide}
      />
    </mesh>
  );
}

function GlobeAtmosphere({ radius = 2 }: { radius: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} scale={radius * 1.15}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial
        color="#6366f1"
        transparent
        opacity={0.08}
        side={THREE.BackSide}
      />
    </mesh>
  );
}

function CityDots({ radius = 2 }: { radius: number }) {
  const cities = [
    { lat: 55.75, lon: 37.62, name: "Moscow" },
    { lat: 51.51, lon: -0.13, name: "London" },
    { lat: 40.71, lon: -74.01, name: "NYC" },
    { lat: 35.68, lon: 139.69, name: "Tokyo" },
    { lat: 22.32, lon: 114.17, name: "HK" },
    { lat: -33.87, lon: 151.21, name: "Sydney" },
    { lat: 52.52, lon: 13.40, name: "Berlin" },
    { lat: 37.77, lon: -122.42, name: "SF" },
    { lat: 1.35, lon: 103.82, name: "Singapore" },
    { lat: 48.86, lon: 2.35, name: "Paris" },
  ];

  const toPosition = (lat: number, lon: number): [number, number, number] => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    return [
      -radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta),
    ];
  };

  return (
    <group>
      {cities.map((city, i) => (
        <mesh key={i} position={toPosition(city.lat, city.lon)}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial color="#22d3ee" />
        </mesh>
      ))}
    </group>
  );
}

export default function Globe({ radius = 2 }: GlobeProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <GlobeAtmosphere radius={radius} />
      <GlobeGlow radius={radius} />
      <GlobePoints radius={radius} />
      <GlobeArcs radius={radius} />
      <CityDots radius={radius} />
    </group>
  );
}
