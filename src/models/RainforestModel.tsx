import { useState, useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Float, Sparkles, Billboard, Text, Cylinder, Sphere, Box } from '@react-three/drei';
import * as THREE from 'three';

// ---------------------------------------------------------------------------
// Deterministic seeded random helper for stable visual distribution
// ---------------------------------------------------------------------------
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999.123) * 10000;
  return x - Math.floor(x);
}

// ---------------------------------------------------------------------------
// Wildlife / Bird Definition
// ---------------------------------------------------------------------------
interface BirdConfig {
  name: string;
  bodyColor: string;
  wingColor: string;
  beakColor: string;
  radiusX: number;
  radiusZ: number;
  height: number;
  speed: number;
  offset: number;
  scale: number;
}

const BIRDS_CONFIG: BirdConfig[] = [
  { name: 'Scarlet Macaw', bodyColor: '#ef4444', wingColor: '#eab308', beakColor: '#fbbf24', radiusX: 7.2, radiusZ: 6.5, height: 6.8, speed: 0.9, offset: 0, scale: 0.8 },
  { name: 'Emerald Toucan', bodyColor: '#059669', wingColor: '#84cc16', beakColor: '#f97316', radiusX: 5.8, radiusZ: 6.0, height: 5.5, speed: 1.1, offset: 1.5, scale: 0.7 },
  { name: 'Blue Macaw', bodyColor: '#2563eb', wingColor: '#38bdf8', beakColor: '#fbbf24', radiusX: 8.0, radiusZ: 7.0, height: 7.5, speed: 0.8, offset: 2.8, scale: 0.85 },
  { name: 'Sun Conure', bodyColor: '#f97316', wingColor: '#fde047', beakColor: '#dc2626', radiusX: 5.0, radiusZ: 5.2, height: 5.0, speed: 1.3, offset: 4.1, scale: 0.65 },
  { name: 'Amazon Kingfisher', bodyColor: '#0284c7', wingColor: '#06b6d4', beakColor: '#ea580c', radiusX: 6.0, radiusZ: 4.8, height: 4.2, speed: 1.4, offset: 5.0, scale: 0.7 },
  { name: 'Violet Hummingbird', bodyColor: '#9333ea', wingColor: '#c084fc', beakColor: '#fbbf24', radiusX: 4.2, radiusZ: 4.0, height: 3.6, speed: 1.7, offset: 5.9, scale: 0.55 },
];

function AnimatedBird({ config }: { config: BirdConfig }) {
  const birdGroupRef = useRef<THREE.Group>(null);
  const leftWingRef = useRef<THREE.Group>(null);
  const rightWingRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * config.speed + config.offset;
    const x = Math.cos(t) * config.radiusX;
    const z = Math.sin(t) * config.radiusZ;
    const y = config.height + Math.sin(t * 2.2) * 0.4;

    // Heading tangent
    const dx = -Math.sin(t) * config.radiusX;
    const dz = Math.cos(t) * config.radiusZ;
    const heading = Math.atan2(dx, dz);

    if (birdGroupRef.current) {
      birdGroupRef.current.position.set(x, y, z);
      birdGroupRef.current.rotation.set(
        Math.cos(t * 2.2) * 0.08,
        heading,
        -0.15 * config.speed
      );
    }

    // High frequency wing flapping
    const flap = Math.sin(state.clock.getElapsedTime() * 22 + config.offset) * 0.55;
    if (leftWingRef.current) leftWingRef.current.rotation.z = flap;
    if (rightWingRef.current) rightWingRef.current.rotation.z = -flap;
  });

  return (
    <group ref={birdGroupRef} scale={config.scale}>
      {/* Body */}
      <Sphere args={[0.2, 10, 10]} scale={[1, 0.75, 1.5]}>
        <meshStandardMaterial color={config.bodyColor} roughness={0.3} />
      </Sphere>

      {/* Head */}
      <Sphere args={[0.12, 8, 8]} position={[0, 0.08, 0.22]}>
        <meshStandardMaterial color={config.bodyColor} roughness={0.3} />
      </Sphere>

      {/* Beak */}
      <Cylinder
        args={[0.01, 0.05, 0.18, 6]}
        position={[0, 0.06, 0.36]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial color={config.beakColor} roughness={0.2} metalness={0.1} />
      </Cylinder>

      {/* Tail Feathers */}
      <Box args={[0.14, 0.02, 0.4]} position={[0, -0.02, -0.35]} rotation={[-0.15, 0, 0]}>
        <meshStandardMaterial color={config.wingColor} roughness={0.5} />
      </Box>

      {/* Left Wing */}
      <group ref={leftWingRef} position={[-0.14, 0.05, 0]}>
        <Box args={[0.42, 0.02, 0.18]} position={[-0.21, 0, 0]}>
          <meshStandardMaterial color={config.wingColor} roughness={0.4} />
        </Box>
      </group>

      {/* Right Wing */}
      <group ref={rightWingRef} position={[0.14, 0.05, 0]}>
        <Box args={[0.42, 0.02, 0.18]} position={[0.21, 0, 0]}>
          <meshStandardMaterial color={config.wingColor} roughness={0.4} />
        </Box>
      </group>
    </group>
  );
}

