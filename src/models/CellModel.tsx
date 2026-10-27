import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Float, Sparkles, Box, Sphere, Cylinder, Torus } from '@react-three/drei';
import * as THREE from 'three';

export function CellModel({ showLabels = true }: { showLabels?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const vacuoleRef = useRef<THREE.Mesh>(null);
  const nucleusRef = useRef<THREE.Group>(null);

  // Ribosomes scattered throughout the cytoplasm
  const ribosomeCount = 180;
  const ribosomePositions = useMemo(() => {
    const pos = new Float32Array(ribosomeCount * 3);
    for (let i = 0; i < ribosomeCount; i++) {
      // Distribute within cell boundary, avoiding dense central vacuole core
      const x = (Math.random() - 0.5) * 4.6;
      const y = (Math.random() - 0.5) * 3.6;
      const z = (Math.random() - 0.5) * 3.2;

      // Keep outside of main vacuole zone [0.7, -0.2, 0.2]
      const dx = x - 0.7;
      const dy = y - (-0.2);
      const dz = z - 0.2;
      const distToVacuole = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (distToVacuole < 1.4) {
        // Push toward periphery
        pos[i * 3] = x * 1.5;
        pos[i * 3 + 1] = y * 1.5;
        pos[i * 3 + 2] = z * 1.5;
      } else {
        pos[i * 3] = x;
        pos[i * 3 + 1] = y;
        pos[i * 3 + 2] = z;
      }
    }
    return pos;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Slow, stately rotation for complete 360° inspection
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.08;
      groupRef.current.rotation.x = Math.sin(time * 0.12) * 0.04;
    }

    // Gentle cytoplasmic turgor pulsation in central vacuole
    if (vacuoleRef.current) {
      const pulse = 1.0 + Math.sin(time * 1.2) * 0.015;
      vacuoleRef.current.scale.set(1.2 * pulse, 1.05 * pulse, 0.95 * pulse);
    }

    // Subtle vitality pulse in nucleus
    if (nucleusRef.current) {
      nucleusRef.current.rotation.y = time * 0.04;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.25}>
      <group ref={groupRef} scale={0.95} position={[0, 0, 0]}>
        {/* ========================================================= */}
        {/* 1. PLANT CELL WALL (Semi-transparent, rigid prismatic box)*/}
        {/* ========================================================= */}
        {/* Outer Cellulose Wall Main Box (Open cutaway for interior view) */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[5.6, 4.4, 3.8]} />
          <meshPhysicalMaterial
            color="#22c55e"
            transparent
            opacity={0.18}
            transmission={0.7}
            roughness={0.2}
            metalness={0.05}
            clearcoat={0.9}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Rigid Cell Wall Exterior Framing Bevels (Hexagonal / Rectangular Cellulose Matrix) */}
        {/* Top & Bottom Wall Caps */}
        <mesh position={[0, 2.2, 0]}>
          <boxGeometry args={[5.7, 0.12, 3.9]} />
          <meshStandardMaterial color="#15803d" transparent opacity={0.4} />
        </mesh>
        <mesh position={[0, -2.2, 0]}>
          <boxGeometry args={[5.7, 0.12, 3.9]} />
          <meshStandardMaterial color="#15803d" transparent opacity={0.4} />
        </mesh>
        {/* Left & Right Wall Caps */}
        <mesh position={[-2.8, 0, 0]}>
          <boxGeometry args={[0.12, 4.4, 3.9]} />
          <meshStandardMaterial color="#15803d" transparent opacity={0.4} />
        </mesh>
        <mesh position={[2.8, 0, 0]}>
          <boxGeometry args={[0.12, 4.4, 3.9]} />
          <meshStandardMaterial color="#15803d" transparent opacity={0.4} />
        </mesh>
        {/* Back Wall Plate */}
        <mesh position={[0, 0, -1.9]}>
          <boxGeometry args={[5.6, 4.4, 0.12]} />
          <meshStandardMaterial color="#166534" transparent opacity={0.35} />
        </mesh>

        {/* Middle Lamella Rim Line (outer boundary seam) */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[5.68, 4.48, 3.88]} />
          <meshBasicMaterial color="#4ade80" wireframe transparent opacity={0.25} />
        </mesh>

        {/* ========================================================= */}
        {/* 2. CELL MEMBRANE (Plasma Membrane just inside cell wall)  */}
        {/* ========================================================= */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[5.35, 4.15, 3.55]} />
          <meshPhysicalMaterial
            color="#86efac"
            transparent
            opacity={0.12}
            transmission={0.85}
            roughness={0.1}
            clearcoat={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Cytoplasm sparkle particles (streaming cytosol) */}
        <Sparkles count={120} scale={[5, 3.8, 3.2]} size={1.8} speed={0.3} color="#a7f3d0" opacity={0.45} />

        {/* ========================================================= */}
        {/* 3. CENTRAL VACUOLE (Light blue transparent, ~40% of cell) */}
        {/* ========================================================= */}
        <group position={[0.7, -0.15, 0.15]}>
          <mesh ref={vacuoleRef}>
            <sphereGeometry args={[1.75, 48, 48]} />
            <meshPhysicalMaterial
              color="#38bdf8"
              transparent
              opacity={0.38}
              transmission={0.75}
              roughness={0.06}
              ior={1.33}
              clearcoat={1.0}
              clearcoatRoughness={0.05}
            />
          </mesh>
          {/* Inner Vacuolar Sap Tone */}
          <mesh scale={[0.92, 0.92, 0.92]}>
            <sphereGeometry args={[1.7, 32, 32]} />
            <meshBasicMaterial
              color="#0284c7"
              transparent
              opacity={0.12}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
          {/* Internal crystalline sparkles in cell sap */}
          <Sparkles count={45} scale={2.8} size={2.0} speed={0.2} color="#bae6fd" opacity={0.6} />
        </group>

        {/* ========================================================= */}
        {/* 4. NUCLEUS WITH NUCLEOLUS (Displaced to periphery by vacuole)*/}
        {/* ========================================================= */}
        <group ref={nucleusRef} position={[-1.75, 0.85, -0.45]}>
          {/* Outer Nuclear Membrane (Purple/Violet double membrane) */}
          <mesh>
            <sphereGeometry args={[0.92, 36, 36]} />
            <meshPhysicalMaterial
              color="#7c3aed"
              roughness={0.35}
              metalness={0.15}
              clearcoat={0.8}
              clearcoatRoughness={0.15}
              transmission={0.15}
              transparent
              opacity={0.92}
            />
          </mesh>

          {/* Nuclear Pores (Array of dark circular gateways) */}
          {Array.from({ length: 24 }).map((_, i) => {
            const phi = Math.acos(-1 + (2 * i) / 24);
            const theta = Math.sqrt(24 * Math.PI) * phi;
            return (
              <mesh
                key={`np-${i}`}
                position={[
                  0.93 * Math.sin(phi) * Math.cos(theta),
                  0.93 * Math.cos(phi),
                  0.93 * Math.sin(phi) * Math.sin(theta),
                ]}
              >
                <sphereGeometry args={[0.045, 8, 8]} />
                <meshBasicMaterial color="#3b0764" />
              </mesh>
            );
          })}

          {/* Nucleolus: Dense glowing inner sphere */}
          <mesh position={[0.1, 0.05, 0.1]}>
            <sphereGeometry args={[0.38, 24, 24]} />
            <meshStandardMaterial
              color="#ec4899"
              emissive="#db2777"
              emissiveIntensity={0.6}
              roughness={0.2}
            />
          </mesh>
          <pointLight position={[0.1, 0.05, 0.1]} color="#f472b6" intensity={1.8} distance={2.5} />

          {/* Chromatin Threads inside Nucleus */}
          {Array.from({ length: 6 }).map((_, i) => (
            <mesh
              key={`chr-${i}`}
              rotation={[i * 0.7, i * 1.1, i * 0.5]}
            >
              <torusGeometry args={[0.62, 0.02, 8, 24]} />
              <meshBasicMaterial color="#c084fc" transparent opacity={0.4} />
            </mesh>
          ))}
        </group>

        {/* ========================================================= */}
        {/* 5. CHLOROPLASTS: Multiple green oval shapes (8 chloroplasts)*/}
        {/* ========================================================= */}
        {[
          { pos: [-1.8, -1.2, 0.9], rot: [0.3, 0.4, -0.2] },
          { pos: [-2.1, 0.2, 1.0], rot: [0.6, -0.3, 0.5] },
          { pos: [-0.5, 1.6, 0.8], rot: [-0.2, 0.8, 0.3] },
          { pos: [1.8, 1.4, -0.7], rot: [0.4, 0.6, -0.4] },
          { pos: [1.9, -1.3, -0.8], rot: [-0.3, 1.0, 0.2] },
          { pos: [-0.3, -1.6, -1.0], rot: [0.5, -0.6, -0.3] },
          { pos: [2.1, 0.3, 0.9], rot: [-0.4, 0.3, 0.8] },
          { pos: [1.3, -1.5, 1.0], rot: [0.2, 0.9, -0.1] },
        ].map((item, idx) => (
          <group
            key={`chloroplast-${idx}`}
            position={item.pos as [number, number, number]}
            rotation={item.rot as [number, number, number]}
          >
            {/* Chloroplast Outer Stroma Membrane (Green Biconvex Oval) */}
            <mesh scale={[1.4, 0.75, 0.95]}>
              <sphereGeometry args={[0.42, 24, 24]} />
              <meshPhysicalMaterial
                color="#15803d"
                roughness={0.25}
                metalness={0.08}
                clearcoat={0.9}
                clearcoatRoughness={0.1}
                transmission={0.3}
                transparent
                opacity={0.9}
              />
            </mesh>

            {/* Internal Thylakoid Grana (Stacked photosynthetic discs) */}
            {[-0.22, 0, 0.22].map((gx, k) => (
              <group key={`grana-${k}`} position={[gx, 0, 0]}>
                {[-0.1, 0, 0.1].map((gy, l) => (
                  <mesh key={`disc-${l}`} position={[0, gy, 0]} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.12, 0.12, 0.035, 12]} />
                    <meshStandardMaterial
                      color="#22c55e"
                      emissive="#15803d"
                      emissiveIntensity={0.25}
                    />
                  </mesh>
                ))}
              </group>
            ))}
          </group>
        ))}

        {/* ========================================================= */}
        {/* 6. MITOCHONDRIA: Multiple orange elongated capsules (5)  */}
        {/* ========================================================= */}
        {[
          { pos: [-1.2, 1.5, 0.6], rot: [0.4, 0.7, -0.2] },
          { pos: [-2.0, -0.5, -1.1], rot: [0.8, -0.5, 0.3] },
          { pos: [1.1, 1.5, 0.8], rot: [-0.3, 0.9, 0.4] },
          { pos: [0.2, -1.5, 1.1], rot: [0.5, 0.2, -0.6] },
          { pos: [-0.9, -1.4, 0.8], rot: [-0.4, -0.8, 0.5] },
        ].map((item, idx) => (
          <group
            key={`mito-${idx}`}
            position={item.pos as [number, number, number]}
            rotation={item.rot as [number, number, number]}
          >
            {/* Mitochondria Outer Membrane (Orange Elongated Capsule) */}
            <mesh scale={[0.65, 1.25, 0.65]}>
              <sphereGeometry args={[0.32, 20, 20]} />
              <meshPhysicalMaterial
                color="#ea580c"
                roughness={0.3}
                metalness={0.1}
                clearcoat={0.9}
                transmission={0.25}
                transparent
                opacity={0.92}
              />
            </mesh>

            {/* Inner Mitochondrial Cristae (Yellowish folded inner membrane) */}
            {[-0.18, 0, 0.18].map((cy, cIdx) => (
              <mesh
                key={`crista-${cIdx}`}
                position={[0, cy, 0]}
                rotation={[0, 0, cIdx % 2 === 0 ? 0.3 : -0.3]}
              >
                <boxGeometry args={[0.32, 0.035, 0.24]} />
                <meshStandardMaterial
                  color="#fbbf24"
                  emissive="#d97706"
                  emissiveIntensity={0.2}
                />
              </mesh>
            ))}
          </group>
        ))}

        {/* ========================================================= */}
        {/* 7. ENDOPLASMIC RETICULUM (Blue Torus Rings & Tubules)     */}
        {/* ========================================================= */}
        <group position={[-1.75, 0.85, -0.45]}>
          {/* Concentric ER Sheaths wrapping around the nucleus */}
          {[1.1, 1.35, 1.6].map((radius, idx) => (
            <mesh
              key={`er-fold-${idx}`}
              position={[0, -0.2 + idx * 0.18, 0]}
              rotation={[Math.PI * 0.45, idx * 0.25, 0.1]}
            >
              <torusGeometry args={[radius, 0.09, 16, 48, Math.PI * 1.3]} />
              <meshPhysicalMaterial
                color="#2563eb"
                roughness={0.4}
                metalness={0.1}
                transmission={0.2}
                transparent
                opacity={0.85}
              />
            </mesh>
          ))}

          {/* Attached Ribosomes on Rough ER Folds */}
          {Array.from({ length: 45 }).map((_, i) => (
            <mesh
              key={`er-ribo-${i}`}
              position={[
                (1.2 + Math.random() * 0.4) * Math.cos(i * 0.15),
                (Math.random() - 0.5) * 0.3,
                (1.2 + Math.random() * 0.4) * Math.sin(i * 0.15),
              ]}
            >
              <sphereGeometry args={[0.028, 8, 8]} />
              <meshBasicMaterial color="#4ade80" />
            </mesh>
          ))}
        </group>

        {/* ========================================================= */}
        {/* 8. GOLGI APPARATUS (Stacked Yellow Discs / Dictyosomes)   */}
        {/* ========================================================= */}
        <group position={[-1.1, -0.85, -0.7]} rotation={[0.3, -0.6, 0.2]}>
          {/* Stack of 5 Flattened Curved Discs */}
          {[-0.28, -0.14, 0, 0.14, 0.28].map((z, idx) => (
            <mesh key={`golgi-disc-${idx}`} position={[0, 0, z]}>
              <cylinderGeometry args={[0.48 - Math.abs(z) * 0.4, 0.48 - Math.abs(z) * 0.4, 0.045, 24]} />
              <meshPhysicalMaterial
                color="#eab308"
                metalness={0.15}
                roughness={0.25}
                clearcoat={0.9}
                transmission={0.3}
                transparent
                opacity={0.92}
              />
            </mesh>
          ))}

          {/* Budding Secretory Vesicles */}
          {[
            [0.45, 0.15, 0.1],
            [-0.45, -0.1, -0.15],
            [0.55, -0.1, 0.25],
            [-0.35, 0.2, 0.3],
            [0.2, 0.35, -0.2],
          ].map((vPos, vIdx) => (
            <mesh key={`g-vesicle-${vIdx}`} position={vPos as [number, number, number]}>
              <sphereGeometry args={[0.075, 12, 12]} />
              <meshStandardMaterial
                color="#facc15"
                emissive="#ca8a04"
                emissiveIntensity={0.3}
              />
            </mesh>
          ))}
        </group>

        {/* ========================================================= */}
        {/* 9. FREE RIBOSOMES (Tiny green dots scattered in cytosol)  */}
        {/* ========================================================= */}
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={ribosomeCount}
              array={ribosomePositions}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.055}
            color="#4ade80"
            transparent
            opacity={0.8}
            depthWrite={false}
          />
        </points>

        {/* ========================================================= */}
        {/* 10. EDUCATIONAL HTML LABELS (Shown when showLabels=true)  */}
        {/* ========================================================= */}
        {showLabels && (
          <>
            {/* Cell Wall Label */}
            <Html position={[-2.85, 2.3, 0]} center distanceFactor={11} className="pointer-events-none">
              <div className="flex flex-col items-center select-none">
                <div className="px-2.5 py-1 bg-slate-900/90 backdrop-blur-md border border-green-500/50 rounded-lg shadow-lg flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[10px] font-bold text-green-200 uppercase font-mono">
                    Cell Wall
                  </span>
                </div>
                <div className="w-px h-5 bg-gradient-to-b from-green-500/70 to-transparent" />
              </div>
            </Html>

            {/* Cell Membrane Label */}
            <Html position={[-2.7, -1.9, 0]} center distanceFactor={11} className="pointer-events-none">
              <div className="flex flex-col items-center select-none">
                <div className="w-px h-5 bg-gradient-to-t from-emerald-400/70 to-transparent" />
                <div className="px-2.5 py-1 bg-slate-900/90 backdrop-blur-md border border-emerald-400/50 rounded-lg shadow-lg flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-[10px] font-bold text-emerald-200 uppercase font-mono">
                    Cell Membrane
                  </span>
                </div>
              </div>
            </Html>

            {/* Central Vacuole Label */}
            <Html position={[1.4, -0.15, 1.8]} center distanceFactor={11} className="pointer-events-none">
              <div className="flex flex-col items-center select-none">
                <div className="px-3 py-1.5 bg-slate-900/90 backdrop-blur-md border border-sky-400/50 rounded-lg shadow-[0_0_20px_rgba(56,189,248,0.3)] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
                  <span className="text-[11px] font-bold text-sky-200 uppercase font-mono">
                    Central Vacuole
                  </span>
                </div>
                <div className="text-[8px] text-sky-300/70 font-mono tracking-tight mt-0.5">
                  Turgor Pressure & Storage (~40% volume)
                </div>
              </div>
            </Html>

            {/* Nucleus Label */}
            <Html position={[-1.75, 1.95, -0.45]} center distanceFactor={11} className="pointer-events-none">
              <div className="flex flex-col items-center select-none">
                <div className="px-2.5 py-1 bg-slate-900/90 backdrop-blur-md border border-purple-500/50 rounded-lg shadow-lg flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  <span className="text-[10px] font-bold text-purple-200 uppercase font-mono">
                    Nucleus
                  </span>
                </div>
                <div className="w-px h-5 bg-gradient-to-b from-purple-500/70 to-transparent" />
              </div>
            </Html>

            {/* Nucleolus Label */}
            <Html position={[-0.9, 1.0, -0.3]} center distanceFactor={11} className="pointer-events-none">
              <div className="flex items-center gap-1.5 select-none">
                <div className="w-4 h-px bg-pink-500/70" />
                <div className="px-2 py-0.5 bg-black/85 backdrop-blur-md border border-pink-500/50 rounded text-[9px] font-bold text-pink-300 uppercase font-mono">
                  Nucleolus
                </div>
              </div>
            </Html>

            {/* Chloroplast Label */}
            <Html position={[-1.8, -1.85, 0.9]} center distanceFactor={11} className="pointer-events-none">
              <div className="flex flex-col items-center select-none">
                <div className="w-px h-5 bg-gradient-to-t from-lime-400/70 to-transparent" />
                <div className="px-2.5 py-1 bg-slate-900/90 backdrop-blur-md border border-lime-400/50 rounded-lg shadow-lg flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
                  <span className="text-[10px] font-bold text-lime-200 uppercase font-mono">
                    Chloroplast
                  </span>
                </div>
              </div>
            </Html>

            {/* Mitochondrion Label */}
            <Html position={[1.1, 2.1, 0.8]} center distanceFactor={11} className="pointer-events-none">
              <div className="flex flex-col items-center select-none">
                <div className="px-2.5 py-1 bg-slate-900/90 backdrop-blur-md border border-orange-500/50 rounded-lg shadow-lg flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                  <span className="text-[10px] font-bold text-orange-200 uppercase font-mono">
                    Mitochondrion
                  </span>
                </div>
                <div className="w-px h-5 bg-gradient-to-b from-orange-500/70 to-transparent" />
              </div>
            </Html>

            {/* Endoplasmic Reticulum Label */}
            <Html position={[-3.1, 0.9, -0.45]} center distanceFactor={11} className="pointer-events-none">
              <div className="flex items-center gap-1.5 select-none">
                <div className="px-2.5 py-1 bg-slate-900/90 backdrop-blur-md border border-blue-500/50 rounded-lg shadow-lg flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span className="text-[10px] font-bold text-blue-200 uppercase font-mono whitespace-nowrap">
                    Endoplasmic Reticulum
                  </span>
                </div>
                <div className="w-4 h-px bg-blue-500/70" />
              </div>
            </Html>

            {/* Golgi Apparatus Label */}
            <Html position={[-1.1, -1.45, -0.7]} center distanceFactor={11} className="pointer-events-none">
              <div className="flex flex-col items-center select-none">
                <div className="w-px h-5 bg-gradient-to-t from-yellow-400/70 to-transparent" />
                <div className="px-2.5 py-1 bg-slate-900/90 backdrop-blur-md border border-yellow-400/50 rounded-lg shadow-lg flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                  <span className="text-[10px] font-bold text-yellow-200 uppercase font-mono">
                    Golgi Apparatus
                  </span>
                </div>
              </div>
            </Html>

            {/* Ribosomes Label */}
            <Html position={[0, -2.1, 1.4]} center distanceFactor={11} className="pointer-events-none">
              <div className="flex flex-col items-center select-none">
                <div className="w-px h-4 bg-gradient-to-t from-emerald-400/70 to-transparent" />
                <div className="px-2 py-0.5 bg-black/85 backdrop-blur-md border border-emerald-400/40 rounded text-[9px] font-bold text-emerald-300 uppercase font-mono">
                  Ribosomes
                </div>
              </div>
            </Html>
          </>
        )}
      </group>
    </Float>
  );
}
