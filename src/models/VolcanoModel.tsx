import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// ── Animated lava particle blob ───────────────────────────────────────────
function LavaEjecta({ count = 60 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.5 + Math.random() * 1.5;
      pos[i * 3]     = (Math.random() - 0.5) * 0.4;
      pos[i * 3 + 1] = 1.8 + Math.random() * 0.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
      vel[i * 3]     = Math.cos(angle) * speed * 0.04;
      vel[i * 3 + 1] = (1.5 + Math.random()) * 0.06;
      vel[i * 3 + 2] = Math.sin(angle) * speed * 0.04;
    }
    return { positions: pos, velocities: vel };
  }, [count]);

  useFrame(() => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      velocities[i * 3 + 1] -= 0.002; // gravity
      pos[i * 3]     += velocities[i * 3];
      pos[i * 3 + 1] += velocities[i * 3 + 1];
      pos[i * 3 + 2] += velocities[i * 3 + 2];
      // reset
      if (pos[i * 3 + 1] < -0.5) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.5 + Math.random() * 1.5;
        pos[i * 3]     = (Math.random() - 0.5) * 0.4;
        pos[i * 3 + 1] = 1.8 + Math.random() * 0.2;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
        velocities[i * 3]     = Math.cos(angle) * speed * 0.04;
        velocities[i * 3 + 1] = (1.5 + Math.random()) * 0.06;
        velocities[i * 3 + 2] = Math.sin(angle) * speed * 0.04;
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.12} color="#ff6a00" transparent opacity={0.9}
        blending={THREE.AdditiveBlending} sizeAttenuation depthWrite={false} />
    </points>
  );
}

// ── Flowing lava stream ───────────────────────────────────────────────────
function LavaStream({ startX, startZ, angle }: { startX: number; startZ: number; angle: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) {
      const mat = ref.current as any;
      if (mat?.material) {
        (mat.material as THREE.MeshStandardMaterial).emissiveIntensity =
          0.8 + Math.sin(state.clock.elapsedTime * 2 + angle) * 0.4;
      }
    }
  });

  return (
    <mesh
      ref={ref}
      position={[startX, 0.2, startZ]}
      rotation={[0, angle, -Math.PI / 8]}
    >
      <cylinderGeometry args={[0.12, 0.25, 2.2, 8]} />
      <meshStandardMaterial
        color="#cc3700" emissive="#ff5500" emissiveIntensity={1.2}
        roughness={0.3} metalness={0.2}
      />
    </mesh>
  );
}

