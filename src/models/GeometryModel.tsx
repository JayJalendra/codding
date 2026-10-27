import { useRef, useState, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Box, Sphere, Cylinder, Cone, Torus, Tetrahedron } from '@react-three/drei';
import * as THREE from 'three';

// ── Shape Definitions ───────────────────────────────────────────────────────
interface ShapeDef {
  id: string;
  label: string;
  emoji: string;
  color: string;
  desc: string;
}

const ALL_SHAPES: ShapeDef[] = [
  { id: 'cube',      label: 'Cube',          emoji: '🟦', color: '#3b82f6', desc: '6 faces, 8 vertices, 12 edges' },
  { id: 'sphere',    label: 'Sphere',         emoji: '🟠', color: '#f97316', desc: 'No flat faces, infinite symmetry' },
  { id: 'cylinder',  label: 'Cylinder',       emoji: '🟩', color: '#22c55e', desc: '2 circular faces + 1 curved surface' },
  { id: 'cone',      label: 'Cone',           emoji: '🔺', color: '#f43f5e', desc: '1 circular base, 1 apex point' },
  { id: 'pyramid',   label: 'Pyramid',        emoji: '🔷', color: '#a855f7', desc: '4 triangular faces + 1 square base' },
  { id: 'torus',     label: 'Torus (Ring)',   emoji: '⭕', color: '#eab308', desc: 'Doughnut shape — surface of revolution' },
];

// Positions arranged nicely on a grid
const SHAPE_POSITIONS: Record<string, [number, number, number]> = {
  cube:     [-3,  0,  1],
  sphere:   [ 0,  0,  1],
  cylinder: [ 3,  0,  1],
  cone:     [-3,  0, -2],
  pyramid:  [ 0,  0, -2],
  torus:    [ 3,  0, -2],
};

// ── Individual animated shape ─────────────────────────────────────────────
function AnimShape({ def, offset }: { def: ShapeDef; offset: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime() + offset;
    meshRef.current.rotation.y = t * 0.4;
    meshRef.current.rotation.x = t * 0.15;
    meshRef.current.position.y = Math.sin(t * 0.6 + offset) * 0.2;
  });

  const mat = new THREE.MeshPhysicalMaterial({
    color: def.color,
    metalness: 0.1,
    roughness: 0.18,
    transmission: hovered ? 0 : 0.6,
    ior: 1.5,
    thickness: 0.5,
    clearcoat: 1,
    emissive: hovered ? def.color : '#000',
    emissiveIntensity: hovered ? 0.25 : 0,
  });

  const wireMat = new THREE.MeshBasicMaterial({
    color: def.color,
    wireframe: true,
    transparent: true,
    opacity: hovered ? 0.6 : 0.2,
  });

  const pos = SHAPE_POSITIONS[def.id] as [number, number, number];

  return (
    <group position={pos}>
      {/* Solid */}
      {def.id === 'cube'     && <Box     ref={meshRef} args={[1.3, 1.3, 1.3]} material={mat} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} />}
      {def.id === 'sphere'   && <Sphere  ref={meshRef} args={[0.9, 32, 32]}   material={mat} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} />}
      {def.id === 'cylinder' && <Cylinder ref={meshRef} args={[0.7, 0.7, 1.6, 32]} material={mat} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} />}
      {def.id === 'cone'     && <Cone    ref={meshRef} args={[0.9, 1.8, 32]}  material={mat} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} />}
      {def.id === 'pyramid'  && <Tetrahedron ref={meshRef} args={[1.1, 0]}    material={mat} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} />}
      {def.id === 'torus'    && <Torus   ref={meshRef} args={[0.75, 0.3, 24, 48]} material={mat} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} />}

      {/* Wireframe overlay */}
      {def.id === 'cube'     && <Box      args={[1.3, 1.3, 1.3]}    material={wireMat} />}
      {def.id === 'sphere'   && <Sphere   args={[0.9, 32, 32]}      material={wireMat} />}
      {def.id === 'cylinder' && <Cylinder args={[0.7, 0.7, 1.6, 32]} material={wireMat} />}
      {def.id === 'cone'     && <Cone     args={[0.9, 1.8, 32]}     material={wireMat} />}
      {def.id === 'pyramid'  && <Tetrahedron args={[1.1, 0]}         material={wireMat} />}
      {def.id === 'torus'    && <Torus    args={[0.75, 0.3, 24, 48]} material={wireMat} />}

      {/* Label + info on hover */}
      <Html center position={[0, 1.6, 0]} className="pointer-events-none">
        <div
          className="transition-all duration-200"
          style={{ opacity: hovered ? 1 : 0.85 }}
        >
          <div
            className="px-3 py-1.5 rounded-xl text-[10px] font-mono font-bold uppercase tracking-widest shadow-2xl whitespace-nowrap"
            style={{
              background: `${def.color}18`,
              border: `1px solid ${def.color}55`,
              color: def.color,
              backdropFilter: 'blur(8px)',
            }}
          >
            {def.emoji} {def.label}
          </div>
          {hovered && (
            <div
              className="mt-1 px-3 py-1 rounded-lg text-[9px] font-mono text-white/80 text-center max-w-[160px]"
              style={{
                background: 'rgba(0,0,0,0.75)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(8px)',
              }}
            >
              {def.desc}
            </div>
          )}
        </div>
      </Html>
    </group>
  );
}