// ---------------------------------------------------------------------------
// Continuous Rain Simulation using Points BufferGeometry
// ---------------------------------------------------------------------------
function RainParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 1200;

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random()) * 11.5;
      pos[i * 3] = r * Math.cos(angle);
      pos[i * 3 + 1] = Math.random() * 14;
      pos[i * 3 + 2] = r * Math.sin(angle);
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current || !pointsRef.current.geometry) return;
    const posAttr = pointsRef.current.geometry.attributes.position;
    if (!posAttr) return;
    const array = posAttr.array as Float32Array;
    const fallDistance = Math.min(delta, 0.1) * 12.0;

    for (let i = 0; i < particleCount; i++) {
      array[i * 3 + 1] -= fallDistance;
      // Reset particle to top of canopy when hitting ground
      if (array[i * 3 + 1] < 0.1) {
        array[i * 3 + 1] = 13.0 + Math.random() * 2.0;
        const angle = Math.random() * Math.PI * 2;
        const r = Math.sqrt(Math.random()) * 11.5;
        array[i * 3] = r * Math.cos(angle);
        array[i * 3 + 2] = r * Math.sin(angle);
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#bae6fd"
        size={0.06}
        transparent
        opacity={0.45}
        depthWrite={false}
      />
    </points>
  );
}

