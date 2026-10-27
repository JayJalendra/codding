import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cylinder, Box, Sphere, Html, Float, Sparkles, Billboard, Text } from '@react-three/drei';
import * as THREE from 'three';

// ---------------------------------------------------------------------------
// Flavian Amphitheatre (Roman Colosseum) High-Fidelity 3D Simulation
// ---------------------------------------------------------------------------
export function ColosseumModel({ showLabels = true, ...props }: { showLabels?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const [viewMode, setViewMode] = useState<'amphitheatre' | 'hypogeum'>('amphitheatre');
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  // Slow smooth rotation
  useFrame((_, delta) => {
    if (groupRef.current && viewMode === 'amphitheatre') {
      groupRef.current.rotation.y += Math.min(delta, 0.1) * 0.03;
    }
  });

  // Elliptical axes for the outer and inner walls
  const aOuter = 6.2; // Semi-major axis (X)
  const bOuter = 5.2; // Semi-minor axis (Z)

  const aInner = 4.4;
  const bInner = 3.6;

  const aArena = 3.0;
  const bArena = 2.2;

  // Arcades column positions around the perimeter (40 bays)
  const arcadeBays = useMemo(() => {
    const bays = [];
    const count = 40;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const x = Math.cos(angle) * aOuter;
      const z = Math.sin(angle) * bOuter;

      // Outer facade preservation profile:
      // Real Colosseum has northern outer wall intact at 4 tiers (angle roughly -Math.PI*0.1 to Math.PI*0.9),
      // while southern/eastern side has weathered down to tier 1 or 2.
      const normalizedAngle = (angle + Math.PI * 2) % (Math.PI * 2);
      let tiers = 4;
      if (normalizedAngle > Math.PI * 0.9 && normalizedAngle < Math.PI * 1.7) {
        tiers = normalizedAngle > Math.PI * 1.3 ? 1 : 2;
      }

      bays.push({ id: i, angle, x, z, tiers });
    }
    return bays;
  }, []);

  // Stepped Cavea (Seating) rows
  const seatingRanks = useMemo(() => {
    const ranks = [];
    const count = 6;
    for (let i = 0; i < count; i++) {
      const t = i / (count - 1);
      const a = aArena + 0.35 + t * (aInner - aArena - 0.4);
      const b = bArena + 0.35 + t * (bInner - bArena - 0.4);
      const y = 0.4 + t * 1.4;
      ranks.push({ id: i, a, b, y });
    }
    return ranks;
  }, []);

  // Hypogeum subterranean corridor grid
  const hypogeumWalls = useMemo(() => {
    const walls = [];
    // Longitudinal walls
    for (let x = -2.2; x <= 2.2; x += 0.88) {
      walls.push({ pos: [x, -0.45, 0] as [number, number, number], args: [0.12, 0.7, 3.4] as [number, number, number] });
    }
    // Transverse partition walls with gladiator cell gates
    for (let z = -1.4; z <= 1.4; z += 0.9) {
      walls.push({ pos: [0, -0.45, z] as [number, number, number], args: [4.4, 0.7, 0.12] as [number, number, number] });
    }
    return walls;
  }, []);

  const stoneTravertine = '#e3d5be';
  const stoneShadow = '#c5b59a';
  const brickRoman = '#b45309';

  return (
    <group ref={groupRef} position={[0, -1.2, 0]} scale={1.12} {...props}>
      {/* ----------------------------------------------------------------- */}
      {/* Roman Daylight & Torchlight                                       */}
      {/* ----------------------------------------------------------------- */}
      <ambientLight intensity={1.3} color="#fef9c3" />
      <directionalLight
        position={[16, 24, 14]}
        intensity={3.2}
        color="#fffbeb"
        castShadow
        shadow-bias={-0.0001}
      />
      <directionalLight
        position={[-14, 12, -10]}
        intensity={0.9}
        color="#fed7aa"
      />
      {/* Golden torchlight in the hypogeum */}
      <pointLight position={[0, -0.3, 0]} intensity={4.0} distance={9} color="#ea580c" />
      <pointLight position={[1.5, -0.2, 1]} intensity={2.5} distance={5} color="#f97316" />
      <pointLight position={[-1.5, -0.2, -1]} intensity={2.5} distance={5} color="#f97316" />

      {/* Arena Dust Motes & Sun Rays */}
      <Sparkles
        count={65}
        scale={[14, 6, 12]}
        position={[0, 1.5, 0]}
        size={2.2}
        speed={0.5}
        opacity={0.6}
        color="#fde047"
      />

      {/* ----------------------------------------------------------------- */}
      {/* Surrounding Roman Paved Forum Base                                */}
      {/* ----------------------------------------------------------------- */}
      <group position={[0, -0.85, 0]}>
        <Cylinder args={[11.5, 11.8, 0.4, 48]} position={[0, 0, 0]} receiveShadow>
          <meshStandardMaterial color="#a8a29e" roughness={0.95} />
        </Cylinder>
        {/* Paved Travertine Flagstones */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.21, 0]} receiveShadow>
          <circleGeometry args={[11.4, 48]} />
          <meshStandardMaterial color="#d6d3d1" roughness={0.88} />
        </mesh>
      </group>

      {/* ----------------------------------------------------------------- */}
      {/* Outer Multi-Tier Classical Arcades (Doric, Ionic, Corinthian)     */}
      {/* ----------------------------------------------------------------- */}
      <group>
        {arcadeBays.map((bay) => {
          const tangentAngle = -bay.angle + Math.PI / 2;

          return (
            <group
              key={bay.id}
              position={[bay.x, 0, bay.z]}
              rotation={[0, -bay.angle, 0]}
            >
              {/* Level 1: Tuscan/Doric Piers & Arches (h = 0 to 1.1) */}
              {bay.tiers >= 1 && (
                <group position={[0, 0.55, 0]}>
                  {/* Left Pier */}
                  <Box args={[0.32, 1.1, 0.45]} position={[-0.32, 0, 0]} castShadow>
                    <meshStandardMaterial color={stoneTravertine} roughness={0.85} />
                  </Box>
                  {/* Right Pier */}
                  <Box args={[0.32, 1.1, 0.45]} position={[0.32, 0, 0]} castShadow>
                    <meshStandardMaterial color={stoneTravertine} roughness={0.85} />
                  </Box>
                  {/* Arch Keystone & Archway */}
                  <Box args={[0.96, 0.2, 0.42]} position={[0, 0.45, 0]}>
                    <meshStandardMaterial color={stoneShadow} roughness={0.85} />
                  </Box>
                  {/* Entablature Cornice Band */}
                  <Box args={[1.05, 0.12, 0.52]} position={[0, 0.58, 0]}>
                    <meshStandardMaterial color={stoneTravertine} roughness={0.8} />
                  </Box>
                </group>
              )}

              {/* Level 2: Ionic Arches (h = 1.2 to 2.3) */}
              {bay.tiers >= 2 && (
                <group position={[0, 1.75, 0]}>
                  <Box args={[0.3, 1.1, 0.42]} position={[-0.32, 0, 0]} castShadow>
                    <meshStandardMaterial color={stoneTravertine} roughness={0.85} />
                  </Box>
                  <Box args={[0.3, 1.1, 0.42]} position={[0.32, 0, 0]} castShadow>
                    <meshStandardMaterial color={stoneTravertine} roughness={0.85} />
                  </Box>
                  {/* Statue in Arch Niche */}
                  <Cylinder args={[0.08, 0.1, 0.5, 6]} position={[0, -0.05, 0]}>
                    <meshStandardMaterial color="#f8fafc" roughness={0.3} />
                  </Cylinder>
                  <Sphere args={[0.08, 6, 6]} position={[0, 0.26, 0]}>
                    <meshStandardMaterial color="#f8fafc" roughness={0.3} />
                  </Sphere>
                  {/* Arch Cap */}
                  <Box args={[0.94, 0.18, 0.4]} position={[0, 0.46, 0]}>
                    <meshStandardMaterial color={stoneShadow} roughness={0.85} />
                  </Box>
                  {/* Entablature 2 */}
                  <Box args={[1.02, 0.12, 0.48]} position={[0, 0.58, 0]}>
                    <meshStandardMaterial color={stoneTravertine} roughness={0.8} />
                  </Box>
                </group>
              )}

              {/* Level 3: Corinthian Arches (h = 2.4 to 3.5) */}
              {bay.tiers >= 3 && (
                <group position={[0, 2.95, 0]}>
                  <Box args={[0.28, 1.1, 0.38]} position={[-0.32, 0, 0]} castShadow>
                    <meshStandardMaterial color={stoneTravertine} roughness={0.85} />
                  </Box>
                  <Box args={[0.28, 1.1, 0.38]} position={[0.32, 0, 0]} castShadow>
                    <meshStandardMaterial color={stoneTravertine} roughness={0.85} />
                  </Box>
                  {/* Statue */}
                  <Cylinder args={[0.07, 0.09, 0.48, 6]} position={[0, -0.05, 0]}>
                    <meshStandardMaterial color="#f8fafc" roughness={0.3} />
                  </Cylinder>
                  <Sphere args={[0.07, 6, 6]} position={[0, 0.25, 0]}>
                    <meshStandardMaterial color="#f8fafc" roughness={0.3} />
                  </Sphere>
                  {/* Arch Cap */}
                  <Box args={[0.92, 0.18, 0.38]} position={[0, 0.46, 0]}>
                    <meshStandardMaterial color={stoneShadow} roughness={0.85} />
                  </Box>
                  {/* Entablature 3 */}
                  <Box args={[1.0, 0.12, 0.45]} position={[0, 0.58, 0]}>
                    <meshStandardMaterial color={stoneTravertine} roughness={0.8} />
                  </Box>
                </group>
              )}

              {/* Level 4: Attic Wall with Corinthian Pilasters & Velarium Corbel Masts */}
              {bay.tiers >= 4 && (
                <group position={[0, 4.15, 0]}>
                  {/* Solid Wall Pier */}
                  <Box args={[0.98, 1.15, 0.32]} position={[0, 0, 0]} castShadow>
                    <meshStandardMaterial color={stoneTravertine} roughness={0.82} />
                  </Box>
                  {/* Corinthian Flat Pilasters */}
                  <Box args={[0.16, 1.15, 0.38]} position={[-0.32, 0, 0]}>
                    <meshStandardMaterial color={stoneShadow} roughness={0.8} />
                  </Box>
                  <Box args={[0.16, 1.15, 0.38]} position={[0.32, 0, 0]}>
                    <meshStandardMaterial color={stoneShadow} roughness={0.8} />
                  </Box>
                  {/* Attic Cornice Rim */}
                  <Box args={[1.02, 0.14, 0.42]} position={[0, 0.62, 0]}>
                    <meshStandardMaterial color={stoneTravertine} roughness={0.75} />
                  </Box>
                  {/* Velarium Awning Wooden Mast Support Pole */}
                  <Cylinder args={[0.04, 0.04, 1.2, 6]} position={[0, 0.9, -0.05]}>
                    <meshStandardMaterial color="#78350f" roughness={0.8} />
                  </Cylinder>
                  {/* Stone Corbel socket supporting mast */}
                  <Box args={[0.18, 0.22, 0.18]} position={[0, 0.45, 0.22]}>
                    <meshStandardMaterial color={stoneShadow} roughness={0.85} />
                  </Box>
                </group>
              )}
            </group>
          );
        })}
      </group>

      {/* ----------------------------------------------------------------- */}
      {/* Cavea: Stepped Auditorium Seating Tiers                            */}
      {/* ----------------------------------------------------------------- */}
      <group>
        {seatingRanks.map((rank) => (
          <group key={rank.id}>
            {/* Elliptical ring approximation of 32 seating blocks */}
            {[...Array(32)].map((_, i) => {
              const angle = (i / 32) * Math.PI * 2;
              const x = Math.cos(angle) * rank.a;
              const z = Math.sin(angle) * rank.b;
              return (
                <Box
                  key={i}
                  args={[0.85, 0.24, 0.65]}
                  position={[x, rank.y, z]}
                  rotation={[0, -angle, 0]}
                  castShadow
                  receiveShadow
                >
                  <meshStandardMaterial color="#e5e5e5" roughness={0.7} />
                </Box>
              );
            })}
          </group>
        ))}

        {/* Podium Balustrade surrounding Arena */}
        {[...Array(28)].map((_, i) => {
          const angle = (i / 28) * Math.PI * 2;
          const x = Math.cos(angle) * (aArena + 0.15);
          const z = Math.sin(angle) * (bArena + 0.15);
          return (
            <Box
              key={i}
              args={[0.7, 0.4, 0.15]}
              position={[x, 0.35, z]}
              rotation={[0, -angle, 0]}
            >
              <meshStandardMaterial color="#f1f5f9" roughness={0.6} />
            </Box>
          );
        })}

        {/* Imperial Box (Pulvinar) on North Side */}
        <group position={[0, 0.65, -bArena - 0.2]} scale={1.2}>
          <Box args={[1.5, 0.5, 0.8]} position={[0, 0, 0]}>
            <meshStandardMaterial color="#7f1d1d" roughness={0.5} />
          </Box>
          {/* Imperial Canopy & Columns */}
          <Cylinder args={[0.04, 0.04, 0.8, 6]} position={[-0.6, 0.65, 0.3]}>
            <meshStandardMaterial color="#fbbf24" metalness={0.7} roughness={0.2} />
          </Cylinder>
          <Cylinder args={[0.04, 0.04, 0.8, 6]} position={[0.6, 0.65, 0.3]}>
            <meshStandardMaterial color="#fbbf24" metalness={0.7} roughness={0.2} />
          </Cylinder>
          {/* Purple Velvet Roman Baldachin */}
          <Box args={[1.6, 0.1, 0.9]} position={[0, 1.05, 0]}>
            <meshStandardMaterial color="#581c87" roughness={0.4} />
          </Box>
          {/* Golden Eagle (Aquila) Crest */}
          <Sphere args={[0.1, 8, 8]} position={[0, 1.2, 0]}>
            <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} />
          </Sphere>
        </group>
      </group>

      {/* ----------------------------------------------------------------- */}
      {/* Arena Floor: Semi-Covered Wooden Planks + Golden Sand             */}
      {/* ----------------------------------------------------------------- */}
      <group position={[0, 0.15, 0]}>
        {/* Eastern half: Wooden deck with golden sand layer */}
        <mesh position={[aArena * 0.45, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[aArena, bArena * 1.85]} />
          <meshStandardMaterial color="#eab308" roughness={0.9} />
        </mesh>
        {/* Wooden Support Joists visible at the edge */}
        <Box args={[0.1, 0.2, bArena * 1.85]} position={[0, -0.05, 0]}>
          <meshStandardMaterial color="#78350f" roughness={0.9} />
        </Box>
      </group>

      {/* ----------------------------------------------------------------- */}
      {/* Hypogeum: Subterranean Maze (Beast cages, trapdoors, lift hoists) */}
      {/* ----------------------------------------------------------------- */}
      <group position={[0, 0, 0]}>
        {/* Floor of the Hypogeum */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.8, 0]}>
          <planeGeometry args={[aArena * 2, bArena * 2]} />
          <meshStandardMaterial color="#292524" roughness={1.0} />
        </mesh>

        {/* Masonry Tunnels & Cell Walls */}
        {hypogeumWalls.map((wall, wIdx) => (
          <Box key={wIdx} args={wall.args} position={wall.pos}>
            <meshStandardMaterial color={brickRoman} roughness={0.9} />
          </Box>
        ))}

        {/* Gladiator / Animal Wooden Lifts (Hoists) */}
        {[
          [-1.3, -0.4, 0.8],
          [-1.3, -0.4, -0.8],
          [0.8, -0.4, 0.6],
          [0.8, -0.4, -0.6],
        ].map((liftPos, lIdx) => (
          <group key={lIdx} position={liftPos as [number, number, number]}>
            <Box args={[0.55, 0.6, 0.55]}>
              <meshStandardMaterial color="#78350f" roughness={0.8} wireframe />
            </Box>
            {/* Pulley Rope */}
            <Cylinder args={[0.02, 0.02, 0.7, 4]} position={[0, 0.4, 0]}>
              <meshStandardMaterial color="#d97706" roughness={0.5} />
            </Cylinder>
          </group>
        ))}
      </group>

      {/* ----------------------------------------------------------------- */}
      {/* Roman Banners (SPQR Vexillum Standards)                           */}
      {/* ----------------------------------------------------------------- */}
      {[
        { pos: [0, 4.8, -bOuter], label: 'SPQR' },
        { pos: [-aOuter * 0.7, 4.8, -bOuter * 0.7], label: 'ROMA' },
        { pos: [aOuter * 0.7, 4.8, -bOuter * 0.7], label: 'CAESAR' },
      ].map((banner, bIdx) => (
        <group key={bIdx} position={banner.pos as [number, number, number]}>
          {/* Gold Finial Spearhead */}
          <Cylinder args={[0.02, 0.02, 1.2, 4]} position={[0, 0.6, 0]}>
            <meshStandardMaterial color="#fbbf24" metalness={0.8} />
          </Cylinder>
          {/* Red Imperial Banner Cloth */}
          <Box args={[0.45, 0.7, 0.02]} position={[0, 0.35, 0]}>
            <meshStandardMaterial color="#991b1b" roughness={0.4} />
          </Box>
        </group>
      ))}

      {/* ----------------------------------------------------------------- */}
      {/* Interactive 3D Badges & Labels                                    */}
      {/* ----------------------------------------------------------------- */}
      {showLabels && (
        <group>
          {/* Main Title Badge */}
          <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.2} position={[0, 6.5, 0]}>
            <Billboard follow={true}>
              <Text
                fontSize={0.48}
                color="#fde047"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.03}
                outlineColor="#78350f"
              >
                ROMAN COLOSSEUM
              </Text>
            </Billboard>
            <Html position={[0, -0.5, 0]} center className="pointer-events-auto select-none">
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/85 border border-amber-400/40 text-amber-200 shadow-[0_0_25px_rgba(245,158,11,0.35)] backdrop-blur-md">
                  <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span className="font-mono text-[10px] tracking-widest uppercase">
                    Flavian Amphitheatre • 80 CE
                  </span>
                </div>
                {/* View Mode Toggle */}
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/80 border border-amber-500/30 backdrop-blur-md">
                  <button
                    onClick={() => setViewMode('amphitheatre')}
                    className={`px-2.5 py-1 rounded-lg font-mono text-[9px] uppercase tracking-wider transition-all ${
                      viewMode === 'amphitheatre'
                        ? 'bg-amber-500 text-black font-bold shadow-md'
                        : 'text-zinc-300 hover:text-white'
                    }`}
                  >
                    Monument View
                  </button>
                  <button
                    onClick={() => setViewMode('hypogeum')}
                    className={`px-2.5 py-1 rounded-lg font-mono text-[9px] uppercase tracking-wider transition-all ${
                      viewMode === 'hypogeum'
                        ? 'bg-amber-500 text-black font-bold shadow-md'
                        : 'text-zinc-300 hover:text-white'
                    }`}
                  >
                    Hypogeum (Arena Lifts)
                  </button>
                </div>
              </div>
            </Html>
          </Float>

          {/* Imperial Box Badge */}
          <group position={[0, 2.2, -bArena - 0.4]}>
            <Billboard follow={true}>
              <Text fontSize={0.24} color="#fca5a5" anchorX="center" anchorY="bottom" outlineWidth={0.02} outlineColor="#7f1d1d">
                Imperial Box (Pulvinar)
              </Text>
            </Billboard>
            <Html center className="pointer-events-none select-none">
              <div className="px-2 py-0.5 rounded bg-black/80 border border-red-500/30 text-[8px] text-red-200 font-mono whitespace-nowrap shadow-lg">
                Emperor & Vestal Virgins Podium
              </div>
            </Html>
          </group>

          {/* Hypogeum Subterranean Maze Badge */}
          <group position={[-1.4, 0.4, 0]}>
            <Billboard follow={true}>
              <Text fontSize={0.24} color="#fde047" anchorX="center" anchorY="bottom" outlineWidth={0.02} outlineColor="#78350f">
                Hypogeum
              </Text>
            </Billboard>
            <Html center className="pointer-events-none select-none">
              <div className="px-2 py-0.5 rounded bg-black/80 border border-amber-500/30 text-[8px] text-amber-200 font-mono whitespace-nowrap shadow-lg">
                Subterranean Beast Cages & 36 Lifts
              </div>
            </Html>
          </group>

          {/* Cavea Seating Tiers */}
          <group position={[3.2, 2.0, 1.8]}>
            <Billboard follow={true}>
              <Text fontSize={0.22} color="#cbd5e1" anchorX="center" anchorY="bottom" outlineWidth={0.02} outlineColor="#0f172a">
                Cavea (50,000 Seated)
              </Text>
            </Billboard>
            <Html center className="pointer-events-none select-none">
              <div className="px-2 py-0.5 rounded bg-black/80 border border-zinc-500/30 text-[8px] text-zinc-300 font-mono whitespace-nowrap shadow-lg">
                Social Class Tier Seating
              </div>
            </Html>
          </group>

          {/* Arcades / Orders */}
          <group position={[-aOuter, 3.8, 0]}>
            <Billboard follow={true}>
              <Text fontSize={0.22} color="#fef08a" anchorX="center" anchorY="bottom" outlineWidth={0.02} outlineColor="#78350f">
                3 Classical Orders
              </Text>
            </Billboard>
            <Html center className="pointer-events-none select-none">
              <div className="px-2 py-0.5 rounded bg-black/80 border border-amber-500/30 text-[8px] text-amber-300 font-mono whitespace-nowrap shadow-lg">
                Doric • Ionic • Corinthian
              </div>
            </Html>
          </group>
        </group>
      )}
    </group>
  );
}
