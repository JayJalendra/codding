import React, { useState, useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Float, Sparkles, Billboard, Text, Cylinder, Sphere, Box } from '@react-three/drei';
import * as THREE from 'three';

interface CactusData {
  pos: [number, number, number];
  scale: number;
  trunkH: number;
  trunkR: number;
  color: string;
  rotY: number;
  arms: {
    side: number;
    y: number;
    len: number;
    armR: number;
    rotY: number;
  }[];
}

interface RockData {
  pos: [number, number, number];
  scale: [number, number, number];
  rot: [number, number, number];
  color: string;
}

interface DuneData {
  pos: [number, number, number];
  scale: [number, number, number];
  rot: number;
  color: string;
}

interface ShimmerPlaneData {
  pos: [number, number, number];
  size: [number, number];
  rotY: number;
  speed: number;
  phase: number;
}

export function DesertModel({ showLabels = true }: { showLabels?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const dustRef = useRef<THREE.Points>(null);
  const shimmerRefs = useRef<(THREE.Mesh | null)[]>([]);
  const [activeZone, setActiveZone] = useState<string | null>(null);

  // 12+ Sand Dunes (colors: #c9a84c, #e8c97a, #d4a853, #b8924a)
  // Scaled differently: some large (4-6), some small (1-2)
  const dunesData: DuneData[] = useMemo(
    () => [
      // Large dunes (scale 4 to 6)
      { pos: [5.2, 0, -4.5], scale: [5.6, 2.3, 4.2], rot: 0.35, color: '#c9a84c' },
      { pos: [-4.8, 0, -5.2], scale: [5.2, 2.1, 3.8], rot: -0.5, color: '#e8c97a' },
      { pos: [6.5, 0, 2.5], scale: [4.8, 1.9, 3.6], rot: 0.8, color: '#d4a853' },
      { pos: [-0.8, 0, -7.2], scale: [6.0, 2.5, 4.5], rot: 0.1, color: '#b8924a' },
      { pos: [2.0, 0, -5.8], scale: [4.5, 1.8, 3.2], rot: -0.3, color: '#c9a84c' },
      { pos: [7.2, 0, -1.0], scale: [5.0, 2.0, 3.7], rot: 0.6, color: '#e8c97a' },

      // Medium dunes
      { pos: [3.8, 0, 6.2], scale: [3.5, 1.4, 2.8], rot: -0.4, color: '#d4a853' },
      { pos: [-6.8, 0, -2.0], scale: [3.8, 1.5, 3.0], rot: 0.7, color: '#b8924a' },
      { pos: [0.5, 0, 6.8], scale: [3.2, 1.3, 2.6], rot: 0.25, color: '#c9a84c' },

      // Small dunes (scale 1 to 2)
      { pos: [-2.5, 0, 1.5], scale: [1.8, 0.7, 1.5], rot: 0.4, color: '#e8c97a' },
      { pos: [2.8, 0, 2.0], scale: [1.5, 0.6, 1.3], rot: -0.2, color: '#d4a853' },
      { pos: [-7.8, 0, 0.8], scale: [1.9, 0.8, 1.6], rot: 0.9, color: '#b8924a' },
      { pos: [4.2, 0, -1.5], scale: [1.6, 0.65, 1.4], rot: -0.6, color: '#c9a84c' },
      { pos: [-1.5, 0, 4.5], scale: [1.3, 0.5, 1.2], rot: 0.5, color: '#e8c97a' },
    ],
    []
  );

  // Animated heat shimmer planes (thin, tall, opacity 0.05)
  const shimmerData: ShimmerPlaneData[] = useMemo(
    () => [
      { pos: [1.5, 2.5, -2], size: [4.5, 5.0], rotY: 0.2, speed: 2.1, phase: 0 },
      { pos: [-2.0, 2.5, -1], size: [5.0, 5.0], rotY: -0.4, speed: 1.8, phase: 1.2 },
      { pos: [4.0, 2.5, 1.5], size: [4.0, 4.5], rotY: 0.6, speed: 2.4, phase: 2.5 },
      { pos: [-4.0, 2.5, -3.5], size: [4.8, 5.0], rotY: -0.1, speed: 1.6, phase: 3.8 },
      { pos: [0.0, 2.8, 3.0], size: [4.2, 5.5], rotY: 0.8, speed: 2.0, phase: 4.5 },
      { pos: [5.5, 2.6, -3.0], size: [4.0, 5.0], rotY: -0.5, speed: 2.2, phase: 5.1 },
      { pos: [-1.0, 2.4, 0.5], size: [4.5, 4.8], rotY: 0.3, speed: 1.9, phase: 0.8 },
      { pos: [3.0, 2.7, 4.0], size: [3.8, 5.0], rotY: -0.7, speed: 2.3, phase: 2.0 },
    ],
    []
  );

  // 20+ Varied Cacti
  const cactiData: CactusData[] = useMemo(() => {
    const cactusGreenShades = ['#2e7d32', '#388e3c', '#2d6a2f', '#33691e', '#1b5e20'];
    const configs: CactusData[] = [
      // Cluster 1 - South-East arid region
      {
        pos: [2.2, 0, 4.5],
        scale: 1.0,
        trunkH: 2.2,
        trunkR: 0.15,
        color: cactusGreenShades[0],
        rotY: 0.3,
        arms: [
          { side: 1, y: 1.1, len: 0.6, armR: 0.08, rotY: 0 },
          { side: -1, y: 0.8, len: 0.5, armR: 0.08, rotY: 0.2 },
        ],
      },
      {
        pos: [3.5, 0, 3.8],
        scale: 0.8,
        trunkH: 1.6,
        trunkR: 0.13,
        color: cactusGreenShades[1],
        rotY: 1.2,
        arms: [{ side: 1, y: 0.8, len: 0.45, armR: 0.07, rotY: 0 }],
      },
      {
        pos: [1.2, 0, 5.2],
        scale: 0.9,
        trunkH: 1.8,
        trunkR: 0.14,
        color: cactusGreenShades[2],
        rotY: -0.5,
        arms: [],
      },
      {
        pos: [4.8, 0, 4.2],
        scale: 1.1,
        trunkH: 2.4,
        trunkR: 0.16,
        color: cactusGreenShades[3],
        rotY: 0.7,
        arms: [
          { side: -1, y: 1.2, len: 0.65, armR: 0.09, rotY: -0.2 },
          { side: 1, y: 0.9, len: 0.55, armR: 0.08, rotY: 0.3 },
        ],
      },
      {
        pos: [2.9, 0, 5.8],
        scale: 0.75,
        trunkH: 1.5,
        trunkR: 0.12,
        color: cactusGreenShades[4],
        rotY: 2.1,
        arms: [{ side: -1, y: 0.7, len: 0.4, armR: 0.07, rotY: 0 }],
      },

      // Cluster 2 - North-West & Central rocky plains
      {
        pos: [-2.8, 0, -4.2],
        scale: 1.15,
        trunkH: 2.3,
        trunkR: 0.16,
        color: cactusGreenShades[0],
        rotY: -0.4,
        arms: [
          { side: 1, y: 1.3, len: 0.65, armR: 0.09, rotY: 0.1 },
          { side: -1, y: 0.95, len: 0.55, armR: 0.08, rotY: -0.1 },
        ],
      },
      {
        pos: [-1.8, 0, -4.8],
        scale: 0.85,
        trunkH: 1.7,
        trunkR: 0.13,
        color: cactusGreenShades[1],
        rotY: 1.5,
        arms: [{ side: 1, y: 0.9, len: 0.45, armR: 0.075, rotY: 0 }],
      },
      {
        pos: [-3.8, 0, -3.5],
        scale: 1.05,
        trunkH: 2.1,
        trunkR: 0.15,
        color: cactusGreenShades[2],
        rotY: 0.8,
        arms: [
          { side: -1, y: 1.0, len: 0.6, armR: 0.085, rotY: 0.2 },
          { side: 1, y: 1.2, len: 0.5, armR: 0.08, rotY: -0.3 },
        ],
      },
      {
        pos: [-2.2, 0, -3.2],
        scale: 0.7,
        trunkH: 1.4,
        trunkR: 0.12,
        color: cactusGreenShades[3],
        rotY: -1.1,
        arms: [],
      },
      {
        pos: [-0.8, 0, -4.0],
        scale: 0.95,
        trunkH: 1.9,
        trunkR: 0.14,
        color: cactusGreenShades[4],
        rotY: 0.4,
        arms: [{ side: -1, y: 1.0, len: 0.5, armR: 0.08, rotY: 0 }],
      },

      // Cluster 3 - East dune edges
      {
        pos: [5.8, 0, -1.8],
        scale: 1.0,
        trunkH: 2.0,
        trunkR: 0.15,
        color: cactusGreenShades[0],
        rotY: 1.8,
        arms: [
          { side: 1, y: 1.1, len: 0.55, armR: 0.08, rotY: 0 },
          { side: -1, y: 0.85, len: 0.45, armR: 0.075, rotY: 0.1 },
        ],
      },
      {
        pos: [6.8, 0, -0.2],
        scale: 0.8,
        trunkH: 1.6,
        trunkR: 0.13,
        color: cactusGreenShades[1],
        rotY: -0.7,
        arms: [{ side: 1, y: 0.8, len: 0.45, armR: 0.07, rotY: 0 }],
      },
      {
        pos: [4.9, 0, 0.8],
        scale: 0.9,
        trunkH: 1.7,
        trunkR: 0.14,
        color: cactusGreenShades[2],
        rotY: 2.4,
        arms: [],
      },
      {
        pos: [7.5, 0, 1.2],
        scale: 1.05,
        trunkH: 2.1,
        trunkR: 0.15,
        color: cactusGreenShades[3],
        rotY: 0.5,
        arms: [
          { side: -1, y: 1.05, len: 0.6, armR: 0.085, rotY: 0 },
          { side: 1, y: 0.8, len: 0.5, armR: 0.08, rotY: 0.4 },
        ],
      },

      // Cluster 4 - North sands
      {
        pos: [1.0, 0, -2.5],
        scale: 0.85,
        trunkH: 1.6,
        trunkR: 0.13,
        color: cactusGreenShades[4],
        rotY: -1.3,
        arms: [{ side: 1, y: 0.85, len: 0.45, armR: 0.075, rotY: 0 }],
      },
      {
        pos: [-0.2, 0, -1.8],
        scale: 1.0,
        trunkH: 1.9,
        trunkR: 0.14,
        color: cactusGreenShades[0],
        rotY: 0.9,
        arms: [
          { side: -1, y: 0.95, len: 0.5, armR: 0.08, rotY: 0 },
          { side: 1, y: 1.15, len: 0.55, armR: 0.08, rotY: 0.2 },
        ],
      },
      {
        pos: [2.5, 0, -0.8],
        scale: 0.75,
        trunkH: 1.5,
        trunkR: 0.12,
        color: cactusGreenShades[1],
        rotY: 2.8,
        arms: [],
      },

      // Cluster 5 - West boundary
      {
        pos: [-7.2, 0, -4.8],
        scale: 1.1,
        trunkH: 2.2,
        trunkR: 0.15,
        color: cactusGreenShades[2],
        rotY: -0.6,
        arms: [
          { side: 1, y: 1.1, len: 0.6, armR: 0.08, rotY: -0.2 },
          { side: -1, y: 0.8, len: 0.5, armR: 0.075, rotY: 0.1 },
        ],
      },
      {
        pos: [-8.2, 0, -3.8],
        scale: 0.85,
        trunkH: 1.6,
        trunkR: 0.13,
        color: cactusGreenShades[3],
        rotY: 1.7,
        arms: [{ side: -1, y: 0.8, len: 0.45, armR: 0.07, rotY: 0 }],
      },
      {
        pos: [-6.2, 0, -6.0],
        scale: 0.9,
        trunkH: 1.75,
        trunkR: 0.14,
        color: cactusGreenShades[4],
        rotY: -2.0,
        arms: [],
      },
      {
        pos: [-1.2, 0, 1.8],
        scale: 0.95,
        trunkH: 1.8,
        trunkR: 0.14,
        color: cactusGreenShades[0],
        rotY: 0.6,
        arms: [{ side: 1, y: 0.9, len: 0.5, armR: 0.08, rotY: 0.2 }],
      },
      {
        pos: [0.2, 0, 3.2],
        scale: 0.8,
        trunkH: 1.5,
        trunkR: 0.12,
        color: cactusGreenShades[1],
        rotY: -1.5,
        arms: [
          { side: 1, y: 0.8, len: 0.45, armR: 0.07, rotY: 0 },
          { side: -1, y: 0.65, len: 0.4, armR: 0.07, rotY: -0.3 },
        ],
      },
    ];
    return configs;
  }, []);

  // 18 Angular Desert Rocks (Box geometries at varied angles)
  const rocksData: RockData[] = useMemo(
    () => [
      { pos: [-2.5, 0.2, -4.5], scale: [1.2, 0.6, 0.9], rot: [0.2, 0.8, -0.15], color: '#786c5e' },
      { pos: [-3.2, 0.15, -4.2], scale: [0.7, 0.45, 0.6], rot: [-0.3, 0.4, 0.2], color: '#6e5d4f' },
      { pos: [1.8, 0.25, -2.8], scale: [1.4, 0.7, 1.0], rot: [0.4, -0.6, 0.3], color: '#8b7355' },
      { pos: [2.5, 0.18, -2.5], scale: [0.8, 0.4, 0.7], rot: [-0.2, 0.3, -0.4], color: '#5d534a' },
      { pos: [-7.5, 0.3, -3.5], scale: [1.6, 0.8, 1.2], rot: [0.35, 1.1, -0.25], color: '#9a8268' },
      { pos: [-8.2, 0.2, -3.2], scale: [0.9, 0.5, 0.8], rot: [-0.15, 0.7, 0.4], color: '#756758' },
      { pos: [6.8, 0.25, 4.5], scale: [1.5, 0.75, 1.1], rot: [0.25, -0.9, 0.2], color: '#8c7865' },
      { pos: [7.5, 0.15, 4.8], scale: [0.8, 0.4, 0.65], rot: [-0.3, 0.5, -0.2], color: '#5c4d43' },
      { pos: [3.5, 0.2, 1.8], scale: [1.1, 0.5, 0.8], rot: [0.15, 1.4, -0.3], color: '#7a6857' },
      { pos: [-1.8, 0.15, 3.2], scale: [0.9, 0.4, 0.7], rot: [-0.4, 0.2, 0.35], color: '#887463' },
      { pos: [-4.2, 0.22, 1.2], scale: [1.3, 0.6, 0.95], rot: [0.3, -0.5, 0.1], color: '#6d5c4e' },
      { pos: [0.5, 0.15, -4.8], scale: [0.85, 0.4, 0.6], rot: [-0.2, 0.8, -0.3], color: '#917b66' },
      { pos: [8.2, 0.2, -2.2], scale: [1.3, 0.65, 0.9], rot: [0.4, 0.3, -0.2], color: '#796959' },
      { pos: [-6.8, 0.2, -6.0], scale: [1.5, 0.7, 1.0], rot: [-0.25, -0.8, 0.3], color: '#826f5d' },
      { pos: [5.0, 0.18, -6.5], scale: [1.2, 0.55, 0.85], rot: [0.2, 0.6, -0.4], color: '#6b5a4b' },
      { pos: [-0.8, 0.15, 5.8], scale: [0.95, 0.45, 0.75], rot: [-0.35, 1.2, 0.15], color: '#8e7967' },
      { pos: [4.8, 0.22, 5.2], scale: [1.1, 0.5, 0.8], rot: [0.25, -0.4, 0.3], color: '#746253' },
      { pos: [-8.5, 0.18, 2.8], scale: [1.0, 0.48, 0.7], rot: [-0.1, 0.9, -0.25], color: '#5e4e42' },
    ],
    []
  );

  // 1500 Dust particles in BufferGeometry
  const dustCount = 1500;
  const dustPositions = useMemo(() => {
    const pos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 28;
      pos[i * 3 + 1] = Math.random() * 5.5 + 0.2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 28;
    }
    return pos;
  }, [dustCount]);

  // Frame animation loop
  useFrame((state, delta) => {
    // 1. Slow rotation of whole group (Y axis, very slow 0.015)
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.015;
    }

    // 2. Animated dust particles drifting slowly
    if (dustRef.current) {
      const positions = dustRef.current.geometry.attributes.position.array as Float32Array;
      const t = state.clock.getElapsedTime();
      for (let i = 0; i < dustCount; i++) {
        const idx = i * 3;
        positions[idx] += delta * 0.75;
        positions[idx + 2] += delta * 0.28;
        positions[idx + 1] += Math.sin(t * 1.4 + i) * 0.003;

        // Wrap around boundaries
        if (positions[idx] > 14) positions[idx] = -14;
        if (positions[idx + 2] > 14) positions[idx + 2] = -14;
      }
      dustRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // 3. Animated heat shimmer wobble on scale.x using sine wave
    const elapsed = state.clock.getElapsedTime();
    shimmerRefs.current.forEach((mesh, idx) => {
      if (mesh) {
        const item = shimmerData[idx];
        if (item) {
          mesh.scale.x = 1 + Math.sin(elapsed * item.speed + item.phase) * 0.22;
        }
      }
    });
  });

  return (
    <group ref={groupRef} position={[0, -1.8, 0]}>
      {/* 11. Lighting: intense warm orange directionalLight from sun direction [8, 12, -8], dim orange ambientLight */}
      <ambientLight intensity={0.35} color="#ffb070" />
      <directionalLight
        position={[8, 12, -8]}
        intensity={2.8}
        color="#ff9800"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={40}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
      />
      <pointLight position={[8, 12, -8]} intensity={4.0} distance={50} color="#ffa726" />

      {/* 1. Ground - large sand-colored circular ground (tan/sandy #d4a853, radius 14) */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <circleGeometry args={[14, 64]} />
        <meshStandardMaterial color="#d4a853" roughness={0.96} metalness={0.04} />
      </mesh>
      {/* Base slab pedestal */}
      <mesh receiveShadow position={[0, -0.26, 0]}>
        <cylinderGeometry args={[14, 14.1, 0.5, 64]} />
        <meshStandardMaterial color="#b8924a" roughness={1.0} />
      </mesh>

      {/* 2. Sand Dunes - at least 12 large smooth dunes using half-spheres (sphereGeometry with thetaLength PI/2) */}
      {dunesData.map((dune, i) => (
        <mesh
          key={`dune-${i}`}
          position={dune.pos}
          scale={dune.scale}
          rotation={[0, dune.rot, 0]}
          castShadow
          receiveShadow
        >
          <sphereGeometry args={[1, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color={dune.color} roughness={0.93} metalness={0.05} />
        </mesh>
      ))}

      {/* 3. Animated heat shimmer - multiple thin, tall, semi-transparent planes (opacity 0.05) */}
      {shimmerData.map((plane, i) => (
        <mesh
          key={`shimmer-${i}`}
          ref={(el) => {
            shimmerRefs.current[i] = el;
          }}
          position={plane.pos}
          rotation={[0, plane.rotY, 0]}
        >
          <planeGeometry args={[plane.size[0], plane.size[1]]} />
          <meshBasicMaterial
            color="#fff5dd"
            transparent
            opacity={0.05}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}

      {/* 4. Cacti - at least 20 varied cacti (trunk: green cylinder, 0-2 arms: smaller cylinders at angles, needles hint: tiny white dots at top) */}
      {cactiData.map((c, i) => (
        <group key={`cactus-${i}`} position={c.pos} scale={c.scale} rotation={[0, c.rotY, 0]}>
          {/* Main Trunk */}
          <Cylinder
            args={[c.trunkR, c.trunkR * 1.05, c.trunkH, 10]}
            position={[0, c.trunkH / 2, 0]}
            castShadow
          >
            <meshStandardMaterial color={c.color} roughness={0.85} />
          </Cylinder>
          {/* Trunk Dome Top */}
          <Sphere args={[c.trunkR, 10, 8]} position={[0, c.trunkH, 0]} castShadow>
            <meshStandardMaterial color={c.color} roughness={0.85} />
          </Sphere>

          {/* Needles Hint at trunk top: tiny white dots */}
          <Sphere args={[0.03, 4, 4]} position={[0, c.trunkH + 0.04, 0]}>
            <meshBasicMaterial color="#ffffff" />
          </Sphere>
          <Sphere args={[0.02, 4, 4]} position={[c.trunkR * 0.7, c.trunkH + 0.02, 0]}>
            <meshBasicMaterial color="#ffffff" />
          </Sphere>
          <Sphere args={[0.02, 4, 4]} position={[-c.trunkR * 0.7, c.trunkH + 0.02, 0]}>
            <meshBasicMaterial color="#ffffff" />
          </Sphere>
          <Sphere args={[0.02, 4, 4]} position={[0, c.trunkH + 0.02, c.trunkR * 0.7]}>
            <meshBasicMaterial color="#ffffff" />
          </Sphere>
          <Sphere args={[0.02, 4, 4]} position={[0, c.trunkH + 0.02, -c.trunkR * 0.7]}>
            <meshBasicMaterial color="#ffffff" />
          </Sphere>

          {/* 0-2 Arms: smaller cylinders at angles */}
          {c.arms.map((arm, armIdx) => (
            <group key={`arm-${armIdx}`} position={[0, arm.y, 0]} rotation={[0, arm.rotY, 0]}>
              {/* Horizontal connector */}
              <Cylinder
                args={[arm.armR, arm.armR, arm.len * 0.5, 8]}
                position={[arm.side * (c.trunkR + arm.len * 0.22), 0, 0]}
                rotation={[0, 0, Math.PI / 2]}
                castShadow
              >
                <meshStandardMaterial color={c.color} roughness={0.85} />
              </Cylinder>
              {/* Upward branch */}
              <group position={[arm.side * (c.trunkR + arm.len * 0.42), arm.len * 0.35, 0]}>
                <Cylinder args={[arm.armR, arm.armR, arm.len * 0.7, 8]} position={[0, 0, 0]} castShadow>
                  <meshStandardMaterial color={c.color} roughness={0.85} />
                </Cylinder>
                <Sphere args={[arm.armR, 8, 8]} position={[0, arm.len * 0.35, 0]} castShadow>
                  <meshStandardMaterial color={c.color} roughness={0.85} />
                </Sphere>
                {/* Needle hint on arm top */}
                <Sphere args={[0.025, 4, 4]} position={[0, arm.len * 0.35 + 0.03, 0]}>
                  <meshBasicMaterial color="#ffffff" />
                </Sphere>
              </group>
            </group>
          ))}
        </group>
      ))}

      {/* 5. Desert Rocks - 15-20 angular rock formations using Box geometries at varied angles */}
      {rocksData.map((rock, i) => (
        <Box
          key={`rock-${i}`}
          args={[rock.scale[0], rock.scale[1], rock.scale[2]]}
          position={rock.pos}
          rotation={rock.rot}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color={rock.color} roughness={0.92} metalness={0.08} />
        </Box>
      ))}

      {/* 6. Oasis - small water pool (blue semi-transparent circle plane) + 3-4 palm trees */}
      <group position={[-5.5, 0, 4.0]}>
        {/* Moist shoreline ring */}
        <mesh position={[0, 0.012, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[2.55, 36]} />
          <meshStandardMaterial color="#8b7348" roughness={0.65} />
        </mesh>
        {/* Blue semi-transparent water pool */}
        <mesh position={[0, 0.024, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[2.2, 48]} />
          <meshStandardMaterial
            color="#0284c7"
            transparent
            opacity={0.82}
            roughness={0.08}
            metalness={0.6}
          />
        </mesh>
        {/* Deep blue spring center */}
        <mesh position={[0, 0.028, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.35, 32]} />
          <meshStandardMaterial
            color="#0369a1"
            transparent
            opacity={0.68}
            roughness={0.05}
            metalness={0.8}
          />
        </mesh>

        {/* 4 Palm Trees surrounding the pool */}
        {[
          { pos: [-1.6, 0, 0.6] as [number, number, number], trunkH: 3.8, rot: [0.12, 0.4, 0.15] as [number, number, number] },
          { pos: [1.6, 0, 1.1] as [number, number, number], trunkH: 3.4, rot: [-0.14, -0.3, -0.1] as [number, number, number] },
          { pos: [0.8, 0, -1.7] as [number, number, number], trunkH: 3.9, rot: [0.15, 0.2, -0.12] as [number, number, number] },
          { pos: [-1.3, 0, -1.3] as [number, number, number], trunkH: 3.2, rot: [0.08, -0.6, 0.14] as [number, number, number] },
        ].map((palm, pIdx) => (
          <group key={`palm-${pIdx}`} position={palm.pos} rotation={palm.rot}>
            {/* Thin curved trunk */}
            <Cylinder
              args={[0.075, 0.15, palm.trunkH, 8]}
              position={[0, palm.trunkH / 2, 0]}
              castShadow
            >
              <meshStandardMaterial color="#5c4033" roughness={0.9} />
            </Cylinder>
            {/* Trunk texture rings */}
            <Cylinder
              args={[0.11, 0.11, 0.05, 8]}
              position={[0, palm.trunkH * 0.35, 0]}
            >
              <meshStandardMaterial color="#4a3428" roughness={0.95} />
            </Cylinder>
            <Cylinder
              args={[0.095, 0.095, 0.05, 8]}
              position={[0, palm.trunkH * 0.65, 0]}
            >
              <meshStandardMaterial color="#4a3428" roughness={0.95} />
            </Cylinder>

            {/* Palm fronds in green (cones fanning out from crown) */}
            <group position={[0, palm.trunkH, 0]}>
              {/* Coconuts / dates */}
              <Sphere args={[0.09, 6, 6]} position={[0.12, -0.1, 0.08]}>
                <meshStandardMaterial color="#78350f" roughness={0.8} />
              </Sphere>
              <Sphere args={[0.09, 6, 6]} position={[-0.1, -0.12, 0.1]}>
                <meshStandardMaterial color="#78350f" roughness={0.8} />
              </Sphere>
              <Sphere args={[0.08, 6, 6]} position={[0.05, -0.14, -0.12]}>
                <meshStandardMaterial color="#78350f" roughness={0.8} />
              </Sphere>

              {/* 7 Arching green frond cones */}
              {Array.from({ length: 7 }).map((_, fIdx) => {
                const angle = fIdx * ((Math.PI * 2) / 7);
                return (
                  <group key={`frond-${fIdx}`} rotation={[0.42, angle, 0]}>
                    <mesh
                      position={[0, -0.3, 1.0]}
                      rotation={[Math.PI / 3, 0, 0]}
                      scale={[0.55, 1.5, 0.2]}
                      castShadow
                    >
                      <coneGeometry args={[0.35, 1.8, 6]} />
                      <meshStandardMaterial
                        color={fIdx % 2 === 0 ? '#15803d' : '#16a34a'}
                        roughness={0.7}
                      />
                    </mesh>
                  </group>
                );
              })}
              {/* Top crown tuft */}
              <mesh position={[0, 0.18, 0]} scale={[0.6, 0.8, 0.6]}>
                <coneGeometry args={[0.4, 0.9, 6]} />
                <meshStandardMaterial color="#22c55e" roughness={0.7} />
              </mesh>
            </group>
          </group>
        ))}
      </group>

      {/* 7. Sun - large bright yellow/orange sphere high up in the sky (position [8, 12, -8]) */}
      <group position={[8, 12, -8]}>
        {/* Core sphere */}
        <Sphere args={[2.4, 32, 32]}>
          <meshBasicMaterial color="#ffaa00" />
        </Sphere>
        {/* Inner corona glow */}
        <Sphere args={[3.2, 24, 24]}>
          <meshBasicMaterial color="#ff8800" transparent opacity={0.25} side={THREE.BackSide} />
        </Sphere>
        {/* Outer corona glow */}
        <Sphere args={[4.4, 24, 24]}>
          <meshBasicMaterial color="#ff5500" transparent opacity={0.08} side={THREE.BackSide} />
        </Sphere>
      </group>

      {/* 8. Dust particles - Points buffer geometry with 1500 tan-colored particles */}
      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dustPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.075}
          color="#d4a853"
          transparent
          opacity={0.7}
          sizeAttenuation
        />
      </points>

      {/* 9. Sparkles - golden/tan sparkles for heat shimmer */}
      <Sparkles
        count={160}
        scale={[26, 7, 26]}
        position={[0, 3, 0]}
        size={3.5}
        speed={0.4}
        opacity={0.55}
        color="#f59e0b"
      />
      <Sparkles
        count={90}
        scale={[22, 3, 22]}
        position={[0, 1.2, 0]}
        size={2.2}
        speed={0.25}
        opacity={0.65}
        color="#e8c97a"
      />

      {/* 10. Labels (when showLabels=true):
          'Sahara Desert', 'Sand Dunes', 'Desert Oasis', 'Extreme Heat Zone', 'Arid Ecosystem' */}
      {showLabels && (
        <group>
          {/* Main Title: Sahara Desert */}
          <Float speed={1.2} floatIntensity={0.25}>
            <Billboard position={[0, 6.2, -1]}>
              <Text
                fontSize={0.42}
                color="#fbbf24"
                anchorX="center"
                anchorY="bottom"
                outlineWidth={0.035}
                outlineColor="#451a03"
              >
                SAHARA DESERT
              </Text>
            </Billboard>
            <Html position={[0, 5.65, -1]} center className="pointer-events-none select-none">
              <div
                className={`px-3.5 py-1.5 rounded-xl border backdrop-blur-md shadow-xl transition-all duration-300 flex flex-col items-center gap-0.5 whitespace-nowrap ${
                  activeZone === 'sahara'
                    ? 'bg-amber-950/90 border-amber-400 text-white shadow-amber-500/30 scale-105'
                    : 'bg-black/85 border-amber-500/40 text-amber-300 shadow-amber-950/50'
                }`}
                onMouseEnter={() => setActiveZone('sahara')}
                onMouseLeave={() => setActiveZone(null)}
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  <span className="font-mono text-xs font-bold tracking-wider">Sahara Desert</span>
                </div>
                <span className="text-amber-200/70 text-[9px] font-sans">
                  9,200,000 km² Hyper-Arid Biome
                </span>
              </div>
            </Html>
          </Float>

          {/* Sand Dunes */}
          <Html position={[4.8, 3.8, -4.0]} center className="pointer-events-none select-none">
            <div
              className={`px-3 py-1.5 rounded-lg border backdrop-blur-md font-mono text-[10px] tracking-widest uppercase shadow-lg transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap ${
                activeZone === 'dunes'
                  ? 'bg-yellow-950/90 border-yellow-300 text-white shadow-yellow-500/30 scale-105'
                  : 'bg-black/80 border-yellow-500/40 text-yellow-300 shadow-black/50'
              }`}
              onMouseEnter={() => setActiveZone('dunes')}
              onMouseLeave={() => setActiveZone(null)}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
              <span>Sand Dunes</span>
            </div>
          </Html>

          {/* Desert Oasis */}
          <Html position={[-5.5, 4.5, 4.0]} center className="pointer-events-none select-none">
            <div
              className={`px-3 py-1.5 rounded-lg border backdrop-blur-md font-mono text-[10px] tracking-widest uppercase shadow-lg transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap ${
                activeZone === 'oasis'
                  ? 'bg-sky-950/90 border-sky-300 text-white shadow-sky-500/30 scale-105'
                  : 'bg-black/80 border-sky-500/40 text-sky-300 shadow-black/50'
              }`}
              onMouseEnter={() => setActiveZone('oasis')}
              onMouseLeave={() => setActiveZone(null)}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              <span>Desert Oasis</span>
            </div>
          </Html>

          {/* Extreme Heat Zone */}
          <Html position={[7.0, 5.0, 3.2]} center className="pointer-events-none select-none">
            <div
              className={`px-3 py-1.5 rounded-lg border backdrop-blur-md font-mono text-[10px] tracking-widest uppercase shadow-lg transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap ${
                activeZone === 'heat'
                  ? 'bg-orange-950/90 border-orange-300 text-white shadow-orange-500/30 scale-105'
                  : 'bg-black/80 border-orange-500/40 text-orange-400 shadow-black/50'
              }`}
              onMouseEnter={() => setActiveZone('heat')}
              onMouseLeave={() => setActiveZone(null)}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              <span>Extreme Heat Zone</span>
            </div>
          </Html>

          {/* Arid Ecosystem */}
          <Html position={[-2.8, 3.2, -4.2]} center className="pointer-events-none select-none">
            <div
              className={`px-3 py-1.5 rounded-lg border backdrop-blur-md font-mono text-[10px] tracking-widest uppercase shadow-lg transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap ${
                activeZone === 'eco'
                  ? 'bg-emerald-950/90 border-emerald-300 text-white shadow-emerald-500/30 scale-105'
                  : 'bg-black/80 border-emerald-500/40 text-emerald-400 shadow-black/50'
              }`}
              onMouseEnter={() => setActiveZone('eco')}
              onMouseLeave={() => setActiveZone(null)}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Arid Ecosystem</span>
            </div>
          </Html>
        </group>
      )}
    </group>
  );
}