// ---------------------------------------------------------------------------
// Curved Animated River Mesh with Surface Waves
// ---------------------------------------------------------------------------
function River() {
  const riverMeshRef = useRef<THREE.Mesh>(null);

  const { geometry } = useMemo(() => {
    const segments = 60;
    const pos = new Float32Array((segments + 1) * 2 * 3);
    const uvs = new Float32Array((segments + 1) * 2 * 2);
    const indices: number[] = [];

    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const z = -12.5 + t * 25.0;
      // Snaking river curve shape using Math.sin
      const x = 3.0 * Math.sin(0.25 * z) + 0.6 * Math.cos(0.55 * z);
      const dx = 3.0 * 0.25 * Math.cos(0.25 * z) - 0.6 * 0.55 * Math.sin(0.55 * z);
      const normLen = Math.sqrt(1 + dx * dx);
      const nx = -1 / normLen;
      const nz = dx / normLen;
      const w = 1.35 + 0.3 * Math.sin(z * 0.3);

      const baseIdx = i * 2;
      // Left river edge vertex
      pos[baseIdx * 3] = x + nx * w;
      pos[baseIdx * 3 + 1] = 0.12;
      pos[baseIdx * 3 + 2] = z + nz * w;
      uvs[baseIdx * 2] = 0;
      uvs[baseIdx * 2 + 1] = t;

      // Right river edge vertex
      pos[(baseIdx + 1) * 3] = x - nx * w;
      pos[(baseIdx + 1) * 3 + 1] = 0.12;
      pos[(baseIdx + 1) * 3 + 2] = z - nz * w;
      uvs[(baseIdx + 1) * 2] = 1;
      uvs[(baseIdx + 1) * 2 + 1] = t;

      if (i < segments) {
        indices.push(baseIdx, baseIdx + 1, baseIdx + 2);
        indices.push(baseIdx + 1, baseIdx + 3, baseIdx + 2);
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    geo.setIndex(indices);
    geo.computeVertexNormals();

    return { geometry: geo };
  }, []);

  useFrame((state) => {
    if (!riverMeshRef.current || !riverMeshRef.current.geometry) return;
    const time = state.clock.getElapsedTime();
    const pos = riverMeshRef.current.geometry.attributes.position;
    if (!pos) return;
    const array = pos.array as Float32Array;

    for (let i = 0; i < array.length / 3; i++) {
      const x = array[i * 3];
      const z = array[i * 3 + 2];
      array[i * 3 + 1] =
        0.12 +
        Math.sin(z * 1.2 + time * 3.0) * 0.02 +
        Math.cos(x * 1.6 + time * 2.2) * 0.015;
    }
    pos.needsUpdate = true;
  });

  return (
    <group>
      {/* Sandy/Silt Riverbed Base */}
      <mesh ref={riverMeshRef} geometry={geometry}>
        <meshStandardMaterial
          color="#0ea5e9"
          roughness={0.1}
          metalness={0.3}
          transparent
          opacity={0.92}
        />
      </mesh>
    </group>
  );
}

// ---------------------------------------------------------------------------
// Atmospheric Mist/Fog - Low lying gentle clouds
// ---------------------------------------------------------------------------
const MIST_CONFIG = [
  { pos: [-3.0, 1.2, -2.5] as [number, number, number], r: 2.8, opacity: 0.06 },
  { pos: [3.5, 1.4, 2.0] as [number, number, number], r: 3.2, opacity: 0.07 },
  { pos: [-1.5, 2.0, 4.0] as [number, number, number], r: 2.5, opacity: 0.05 },
  { pos: [2.0, 1.8, -4.5] as [number, number, number], r: 3.0, opacity: 0.06 },
  { pos: [0.0, 2.2, 0.0] as [number, number, number], r: 3.4, opacity: 0.05 },
];

function AtmosphericMist() {
  const mistGroupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (mistGroupRef.current) {
      mistGroupRef.current.position.y = Math.sin(t * 0.4) * 0.15;
      mistGroupRef.current.rotation.y = t * 0.01;
    }
  });

  return (
    <group ref={mistGroupRef}>
      {MIST_CONFIG.map((cfg, idx) => (
        <Sphere key={idx} args={[cfg.r, 12, 12]} position={cfg.pos}>
          <meshStandardMaterial
            color="#f0fdf4"
            transparent
            opacity={cfg.opacity}
            depthWrite={false}
            roughness={1.0}
          />
        </Sphere>
      ))}
    </group>
  );
}

// ---------------------------------------------------------------------------
// Tree Cluster Data Generation via Fibonacci Phyllotaxis Spiral
// ---------------------------------------------------------------------------
interface TreeData {
  type: 'tall' | 'medium' | 'understory';
  x: number;
  z: number;
  yOffset: number;
  height: number;
  scale: number;
  color1: string;
  color2: string;
  color3: string;
  rotationY: number;
}

