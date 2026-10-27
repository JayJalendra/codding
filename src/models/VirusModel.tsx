import { useState, useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

interface LabelCalloutProps {
  name: string;
  subtitle: string;
  description: string;
  position: [number, number, number];
  color: string;
  pointerDirection?: 'left' | 'right' | 'top' | 'bottom';
}

const VIRUS_ANNOTATIONS: Record<string, { subtitle: string; description: string; color: string }> = {
  'RNA Core': {
    subtitle: 'Viral Genome & N-Protein',
    description: 'Positive-sense single-stranded genomic RNA (~30 kb) densely packaged within phosphorylated nucleocapsid (N) proteins forming a helical ribonucleoprotein matrix.',
    color: '#ef4444'
  },
  'Lipid Envelope': {
    subtitle: 'Host-Derived Bilayer',
    description: 'Protective lipid bilayer harvested from the host endoplasmic reticulum-Golgi intermediate compartment (ERGIC), reinforced by structural matrix (M) proteins.',
    color: '#f59e0b'
  },
  'Spike Protein (S)': {
    subtitle: 'Trimeric Class I Fusion Glycoprotein',
    description: 'Heavily glycosylated homotrimer composed of S1 (receptor-binding) and S2 (membrane fusion) subunits, forming the distinctive viral corona.',
    color: '#ea580c'
  },
  'Receptor-Binding Domain': {
    subtitle: 'ACE2 Affinity Motif (S1 Subunit)',
    description: 'Dynamic apical domain on the S1 head that transitions between "down" (immune-evasive) and "up" (receptor-accessible) conformations to engage human ACE2.',
    color: '#f43f5e'
  }
};

function VirusCalloutLabel({
  name,
  position,
}: {
  name: string;
  position: [number, number, number];
}) {
  const [hovered, setHovered] = useState(false);
  const data = VIRUS_ANNOTATIONS[name];

  return (
    <Html position={position} center distanceFactor={13} className="pointer-events-none select-none">
      <div 
        className="relative pointer-events-auto cursor-pointer group"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Core Tag */}
        <div 
          className="flex items-center gap-2 px-3 py-1.5 bg-slate-950/90 backdrop-blur-md rounded-xl border transition-all duration-300 shadow-2xl"
          style={{
            borderColor: hovered ? data.color : `${data.color}80`,
            boxShadow: hovered ? `0 0 25px ${data.color}70` : `0 0 12px ${data.color}35`
          }}
        >
          <div 
            className="w-2 h-2 rounded-full animate-ping" 
            style={{ backgroundColor: data.color }} 
          />
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-black font-mono tracking-wider uppercase text-white whitespace-nowrap">
              {name}
            </span>
          </div>
        </div>

        {/* Informative Hover Card */}
        {hovered && (
          <div 
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-60 p-3.5 bg-zinc-950/95 border rounded-xl text-left shadow-2xl backdrop-blur-xl z-50 pointer-events-none"
            style={{ borderColor: `${data.color}90` }}
          >
            <div className="text-[8px] uppercase tracking-widest font-mono font-bold mb-1" style={{ color: data.color }}>
              Virology Analysis
            </div>
            <div className="text-white text-xs font-bold leading-tight mb-0.5">{name}</div>
            <div className="text-[9px] font-mono text-zinc-400 mb-2">{data.subtitle}</div>
            <p className="text-zinc-300 text-[10px] leading-relaxed font-sans">
              {data.description}
            </p>
          </div>
        )}
      </div>
    </Html>
  );
}

interface SpikeData {
  id: string;
  dir: THREE.Vector3;
  stalkCenter: THREE.Vector3;
  tipPos: THREE.Vector3;
  quaternion: THREE.Quaternion;
  stalkLength: number;
  pulsePhase: number;
}

