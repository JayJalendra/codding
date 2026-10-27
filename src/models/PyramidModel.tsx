import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Cylinder, Sphere, Html, Float, Sparkles, Billboard, Text } from '@react-three/drei';
import * as THREE from 'three';

// ---------------------------------------------------------------------------
// Great Pyramid of Giza & Khufu Complex Simulation
// ---------------------------------------------------------------------------
export function PyramidModel({ showLabels = true, ...props }: { showLabels?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const [viewMode, setViewMode] = useState<'exterior' | 'cutaway' | 'chambers'>('exterior');
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  // Slow majestic rotation
  useFrame((_, delta) => {
    if (groupRef.current && viewMode === 'exterior') {
      groupRef.current.rotation.y += Math.min(delta, 0.1) * 0.03;
    }
  });

  // Generate stepped pyramid courses (22 tiers tapering upward)
  const pyramidLayers = useMemo(() => {
    const layers = [];
    const count = 22;
    const baseWidth = 8.8;
    const totalHeight = 5.8;
    const layerH = totalHeight / count;

    for (let i = 0; i < count; i++) {
      const progress = i / count;
      const w = baseWidth * (1 - progress);
      const y = i * layerH + layerH / 2;
      layers.push({ id: i, w, y, layerH, progress });
    }
    return layers;
  }, []);

  const isCutaway = viewMode === 'cutaway' || viewMode === 'chambers';

  return (
    <group ref={groupRef} position={[0, -1.8, 0]} scale={1.15} {...props}>
      {/* ----------------------------------------------------------------- */}
      {/* Sun & Desert Lighting                                             */}
      {/* ----------------------------------------------------------------- */}
      <ambientLight intensity={1.2} color="#fef3c7" />
      <directionalLight
        position={[18, 25, 14]}
        intensity={3.2}
        color="#fffbeb"
        castShadow
        shadow-bias={-0.0001}
      />
      <directionalLight
        position={[-15, 10, -12]}
        intensity={0.8}
        color="#fdba74"
      />
      {/* Torchlight inside internal chambers */}
      {isCutaway && (
        <>
          <pointLight position={[0, 2.5, 0]} intensity={4.5} distance={8} color="#f59e0b" />
          <pointLight position={[0, 1.4, 0.4]} intensity={3.5} distance={6} color="#fb923c" />
        </>
      )}

      {/* Atmospheric Desert Sand Sparkles */}
      <Sparkles
        count={70}
        scale={[20, 10, 20]}
        position={[0, 3, 0]}
        size={2.4}
        speed={0.4}
        opacity={0.65}
        color="#fde047"
      />

      {/* ----------------------------------------------------------------- */}
      {/* Giza Plateau Desert Terrain Base                                  */}
      {/* ----------------------------------------------------------------- */}
      <group position={[0, -0.25, 0]}>
        {/* Main Sand Foundation (Radius 13.5) */}
        <Cylinder args={[13.5, 13.8, 0.5, 48]} position={[0, 0, 0]} receiveShadow>
          <meshStandardMaterial color="#d4a373" roughness={0.92} />
        </Cylinder>

        {/* Desert Dunes / Rock Outcrops */}
        <Sphere args={[2.5, 10, 8]} position={[-7.5, 0.1, -5.5]} scale={[2.4, 0.4, 1.8]}>
          <meshStandardMaterial color="#c5925a" roughness={0.95} />
        </Sphere>
        <Sphere args={[3.0, 10, 8]} position={[7.0, 0.1, 5.0]} scale={[2.2, 0.45, 1.9]}>
          <meshStandardMaterial color="#bc8750" roughness={0.95} />
        </Sphere>
        <Sphere args={[2.0, 8, 8]} position={[-6.0, 0.08, 6.2]} scale={[2.0, 0.35, 1.6]}>
          <meshStandardMaterial color="#c5925a" roughness={0.95} />
        </Sphere>

        {/* Paved Limestone Pavement surrounding the Pyramid base */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.26, 0]} receiveShadow>
          <planeGeometry args={[11.2, 11.2]} />
          <meshStandardMaterial color="#e9d5a1" roughness={0.85} />
        </mesh>
      </group>

      {/* ----------------------------------------------------------------- */}
      {/* Great Pyramid Exterior Stepped Courses                           */}
      {/* ----------------------------------------------------------------- */}
      <group>
        {pyramidLayers.map((layer) => {
          // In cutaway mode, slice open the front-right quadrant (X > 0, Z > 0)
          if (isCutaway) {
            return (
              <group key={layer.id} position={[0, layer.y, 0]}>
                {/* Back-left L-shaped mass */}
                <Box
                  args={[layer.w / 2, layer.layerH, layer.w]}
                  position={[-layer.w / 4, 0, 0]}
                  castShadow
                  receiveShadow
                >
                  <meshStandardMaterial
                    color={layer.progress > 0.88 ? '#fef08a' : '#d4a373'}
                    roughness={0.88}
                  />
                </Box>
                <Box
                  args={[layer.w / 2, layer.layerH, layer.w / 2]}
                  position={[layer.w / 4, 0, -layer.w / 4]}
                  castShadow
                  receiveShadow
                >
                  <meshStandardMaterial
                    color={layer.progress > 0.88 ? '#fef08a' : '#d4a373'}
                    roughness={0.88}
                  />
                </Box>
              </group>
            );
          }

          // Full exterior stepped tier
          return (
            <Box
              key={layer.id}
              args={[layer.w, layer.layerH, layer.w]}
              position={[0, layer.y, 0]}
              castShadow
              receiveShadow
            >
              <meshStandardMaterial
                color={
                  layer.progress > 0.88
                    ? '#fde047' // Top remnant casing
                    : layer.progress > 0.65
                    ? '#dfb17b'
                    : '#d4a373'
                }
                roughness={0.85}
              />
            </Box>
          );
        })}

        {/* Polished Gold / Electrum Capstone (Benben Stone) */}
        <group position={[0, 5.8 + 0.35, 0]}>
          <Cylinder args={[0.02, 0.6, 0.7, 4]}>
            <meshStandardMaterial
              color="#fbbf24"
              metalness={0.9}
              roughness={0.15}
              emissive="#f59e0b"
              emissiveIntensity={0.25}
            />
          </Cylinder>
          <Sparkles count={15} scale={1.5} size={3} color="#fde047" speed={1.2} />
        </group>
      </group>

      {/* ----------------------------------------------------------------- */}
      {/* Internal Chambers & Corridors (Revealed in Cutaway Mode)         */}
      {/* ----------------------------------------------------------------- */}
      {isCutaway && (
        <group>
          {/* Subterranean Bedrock Chamber (Below ground level) */}
          <group position={[0, -0.6, 0]}>
            <Box args={[1.6, 0.7, 1.2]} position={[0, 0, 0]}>
              <meshStandardMaterial color="#44403c" roughness={0.95} />
            </Box>
            {/* Descending Passage */}
            <Box
              args={[0.3, 0.3, 3.8]}
              position={[0, 0.5, 1.4]}
              rotation={[0.46, 0, 0]}
            >
              <meshStandardMaterial color="#292524" roughness={0.95} />
            </Box>
          </group>

          {/* Ascending Passage */}
          <Box
            args={[0.32, 0.35, 2.6]}
            position={[0, 1.1, 0.9]}
            rotation={[-0.46, 0, 0]}
          >
            <meshStandardMaterial color="#78716c" roughness={0.8} />
          </Box>

          {/* Queen's Chamber (Middle Level) */}
          <group position={[0, 1.35, 0]}>
            <Box args={[1.2, 0.75, 1.1]}>
              <meshStandardMaterial color="#a8a29e" roughness={0.7} />
            </Box>
            {/* Gabled roof */}
            <Cylinder
              args={[0.01, 0.9, 0.3, 3]}
              position={[0, 0.48, 0]}
              rotation={[0, 0, Math.PI / 2]}
            >
              <meshStandardMaterial color="#78716c" roughness={0.8} />
            </Cylinder>
          </group>

          {/* Grand Gallery (Monumental corbelled ramp) */}
          <Box
            args={[0.45, 0.9, 2.8]}
            position={[0, 2.0, 0.7]}
            rotation={[-0.46, 0, 0]}
          >
            <meshStandardMaterial color="#d6d3d1" roughness={0.65} />
          </Box>

          {/* King's Chamber & Relieving Chambers (Upper Level) */}
          <group position={[0, 2.7, -0.3]}>
            {/* Main Chamber with Red Aswan Granite Walls */}
            <Box args={[1.8, 1.0, 1.3]}>
              <meshStandardMaterial color="#b91c1c" roughness={0.6} metalness={0.1} />
            </Box>

            {/* Khufu's Granite Sarcophagus */}
            <Box args={[0.7, 0.35, 0.45]} position={[-0.35, -0.25, 0]}>
              <meshStandardMaterial color="#7f1d1d" roughness={0.5} metalness={0.2} />
            </Box>

            {/* 5 Stacked Relieving Stress Beams */}
            {[0, 1, 2, 3, 4].map((idx) => (
              <Box
                key={idx}
                args={[1.9, 0.12, 1.4]}
                position={[0, 0.65 + idx * 0.22, 0]}
              >
                <meshStandardMaterial color="#991b1b" roughness={0.8} />
              </Box>
            ))}

            {/* Star Shafts (Pointing to Orion & Thuban) */}
            <Cylinder
              args={[0.05, 0.05, 2.8, 6]}
              position={[0.9, 0.6, 0]}
              rotation={[0, 0, -0.75]}
            >
              <meshStandardMaterial color="#38bdf8" roughness={0.2} emissive="#0284c7" emissiveIntensity={0.5} />
            </Cylinder>
            <Cylinder
              args={[0.05, 0.05, 2.8, 6]}
              position={[-0.9, 0.6, 0]}
              rotation={[0, 0, 0.75]}
            >
              <meshStandardMaterial color="#fbbf24" roughness={0.2} emissive="#d97706" emissiveIntensity={0.5} />
            </Cylinder>
          </group>

          {/* Original Monumental Entrance on North Face */}
          <group position={[0, 1.15, 4.45]}>
            <Box args={[0.9, 0.8, 0.3]} rotation={[0.45, 0, 0]}>
              <meshStandardMaterial color="#1c1917" roughness={0.9} />
            </Box>
            {/* Double chevrons over entrance */}
            <Box args={[1.1, 0.15, 0.4]} position={[0, 0.5, 0]} rotation={[0, 0, 0.35]}>
              <meshStandardMaterial color="#d4a373" roughness={0.8} />
            </Box>
            <Box args={[1.1, 0.15, 0.4]} position={[0, 0.5, 0]} rotation={[0, 0, -0.35]}>
              <meshStandardMaterial color="#d4a373" roughness={0.8} />
            </Box>
          </group>
        </group>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* Great Sphinx of Giza (Guardian of the Plateau)                   */}
      {/* ----------------------------------------------------------------- */}
      <group position={[6.2, 0.1, 5.8]} rotation={[0, -Math.PI / 4, 0]} scale={0.75}>
        {/* Recumbent Lion Body */}
        <Box args={[2.6, 0.75, 1.1]} position={[0, 0.38, 0]} castShadow>
          <meshStandardMaterial color="#d4a373" roughness={0.88} />
        </Box>
        {/* Outstretched Front Paws */}
        <Box args={[1.2, 0.3, 0.4]} position={[1.4, 0.15, -0.3]} castShadow>
          <meshStandardMaterial color="#c5925a" roughness={0.9} />
        </Box>
        <Box args={[1.2, 0.3, 0.4]} position={[1.4, 0.15, 0.3]} castShadow>
          <meshStandardMaterial color="#c5925a" roughness={0.9} />
        </Box>
        {/* Chest & Shoulders */}
        <Box args={[0.9, 0.9, 0.95]} position={[0.7, 0.85, 0]} castShadow>
          <meshStandardMaterial color="#d4a373" roughness={0.85} />
        </Box>
        {/* Pharaoh Head (Khafre) */}
        <Sphere args={[0.42, 10, 10]} position={[0.7, 1.5, 0]} castShadow>
          <meshStandardMaterial color="#d4a373" roughness={0.8} />
        </Sphere>
        {/* Royal Nemes Headdress Flaps */}
        <Box args={[0.2, 0.55, 1.1]} position={[0.65, 1.45, 0]}>
          <meshStandardMaterial color="#fbbf24" roughness={0.4} />
        </Box>
      </group>

      {/* ----------------------------------------------------------------- */}
      {/* Subsidiary Queen's Pyramids (G1-a, G1-b, G1-c)                   */}
      {/* ----------------------------------------------------------------- */}
      {[-4.8, -6.6, -8.4].map((zPos, i) => (
        <group key={i} position={[-6.8, 0.05, zPos]} scale={0.28}>
          <Cylinder args={[0.02, 3.8, 3.2, 4]} position={[0, 1.6, 0]} castShadow>
            <meshStandardMaterial color="#c5925a" roughness={0.85} />
          </Cylinder>
        </group>
      ))}

      {/* ----------------------------------------------------------------- */}
      {/* Ancient Mortuary Causeway & Palm Trees                            */}
      {/* ----------------------------------------------------------------- */}
      <group>
        {/* Causeway ramp to the Valley */}
        <Box args={[0.8, 0.12, 7.5]} position={[3.2, 0.06, 5.2]} rotation={[0, -0.65, 0]}>
          <meshStandardMaterial color="#e9d5a1" roughness={0.9} />
        </Box>

        {/* Date Palms near Nile flood channel */}
        {[
          { pos: [8.5, 0, 1.5] as [number, number, number], h: 2.2 },
          { pos: [9.2, 0, 3.2] as [number, number, number], h: 2.6 },
          { pos: [7.8, 0, -1.8] as [number, number, number], h: 1.9 },
        ].map((palm, pIdx) => (
          <group key={pIdx} position={palm.pos}>
            <Cylinder args={[0.08, 0.14, palm.h, 6]} position={[0, palm.h / 2, 0]}>
              <meshStandardMaterial color="#78350f" roughness={0.9} />
            </Cylinder>
            {/* Palm Crown */}
            <Sphere args={[0.7, 8, 8]} position={[0, palm.h, 0]} scale={[1.4, 0.4, 1.4]}>
              <meshStandardMaterial color="#15803d" roughness={0.7} />
            </Sphere>
          </group>
        ))}
      </group>

      {/* ----------------------------------------------------------------- */}
      {/* Interactive 3D Badges & Labels                                    */}
      {/* ----------------------------------------------------------------- */}
      {showLabels && (
        <group>
          {/* Main Title Badge */}
          <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.2} position={[0, 7.5, 0]}>
            <Billboard follow={true}>
              <Text
                fontSize={0.48}
                color="#fde047"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.03}
                outlineColor="#78350f"
              >
                GREAT PYRAMID OF GIZA
              </Text>
            </Billboard>
            <Html position={[0, -0.5, 0]} center className="pointer-events-auto select-none">
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/85 border border-amber-400/40 text-amber-200 shadow-[0_0_25px_rgba(245,158,11,0.35)] backdrop-blur-md">
                  <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span className="font-mono text-[10px] tracking-widest uppercase">
                    Khufu's Horizon • c. 2560 BCE
                  </span>
                </div>
                {/* Mode Selector Buttons */}
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/80 border border-amber-500/30 backdrop-blur-md">
                  <button
                    onClick={() => setViewMode('exterior')}
                    className={`px-2.5 py-1 rounded-lg font-mono text-[9px] uppercase tracking-wider transition-all ${
                      viewMode === 'exterior'
                        ? 'bg-amber-500 text-black font-bold shadow-md'
                        : 'text-zinc-300 hover:text-white'
                    }`}
                  >
                    Exterior
                  </button>
                  <button
                    onClick={() => setViewMode('cutaway')}
                    className={`px-2.5 py-1 rounded-lg font-mono text-[9px] uppercase tracking-wider transition-all ${
                      viewMode === 'cutaway'
                        ? 'bg-amber-500 text-black font-bold shadow-md'
                        : 'text-zinc-300 hover:text-white'
                    }`}
                  >
                    Chambers Cutaway
                  </button>
                </div>
              </div>
            </Html>
          </Float>

          {/* Sphinx Hotspot */}
          <group position={[6.2, 2.4, 5.8]}>
            <Billboard follow={true}>
              <Text fontSize={0.24} color="#fef08a" anchorX="center" anchorY="bottom" outlineWidth={0.02} outlineColor="#78350f">
                Great Sphinx
              </Text>
            </Billboard>
            <Html center className="pointer-events-none select-none">
              <div className="mt-1 px-2.5 py-1 rounded-lg bg-black/80 border border-amber-500/30 text-[9px] text-amber-300 font-mono backdrop-blur-md whitespace-nowrap shadow-lg">
                Monolithic Limestone • Khafre
              </div>
            </Html>
          </group>

          {/* Cutaway Chambers Labels */}
          {isCutaway && (
            <>
              {/* King's Chamber */}
              <group position={[0.5, 3.4, -0.3]}>
                <Billboard follow={true}>
                  <Text fontSize={0.24} color="#f87171" anchorX="center" anchorY="bottom" outlineWidth={0.02} outlineColor="#7f1d1d">
                    King's Chamber
                  </Text>
                </Billboard>
                <Html center className="pointer-events-none select-none">
                  <div className="px-2 py-0.5 rounded bg-black/85 border border-red-500/40 text-[8px] text-red-200 font-mono whitespace-nowrap">
                    Red Granite Vault & Sarcophagus
                  </div>
                </Html>
              </group>

              {/* Grand Gallery */}
              <group position={[1.4, 2.4, 0.7]}>
                <Billboard follow={true}>
                  <Text fontSize={0.22} color="#fbbf24" anchorX="center" anchorY="bottom" outlineWidth={0.02} outlineColor="#78350f">
                    Grand Gallery
                  </Text>
                </Billboard>
                <Html center className="pointer-events-none select-none">
                  <div className="px-2 py-0.5 rounded bg-black/85 border border-amber-500/40 text-[8px] text-amber-200 font-mono whitespace-nowrap">
                    47m Corbelled Limestone Ramp
                  </div>
                </Html>
              </group>

              {/* Queen's Chamber */}
              <group position={[1.4, 1.4, 0.0]}>
                <Billboard follow={true}>
                  <Text fontSize={0.22} color="#a7f3d0" anchorX="center" anchorY="bottom" outlineWidth={0.02} outlineColor="#064e3b">
                    Queen's Chamber
                  </Text>
                </Billboard>
                <Html center className="pointer-events-none select-none">
                  <div className="px-2 py-0.5 rounded bg-black/85 border border-emerald-500/40 text-[8px] text-emerald-200 font-mono whitespace-nowrap">
                    Niche & Gabled Ceiling
                  </div>
                </Html>
              </group>

              {/* Subterranean Chamber */}
              <group position={[1.4, -0.5, 0.0]}>
                <Billboard follow={true}>
                  <Text fontSize={0.2} color="#94a3b8" anchorX="center" anchorY="bottom" outlineWidth={0.02} outlineColor="#0f172a">
                    Subterranean Chamber
                  </Text>
                </Billboard>
                <Html center className="pointer-events-none select-none">
                  <div className="px-2 py-0.5 rounded bg-black/85 border border-zinc-500/40 text-[8px] text-zinc-300 font-mono whitespace-nowrap">
                    30m Deep in Solid Bedrock
                  </div>
                </Html>
              </group>
            </>
          )}
        </group>
      )}
    </group>
  );
}