function useForestData() {
  return useMemo(() => {
    const trees: TreeData[] = [];
    const totalTrees = 75;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // ~2.4 rad

    const mediumGreens = ['#166534', '#15803d', '#14532d', '#1e5631', '#2e7d32', '#388e3c', '#40916c'];
    const understoryGreens = ['#4ade80', '#22c55e', '#86efac', '#6ee7b7', '#34d399'];

    for (let i = 0; i < totalTrees; i++) {
      const seed = i + 1;
      const t = (i + 1) / totalTrees;
      const r = Math.sqrt(t) * 11.2 + 0.8;
      const theta = i * goldenAngle;

      let x = r * Math.cos(theta);
      let z = r * Math.sin(theta);

      // Avoid placing trees directly inside the river path
      const riverCenter = 3.0 * Math.sin(0.25 * z) + 0.6 * Math.cos(0.55 * z);
      const distFromRiver = Math.abs(x - riverCenter);
      if (distFromRiver < 1.7) {
        const pushDir = x >= riverCenter ? 1 : -1;
        x = riverCenter + pushDir * (1.7 + seededRandom(seed * 2.3) * 0.5);
      }

      // Constrain inside ground perimeter (radius 12.2)
      const currentRadius = Math.sqrt(x * x + z * z);
      if (currentRadius > 12.2) {
        x *= 12.2 / currentRadius;
        z *= 12.2 / currentRadius;
      }

      const yOffset = (seededRandom(seed * 4.7) - 0.5) * 0.1;
      const scale = 0.85 + seededRandom(seed * 5.9) * 0.35;
      const rotationY = seededRandom(seed * 6.3) * Math.PI * 2;

      if (i % 4 === 0) {
        // Tall Emergent Trees (h=6-10)
        const height = 5.8 + seededRandom(seed * 7.1) * 3.2;
        trees.push({
          type: 'tall',
          x,
          z,
          yOffset,
          height,
          scale,
          color1: '#14532d',
          color2: '#166534',
          color3: '#22c55e',
          rotationY,
        });
      } else if (i % 4 === 1 || i % 4 === 2) {
        // Medium Trees (h=3-6)
        const height = 3.0 + seededRandom(seed * 8.3) * 2.5;
        const c1 = mediumGreens[Math.floor(seededRandom(seed * 9.2) * mediumGreens.length)];
        const c2 = mediumGreens[Math.floor(seededRandom(seed * 9.7) * mediumGreens.length)];
        const c3 = mediumGreens[Math.floor(seededRandom(seed * 10.1) * mediumGreens.length)];
        trees.push({
          type: 'medium',
          x,
          z,
          yOffset,
          height,
          scale,
          color1: c1,
          color2: c2,
          color3: c3,
          rotationY,
        });
      } else {
        // Understory Plants (small, h=1-2)
        const height = 1.0 + seededRandom(seed * 11.3) * 0.8;
        const c1 = understoryGreens[Math.floor(seededRandom(seed * 12.1) * understoryGreens.length)];
        const c2 = understoryGreens[Math.floor(seededRandom(seed * 12.8) * understoryGreens.length)];
        trees.push({
          type: 'understory',
          x,
          z,
          yOffset,
          height,
          scale: scale * 0.9,
          color1: c1,
          color2: c2,
          color3: c1,
          rotationY,
        });
      }
    }
    return trees;
  }, []);
}

// ---------------------------------------------------------------------------
// Tall Tree Component (Thick trunk, buttress roots, 3 stacked canopy spheres)
// ---------------------------------------------------------------------------
function TallTree({ data }: { data: TreeData }) {
  const { x, z, yOffset, height, scale, color1, color2, color3, rotationY } = data;

  return (
    <group position={[x, yOffset, z]} scale={scale} rotation={[0, rotationY, 0]}>
      {/* Main Trunk */}
      <Cylinder
        args={[0.2, 0.4, height, 8]}
        position={[0, height / 2, 0]}
        castShadow
      >
        <meshStandardMaterial color="#451a03" roughness={0.9} />
      </Cylinder>

      {/* Buttress Roots */}
      {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((angle, idx) => (
        <Box
          key={idx}
          args={[0.1, height * 0.25, 0.65]}
          position={[Math.cos(angle) * 0.35, (height * 0.25) / 2, Math.sin(angle) * 0.35]}
          rotation={[0, -angle, Math.PI / 12]}
        >
          <meshStandardMaterial color="#381a08" roughness={0.95} />
        </Box>
      ))}

      {/* Layered Canopy: 3 stacked spheres deep green */}
      <Sphere
        args={[1.8, 10, 10]}
        position={[0, height + 0.1, 0]}
        scale={[1.1, 0.75, 1.1]}
        castShadow
      >
        <meshStandardMaterial color={color1} roughness={0.7} />
      </Sphere>

      <Sphere
        args={[1.5, 10, 10]}
        position={[0.25, height + 0.9, 0.2]}
        scale={[1.05, 0.8, 1.0]}
        castShadow
      >
        <meshStandardMaterial color={color2} roughness={0.7} />
      </Sphere>

      <Sphere
        args={[1.2, 8, 8]}
        position={[-0.2, height + 1.6, -0.15]}
        scale={[1.0, 0.85, 1.0]}
        castShadow
      >
        <meshStandardMaterial color={color3} roughness={0.65} />
      </Sphere>
    </group>
  );
}

