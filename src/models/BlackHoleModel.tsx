import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Billboard, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

export function BlackHoleModel({ showLabels = true }: { showLabels?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const diskRef = useRef<THREE.Group>(null);
  const warpedDiskRef = useRef<THREE.Mesh>(null);
  const jetsRef = useRef<THREE.Points>(null);
  const lensedStarsRef = useRef<THREE.Points>(null);

  // Accretion disk particles count & memoized positions
  const particlesCount = 4500;
  const { positions: diskPositions, colors: diskColors } = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    const cols = new Float32Array(particlesCount * 3);
    const innerColor = new THREE.Color('#ffffff');
    const midColor = new THREE.Color('#ff9900');
    const outerColor = new THREE.Color('#d92400');
    const tempColor = new THREE.Color();

    for (let i = 0; i < particlesCount; i++) {
      // Density falls off with radius, higher concentration near innermost stable circular orbit (ISCO)
      const u = Math.random();
      const radius = 2.0 + Math.pow(u, 1.8) * 8.5;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 0.15 * Math.max(0.2, (10 - radius) * 0.3);

      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = height;
      pos[i * 3 + 2] = Math.sin(angle) * radius;

      // Color gradient from white-hot center to cooler red-orange rim
      const t = (radius - 2.0) / 8.5;
      if (t < 0.25) {
        tempColor.lerpColors(innerColor, midColor, t / 0.25);
      } else {
        tempColor.lerpColors(midColor, outerColor, (t - 0.25) / 0.75);
      }
      cols[i * 3] = tempColor.r;
      cols[i * 3 + 1] = tempColor.g;
      cols[i * 3 + 2] = tempColor.b;
    }
    return { positions: pos, colors: cols };
  }, []);

  // Relativistic jet particles
  const jetParticlesCount = 2200;
  const jetPositions = useMemo(() => {
    const pos = new Float32Array(jetParticlesCount * 3);
    for (let i = 0; i < jetParticlesCount; i++) {
      const isNorth = Math.random() > 0.5 ? 1 : -1;
      const distance = 0.5 + Math.random() * 14.5;
      // Collimated beam with slight conical flare at distance
      const spread = 0.08 + (distance / 15) * 0.45;
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * spread;

      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = distance * isNorth;
      pos[i * 3 + 2] = Math.sin(angle) * r;
    }
    return pos;
  }, []);

  // Gravitational lensing starfield (Einstein ring distortion)
  const lensedStarCount = 1800;
  const lensedStarPositions = useMemo(() => {
    const pos = new Float32Array(lensedStarCount * 3);
    const einsteinRadius = 3.2;

    for (let i = 0; i < lensedStarCount; i++) {
      // Distribute in a spherical halo / background plane
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;
      const baseR = 3.5 + Math.random() * 11;

      // Gravitational lensing: stars close to the line of sight are deflected radially outward
      const deflection = Math.pow(einsteinRadius / Math.max(1.6, baseR), 2) * 1.4;
      const r = baseR + deflection;

      pos[i * 3] = r * Math.cos(theta) * Math.cos(phi);
      pos[i * 3 + 1] = r * Math.sin(phi);
      pos[i * 3 + 2] = r * Math.sin(theta) * Math.cos(phi);
    }
    return pos;
  }, []);

  // PERFORMANCE FIX: Generate disk textures ONCE in useMemo
  const textures = useMemo(() => {
    // 1. Primary Accretion Disk Texture with smooth falloffs and Doppler turbulence
    const diskCanvas = document.createElement('canvas');
    diskCanvas.width = 512;
    diskCanvas.height = 512;
    const ctx1 = diskCanvas.getContext('2d');
    if (ctx1) {
      const cx = 256;
      const cy = 256;
      const grad = ctx1.createRadialGradient(cx, cy, 35, cx, cy, 256);
      grad.addColorStop(0.0, 'rgba(0, 0, 0, 0)');
      grad.addColorStop(0.12, 'rgba(0, 0, 0, 0)');
      grad.addColorStop(0.18, 'rgba(255, 255, 255, 1.0)'); // ISCO inner rim: blinding white
      grad.addColorStop(0.26, 'rgba(255, 220, 110, 0.95)');
      grad.addColorStop(0.42, 'rgba(255, 130, 20, 0.85)');
      grad.addColorStop(0.68, 'rgba(220, 45, 5, 0.45)');
      grad.addColorStop(0.92, 'rgba(120, 15, 0, 0.15)');
      grad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');

      ctx1.fillStyle = grad;
      ctx1.fillRect(0, 0, 512, 512);

      // Fine concentric bands representing Keplerian velocity differentials
      ctx1.strokeStyle = 'rgba(255, 240, 200, 0.12)';
      ctx1.lineWidth = 1.5;
      for (let r = 60; r < 245; r += 10) {
        ctx1.beginPath();
        ctx1.arc(cx, cy, r, 0, Math.PI * 2);
        ctx1.stroke();
      }
    }
    const diskTexture = new THREE.CanvasTexture(diskCanvas);

    // 2. High-heat inner relativistic boundary texture
    const innerCanvas = document.createElement('canvas');
    innerCanvas.width = 256;
    innerCanvas.height = 256;
    const ctx2 = innerCanvas.getContext('2d');
    if (ctx2) {
      const cx = 128;
      const cy = 128;
      const grad = ctx2.createRadialGradient(cx, cy, 20, cx, cy, 128);
      grad.addColorStop(0.0, 'rgba(255, 255, 255, 0)');
      grad.addColorStop(0.28, 'rgba(255, 255, 255, 0)');
      grad.addColorStop(0.40, 'rgba(255, 255, 255, 1.0)');
      grad.addColorStop(0.60, 'rgba(255, 200, 70, 0.85)');
      grad.addColorStop(0.85, 'rgba(255, 90, 0, 0.3)');
      grad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
      ctx2.fillStyle = grad;
      ctx2.fillRect(0, 0, 256, 256);
    }
    const innerTexture = new THREE.CanvasTexture(innerCanvas);

    // 3. Subtle Gravitational Lensing Halo / Einstein Ring Texture
    const lensCanvas = document.createElement('canvas');
    lensCanvas.width = 256;
    lensCanvas.height = 256;
    const ctx3 = lensCanvas.getContext('2d');
    if (ctx3) {
      const cx = 128;
      const cy = 128;
      const grad = ctx3.createRadialGradient(cx, cy, 60, cx, cy, 128);
      grad.addColorStop(0.0, 'rgba(255, 255, 255, 0)');
      grad.addColorStop(0.48, 'rgba(255, 245, 200, 0)');
      grad.addColorStop(0.62, 'rgba(255, 255, 255, 0.9)');
      grad.addColorStop(0.75, 'rgba(125, 211, 252, 0.6)');
      grad.addColorStop(0.92, 'rgba(56, 189, 248, 0.15)');
      grad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
      ctx3.fillStyle = grad;
      ctx3.fillRect(0, 0, 256, 256);
    }
    const lensTexture = new THREE.CanvasTexture(lensCanvas);

    return { diskTexture, innerTexture, lensTexture };
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Slow global cosmic drift
      groupRef.current.rotation.y = time * 0.08;
    }

    if (diskRef.current) {
      // Rapid accretion disk orbital rotation
      diskRef.current.rotation.z = time * -0.45;
    }

    if (warpedDiskRef.current) {
      // Interstellar-style warped light arch rotation
      warpedDiskRef.current.rotation.z = time * -0.3;
    }

    if (lensedStarsRef.current) {
      lensedStarsRef.current.rotation.y = time * 0.02;
    }

    // Animate Relativistic Jet particles
    if (jetsRef.current) {
      const posArray = jetsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < jetParticlesCount; i++) {
        const y = posArray[i * 3 + 1];
        const isNorth = y >= 0;
        const speed = 0.18 + Math.abs(y) * 0.04;

        if (isNorth) {
          posArray[i * 3 + 1] += speed;
          if (posArray[i * 3 + 1] > 15) {
            posArray[i * 3 + 1] = 0.5 + Math.random() * 0.2;
            const flare = 0.08;
            posArray[i * 3] = (Math.random() - 0.5) * flare;
            posArray[i * 3 + 2] = (Math.random() - 0.5) * flare;
          }
        } else {
          posArray[i * 3 + 1] -= speed;
          if (posArray[i * 3 + 1] < -15) {
            posArray[i * 3 + 1] = -0.5 - Math.random() * 0.2;
            const flare = 0.08;
            posArray[i * 3] = (Math.random() - 0.5) * flare;
            posArray[i * 3 + 2] = (Math.random() - 0.5) * flare;
          }
        }
      }
      jetsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} scale={0.55}>
      {/* 1. EVENT HORIZON: Perfect Black Sphere */}
      <mesh>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* 2. SUBTLE GRAVITATIONAL LENSING GLOW RING (Einstein Ring Halo) */}
      <Billboard>
        <mesh>
          <planeGeometry args={[3.8, 3.8]} />
          <meshBasicMaterial
            map={textures.lensTexture}
            transparent
            opacity={0.85}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </Billboard>

      {/* 3. PHOTON SPHERE: Semi-transparent resonant orbital shell */}
      <mesh>
        <sphereGeometry args={[1.72, 64, 64]} />
        <meshBasicMaterial
          color="#ffaa00"
          transparent
          opacity={0.18}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* 4. WARPED ACCRETION DISK (Interstellar-style gravitational lensed arch) */}
      {/* Light from behind the black hole bent upward and downward across the shadow */}
      <mesh ref={warpedDiskRef} rotation={[0, 0, 0]}>
        <ringGeometry args={[1.75, 4.2, 128]} />
        <meshBasicMaterial
          map={textures.diskTexture}
          color="#ff7700"
          transparent
          opacity={0.65}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Secondary tilted warped halo */}
      <mesh rotation={[Math.PI * 0.25, 0, 0]}>
        <ringGeometry args={[1.78, 3.4, 96]} />
        <meshBasicMaterial
          map={textures.innerTexture}
          color="#ffdd66"
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* 5. PRIMARY ACCRETION DISK: Multiple glowing rings with layered depth & color */}
      <group rotation={[Math.PI / 2.25, 0, 0]}>
        <group ref={diskRef}>
          {/* Inner Ultra-Hot Relativistic Ring (White-Gold ISCO) */}
          <mesh position={[0, 0, 0.02]}>
            <ringGeometry args={[1.8, 3.4, 128]} />
            <meshBasicMaterial
              map={textures.innerTexture}
              color="#ffffff"
              transparent
              opacity={0.95}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>

          {/* Main Fiery Accretion Disk */}
          <mesh position={[0, 0, 0]}>
            <ringGeometry args={[2.0, 9.5, 128]} />
            <meshBasicMaterial
              map={textures.diskTexture}
              color="#ff5500"
              transparent
              opacity={0.78}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>

          {/* Outer Cooler Accretion Rim (Deep Crimson Glow) */}
          <mesh position={[0, 0, -0.02]}>
            <ringGeometry args={[6.5, 12.5, 128]} />
            <meshBasicMaterial
              map={textures.diskTexture}
              color="#991b1b"
              transparent
              opacity={0.35}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        </group>

        {/* Accretion Disk High-Energy Particles with Color Grading */}
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={particlesCount}
              array={diskPositions}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-color"
              count={particlesCount}
              array={diskColors}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.065}
            vertexColors
            transparent
            opacity={0.85}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>
      </group>

      {/* 6. GRAVITATIONAL LENSING EFFECT: Distorted background starfield */}
      <points ref={lensedStarsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={lensedStarCount}
            array={lensedStarPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#bae6fd"
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Sparkles around photon sphere simulating quantum field fluctuations */}
      <Sparkles
        count={80}
        scale={6}
        size={2.5}
        speed={0.4}
        color="#38bdf8"
        opacity={0.5}
      />

      {/* 7. RELATIVISTIC JETS: Polar collimated plasma plumes */}
      <points ref={jetsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={jetParticlesCount}
            array={jetPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.09}
          color="#38bdf8"
          transparent
          opacity={0.75}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Core Jet Glow Column */}
      <mesh position={[0, 4.5, 0]}>
        <cylinderGeometry args={[0.08, 0.45, 9, 16]} />
        <meshBasicMaterial
          color="#0284c7"
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[0, -4.5, 0]}>
        <cylinderGeometry args={[0.45, 0.08, 9, 16]} />
        <meshBasicMaterial
          color="#0284c7"
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* 8. EDUCATIONAL HTML LABELS */}
      {showLabels && (
        <>
          {/* Event Horizon Label */}
          <Html position={[0, 0, 1.6]} center distanceFactor={11} className="pointer-events-none">
            <div className="flex flex-col items-center select-none">
              <div className="px-3 py-1.5 bg-black/85 backdrop-blur-md border border-red-500/50 rounded-lg shadow-[0_0_25px_rgba(239,68,68,0.35)] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span className="text-[11px] font-bold tracking-wider text-red-200 uppercase font-mono">
                  Event Horizon
                </span>
              </div>
              <div className="w-px h-6 bg-gradient-to-b from-red-500/70 to-transparent" />
            </div>
          </Html>

          {/* Photon Sphere Label */}
          <Html position={[2.1, 1.5, 0]} center distanceFactor={11} className="pointer-events-none">
            <div className="flex flex-col items-center select-none">
              <div className="px-3 py-1.5 bg-black/85 backdrop-blur-md border border-amber-400/50 rounded-lg shadow-[0_0_20px_rgba(251,191,36,0.3)] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="text-[11px] font-bold tracking-wider text-amber-200 uppercase font-mono">
                  Photon Sphere
                </span>
              </div>
              <div className="w-px h-5 bg-gradient-to-b from-amber-400/70 to-transparent" />
            </div>
          </Html>

          {/* Accretion Disk Label */}
          <Html position={[5.8, 1.2, 2.0]} center distanceFactor={11} className="pointer-events-none">
            <div className="flex flex-col items-center select-none">
              <div className="px-3 py-1.5 bg-black/85 backdrop-blur-md border border-orange-500/50 rounded-lg shadow-[0_0_20px_rgba(249,115,22,0.3)] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                <span className="text-[11px] font-bold tracking-wider text-orange-200 uppercase font-mono">
                  Accretion Disk
                </span>
              </div>
              <div className="w-px h-6 bg-gradient-to-b from-orange-500/70 to-transparent" />
            </div>
          </Html>

          {/* Relativistic Jet Label */}
          <Html position={[0, 9.2, 0]} center distanceFactor={11} className="pointer-events-none">
            <div className="flex flex-col items-center select-none">
              <div className="px-3 py-1.5 bg-black/85 backdrop-blur-md border border-sky-400/50 rounded-lg shadow-[0_0_20px_rgba(56,189,248,0.35)] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                <span className="text-[11px] font-bold tracking-wider text-sky-200 uppercase font-mono">
                  Relativistic Jet
                </span>
              </div>
              <div className="w-px h-6 bg-gradient-to-b from-sky-400/70 to-transparent" />
            </div>
          </Html>
        </>
      )}
    </group>
  );
}
