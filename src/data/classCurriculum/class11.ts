import { CourseData } from '../../services/contentService';

export const class11Curriculum: Record<string, CourseData> = {
  // Class 11 -> Physics -> Quantum Physics
  'Class 11::QuantumPhysics': {
    classId: 'Class 11',
    subjectId: 'Physics',
    topicId: 'QuantumPhysics',
    gradeLevel: 11,
    ageBand: 'Ages 16–17',
    title: 'Dual Nature of Radiation & Matter',
    subtitle: 'NCERT Physics Chapter 11: Photoelectric Effect & de Broglie Waves',
    intro: 'Classical electromagnetic wave theory failed dramatically when confronted with the Photoelectric Effect: light shone on a clean metal surface ejects electrons instantaneously without any time lag, and the kinetic energy of emitted electrons depends strictly on light frequency, not light intensity! In 1905, Albert Einstein resolved this by proposing that light is quantized into localized packets of energy called photons, each carrying energy E = hν.',
    category: 'Physics',
    difficulty: 'Advanced',
    duration: '30 min',
    iconName: 'Zap',
    color: 'indigo',
    whyLearnThis: 'The quantization of light and matter is the absolute cornerstone of modern semiconductors, solar panels, CCD cameras, quantum computing, and electron microscopes.',
    visualExploration: 'Adjust the photon emitter frequency in the 3D lab! Observe that red light (low frequency below threshold ν₀) ejects zero electrons no matter how bright you make the beam. But as soon as frequency crosses threshold into ultraviolet, photoelectrons are ejected immediately!',
    howItWorks: 'When a single incident photon of energy hν collides with a conduction electron, it transfers its entire quantum of energy instantaneously. Part of this energy overcomes the metal’s binding Work Function (Φ₀), and the remaining energy becomes the maximum kinetic energy (K_max) of the escaping photoelectron.',
    realLifeConnection: 'Solar photovoltaic panels on rooftops and light sensors in smartphone cameras operate on this exact photoelectric principle, converting incoming sunlight photons directly into electrical current!',
    tryItYourself: 'Calculate: If a metal has a work function of 2.0 eV and is struck by a photon of 3.5 eV, what is the maximum kinetic energy of the ejected electron? K_max = 3.5 - 2.0 = 1.5 eV!',
    misconceptions: [
      'Increasing light intensity does NOT increase the kinetic energy or speed of ejected electrons! Increasing intensity merely means more photons strike per second, which increases the number of ejected electrons (photoelectric current), but individual electron kinetic energy depends purely on frequency ν.'
    ],
    recap: [
      'Light exhibits particle nature in emission/absorption, and wave nature in propagation (interference/diffraction)',
      'Einstein’s photoelectric equation: hν = Φ₀ + K_max',
      'Threshold frequency ν₀ is the minimum frequency required to overcome work function Φ₀',
      'de Broglie hypothesis: Matter has wave nature with wavelength λ = h/p'
    ],
    challengeQuestion: 'Why is the wave nature of everyday macroscopic objects (like a moving cricket ball) undetectable in daily life?',
    sections: [
      {
        title: 'Einstein’s Photoelectric Equation',
        content: 'Photon energy hν is split into metal work function Φ₀ (energy required to escape surface) and maximum kinetic energy K_max = ½mv²_max = eV₀ (where V₀ is stopping potential).',
        icon: 'Zap',
        color: 'text-indigo-400'
      },
      {
        title: 'Threshold Frequency & Work Function',
        content: 'Below the threshold frequency ν₀ = Φ₀/h, no photoelectrons are emitted regardless of beam intensity. Emission is strictly instantaneous (delay < 10⁻⁹ s).',
        icon: 'Target',
        color: 'text-cyan-400'
      },
      {
        title: 'de Broglie Wavelength of Matter',
        content: 'Louis de Broglie proposed that moving particles have an associated matter wave: λ = h/p = h/(mv). This makes electron microscopes possible, achieving 100,000x higher resolution than optical microscopes.',
        icon: 'Waves',
        color: 'text-purple-400'
      }
    ],
    math: {
      title: 'Einstein’s Photoelectric Equation & de Broglie Wavelength',
      intro: 'The energy balance of photoelectric emission and the de Broglie matter wavelength are:',
      formula: 'K_{\\text{max}} = h\\nu - \\Phi_0 = e V_0 \\quad \\text{and} \\quad \\lambda = \\frac{h}{p} = \\frac{h}{\\sqrt{2mE}}',
      variables: [
        { symbol: 'Kmax', definition: 'Maximum kinetic energy of ejected photoelectrons (Joules or eV)' },
        { symbol: 'h', definition: 'Planck’s constant (6.626 × 10⁻³⁴ J·s)' },
        { symbol: 'ν', definition: 'Frequency of incident electromagnetic radiation (Hz)' },
        { symbol: 'Φ0', definition: 'Work function of the metal surface (hν₀)' },
        { symbol: 'V0', definition: 'Stopping potential required to reduce photocurrent to zero' },
        { symbol: 'λ', definition: 'de Broglie matter wavelength of particle with momentum p' }
      ],
      minGradeLevel: 11
    },
    conclusion: {
      title: 'Wave-Particle Duality',
      content: 'Matter and radiation possess an intrinsic dual nature: behaving as continuous waves during spatial propagation, and as discrete quantum particles during energy exchange.',
      highlight: 'E = hν & λ = h/p',
      highlightNote: 'The pillars of quantum reality'
    },
    modules: [
      {
        title: 'Threshold Frequency & Stopping Potential',
        desc: 'Vary incident frequency and retarding voltage to determine Planck’s constant experimentally.',
        completed: false,
        objectives: ['Measure stopping potential V₀ as a function of frequency ν', 'Determine work function from the intercept'],
        interactiveLabel: 'Run Photoelectric Sim',
        interactiveType: 'simulation',
        quiz: {
          question: 'According to Einstein’s photoelectric equation, what does the slope of a graph between stopping potential (V₀) and frequency (ν) represent?',
          options: ['Work function Φ₀', 'h/e (Planck’s constant divided by electron charge)', 'Electron mass', 'Light intensity'],
          correctAnswer: 1
        }
      },
      {
        title: 'Intensity vs Frequency Effects',
        desc: 'Observe how beam brightness increases current without altering maximum kinetic energy.',
        completed: false,
        objectives: ['Differentiate intensity vs frequency effects', 'Observe zero time-lag emission'],
        interactiveLabel: 'Adjust Light Intensity',
        interactiveType: 'simulation',
        quiz: {
          question: 'What happens to the saturation photoelectric current when the intensity of incident light above threshold frequency is doubled?',
          options: ['Current remains unchanged', 'Current doubles', 'Current drops to zero', 'Electron kinetic energy doubles'],
          correctAnswer: 1
        }
      },
      {
        title: 'de Broglie Matter Waves',
        desc: 'Calculate the de Broglie wavelength of an electron accelerated through potential difference V.',
        completed: false,
        objectives: ['Use λ = 1.227 / √V nm for accelerated electrons', 'Connect matter waves to Davisson-Germer electron diffraction'],
        interactiveLabel: 'Calculate Matter Wave',
        interactiveType: 'calculator',
        quiz: {
          question: 'For an electron accelerated from rest through a potential difference of 100 Volts, what is its approximate de Broglie wavelength?',
          options: ['12.27 nm', '1.227 nm', '0.123 nm', '0.012 nm'],
          correctAnswer: 2
        }
      }
    ]
  },

  // Class 11 -> Physics -> Millikan Oil Drop
  'Class 11::MillikanOilDrop': {
    classId: 'Class 11',
    subjectId: 'Physics',
    topicId: 'MillikanOilDrop',
    gradeLevel: 11,
    ageBand: 'Ages 16–17',
    title: 'Quantization of Electric Charge',
    subtitle: 'Millikan’s Oil Drop Experiment & Elementary Charge',
    intro: 'In 1909, American physicist Robert Millikan performed one of the most elegant precision experiments in scientific history. By suspending atomized microscopic oil droplets in an electric field against the downward pull of gravity, Millikan proved conclusively that electric charge is not continuous, but quantized into integer multiples of a fundamental elementary charge: q = ne, where e ≈ 1.602 × 10⁻¹⁹ C.',
    category: 'Physics',
    difficulty: 'Advanced',
    duration: '25 min',
    iconName: 'FlaskConical',
    color: 'amber',
    whyLearnThis: 'Charge quantization is a foundational law of electromagnetism, atomic physics, and quantum electrodynamics. It is the basis for all electronics, Faraday’s laws of electrolysis, and semiconductor doping.',
    visualExploration: 'Look into the 3D viewing microscope of the Millikan apparatus! Observe tiny charged oil droplets drifting between two parallel metal condenser plates connected to high voltage. Toggle the electric field to make a single droplet halt and hover motionless in mid-air!',
    howItWorks: 'An oil droplet falls under gravity and buoyant force, reaching a terminal velocity v₁ governed by Stokes’ Law of fluid friction. When high-voltage electric field E is turned on, the droplet experiences an upward electrostatic force F_e = qE. By adjusting E until the droplet suspends motionless (qE = mg), the exact electric charge q on the droplet can be computed.',
    realLifeConnection: 'Every lithium-ion battery in your phone and every electron flow through a microchip processor functions because electric charge comes in discrete indivisible packets of e = 1.602 × 10⁻¹⁹ Coulombs!',
    tryItYourself: 'Millikan measured charges on thousands of drops: 1.6 × 10⁻¹⁹ C, 3.2 × 10⁻¹⁹ C, 4.8 × 10⁻¹⁹ C, 6.4 × 10⁻¹⁹ C... Every single value was an exact integer multiple of 1.6 × 10⁻¹⁹ C!',
    misconceptions: [
      'Water droplets could not be used for this experiment because water rapidly evaporates under microscope illumination heat! Millikan used non-volatile clockmaker oil droplets that maintained constant mass throughout the observation.'
    ],
    recap: [
      'Stokes’ Law: Drag force Fd = 6πηrv on a spherical droplet of radius r moving through air viscosity η',
      'Balancing condition: In equilibrium, upward electric force balances downward weight (qE = mg)',
      'Charge quantization: All macroscopic and microscopic charges obey q = ±ne (n = 1, 2, 3...)',
      'Fundamental elementary charge e = 1.60217663 × 10⁻¹⁹ C'
    ],
    challengeQuestion: 'How does modern particle physics reconcile quarks having fractional charges (±1/3e and ±2/3e) with Millikan’s law of integer charge quantization?',
    sections: [
      {
        title: 'The Terminal Velocity & Stokes’ Law',
        content: 'When a droplet falls under gravity with no electric field, downward gravitational force balances upward air buoyancy and viscous drag: 6πηrv₁ = (4/3)πr³(ρ_oil - ρ_air)g.',
        icon: 'ArrowDown',
        color: 'text-amber-400'
      },
      {
        title: 'The Electric Field Equilibrium',
        content: 'Applying an adjustable voltage V across plate separation d creates uniform electric field E = V/d. Adjusting V until the droplet hovers stationary gives qE = mg.',
        icon: 'Zap',
        color: 'text-blue-400'
      },
      {
        title: 'Discovering the Elementary Quantum',
        content: 'Millikan ionized air with X-rays to add or knock off electrons. Repeating measurements proved charge changes only in discrete leaps of Δq = e.',
        icon: 'Layers',
        color: 'text-cyan-400'
      }
    ],
    math: {
      title: 'Charge Quantization Formula',
      intro: 'Equating electrostatic upward force to downward gravitational weight in static equilibrium gives the charge on the droplet:',
      formula: 'q = \\frac{m \\cdot g}{E} = \\frac{m \\cdot g \\cdot d}{V} = n \\cdot e',
      variables: [
        { symbol: 'q', definition: 'Electric charge on the suspended oil droplet (Coulombs)' },
        { symbol: 'm', definition: 'Mass of the oil droplet (derived via Stokes’ terminal velocity)' },
        { symbol: 'g', definition: 'Acceleration due to gravity (9.8 m/s²)' },
        { symbol: 'V', definition: 'Potential difference applied across the condenser plates (Volts)' },
        { symbol: 'd', definition: 'Distance between parallel capacitor plates (meters)' },
        { symbol: 'e', definition: 'Elementary charge quantum (1.602 × 10⁻¹⁹ C)' },
        { symbol: 'n', definition: 'Integer number of excess or missing electrons (1, 2, 3...)' }
      ],
      minGradeLevel: 11
    },
    conclusion: {
      title: 'The Quantum of Electricity',
      content: 'Millikan’s triumph transformed electricity from a mysterious continuous fluid into discrete, countable elementary physical particles.',
      highlight: 'e = 1.602 × 10⁻¹⁹ C',
      highlightNote: 'The indivisible unit of free electric charge'
    },
    modules: [
      {
        title: 'Stokes’ Law & Droplet Radius',
        desc: 'Calculate oil drop radius from free-fall terminal velocity in viscous air.',
        completed: false,
        objectives: ['Apply Stokes’ Law Fd = 6πηrv', 'Calculate droplet mass from fluid density and radius'],
        interactiveLabel: 'Measure Free-Fall Velocity',
        interactiveType: 'simulation',
        quiz: {
          question: 'In Millikan’s experiment, what formula allows the radius and mass of the tiny oil droplet to be determined from its terminal velocity?',
          options: ['Bernoulli’s theorem', 'Stokes’ Law of viscous drag (Fd = 6πηrv)', 'Coulomb’s Law', 'Ohm’s Law'],
          correctAnswer: 1
        }
      },
      {
        title: 'Electric Field Suspension',
        desc: 'Tune plate voltage until an ionized droplet hovers motionless between electrodes.',
        completed: false,
        objectives: ['Balance qE = mg in real time', 'Calculate charge q from voltage V and plate separation d'],
        interactiveLabel: 'Hover Droplet in Sim',
        interactiveType: 'simulation',
        quiz: {
          question: 'When an oil droplet is held perfectly stationary between horizontal capacitor plates, which two forces are in exact equilibrium?',
          options: ['Viscous drag and buoyant force', 'Upward electrostatic force (qE) and downward gravitational force (mg)', 'Surface tension and air pressure', 'Centrifugal force and friction'],
          correctAnswer: 1
        }
      },
      {
        title: 'Verifying Charge Quantization',
        desc: 'Analyze a dataset of droplet charges to extract the greatest common divisor: e.',
        completed: false,
        objectives: ['Identify charge quantization q = ne', 'Calculate fundamental elementary charge value'],
        interactiveLabel: 'Analyze Charge Histogram',
        interactiveType: 'calculator',
        quiz: {
          question: 'If four measured oil droplet charges are 3.2 × 10⁻¹⁹ C, 4.8 × 10⁻¹⁹ C, 6.4 × 10⁻¹⁹ C, and 8.0 × 10⁻¹⁹ C, what is the elementary charge e?',
          options: ['0.8 × 10⁻¹⁹ C', '1.6 × 10⁻¹⁹ C', '3.2 × 10⁻¹⁹ C', '6.4 × 10⁻¹⁹ C'],
          correctAnswer: 1
        }
      }
    ]
  }
};