// ---------------------------------------------------------------------------
// Medium Tree Component
// ---------------------------------------------------------------------------
function MediumTree({ data }: { data: TreeData }) {
  const { x, z, yOffset, height, scale, color1, color2, color3, rotationY } = data;

  return (
    <group position={[x, yOffset, z]} scale={scale} rotation={[0, rotationY, 0]}>
      {/* Trunk */}
      <Cylinder
        args={[0.12, 0.2, height, 6]}
        position={[0, height / 2, 0]}
        castShadow
      >
        <meshStandardMaterial color="#543016" roughness={0.9} />
      </Cylinder>

      {/* Canopy Spheres */}
      <Sphere
        args={[1.2, 8, 8]}
        position={[0, height, 0]}
        scale={[1.1, 0.85, 1.05]}
        castShadow
      >
        <meshStandardMaterial color={color1} roughness={0.75} />
      </Sphere>

      <Sphere
        args={[0.95, 8, 8]}
        position={[0.22, height + 0.45, 0.15]}
        scale={[1.0, 0.85, 1.0]}
        castShadow
      >
        <meshStandardMaterial color={color2} roughness={0.75} />
      </Sphere>

      <Sphere
        args={[0.75, 6, 6]}
        position={[-0.18, height + 0.3, -0.18]}
        scale={[0.95, 0.8, 0.95]}
        castShadow
      >
        <meshStandardMaterial color={color3} roughness={0.75} />
      </Sphere>
    </group>
  );
}

// ---------------------------------------------------------------------------
// Understory Plant Component
// ---------------------------------------------------------------------------
function UnderstoryPlant({ data }: { data: TreeData }) {
  const { x, z, yOffset, height, scale, color1, color2, rotationY } = data;
  const frondCount = 5;

  return (
    <group position={[x, yOffset, z]} scale={scale} rotation={[0, rotationY, 0]}>
      <Cylinder args={[0.05, 0.09, height, 5]} position={[0, height / 2, 0]}>
        <meshStandardMaterial color="#365314" roughness={0.8} />
      </Cylinder>

      {Array.from({ length: frondCount }).map((_, fIdx) => {
        const frondAngle = (fIdx / frondCount) * Math.PI * 2;
        const frondColor = fIdx % 2 === 0 ? color1 : color2;

        return (
          <group key={fIdx} position={[0, height * 0.9, 0]} rotation={[0, frondAngle, 0]}>
            <Box args={[0.18, 0.02, 1.0]} position={[0, -0.12, 0.45]} rotation={[0.4, 0, 0]}>
              <meshStandardMaterial color={frondColor} roughness={0.6} />
            </Box>
          </group>
        );
      })}
    </group>
  );
}