// ── Main export ───────────────────────────────────────────────────────────
export function VolcanoModel({ showLabels = true }: { showLabels?: boolean }) {
  const magmaGlowRef = useRef<THREE.PointLight>(null);
  const craterRef    = useRef<THREE.Mesh>(null);
  const groupRef     = useRef<THREE.Group>(null);
  const ashRef       = useRef<THREE.Group>(null);
  const [erupting]   = useState(true);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    // Magma glow pulse
    if (magmaGlowRef.current) {
      magmaGlowRef.current.intensity = 4 + Math.sin(t * 3.5) * 2;
    }
    // Crater glow pulse
    if (craterRef.current) {
      const mat = craterRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 1.2 + Math.sin(t * 4) * 0.8;
    }
    // Slow rotation
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.04;
    }
    // Ash cloud rise
    if (ashRef.current) {
      ashRef.current.position.y += delta * 1.5;
      if (ashRef.current.position.y > 7) ashRef.current.position.y = 2.5;
    }
  });

  // Lava flow streams
  const lavaStreams = useMemo(() => [
    { startX: 1.2,  startZ: 0.3,  angle: 0.8  },
    { startX: -0.9, startZ: 0.8,  angle: -0.5 },
    { startX: 0.3,  startZ: -1.0, angle: 2.8  },
    { startX: -0.5, startZ: -0.7, angle: -2.2 },
  ], []);

  return (
    <group ref={groupRef} scale={1.15}>
      {/* Lighting */}
      <ambientLight intensity={0.2} color="#1a0a00" />
      <directionalLight position={[8, 14, 6]} intensity={0.6} color="#fcd34d" castShadow />
      <pointLight ref={magmaGlowRef} position={[0, 1.5, 0]} color="#ff4400" distance={12} decay={2} />
      <pointLight position={[0, -2, 0]} intensity={3} color="#dc2626" distance={8} />

      {/* ── Mountain / Stratovolcano ── */}
      {/* Outer rock face */}
      <mesh position={[0, -0.5, 0]} castShadow receiveShadow>
        <coneGeometry args={[5.5, 6, 32, 1, false]} />
        <meshStandardMaterial color="#374151" roughness={0.95} metalness={0.05} />
      </mesh>
      {/* Snow cap top */}
      <mesh position={[0, 2.1, 0]}>
        <coneGeometry args={[1.6, 1.4, 32]} />
        <meshStandardMaterial color="#d1d5db" roughness={1} />
      </mesh>
      {/* Rock texture layers */}
      <mesh position={[0, 0, 0]}>
        <coneGeometry args={[5.2, 5.5, 32, 4, false]} />
        <meshStandardMaterial color="#4b5563" roughness={0.9} wireframe={false} transparent opacity={0.3} />
      </mesh>

      {/* ── Cutaway cross-section (half cone) ── */}
      <mesh position={[0, -0.5, 0]} rotation={[0, 0, 0]}>
        <coneGeometry args={[5.5, 6, 32, 1, true, 0, Math.PI]} />
        <meshStandardMaterial color="#1f2937" roughness={1} side={THREE.DoubleSide} />
      </mesh>
      {/* Cutaway face */}
      <mesh position={[0, -0.5, 0]}>
        <planeGeometry args={[11, 6]} />
        <meshStandardMaterial color="#111827" roughness={0.9} side={THREE.DoubleSide} />
      </mesh>

      {/* ── Magma Chamber ── */}
      <mesh position={[0, -2.8, 0]}>
        <sphereGeometry args={[2.0, 32, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
        <meshStandardMaterial color="#b91c1c" emissive="#f97316" emissiveIntensity={1.2} roughness={0.3} side={THREE.DoubleSide} />
      </mesh>
      {showLabels && (
        <Html position={[2.8, -2.8, 0]} center>
          <div className="bg-black/85 text-orange-400 text-[10px] px-3 py-1.5 rounded-lg border border-orange-500/40 backdrop-blur-md whitespace-nowrap font-mono uppercase tracking-widest shadow-xl">
            🔥 Magma Chamber
          </div>
        </Html>
      )}

      {/* ── Central conduit ── */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.35, 0.55, 5, 16, 1, true, 0, Math.PI]} />
        <meshStandardMaterial color="#ef4444" emissive="#f97316" emissiveIntensity={1.5} roughness={0.2} side={THREE.DoubleSide} />
      </mesh>
      {showLabels && (
        <Html position={[-1.8, 0, 0]} center>
          <div className="bg-black/85 text-red-400 text-[10px] px-3 py-1.5 rounded-lg border border-red-500/30 backdrop-blur-md whitespace-nowrap font-mono uppercase tracking-widest shadow-xl">
            🌋 Central Conduit
          </div>
        </Html>
      )}

      {/* ── Crater ── */}
      <mesh ref={craterRef} position={[0, 2.5, 0]}>
        <cylinderGeometry args={[0.5, 0.35, 0.4, 24, 1, false]} />
        <meshStandardMaterial color="#dc2626" emissive="#ff6a00" emissiveIntensity={2} roughness={0.2} />
      </mesh>
      {/* Crater glow ring */}
      <mesh position={[0, 2.55, 0]}>
        <torusGeometry args={[0.55, 0.1, 12, 32]} />
        <meshStandardMaterial color="#ff4400" emissive="#ff6a00" emissiveIntensity={3} roughness={0.1} transparent opacity={0.8} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* ── Lava ejecta / bombs ── */}
      {erupting && <LavaEjecta count={70} />}

      {/* ── Lava flows ── */}
      {lavaStreams.map((s, i) => (
        <LavaStream key={i} {...s} />
      ))}
      {showLabels && (
        <Html position={[2.5, 0.4, 0.5]} center>
          <div className="bg-black/85 text-amber-400 text-[10px] px-3 py-1.5 rounded-lg border border-amber-500/30 backdrop-blur-md whitespace-nowrap font-mono uppercase tracking-widest shadow-xl">
            🌊 Lava Flow (1,200°C)
          </div>
        </Html>
      )}

      {/* ── Ash and gas plume ── */}
      <group ref={ashRef} position={[0, 2.5, 0]}>
        <Sparkles count={500} scale={5} size={6} speed={0.8} opacity={0.7} color="#64748b" />
        <Sparkles count={200} scale={3} size={4} speed={1.5} opacity={0.9} color="#f97316" />
      </group>
      {showLabels && (
        <Html position={[3, 5.5, 0]} center>
          <div className="bg-black/85 text-zinc-300 text-[10px] px-3 py-1.5 rounded-lg border border-zinc-500/30 backdrop-blur-md whitespace-nowrap font-mono uppercase tracking-widest shadow-xl">
            💨 Volcanic Ash & Gas Plume
          </div>
        </Html>
      )}

      {/* ── Pyroclastic clouds ── */}
      {[0, 1.4, 2.8, 4.2, 5.6].map((angle, i) => (
        <mesh key={i} position={[Math.cos(angle) * 1.5, 3.5 + i * 0.5, Math.sin(angle) * 1.5]}>
          <sphereGeometry args={[0.6 + i * 0.15, 12, 8]} />
          <meshStandardMaterial color="#334155" transparent opacity={0.6 - i * 0.05} roughness={1} />
        </mesh>
      ))}

      {/* ── Tectonic plate base ── */}
      <mesh position={[0, -3.8, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[24, 24]} />
        <meshStandardMaterial color="#111827" roughness={1} />
      </mesh>
      {/* Plate fractures */}
      {[0, Math.PI / 3, Math.PI * 2 / 3].map((angle, i) => (
        <mesh key={i} position={[Math.cos(angle) * 5, -3.75, Math.sin(angle) * 5]} rotation={[-Math.PI / 2, angle, 0]}>
          <planeGeometry args={[6, 0.15]} />
          <meshStandardMaterial color="#dc2626" emissive="#ef4444" emissiveIntensity={0.6} transparent opacity={0.7} />
        </mesh>
      ))}
      {showLabels && (
        <Html position={[-4, -3.5, 0]} center>
          <div className="bg-black/85 text-purple-400 text-[10px] px-3 py-1.5 rounded-lg border border-purple-500/30 backdrop-blur-md whitespace-nowrap font-mono uppercase tracking-widest shadow-xl">
            🌍 Tectonic Plates
          </div>
        </Html>
      )}
    </group>
  );
}
