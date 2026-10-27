import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Sparkles, Billboard, Float } from '@react-three/drei';
import * as THREE from 'three';

// ── Debris particle cloud ─────────────────────────────────────────────────
function DebrisCloud({ radius, y, speed, color }: { radius: number; y: number; speed: number; color: string }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 80;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const r = radius + (Math.random() - 0.5) * 0.8;
      pos[i * 3]     = Math.cos(angle) * r;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.6;
      pos[i * 3 + 2] = Math.sin(angle) * r;
    }
    return pos;
  }, [radius]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += speed * 0.016;
    pointsRef.current.position.y = y + Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.08} color={color} transparent opacity={0.85} sizeAttenuation />
    </points>
  );
}

// ── Vortex ring layer ─────────────────────────────────────────────────────
function VortexRing({ y, radius, opacity, color }: { y: number; radius: number; opacity: number; color: string }) {
  const ringRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ringRef.current) ringRef.current.rotation.y -= delta * (6 + radius * 2);
  });
  return (
    <mesh ref={ringRef} position={[0, y, 0]}>
      <cylinderGeometry args={[radius, radius * 1.15, 0.55, 32, 1, true]} />
      <meshStandardMaterial
        color={color} transparent opacity={opacity}
        side={THREE.DoubleSide} roughness={0.8}
        depthWrite={false}
      />
    </mesh>
  );
}

// ── Lightning bolt (procedural) ───────────────────────────────────────────
function Lightning({ visible }: { visible: boolean }) {
  if (!visible) return null;
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    let x = (Math.random() - 0.5) * 6;
    let z = (Math.random() - 0.5) * 6;
    for (let i = 0; i < 12; i++) {
      pts.push(new THREE.Vector3(x, 4 - i * 0.7, z));
      x += (Math.random() - 0.5) * 1.5;
      z += (Math.random() - 0.5) * 1.5;
    }
    return pts;
  }, [visible]);
  const geom = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);
  return (
    <line geometry={geom}>
      <lineBasicMaterial color="#ffffaa" transparent opacity={0.9} blending={THREE.AdditiveBlending} />
    </line>
  );
}