// ---------------------------------------------------------------------------
// Forest Floor Details (Moss mounds, pebbles, fallen logs)
// ---------------------------------------------------------------------------
function ForestFloorDetails() {
  const details = useMemo(() => {
    const mounds = [
      { pos: [-3.0, 0.1, 2.0] as [number, number, number], scale: [1.8, 0.3, 1.5] as [number, number, number], col: '#1e3a1e' },
      { pos: [3.8, 0.1, -2.8] as [number, number, number], scale: [2.0, 0.35, 1.7] as [number, number, number], col: '#225426' },
      { pos: [-4.2, 0.1, -3.5] as [number, number, number], scale: [1.6, 0.28, 1.4] as [number, number, number], col: '#163819' },
      { pos: [2.4, 0.1, 3.6] as [number, number, number], scale: [2.0, 0.32, 1.8] as [number, number, number], col: '#1e3a1e' },
    ];

    const pebbles = [
      { pos: [1.6, 0.12, -3.0] as [number, number, number], r: 0.3, col: '#475569' },
      { pos: [1.2, 0.1, -1.5] as [number, number, number], r: 0.24, col: '#64748b' },
      { pos: [3.4, 0.11, 1.8] as [number, number, number], r: 0.36, col: '#334155' },
      { pos: [2.8, 0.1, 3.4] as [number, number, number], r: 0.26, col: '#475569' },
      { pos: [-1.0, 0.09, 1.2] as [number, number, number], r: 0.28, col: '#64748b' },
    ];

    const logs = [
      { pos: [-3.2, 0.15, -1.2] as [number, number, number], rotY: 0.6, len: 2.4, r: 0.18 },
      { pos: [3.6, 0.14, 0.6] as [number, number, number], rotY: -0.7, len: 2.8, r: 0.2 },
      { pos: [-1.5, 0.13, 4.2] as [number, number, number], rotY: 1.1, len: 2.0, r: 0.16 },
    ];

    return { mounds, pebbles, logs };
  }, []);

  return (
    <group>
      {details.mounds.map((m, i) => (
        <Sphere key={`mound-${i}`} args={[1, 8, 8]} position={m.pos} scale={m.scale}>
          <meshStandardMaterial color={m.col} roughness={0.95} />
        </Sphere>
      ))}

      {details.pebbles.map((p, i) => (
        <Sphere key={`pebble-${i}`} args={[p.r, 6, 6]} position={p.pos} scale={[1.2, 0.6, 1.0]}>
          <meshStandardMaterial color={p.col} roughness={0.7} />
        </Sphere>
      ))}

      {details.logs.map((log, i) => (
        <Cylinder
          key={`log-${i}`}
          args={[log.r, log.r, log.len, 6]}
          position={log.pos}
          rotation={[Math.PI / 2, log.rotY, 0]}
        >
          <meshStandardMaterial color="#3b1d0c" roughness={0.9} />
        </Cylinder>
      ))}
    </group>
  );
}

