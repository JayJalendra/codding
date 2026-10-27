import { useState, useRef, useMemo, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Float, Sparkles, Billboard, Text, Box, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// ── Pattern 1: Fibonacci Sunflower Spiral ────────────────────────────────────
function SunflowerPattern({
  showLabels,
  isSelected,
  onToggle,
}: {
  showLabels: boolean;
  isSelected: boolean;
  onToggle: () => void;
}) {
  const headRef = useRef<THREE.Group>(null);

  // Golden angle in radians: 137.508 degrees
  const GOLDEN_ANGLE = 137.50776405 * (Math.PI / 180);
  const SEED_COUNT = 200;

  // Precompute 200 seeds using Vogel's Fermat spiral model
  const seeds = useMemo(() => {
    const items = [];
    // Warm sunflower palette: vibrant yellows, rich oranges, and glowing ambers
    const palette = [
      '#f59e0b', // amber
      '#fbbf24', // yellow-amber
      '#f97316', // orange
      '#eab308', // sunflower yellow
      '#facc15', // bright yellow
      '#ea580c', // deep orange
      '#d97706', // deep amber
      '#fef08a', // pale lemon highlight
    ];

    for (let i = 0; i < SEED_COUNT; i++) {
      const r = 0.15 * Math.sqrt(i + 1); // Fermat spiral radius
      const theta = i * GOLDEN_ANGLE;
      const x = r * Math.cos(theta);
      const z = r * Math.sin(theta);
      // Parabolic dome curve for realistic sunflower florets
      const y = -0.035 * (r * r);
      const radius = 0.055 + 0.02 * (i / SEED_COUNT);
      const color = palette[i % palette.length];

      items.push({
        id: i,
        pos: [x, y, z] as [number, number, number],
        radius,
        color,
      });
    }
    return items;
  }, [GOLDEN_ANGLE]);

  // Rotate slowly on Y axis
  useFrame((_, delta) => {
    if (headRef.current) {
      headRef.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <group position={[-5, 0, 0]}>
      {/* Local point light to make golden seeds glow */}
      <pointLight position={[0, 1.5, 2]} color="#f59e0b" intensity={1.8} distance={6} decay={2} />

      {/* Museum Pedestal Ring */}
      <mesh position={[0, -2.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.5, 1.7, 32]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>

      {/* Sunflower Head & Stem - tilted towards camera for optimal viewing */}
      <group rotation={[Math.PI * 0.18, 0, 0]}>
        {/* Rotating seeds disc */}
        <group ref={headRef}>
          {seeds.map((s) => (
            <Sphere key={s.id} args={[s.radius, 10, 10]} position={s.pos}>
              <meshStandardMaterial
                color={s.color}
                roughness={0.25}
                metalness={0.15}
                emissive={s.color}
                emissiveIntensity={isSelected ? 0.45 : 0.22}
              />
            </Sphere>
          ))}

          {/* Calyx / Backing disc */}
          <mesh position={[0, -0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[2.25, 2.3, 0.08, 32]} />
            <meshStandardMaterial color="#451a03" roughness={0.8} />
          </mesh>
        </group>

        {/* Stem */}
        <mesh position={[0, -1.3, -0.2]} rotation={[0.1, 0, 0]}>
          <cylinderGeometry args={[0.07, 0.09, 2.2, 16]} />
          <meshStandardMaterial color="#15803d" roughness={0.7} />
        </mesh>
      </group>

      {/* 3D Title */}
      {showLabels && (
        <Billboard position={[0, 2.6, 0]}>
          <Text
            fontSize={0.28}
            color="#fbbf24"
            anchorX="center"
            anchorY="bottom"
            outlineWidth={0.02}
            outlineColor="#000000"
          >
            Fibonacci Spiral (Sunflower)
          </Text>
        </Billboard>
      )}

      {/* Educational HTML Label */}
      {showLabels && (
        <Html center position={[0, -2.6, 0]} className="pointer-events-auto select-none">
          <div
            onClick={onToggle}
            className={`cursor-pointer w-60 p-3 rounded-2xl bg-black/85 backdrop-blur-md border transition-all duration-300 shadow-xl ${
              isSelected
                ? 'border-amber-400 ring-2 ring-amber-400/50 scale-105'
                : 'border-amber-500/40 hover:border-amber-400 hover:scale-102'
            }`}
          >
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <span>🌻</span> Fibonacci Spiral
              </span>
              <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">
                137.5°
              </span>
            </div>
            <div className="text-[9px] font-mono text-amber-200/90 mb-1">
              Golden Angle • 200 Seeds
            </div>
            <p className="text-[10px] text-zinc-300 leading-snug">
              Sunflowers pack seeds using the Golden Angle so zero space is wasted! Look closely:
              spirals always count up to Fibonacci numbers (21, 34, 55).
            </p>
            {isSelected && (
              <div className="mt-2 pt-2 border-t border-amber-500/30 text-[9px] text-amber-200 bg-amber-950/40 p-1.5 rounded-lg">
                💡 <strong>Try this at home:</strong> Count the spiral rows on a real pinecone,
                pineapple, or sunflower!
              </div>
            )}
          </div>
        </Html>
      )}
    </group>
  );
}

// ── Pattern 2: Recursive Menger Sponge ────────────────────────────────────────
function MengerSponge({
  iteration,
  size,
  position,
}: {
  iteration: number;
  size: number;
  position: [number, number, number];
}) {
  if (iteration === 0) {
    return (
      <Box args={[size, size, size]} position={position}>
        <meshStandardMaterial
          color="#10b981"
          metalness={0.8}
          roughness={0.2}
          emissive="#10b981"
          emissiveIntensity={0.25}
        />
      </Box>
    );
  }
  const newSize = size / 3;
  const cubes = [];
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        const sum = Math.abs(x) + Math.abs(y) + Math.abs(z);
        if (sum > 1) {
          cubes.push(
            <MengerSponge
              key={`${x}-${y}-${z}`}
              iteration={iteration - 1}
              size={newSize}
              position={[
                position[0] + x * newSize,
                position[1] + y * newSize,
                position[2] + z * newSize,
              ]}
            />
          );
        }
      }
    }
  }
  return <group>{cubes}</group>;
}

function MengerSpongePattern({
  showLabels,
  isSelected,
  onToggle,
}: {
  showLabels: boolean;
  isSelected: boolean;
  onToggle: () => void;
}) {
  const spongeRef = useRef<THREE.Group>(null);
  const SPONGE_SIZE = 2.6;

  // Rotates on multiple axes
  useFrame((_, delta) => {
    if (spongeRef.current) {
      spongeRef.current.rotation.x += delta * 0.22;
      spongeRef.current.rotation.y += delta * 0.32;
      spongeRef.current.rotation.z += delta * 0.14;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Point light to accentuate emerald metallic facets */}
      <pointLight position={[0, 2, 2.5]} color="#10b981" intensity={2.2} distance={7} decay={2} />

      {/* Museum Pedestal Ring */}
      <mesh position={[0, -2.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.5, 1.7, 32]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>

      {/* Multi-axis rotating Menger Sponge with wireframe overlay */}
      <group ref={spongeRef}>
        <MengerSponge iteration={2} size={SPONGE_SIZE} position={[0, 0, 0]} />

        {/* Wireframe outer overlay */}
        <Box args={[SPONGE_SIZE * 1.002, SPONGE_SIZE * 1.002, SPONGE_SIZE * 1.002]}>
          <meshBasicMaterial color="#34d399" wireframe transparent opacity={0.35} />
        </Box>
      </group>

      {/* 3D Title */}
      {showLabels && (
        <Billboard position={[0, 2.6, 0]}>
          <Text
            fontSize={0.28}
            color="#34d399"
            anchorX="center"
            anchorY="bottom"
            outlineWidth={0.02}
            outlineColor="#000000"
          >
            Menger Sponge Fractal
          </Text>
        </Billboard>
      )}

      {/* Educational HTML Label */}
      {showLabels && (
        <Html center position={[0, -2.6, 0]} className="pointer-events-auto select-none">
          <div
            onClick={onToggle}
            className={`cursor-pointer w-60 p-3 rounded-2xl bg-black/85 backdrop-blur-md border transition-all duration-300 shadow-xl ${
              isSelected
                ? 'border-emerald-400 ring-2 ring-emerald-400/50 scale-105'
                : 'border-emerald-500/40 hover:border-emerald-400 hover:scale-102'
            }`}
          >
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <span>🧊</span> Menger Sponge Fractal
              </span>
              <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
                Iter 2
              </span>
            </div>
            <div className="text-[9px] font-mono text-emerald-200/90 mb-1">
              Iteration Level 2 • 400 Cubes
            </div>
            <p className="text-[10px] text-zinc-300 leading-snug">
              A 3D fractal shape with infinite surface area and zero volume! Sea sponges and human
              lungs use fractal surfaces to absorb maximum oxygen.
            </p>
            {isSelected && (
              <div className="mt-2 pt-2 border-t border-emerald-500/30 text-[9px] text-emerald-200 bg-emerald-950/40 p-1.5 rounded-lg">
                💡 <strong>Did you know?</strong> If you spread out the branching airways of your
                lungs, they would cover an entire tennis court!
              </div>
            )}
          </div>
        </Html>
      )}
    </group>
  );
}

// ── Pattern 3: Branching Tree (L-System) ──────────────────────────────────────
function TreeBranch({
  level,
  maxLevel,
  length,
  radius,
  rotZ,
  rotY,
}: {
  level: number;
  maxLevel: number;
  length: number;
  radius: number;
  rotZ: number;
  rotY: number;
}) {
  // Color transition: trunk=brown, mid=olive/green, top branches=light green
  const branchColors = [
    '#78350f', // Level 0: Rich bark brown (trunk)
    '#a16207', // Level 1: Warm olive brown
    '#15803d', // Level 2: Forest green
    '#22c55e', // Level 3: Vibrant green
    '#86efac', // Level 4: Spring light green
  ];
  const color = branchColors[Math.min(level, branchColors.length - 1)];
  const topRadius = radius * 0.72;

  return (
    <group rotation={[0, rotY, rotZ]}>
      {/* Cylinder branch geometry */}
      <mesh position={[0, length / 2, 0]}>
        <cylinderGeometry args={[topRadius, radius, length, 10]} />
        <meshStandardMaterial color={color} roughness={0.65} metalness={0.1} />
      </mesh>

      {/* Recursive split at 30° angle (Math.PI / 6) */}
      {level < maxLevel && (
        <group position={[0, length, 0]}>
          {/* Branch A: +30° */}
          <TreeBranch
            level={level + 1}
            maxLevel={maxLevel}
            length={length * 0.72}
            radius={topRadius}
            rotZ={Math.PI / 6}
            rotY={Math.PI / 3}
          />
          {/* Branch B: -30° */}
          <TreeBranch
            level={level + 1}
            maxLevel={maxLevel}
            length={length * 0.72}
            radius={topRadius}
            rotZ={-Math.PI / 6}
            rotY={-Math.PI / 3}
          />
        </group>
      )}

      {/* Terminal leaf buds at top level */}
      {level === maxLevel && (
        <Sphere args={[0.09, 8, 8]} position={[0, length, 0]}>
          <meshStandardMaterial
            color="#86efac"
            emissive="#4ade80"
            emissiveIntensity={0.35}
            roughness={0.3}
          />
        </Sphere>
      )}
    </group>
  );
}

function BranchingTreePattern({
  showLabels,
  isSelected,
  onToggle,
}: {
  showLabels: boolean;
  isSelected: boolean;
  onToggle: () => void;
}) {
  const treeRef = useRef<THREE.Group>(null);

  // Rotate slowly around Y axis
  useFrame((_, delta) => {
    if (treeRef.current) {
      treeRef.current.rotation.y += delta * 0.28;
    }
  });

  return (
    <group position={[5, 0, 0]}>
      {/* Point light to illuminate canopy */}
      <pointLight position={[0, 2, 2]} color="#4ade80" intensity={1.8} distance={6} decay={2} />

      {/* Museum Pedestal Ring */}
      <mesh position={[0, -2.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.5, 1.7, 32]} />
        <meshBasicMaterial color="#22c55e" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>

      {/* Tree centered vertically with 4 recursive branching levels */}
      <group ref={treeRef} position={[0, -1.5, 0]}>
        <TreeBranch
          level={0}
          maxLevel={4}
          length={1.3}
          radius={0.16}
          rotZ={0}
          rotY={0}
        />
      </group>

      {/* 3D Title */}
      {showLabels && (
        <Billboard position={[0, 2.6, 0]}>
          <Text
            fontSize={0.28}
            color="#4ade80"
            anchorX="center"
            anchorY="bottom"
            outlineWidth={0.02}
            outlineColor="#000000"
          >
            L-System Branching Tree
          </Text>
        </Billboard>
      )}

      {/* Educational HTML Label */}
      {showLabels && (
        <Html center position={[0, -2.6, 0]} className="pointer-events-auto select-none">
          <div
            onClick={onToggle}
            className={`cursor-pointer w-60 p-3 rounded-2xl bg-black/85 backdrop-blur-md border transition-all duration-300 shadow-xl ${
              isSelected
                ? 'border-green-400 ring-2 ring-green-400/50 scale-105'
                : 'border-green-500/40 hover:border-green-400 hover:scale-102'
            }`}
          >
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="text-[11px] font-black uppercase tracking-wider text-green-400 flex items-center gap-1.5">
                <span>🌳</span> L-System Branching Tree
              </span>
              <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-green-500/20 text-green-300 font-mono">
                30° Split
              </span>
            </div>
            <div className="text-[9px] font-mono text-green-200/90 mb-1">
              Recursive Bifurcation • 4 Levels
            </div>
            <p className="text-[10px] text-zinc-300 leading-snug">
              Each branch splits into two smaller branches at a 30° angle! Trees, lightning bolts,
              and river deltas use this exact self-similar branching rule to spread outward.
            </p>
            {isSelected && (
              <div className="mt-2 pt-2 border-t border-green-500/30 text-[9px] text-green-200 bg-green-950/40 p-1.5 rounded-lg">
                💡 <strong>Look outside:</strong> Examine a tree branch or a leaf vein. Notice how
                small branches look just like mini versions of the big tree!
              </div>
            )}
          </div>
        </Html>
      )}
    </group>
  );
}

// ── Main Exported Component ──────────────────────────────────────────────────
export function FractalModel({
  showLabels = true,
  ...props
}: {
  showLabels?: boolean;
  [key: string]: any;
}) {
  const wholeGroupRef = useRef<THREE.Group>(null);
  const [selectedPattern, setSelectedPattern] = useState<string | null>(null);

  const togglePattern = useCallback((id: string) => {
    setSelectedPattern((prev) => (prev === id ? null : id));
  }, []);

  // Overall slow Y rotation of the whole group
  useFrame((_, delta) => {
    if (wholeGroupRef.current) {
      wholeGroupRef.current.rotation.y += delta * 0.04;
    }
  });

  return (
    <group ref={wholeGroupRef} {...props}>
      {/* Background magical sparkles */}
      <Sparkles count={70} scale={[22, 12, 10]} size={2.8} speed={0.4} opacity={0.5} color="#fbbf24" />
      <Sparkles count={70} scale={[22, 12, 10]} size={2.8} speed={0.4} opacity={0.5} color="#34d399" />
      <Sparkles count={50} scale={[22, 12, 10]} size={2.4} speed={0.3} opacity={0.4} color="#60a5fa" />

      {/* Top Banner HTML Panel */}
      <Html position={[0, 4.3, 0]} center className="pointer-events-none select-none">
        <div className="flex flex-col items-center gap-1 px-5 py-2.5 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/15 shadow-2xl text-center whitespace-nowrap">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-400">
            <span>🌿</span>
            <span>Patterns in Nature — Mathematics & Biology</span>
            <span>🌻</span>
          </div>
          <p className="text-[10px] text-zinc-300 font-medium">
            Class 4 Science & Math: Simple rules create the intricate wonders of the living world!
          </p>
        </div>
      </Html>

      {/* Pattern 1: Fibonacci Sunflower Spiral (left, x = -5) */}
      <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.5} floatingRange={[-0.1, 0.1]}>
        <SunflowerPattern
          showLabels={showLabels}
          isSelected={selectedPattern === 'sunflower'}
          onToggle={() => togglePattern('sunflower')}
        />
      </Float>

      {/* Pattern 2: Menger Sponge Fractal (center, x = 0) */}
      <Float speed={2.2} rotationIntensity={0.3} floatIntensity={0.6} floatingRange={[-0.15, 0.15]}>
        <MengerSpongePattern
          showLabels={showLabels}
          isSelected={selectedPattern === 'sponge'}
          onToggle={() => togglePattern('sponge')}
        />
      </Float>

      {/* Pattern 3: Branching Tree L-System (right, x = 5) */}
      <Float speed={1.6} rotationIntensity={0.15} floatIntensity={0.45} floatingRange={[-0.1, 0.1]}>
        <BranchingTreePattern
          showLabels={showLabels}
          isSelected={selectedPattern === 'tree'}
          onToggle={() => togglePattern('tree')}
        />
      </Float>
    </group>
  );
}