// ── Main exported component ────────────────────────────────────────────────
const DEFAULT_ACTIVE = ['cube', 'sphere', 'cylinder', 'cone'];

export function GeometryModel({ showLabels, ...props }: { showLabels?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const [activeIds, setActiveIds] = useState<Set<string>>(new Set(DEFAULT_ACTIVE));
  const [panelOpen, setPanelOpen] = useState(true);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.04;
    }
  });

  const toggle = useCallback((id: string) => {
    setActiveIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        if (next.size <= 1) return prev; // keep at least 1
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const activeShapes = ALL_SHAPES.filter(s => activeIds.has(s.id));

  return (
    <group ref={groupRef} {...props}>
      {/* 3D Shapes */}
      {activeShapes.map((def, i) => (
        <AnimShape key={def.id} def={def} offset={i * 1.2} />
      ))}

      {/* Floor grid glow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.03} />
      </mesh>

      {/* ── Shape Control Panel (HTML Overlay) ── */}
      <Html fullscreen zIndexRange={[10, 0]}>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-auto select-none">

          {/* Toggle panel button */}
          <div className="flex justify-center mb-2">
            <button
              onClick={() => setPanelOpen(p => !p)}
              className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-blue-300 border border-blue-500/30 bg-black/60 hover:bg-blue-500/10 backdrop-blur-md transition-all"
            >
              {panelOpen ? '▼ Hide Shapes Panel' : '▲ Show Shapes Panel'}
            </button>
          </div>

          {panelOpen && (
            <div className="bg-black/75 border border-white/10 rounded-2xl p-4 backdrop-blur-xl shadow-2xl flex flex-wrap gap-2 justify-center max-w-md mx-auto">
              <div className="w-full text-center text-[9px] font-black uppercase tracking-[0.3em] text-blue-400/80 mb-1 pb-1 border-b border-white/5">
                🔷 Basic Shapes — click to add / remove
              </div>
              {ALL_SHAPES.map(def => {
                const active = activeIds.has(def.id);
                return (
                  <button
                    key={def.id}
                    onClick={() => toggle(def.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-[11px] font-bold border transition-all duration-200 ${
                      active
                        ? 'text-white shadow-lg scale-105'
                        : 'text-zinc-500 border-zinc-700/50 bg-zinc-900/50 hover:border-zinc-500 hover:text-zinc-300'
                    }`}
                    style={active ? {
                      background: `${def.color}22`,
                      borderColor: `${def.color}66`,
                      color: def.color,
                      boxShadow: `0 0 12px ${def.color}33`,
                    } : {}}
                  >
                    <span className="text-base leading-none">{def.emoji}</span>
                    {def.label}
                    {active
                      ? <span className="text-[8px] font-black opacity-70">✓</span>
                      : <span className="text-[8px] font-black text-zinc-600">+</span>
                    }
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </Html>
    </group>
  );
}