// ---------------------------------------------------------------------------
// Main RainforestModel Export
// ---------------------------------------------------------------------------
export function RainforestModel({ showLabels = true }: { showLabels?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const forestData = useForestData();
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);

  // Slow rotation on the whole group
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += Math.min(delta, 0.1) * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={[0, -2.2, 0]} scale={0.72}>
      {/* ------------------------------------------------------------- */}
      {/* Atmospheric Lighting                                          */}
      {/* ------------------------------------------------------------- */}
      {/* Vibrant warm green ambient fill */}
      <ambientLight intensity={1.4} color="#dcfce7" />

      {/* Main sunlight beam through upper canopy */}
      <directionalLight
        position={[14, 22, 12]}
        intensity={2.8}
        color="#fef9c3"
        castShadow
      />

      {/* Blue skylight bounce */}
      <directionalLight
        position={[-12, 18, -10]}
        intensity={1.2}
        color="#bae6fd"
      />

      {/* Bioluminescent / lush undergrowth point glow */}
      <pointLight
        position={[0, 2.5, 0]}
        intensity={5.0}
        distance={22}
        color="#4ade80"
      />

      {/* ------------------------------------------------------------- */}
      {/* Ground Floor - Dark Green Ground Plane (Circle, Radius 14)    */}
      {/* ------------------------------------------------------------- */}
      <group>
        {/* Main Lush Ground Cylinder (Radius 14) */}
        <Cylinder
          args={[14, 14.2, 0.6, 48]}
          position={[0, -0.3, 0]}
          receiveShadow
        >
          <meshStandardMaterial color="#14532d" roughness={0.9} />
        </Cylinder>

        {/* Top Living Humus & Moss Disk */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
          <circleGeometry args={[13.95, 48]} />
          <meshStandardMaterial color="#166534" roughness={0.85} />
        </mesh>

        {/* Rich Soil Layer Below */}
        <Cylinder args={[14.2, 14.3, 0.6, 48]} position={[0, -0.9, 0]}>
          <meshStandardMaterial color="#271509" roughness={1.0} />
        </Cylinder>
      </group>

      {/* Forest Floor Terrain Accents */}
      <ForestFloorDetails />

      {/* ------------------------------------------------------------- */}
      {/* Animated River / Stream Snaking Through Forest Floor          */}
      {/* ------------------------------------------------------------- */}
      <River />

      {/* ------------------------------------------------------------- */}
      {/* Dense Forest - 75+ Trees (Tall, Medium, Understory)           */}
      {/* ------------------------------------------------------------- */}
      <group>
        {forestData.map((tree, idx) => {
          if (tree.type === 'tall') {
            return <TallTree key={`tall-${idx}`} data={tree} />;
          }
          if (tree.type === 'medium') {
            return <MediumTree key={`med-${idx}`} data={tree} />;
          }
          return <UnderstoryPlant key={`und-${idx}`} data={tree} />;
        })}
      </group>

      {/* ------------------------------------------------------------- */}
      {/* Gentle Low Mist                                               */}
      {/* ------------------------------------------------------------- */}
      <AtmosphericMist />

      {/* ------------------------------------------------------------- */}
      {/* Sparkles - Green / Cyan Fireflies & Light Rays                */}
      {/* ------------------------------------------------------------- */}
      {/* Green Jungle Fireflies */}
      <Sparkles
        count={75}
        scale={[24, 7, 24]}
        position={[0, 3.0, 0]}
        size={2.8}
        speed={0.6}
        opacity={0.8}
        color="#4ade80"
      />

      {/* Cyan River Vapour */}
      <Sparkles
        count={50}
        scale={[18, 4, 18]}
        position={[0, 1.2, 0]}
        size={2.2}
        speed={0.8}
        opacity={0.7}
        color="#38bdf8"
      />

      {/* Golden Canopy Sunbeams */}
      <Sparkles
        count={45}
        scale={[20, 10, 20]}
        position={[0, 6.5, 0]}
        size={2.0}
        speed={0.4}
        opacity={0.6}
        color="#fde047"
      />

      {/* ------------------------------------------------------------- */}
      {/* Ambient Wildlife - 6 Colorful Flying Birds                    */}
      {/* ------------------------------------------------------------- */}
      <group>
        {BIRDS_CONFIG.map((bConfig, idx) => (
          <AnimatedBird key={`bird-${idx}`} config={bConfig} />
        ))}
      </group>

      {/* ------------------------------------------------------------- */}
      {/* Continuous Rain Particles                                     */}
      {/* ------------------------------------------------------------- */}
      <RainParticles />

      {/* ------------------------------------------------------------- */}
      {/* Informative Educational Labels                                 */}
      {/* ------------------------------------------------------------- */}
      {showLabels && (
        <group>
          {/* Main Title Badge */}
          <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.2} position={[0, 11.2, 0]}>
            <Billboard follow={true}>
              <Text
                fontSize={0.5}
                color="#86efac"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.035}
                outlineColor="#064e3b"
              >
                TROPICAL RAINFOREST
              </Text>
            </Billboard>
            <Html position={[0, -0.5, 0]} center className="pointer-events-none select-none">
              <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/85 border border-emerald-400/40 text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.35)] backdrop-blur-md whitespace-nowrap">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-[10px] tracking-widest uppercase">
                  Equatorial Biome • Class 3 & 5 & 6
                </span>
              </div>
            </Html>
          </Float>

          {/* Canopy Layer Label */}
          <group position={[4.2, 8.2, 2.0]}>
            <Billboard follow={true} position={[0, 0.45, 0]}>
              <Text fontSize={0.26} color="#a7f3d0" anchorX="center" anchorY="bottom" outlineWidth={0.02} outlineColor="#064e3b">
                Canopy Layer
              </Text>
            </Billboard>
            <Html center className="pointer-events-auto select-none">
              <div
                onMouseEnter={() => setHoveredLabel('canopy')}
                onMouseLeave={() => setHoveredLabel(null)}
                className={`flex flex-col items-start gap-1 p-2 rounded-xl border backdrop-blur-md max-w-[165px] transition-all duration-300 ${
                  hoveredLabel === 'canopy'
                    ? 'bg-emerald-950/95 border-emerald-400 text-white scale-105 shadow-[0_0_20px_rgba(16,185,129,0.5)]'
                    : 'bg-black/80 border-emerald-500/30 text-white shadow-xl'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="font-mono text-[10px] font-bold text-emerald-300">Upper Canopy</span>
                </div>
                <p className="text-[9px] text-zinc-300 leading-tight">
                  Dense crowns capturing 90% of sunlight
                </p>
              </div>
            </Html>
          </group>

          {/* Understory Layer Label */}
          <group position={[-4.5, 4.0, 3.0]}>
            <Billboard follow={true} position={[0, 0.45, 0]}>
              <Text fontSize={0.26} color="#5eead4" anchorX="center" anchorY="bottom" outlineWidth={0.02} outlineColor="#042f2e">
                Understory
              </Text>
            </Billboard>
            <Html center className="pointer-events-auto select-none">
              <div
                onMouseEnter={() => setHoveredLabel('understory')}
                onMouseLeave={() => setHoveredLabel(null)}
                className={`flex flex-col items-start gap-1 p-2 rounded-xl border backdrop-blur-md max-w-[165px] transition-all duration-300 ${
                  hoveredLabel === 'understory'
                    ? 'bg-teal-950/95 border-teal-400 text-white scale-105 shadow-[0_0_20px_rgba(20,184,166,0.5)]'
                    : 'bg-black/80 border-emerald-500/30 text-white shadow-xl'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-teal-400" />
                  <span className="font-mono text-[10px] font-bold text-teal-300">Understory</span>
                </div>
                <p className="text-[9px] text-zinc-300 leading-tight">
                  Shade-tolerant palms, ferns & saplings
                </p>
              </div>
            </Html>
          </group>

          {/* Forest Floor Label */}
          <group position={[-3.5, 1.2, -4.2]}>
            <Billboard follow={true} position={[0, 0.45, 0]}>
              <Text fontSize={0.26} color="#bef264" anchorX="center" anchorY="bottom" outlineWidth={0.02} outlineColor="#1a2e05">
                Forest Floor
              </Text>
            </Billboard>
            <Html center className="pointer-events-auto select-none">
              <div
                onMouseEnter={() => setHoveredLabel('floor')}
                onMouseLeave={() => setHoveredLabel(null)}
                className={`flex flex-col items-start gap-1 p-2 rounded-xl border backdrop-blur-md max-w-[165px] transition-all duration-300 ${
                  hoveredLabel === 'floor'
                    ? 'bg-lime-950/95 border-lime-400 text-white scale-105 shadow-[0_0_20px_rgba(163,230,53,0.5)]'
                    : 'bg-black/80 border-emerald-500/30 text-white shadow-xl'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-lime-400" />
                  <span className="font-mono text-[10px] font-bold text-lime-300">Forest Floor</span>
                </div>
                <p className="text-[9px] text-zinc-300 leading-tight">
                  Rapid decomposition, buttress roots & humus
                </p>
              </div>
            </Html>
          </group>

          {/* Biodiversity Hotspot Label */}
          <group position={[3.5, 2.0, -3.8]}>
            <Billboard follow={true} position={[0, 0.45, 0]}>
              <Text fontSize={0.26} color="#67e8f9" anchorX="center" anchorY="bottom" outlineWidth={0.02} outlineColor="#083344">
                Biodiversity Hotspot
              </Text>
            </Billboard>
            <Html center className="pointer-events-auto select-none">
              <div
                onMouseEnter={() => setHoveredLabel('bio')}
                onMouseLeave={() => setHoveredLabel(null)}
                className={`flex flex-col items-start gap-1 p-2 rounded-xl border backdrop-blur-md max-w-[165px] transition-all duration-300 ${
                  hoveredLabel === 'bio'
                    ? 'bg-cyan-950/95 border-cyan-400 text-white scale-105 shadow-[0_0_20px_rgba(6,182,212,0.5)]'
                    : 'bg-black/80 border-cyan-500/30 text-white shadow-xl'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span className="font-mono text-[10px] font-bold text-cyan-300">Biodiversity Hotspot</span>
                </div>
                <p className="text-[9px] text-zinc-300 leading-tight">
                  Over 50% of terrestrial flora & fauna
                </p>
              </div>
            </Html>
          </group>
        </group>
      )}
    </group>
  );
}