export function VirusModel({ showLabels = true }: { showLabels?: boolean }) {
  const mainGroupRef = useRef<THREE.Group>(null);
  const spikesGroupRef = useRef<THREE.Group>(null);
  const rnaCoreRef = useRef<THREE.Mesh>(null);

  // Generate 48 spike proteins using Fibonacci sphere algorithm
  const { spikes, envelopeProteins } = useMemo(() => {
    const spikeList: SpikeData[] = [];
    const spikeCount = 48; // between 40-50 spikes
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const goldenAngle = Math.PI * 2 * (1 - 1 / goldenRatio); // ~2.39996 rad

    const envelopeRadius = 2.32;
    const stalkLength = 1.15;

    for (let i = 0; i < spikeCount; i++) {
      // Fibonacci sphere distribution
      const y = 1 - (i / (spikeCount - 1)) * 2; // from +1 to -1
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = goldenAngle * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      const dir = new THREE.Vector3(x, y, z).normalize();

      // Stalk center is halfway along stalk length outside the envelope
      const stalkCenter = dir.clone().multiplyScalar(envelopeRadius + stalkLength / 2);
      // Apical tip is at the outer end of the stalk
      const tipPos = dir.clone().multiplyScalar(envelopeRadius + stalkLength);

      // Quaternion to orient cylinder along direction vector
      const quaternion = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        dir
      );

      spikeList.push({
        id: `spike-${i}`,
        dir,
        stalkCenter,
        tipPos,
        quaternion,
        stalkLength,
        pulsePhase: i * 0.35
      });
    }

    // Small Envelope (E) proteins: tiny spheres scattered across surface
    const eCount = 75;
    const eList: THREE.Vector3[] = [];
    for (let j = 0; j < eCount; j++) {
      const y = 1 - (j / (eCount - 1)) * 2;
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = goldenAngle * j + 1.25; // Phase offset from spikes
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      const pos = new THREE.Vector3(x, y, z).normalize().multiplyScalar(envelopeRadius);
      eList.push(pos);
    }

    return {
      spikes: spikeList,
      envelopeProteins: eList
    };
  }, []);

  // Frame animation loop
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Animated slow rotation on Y and X axes
    if (mainGroupRef.current) {
      mainGroupRef.current.rotation.y = time * 0.12;
      mainGroupRef.current.rotation.x = Math.sin(time * 0.08) * 0.16;
    }

    // Animated spike proteins gently pulsing (scale animation)
    if (spikesGroupRef.current) {
      const spikePulse = 1.0 + Math.sin(time * 2.4) * 0.038;
      spikesGroupRef.current.scale.set(spikePulse, spikePulse, spikePulse);
    }

    // Gentle metallic core pulse
    if (rnaCoreRef.current) {
      const coreMat = rnaCoreRef.current.material as THREE.MeshStandardMaterial;
      if (coreMat) {
        coreMat.emissiveIntensity = 0.5 + Math.sin(time * 1.8) * 0.25;
      }
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={mainGroupRef} scale={1.05}>
        {/* Atmospheric Ambient Sparkles */}
        <Sparkles 
          count={95} 
          scale={11} 
          size={2.2} 
          speed={0.4} 
          opacity={0.35} 
          color="#f59e0b" 
        />

        {/* Central RNA Core: Dark Red, Metallic Sphere */}
        <group>
          <mesh ref={rnaCoreRef}>
            <sphereGeometry args={[1.3, 48, 48]} />
            <meshStandardMaterial 
              color="#7f1d1d" 
              metalness={0.88}
              roughness={0.22}
              emissive="#450a0a"
              emissiveIntensity={0.6}
            />
          </mesh>

          {/* Internal Ribonucleoprotein (N-protein) Helical Coils */}
          <mesh rotation={[0.4, 0.6, 0.2]}>
            <torusGeometry args={[1.34, 0.045, 16, 64]} />
            <meshStandardMaterial 
              color="#991b1b" 
              metalness={0.7} 
              roughness={0.3} 
              emissive="#7f1d1d" 
              emissiveIntensity={0.4} 
            />
          </mesh>
          <mesh rotation={[-0.8, 0.3, 1.1]}>
            <torusGeometry args={[1.36, 0.04, 16, 64]} />
            <meshStandardMaterial 
              color="#991b1b" 
              metalness={0.7} 
              roughness={0.3} 
              emissive="#7f1d1d" 
              emissiveIntensity={0.4} 
            />
          </mesh>
        </group>

        {/* Outer Envelope Sphere: Semi-transparent Lipid Bilayer in Orange/Amber */}
        <group>
          {/* Inner leaflet */}
          <mesh>
            <sphereGeometry args={[2.26, 48, 48]} />
            <meshPhysicalMaterial 
              color="#d97706" 
              transparent 
              opacity={0.25} 
              roughness={0.25} 
              metalness={0.15} 
              transmission={0.3}
              depthWrite={false} 
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Outer leaflet */}
          <mesh>
            <sphereGeometry args={[2.34, 64, 64]} />
            <meshPhysicalMaterial 
              color="#f59e0b" 
              transparent 
              opacity={0.42} 
              roughness={0.18} 
              metalness={0.12} 
              clearcoat={1.0} 
              clearcoatRoughness={0.1}
              transmission={0.25} 
              depthWrite={false} 
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>

        {/* Small Envelope Proteins (E Proteins): Tiny spheres on the surface */}
        <group>
          {envelopeProteins.map((pos, idx) => (
            <mesh key={`eprotein-${idx}`} position={pos}>
              <sphereGeometry args={[0.07, 12, 12]} />
              <meshStandardMaterial 
                color="#fbbf24" 
                emissive="#f59e0b"
                emissiveIntensity={0.4}
                roughness={0.25} 
                metalness={0.5} 
              />
            </mesh>
          ))}
        </group>

        {/* 48 Spike Proteins (S Protein): Thin Cylinders with Sphere Tips */}
        <group ref={spikesGroupRef}>
          {spikes.map((spike) => (
            <group key={spike.id}>
              {/* S2 Stalk Cylinder */}
              <mesh 
                position={spike.stalkCenter} 
                quaternion={spike.quaternion}
              >
                <cylinderGeometry args={[0.042, 0.055, spike.stalkLength, 10]} />
                <meshStandardMaterial 
                  color="#ea580c" 
                  emissive="#c2410c"
                  emissiveIntensity={0.3}
                  roughness={0.35} 
                  metalness={0.2} 
                />
              </mesh>

              {/* S1 Apical Trimer / Crown Tip (Receptor-Binding Domain) */}
              <group position={spike.tipPos} quaternion={spike.quaternion}>
                {/* Central bulb */}
                <mesh>
                  <sphereGeometry args={[0.16, 16, 16]} />
                  <meshStandardMaterial 
                    color="#ef4444" 
                    emissive="#991b1b"
                    emissiveIntensity={0.5}
                    roughness={0.3} 
                    metalness={0.25} 
                  />
                </mesh>

                {/* Trimeric lobe tips representing the 3 RBD heads */}
                {[-0.08, 0, 0.08].map((offset, lobeIdx) => (
                  <mesh 
                    key={`lobe-${lobeIdx}`} 
                    position={[
                      Math.cos((lobeIdx * 2 * Math.PI) / 3) * 0.1,
                      0.06,
                      Math.sin((lobeIdx * 2 * Math.PI) / 3) * 0.1
                    ]}
                  >
                    <sphereGeometry args={[0.08, 12, 12]} />
                    <meshStandardMaterial 
                      color="#f43f5e" 
                      emissive="#dc2626"
                      emissiveIntensity={0.6}
                      roughness={0.2} 
                      metalness={0.3} 
                    />
                  </mesh>
                ))}
              </group>
            </group>
          ))}
        </group>

        {/* Html Labels */}
        {showLabels && (
          <group>
            {/* RNA Core Label */}
            <VirusCalloutLabel 
              name="RNA Core" 
              position={[-1.7, -1.2, 1.6]} 
            />

            {/* Lipid Envelope Label */}
            <VirusCalloutLabel 
              name="Lipid Envelope" 
              position={[2.2, 1.4, 1.2]} 
            />

            {/* Spike Protein (S) Label */}
            <VirusCalloutLabel 
              name="Spike Protein (S)" 
              position={[-2.8, 2.3, 1.4]} 
            />

            {/* Receptor-Binding Domain Label */}
            <VirusCalloutLabel 
              name="Receptor-Binding Domain" 
              position={[2.9, 2.7, 1.5]} 
            />
          </group>
        )}
      </group>
    </Float>
  );
}
