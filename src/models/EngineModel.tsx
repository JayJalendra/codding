import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Box, Cylinder, Torus } from '@react-three/drei';
import * as THREE from 'three';

// 4-Cylinder inline engine dimensions & kinematics
const CYLINDER_SPACING = 2.0;
const CYLINDERS_X = [-3.0, -1.0, 1.0, 3.0];
const CRANK_RADIUS = 0.85;
const ROD_LENGTH = 2.35;
const CRANK_Y = -1.2;
const CAM_Y = 3.65;
const HEAD_Y = 2.9;

// Firing order 1-3-4-2 phase offsets in the 720° (4π) 4-stroke cycle:
// Cyl 1 fires at 0 rad
// Cyl 3 fires at π rad (180°)
// Cyl 4 fires at 2π rad (360°)
// Cyl 2 fires at 3π rad (540°)
const FIRING_OFFSETS = [0, 3 * Math.PI, Math.PI, 2 * Math.PI];

export function EngineModel({ showLabels = true }: { showLabels?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const crankshaftRef = useRef<THREE.Group>(null);
  const camshaftRef = useRef<THREE.Group>(null);
  const flywheelRef = useRef<THREE.Group>(null);

  // References for pistons, connecting rods, valves and ignition sparks
  const pistonRefs = [
    useRef<THREE.Group>(null),
    useRef<THREE.Group>(null),
    useRef<THREE.Group>(null),
    useRef<THREE.Group>(null),
  ];

  const rodRefs = [
    useRef<THREE.Group>(null),
    useRef<THREE.Group>(null),
    useRef<THREE.Group>(null),
    useRef<THREE.Group>(null),
  ];

  const intakeValveRefs = [
    useRef<THREE.Group>(null),
    useRef<THREE.Group>(null),
    useRef<THREE.Group>(null),
    useRef<THREE.Group>(null),
  ];

  const exhaustValveRefs = [
    useRef<THREE.Group>(null),
    useRef<THREE.Group>(null),
    useRef<THREE.Group>(null),
    useRef<THREE.Group>(null),
  ];

  const sparkRefs = [
    useRef<THREE.Mesh>(null),
    useRef<THREE.Mesh>(null),
    useRef<THREE.Mesh>(null),
    useRef<THREE.Mesh>(null),
  ];

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const engineSpeed = time * 3.5; // crankshaft rotation speed

    // Gentle engine turntable rotation for viewing
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(time * 0.15) * 0.25 + 0.3;
    }

    // Crankshaft & Flywheel continuous rotation
    if (crankshaftRef.current) {
      crankshaftRef.current.rotation.x = engineSpeed;
    }
    if (flywheelRef.current) {
      flywheelRef.current.rotation.x = engineSpeed;
    }

    // Camshaft rotates at exactly HALF crankshaft speed (4-stroke cycle)
    if (camshaftRef.current) {
      camshaftRef.current.rotation.x = engineSpeed * 0.5;
    }

    // Kinematic calculations for each cylinder (1-3-4-2 firing order)
    CYLINDERS_X.forEach((_, i) => {
      // 4-stroke cycle angle (0 to 4π)
      const cycleAngle = (engineSpeed + FIRING_OFFSETS[i]) % (Math.PI * 4);

      // Crank pin angle in Y-Z plane for this cylinder:
      // Cylinders 1 & 4 are in phase on flatplane crank (0 rad)
      // Cylinders 2 & 3 are 180° opposite (π rad)
      const crankPinAngle = (i === 0 || i === 3) ? engineSpeed : engineSpeed + Math.PI;

      // Crank pin instantaneous position in Y-Z plane
      const pinY = CRANK_Y + CRANK_RADIUS * Math.cos(crankPinAngle);
      const pinZ = CRANK_RADIUS * Math.sin(crankPinAngle);

      // Exact slider-crank mathematical calculation:
      // (Y_piston - pinY)^2 + (0 - pinZ)^2 = ROD_LENGTH^2
      const deltaY = Math.sqrt(Math.max(0, ROD_LENGTH * ROD_LENGTH - pinZ * pinZ));
      const pistonY = pinY + deltaY;

      // Connecting rod tilt angle in Y-Z plane
      const rodAngle = -Math.asin(pinZ / ROD_LENGTH);

      // 1. Update Piston Position
      if (pistonRefs[i].current) {
        pistonRefs[i].current.position.y = pistonY;
      }

      // 2. Update Connecting Rod Position & Rotation (pinned between wrist pin and crank pin)
      if (rodRefs[i].current) {
        rodRefs[i].current.position.y = (pistonY + pinY) * 0.5;
        rodRefs[i].current.position.z = pinZ * 0.5;
        rodRefs[i].current.rotation.x = rodAngle;
      }

      // 3. Intake & Exhaust Valve Lift Dynamics
      // Intake stroke: cycleAngle in [0, π] -> Intake valve (red) opens
      const intakeLift = (cycleAngle >= 0 && cycleAngle <= Math.PI)
        ? Math.sin(cycleAngle) * 0.22
        : 0;

      // Exhaust stroke: cycleAngle in [3π, 4π] -> Exhaust valve (blue) opens
      const exhaustLift = (cycleAngle >= Math.PI * 3 && cycleAngle <= Math.PI * 4)
        ? Math.sin(cycleAngle - Math.PI * 3) * 0.22
        : 0;

      if (intakeValveRefs[i].current) {
        intakeValveRefs[i].current.position.y = HEAD_Y + 0.35 - intakeLift;
      }
      if (exhaustValveRefs[i].current) {
        exhaustValveRefs[i].current.position.y = HEAD_Y + 0.35 - exhaustLift;
      }

      // 4. Combustion Chamber Ignition Spark (flashes right at TDC before power stroke: cycleAngle ~ 2π)
      if (sparkRefs[i].current) {
        const distFromFire = Math.abs(cycleAngle - Math.PI * 2);
        if (distFromFire < 0.25) {
          const intensity = 1 - distFromFire / 0.25;
          sparkRefs[i].current.scale.setScalar(0.4 + intensity * 0.8);
          (sparkRefs[i].current.material as THREE.MeshBasicMaterial).opacity = intensity * 0.95;
        } else {
          sparkRefs[i].current.scale.setScalar(0.01);
          (sparkRefs[i].current.material as THREE.MeshBasicMaterial).opacity = 0;
        }
      }
    });
  });

  return (
    <group ref={groupRef} scale={0.75} position={[0, -0.6, 0]}>
      {/* ========================================================= */}
      {/* 1. ENGINE BLOCK: Dark metallic structure with open cutaway */}
      {/* ========================================================= */}
      {/* Lower Crankcase / Sump Base */}
      <mesh position={[0, -1.8, 0]}>
        <boxGeometry args={[8.4, 0.7, 3.4]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.35} />
      </mesh>

      {/* Main Crankcase Bedplate Walls */}
      <mesh position={[0, -1.2, -1.5]}>
        <boxGeometry args={[8.4, 1.0, 0.4]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.35} />
      </mesh>
      <mesh position={[0, -1.2, 1.5]}>
        <boxGeometry args={[8.4, 1.0, 0.4]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.35} />
      </mesh>

      {/* Cylinder Block Rear Wall & Stiffeners */}
      <mesh position={[0, 1.2, -1.5]}>
        <boxGeometry args={[8.4, 3.6, 0.3]} />
        <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.4} />
      </mesh>

      {/* Cylinder Head Deck & Cam Cover on top */}
      <mesh position={[0, HEAD_Y + 0.9, 0]}>
        <boxGeometry args={[8.4, 0.5, 3.2]} />
        <meshStandardMaterial color="#0f172a" metalness={0.85} roughness={0.3} />
      </mesh>
      <mesh position={[0, HEAD_Y + 0.1, 0]}>
        <boxGeometry args={[8.4, 0.4, 3.2]} />
        <meshStandardMaterial color="#334155" metalness={0.75} roughness={0.35} />
      </mesh>

      {/* Left and Right End Plates */}
      <mesh position={[-4.1, 0.7, 0]}>
        <boxGeometry args={[0.3, 4.6, 3.2]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.35} />
      </mesh>
      <mesh position={[4.1, 0.7, 0]}>
        <boxGeometry args={[0.3, 4.6, 3.2]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.35} />
      </mesh>

      {/* ========================================================= */}
      {/* 2. CRANKSHAFT & FLYWHEEL: Steel Blue metallic             */}
      {/* ========================================================= */}
      {/* Crankshaft Main Assembly */}
      <group ref={crankshaftRef} position={[0, CRANK_Y, 0]}>
        {/* Main Central Shaft Core through all journals */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.2, 0.2, 8.4, 24]} />
          <meshStandardMaterial color="#38bdf8" metalness={0.85} roughness={0.25} />
        </mesh>

        {/* 4 Crank Throws with Counterweights & Crank Pins */}
        {CYLINDERS_X.map((x, i) => {
          const isOpposite = (i === 1 || i === 2);
          const pinAngle = isOpposite ? Math.PI : 0;
          return (
            <group key={`crank-throw-${i}`} position={[x, 0, 0]} rotation={[pinAngle, 0, 0]}>
              {/* Crank Pin (Journal where connecting rod attaches) */}
              <mesh position={[0, CRANK_RADIUS, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.22, 0.22, 0.7, 24]} />
                <meshStandardMaterial color="#7dd3fc" metalness={0.9} roughness={0.2} />
              </mesh>

              {/* Counterweight Web 1 (Front cheek) */}
              <mesh position={[-0.32, CRANK_RADIUS * 0.4, 0]}>
                <boxGeometry args={[0.15, CRANK_RADIUS * 1.5, 0.7]} />
                <meshStandardMaterial color="#0284c7" metalness={0.85} roughness={0.3} />
              </mesh>
              {/* Counterweight Balance Mass (opposing the pin) */}
              <mesh position={[-0.32, -CRANK_RADIUS * 0.75, 0]}>
                <boxGeometry args={[0.15, CRANK_RADIUS * 0.9, 1.1]} />
                <meshStandardMaterial color="#0369a1" metalness={0.85} roughness={0.3} />
              </mesh>

              {/* Counterweight Web 2 (Rear cheek) */}
              <mesh position={[0.32, CRANK_RADIUS * 0.4, 0]}>
                <boxGeometry args={[0.15, CRANK_RADIUS * 1.5, 0.7]} />
                <meshStandardMaterial color="#0284c7" metalness={0.85} roughness={0.3} />
              </mesh>
              {/* Counterweight Balance Mass 2 */}
              <mesh position={[0.32, -CRANK_RADIUS * 0.75, 0]}>
                <boxGeometry args={[0.15, CRANK_RADIUS * 0.9, 1.1]} />
                <meshStandardMaterial color="#0369a1" metalness={0.85} roughness={0.3} />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* Flywheel on Rear End of Crankshaft (Large Rotating Steel Disk) */}
      <group ref={flywheelRef} position={[-4.2, CRANK_Y, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[1.55, 1.55, 0.32, 48]} />
          <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Flywheel Recessed Hub */}
        <mesh rotation={[0, 0, Math.PI / 2]} position={[-0.05, 0, 0]}>
          <cylinderGeometry args={[1.2, 1.2, 0.35, 48]} />
          <meshStandardMaterial color="#475569" metalness={0.85} roughness={0.25} />
        </mesh>
        {/* Outer Ring Gear Teeth Accent */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[1.53, 0.04, 16, 48]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.95} roughness={0.15} />
        </mesh>
      </group>

      {/* Front Crank Pulley on Opposite End */}
      <mesh position={[4.2, CRANK_Y, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.65, 0.65, 0.25, 32]} />
        <meshStandardMaterial color="#475569" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* ========================================================= */}
      {/* 3. CAMSHAFT AT TOP: Smaller Rotating Cylinder with Lobes  */}
      {/* ========================================================= */}
      <group ref={camshaftRef} position={[0, CAM_Y, 0]}>
        {/* Main Camshaft Rod */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.14, 0.14, 8.4, 24]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Cam Timing Gear Pulley at Front */}
        <mesh position={[4.15, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.85, 0.85, 0.18, 36]} />
          <meshStandardMaterial color="#64748b" metalness={0.85} roughness={0.25} />
        </mesh>

        {/* Cam Lobes positioned above each intake and exhaust valve */}
        {CYLINDERS_X.map((x, i) => (
          <group key={`cam-lobes-${i}`} position={[x, 0, 0]}>
            {/* Intake Cam Lobe */}
            <mesh position={[-0.35, 0.1, -0.45]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.2, 0.2, 0.16, 16]} />
              <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.15} />
            </mesh>
            {/* Exhaust Cam Lobe */}
            <mesh position={[0.35, 0.1, 0.45]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.2, 0.2, 0.16, 16]} />
              <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.15} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ========================================================= */}
      {/* 4. CYLINDERS, PISTONS, CONNECTING RODS & VALVES           */}
      {/* ========================================================= */}
      {CYLINDERS_X.map((x, i) => (
        <group key={`cylinder-unit-${i}`} position={[x, 0, 0]}>
          {/* Semi-Transparent Cylinder Sleeve */}
          <mesh position={[0, 1.35, 0]}>
            <cylinderGeometry args={[0.82, 0.82, 2.7, 32, 1, true]} />
            <meshPhysicalMaterial
              color="#94a3b8"
              transparent
              opacity={0.32}
              transmission={0.6}
              roughness={0.15}
              metalness={0.3}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Cylinder Sleeve Upper & Lower Steel Reinforcement Rings */}
          <mesh position={[0, 2.65, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.82, 0.04, 16, 32]} />
            <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.82, 0.04, 16, 32]} />
            <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.2} />
          </mesh>

          {/* Piston Assembly (Silver Metallic, reciprocating up/down) */}
          <group ref={pistonRefs[i]}>
            {/* Piston Crown (Head) */}
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.78, 0.78, 0.95, 32]} />
              <meshStandardMaterial color="#f1f5f9" metalness={0.92} roughness={0.18} />
            </mesh>
            {/* Piston Compression Rings (fine grooves) */}
            <mesh position={[0, 0.25, 0]}>
              <cylinderGeometry args={[0.79, 0.79, 0.05, 32]} />
              <meshStandardMaterial color="#64748b" metalness={0.95} roughness={0.1} />
            </mesh>
            <mesh position={[0, 0.12, 0]}>
              <cylinderGeometry args={[0.79, 0.79, 0.05, 32]} />
              <meshStandardMaterial color="#64748b" metalness={0.95} roughness={0.1} />
            </mesh>
            {/* Piston Wrist Pin */}
            <mesh rotation={[0, 0, Math.PI / 2]} position={[0, -0.15, 0]}>
              <cylinderGeometry args={[0.13, 0.13, 0.8, 16]} />
              <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.1} />
            </mesh>
          </group>

          {/* Connecting Rod (Titanium/Silver H-beam linking piston wrist pin to crank pin) */}
          <group ref={rodRefs[i]}>
            {/* Rod Shank (Beam body) */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.2, ROD_LENGTH * 0.75, 0.25]} />
              <meshStandardMaterial color="#94a3b8" metalness={0.88} roughness={0.25} />
            </mesh>
            {/* Small End Eye (top attached to wrist pin) */}
            <mesh position={[0, ROD_LENGTH * 0.45, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.22, 0.22, 0.32, 16]} />
              <meshStandardMaterial color="#94a3b8" metalness={0.88} roughness={0.25} />
            </mesh>
            {/* Big End Journal (bottom clamped onto crank pin) */}
            <mesh position={[0, -ROD_LENGTH * 0.45, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.34, 0.34, 0.45, 24]} />
              <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.2} />
            </mesh>
          </group>

          {/* Combustion Spark Flash (Flashes at TDC during firing stroke) */}
          <mesh ref={sparkRefs[i]} position={[0, 2.5, 0]}>
            <sphereGeometry args={[0.4, 16, 16]} />
            <meshBasicMaterial color="#f59e0b" transparent opacity={0} />
          </mesh>

          {/* Intake Valve (RED) - Tiny cylinder poppet valve moving up/down */}
          <group ref={intakeValveRefs[i]} position={[-0.35, HEAD_Y + 0.35, -0.45]}>
            {/* Valve Stem */}
            <mesh position={[0, 0.35, 0]}>
              <cylinderGeometry args={[0.045, 0.045, 0.8, 12]} />
              <meshStandardMaterial color="#ef4444" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Valve Poppet Head (disc inside combustion chamber) */}
            <mesh position={[0, -0.05, 0]}>
              <cylinderGeometry args={[0.24, 0.08, 0.1, 16]} />
              <meshStandardMaterial color="#dc2626" metalness={0.9} roughness={0.15} />
            </mesh>
            {/* Valve Spring */}
            <mesh position={[0, 0.45, 0]}>
              <cylinderGeometry args={[0.11, 0.11, 0.35, 12]} />
              <meshStandardMaterial color="#fca5a5" metalness={0.7} roughness={0.3} wireframe />
            </mesh>
          </group>

          {/* Exhaust Valve (BLUE) - Tiny cylinder poppet valve moving up/down */}
          <group ref={exhaustValveRefs[i]} position={[0.35, HEAD_Y + 0.35, 0.45]}>
            {/* Valve Stem */}
            <mesh position={[0, 0.35, 0]}>
              <cylinderGeometry args={[0.045, 0.045, 0.8, 12]} />
              <meshStandardMaterial color="#3b82f6" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Valve Poppet Head */}
            <mesh position={[0, -0.05, 0]}>
              <cylinderGeometry args={[0.24, 0.08, 0.1, 16]} />
              <meshStandardMaterial color="#2563eb" metalness={0.9} roughness={0.15} />
            </mesh>
            {/* Valve Spring */}
            <mesh position={[0, 0.45, 0]}>
              <cylinderGeometry args={[0.11, 0.11, 0.35, 12]} />
              <meshStandardMaterial color="#93c5fd" metalness={0.7} roughness={0.3} wireframe />
            </mesh>
          </group>
        </group>
      ))}

      {/* ========================================================= */}
      {/* 5. EDUCATIONAL LABELS                                     */}
      {/* ========================================================= */}
      {showLabels && (
        <>
          {/* Main Title Badge: 4-Cylinder Engine */}
          <Html position={[0, 4.8, 0]} center distanceFactor={12} className="pointer-events-none">
            <div className="flex flex-col items-center select-none">
              <div className="px-3.5 py-1.5 bg-slate-900/90 backdrop-blur-md border border-cyan-500/50 rounded-xl shadow-[0_0_25px_rgba(6,182,212,0.35)] flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-[11px] font-extrabold tracking-wider text-cyan-200 uppercase font-mono">
                  4-Cylinder Engine
                </span>
              </div>
              <div className="text-[8px] text-cyan-300/70 font-mono tracking-tight mt-0.5">
                Inline-4 DOHC (1-3-4-2 Firing Order)
              </div>
            </div>
          </Html>

          {/* Camshaft Label */}
          <Html position={[2.5, CAM_Y + 0.6, 0]} center distanceFactor={12} className="pointer-events-none">
            <div className="flex flex-col items-center select-none">
              <div className="px-2.5 py-1 bg-black/85 backdrop-blur-md border border-purple-500/50 rounded-lg shadow-lg flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span className="text-[10px] font-bold text-purple-200 uppercase font-mono">
                  Camshaft
                </span>
              </div>
              <div className="w-px h-5 bg-gradient-to-b from-purple-500/70 to-transparent" />
            </div>
          </Html>

          {/* Piston Label */}
          <Html position={[1.0, 1.8, 1.3]} center distanceFactor={12} className="pointer-events-none">
            <div className="flex flex-col items-center select-none">
              <div className="px-2.5 py-1 bg-black/85 backdrop-blur-md border border-slate-300/50 rounded-lg shadow-lg flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                <span className="text-[10px] font-bold text-slate-100 uppercase font-mono">
                  Piston
                </span>
              </div>
              <div className="w-px h-5 bg-gradient-to-b from-slate-300/70 to-transparent" />
            </div>
          </Html>

          {/* Crankshaft Label */}
          <Html position={[0, CRANK_Y - 0.7, 1.6]} center distanceFactor={12} className="pointer-events-none">
            <div className="flex flex-col items-center select-none">
              <div className="w-px h-5 bg-gradient-to-t from-sky-400/70 to-transparent" />
              <div className="px-2.5 py-1 bg-black/85 backdrop-blur-md border border-sky-400/50 rounded-lg shadow-lg flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                <span className="text-[10px] font-bold text-sky-200 uppercase font-mono">
                  Crankshaft
                </span>
              </div>
            </div>
          </Html>

          {/* Flywheel Label */}
          <Html position={[-4.3, CRANK_Y + 1.6, 0]} center distanceFactor={12} className="pointer-events-none">
            <div className="flex flex-col items-center select-none">
              <div className="px-2.5 py-1 bg-black/85 backdrop-blur-md border border-amber-400/50 rounded-lg shadow-lg flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span className="text-[10px] font-bold text-amber-200 uppercase font-mono">
                  Flywheel
                </span>
              </div>
              <div className="w-px h-5 bg-gradient-to-b from-amber-400/70 to-transparent" />
            </div>
          </Html>
        </>
      )}
    </group>
  );
}