// ── Main export ───────────────────────────────────────────────────────────
export function TornadoModel({ showLabels = true }: { showLabels?: boolean }) {
  const groupRef   = useRef<THREE.Group>(null);
  const funnelRef  = useRef<THREE.Group>(null);
  const cloudRef   = useRef<THREE.Mesh>(null);
  const lightningRef = useRef<number>(0);
  const [showLightning, setShowLightning] = useState(false);

  // Vortex layers: [y, bottomRadius, topRadius, opacity]
  const layers = useMemo(() => [
    { y: -1.8, r: 2.0, op: 0.25, col: '#64748b' },
    { y: -1.2, r: 1.6, op: 0.30, col: '#64748b' },
    { y: -0.6, r: 1.2, op: 0.35, col: '#78716c' },
    { y:  0.0, r: 0.9, op: 0.40, col: '#92400e' },
    { y:  0.6, r: 0.65,op: 0.50, col: '#78716c' },
    { y:  1.2, r: 0.45,op: 0.58, col: '#64748b' },
    { y:  1.8, r: 0.30,op: 0.65, col: '#475569' },
    { y:  2.4, r: 0.18,op: 0.72, col: '#334155' },
    { y:  3.0, r: 0.08,op: 0.80, col: '#1e293b' },
  ], []);

  useFrame((state, delta) => {
    // Slowly tilt whole scene
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.08;
    }
    // Main funnel spin
    if (funnelRef.current) {
      funnelRef.current.rotation.y -= delta * 14;
    }
    // Supercell cloud rotation
    if (cloudRef.current) {
      cloudRef.current.rotation.y -= delta * 2.5;
    }
    // Lightning every ~3 seconds
    lightningRef.current += delta;
    if (lightningRef.current > 3 + Math.random() * 2) {
      lightningRef.current = 0;
      setShowLightning(true);
      setTimeout(() => setShowLightning(false), 120);
    }
  });

  return (
    <group ref={groupRef} scale={1.3}>
      {/* Lighting */}
      <ambientLight intensity={0.15} color="#334155" />
      <directionalLight position={[8, 12, 6]} intensity={0.5} color="#94a3b8" />
      <pointLight position={[0, -2, 0]} intensity={4} color="#b45309" distance={10} />
      <pointLight position={[0, 4, 0]} intensity={2} color="#6366f1" distance={12} />

      {/* ── Supercell / Wall Cloud ── */}
      <mesh ref={cloudRef} position={[0, 4.0, 0]}>
        <cylinderGeometry args={[5.5, 4.2, 1.4, 64, 1, false]} />
        <meshStandardMaterial color="#1e293b" roughness={1} transparent opacity={0.92} />
      </mesh>
      {/* Cloud underbelly lumps */}
      {[0, 1.2, 2.4, 3.6, 4.8].map((angle, i) => (
        <mesh key={i} position={[Math.cos(angle) * 3.2, 3.6, Math.sin(angle) * 3.2]}>
          <sphereGeometry args={[1.0 + i * 0.08, 16, 12]} />
          <meshStandardMaterial color="#243040" roughness={1} transparent opacity={0.85} />
        </mesh>
      ))}
      {showLabels && (
        <Html position={[5.5, 4.5, 0]} center>
          <div className="bg-black/80 text-slate-300 text-[10px] px-3 py-1.5 rounded-lg border border-slate-500/30 backdrop-blur-md whitespace-nowrap font-mono uppercase tracking-widest shadow-lg">
            🌩️ Mesocyclone / Wall Cloud
          </div>
        </Html>
      )}

      {/* ── Tornado Funnel (stacked rings) ── */}
      <group ref={funnelRef}>
        {layers.map((l, i) => (
          <VortexRing key={i} y={l.y} radius={l.r} opacity={l.op} color={l.col} />
        ))}
      </group>

      {/* ── Funnel solid core ── */}
      <mesh position={[0, 1.0, 0]}>
        <cylinderGeometry args={[0.05, 1.8, 4.5, 24, 1, true]} />
        <meshStandardMaterial color="#0f172a" transparent opacity={0.7} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>

      {/* ── Debris / Suction vortices ── */}
      <DebrisCloud radius={1.8} y={-1.5} speed={18} color="#92400e" />
      <DebrisCloud radius={2.5} y={-1.8} speed={12} color="#64748b" />
      <DebrisCloud radius={3.2} y={-1.9} speed={8}  color="#475569" />

      {/* ── Ground surface ── */}
      <mesh position={[0, -2.3, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#1c2f20" roughness={1} />
      </mesh>
      {/* Destruction path on ground */}
      <mesh position={[0, -2.28, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.5, 12]} />
        <meshStandardMaterial color="#0a1a0a" roughness={1} transparent opacity={0.8} />
      </mesh>

      {/* ── Dust / debris field around base ── */}
      <Sparkles count={300} scale={6} size={5} speed={0.8} opacity={0.5} color="#b45309" />
      <Sparkles count={150} scale={3} size={3} speed={2}   opacity={0.7} color="#64748b" />

      {/* ── Rain streaks ── */}
      <Sparkles count={400} scale={[12, 10, 12]} size={1.5} speed={3} opacity={0.25} color="#94a3b8" />

      {/* ── Lightning ── */}
      <Lightning visible={showLightning} />

      {/* ── Labels ── */}
      {showLabels && (
        <>
          <Html position={[-2.5, 1.8, 0]} center>
            <div className="bg-black/80 text-cyan-400 text-[10px] px-3 py-1.5 rounded-lg border border-cyan-500/30 backdrop-blur-md whitespace-nowrap font-mono uppercase tracking-widest shadow-lg">
              🌀 Condensation Funnel
            </div>
          </Html>
          <Html position={[3.2, -1.6, 0]} center>
            <div className="bg-black/80 text-orange-400 text-[10px] px-3 py-1.5 rounded-lg border border-orange-500/30 backdrop-blur-md whitespace-nowrap font-mono uppercase tracking-widest shadow-lg">
              💨 Debris Vortex
            </div>
          </Html>
          <Html position={[0, -2.5, 0]} center>
            <div className="bg-black/75 text-red-400 text-[10px] px-3 py-1.5 rounded-lg border border-red-500/30 backdrop-blur-md whitespace-nowrap font-mono uppercase tracking-widest shadow-lg">
              🌪️ EF5 Tornado — Wind Speed: 320+ km/h
            </div>
          </Html>
        </>
      )}
    </group>
  );
}
