import { CourseData } from '../../services/contentService';

export const class9Curriculum: Record<string, CourseData> = {
  // Class 9 -> Science -> Atomic Structure
  'Class 9::Atom': {
    classId: 'Class 9',
    subjectId: 'Science',
    topicId: 'Atom',
    gradeLevel: 9,
    ageBand: 'Ages 14–15',
    title: 'Structure of the Atom',
    subtitle: 'NCERT Science Chapter 4: From Rutherford to the Quantum Model',
    intro: 'While Dalton originally postulated that atoms were hard, indivisible spheres, late 19th and early 20th-century physics shattered this notion. The discovery of cathode rays by J.J. Thomson proved the existence of subatomic electrons, while Ernest Rutherford’s iconic Gold Foil scattering experiment proved that positive charge and mass are concentrated in a microscopic central nucleus.',
    category: 'Science',
    difficulty: 'Intermediate',
    duration: '25 min',
    iconName: 'Atom',
    color: 'cyan',
    whyLearnThis: 'Atomic structure is the bedrock of all modern chemistry, semiconductor electronics, nuclear energy, and materials science. Valency and electron arrangement explain why elements react to form compounds.',
    visualExploration: 'Examine the 3D model: Note the dense nucleus composed of nucleons (protons and neutrons). Around the nucleus, observe the distinct energy shells (K, L, M, N) governed by the 2n² electron capacity rule.',
    howItWorks: 'Electrons orbit in discrete, non-radiating energy levels. An electron can transition to a higher orbit only by absorbing a quantum of energy, and emits a photon of characteristic wavelength when dropping back to a lower energy state.',
    realLifeConnection: 'The dazzling colors of fireworks are caused by electrons in metal atoms (such as Strontium for red, Barium for green, and Sodium for yellow) jumping between quantized energy shells and emitting specific wavelengths of visible light!',
    tryItYourself: 'Calculate the maximum number of electrons that can fit into the M-shell (n = 3): 2(3)² = 2 × 9 = 18 electrons!',
    misconceptions: [
      'Electrons do not spiral into the nucleus as predicted by classical electrodynamics because their angular momentum is quantized into stable stationary orbits (Bohr’s Postulate).'
    ],
    recap: [
      'Rutherford’s alpha scattering experiment proved the nucleus is dense and positive',
      'Bohr proposed discrete stationary electron orbits (K, L, M, N)',
      'The Bohr-Bury scheme limits shell capacities to 2n²',
      'Valency is the combining capacity governed by outermost valence electrons'
    ],
    challengeQuestion: 'Why did the vast majority of alpha particles pass straight through the gold foil undeflected during Rutherford’s experiment?',
    sections: [
      {
        title: 'Rutherford’s Gold Foil Experiment',
        content: 'Alpha particles (He²⁺) were fired at a 1,000-atom-thick gold foil. 99.9% passed straight through, but 1 in 20,000 rebounded by nearly 180°, proving an intensely concentrated positive nucleus.',
        icon: 'Target',
        color: 'text-amber-400'
      },
      {
        title: 'Bohr’s Model of the Atom',
        content: 'Neils Bohr solved the classical stability paradox: electrons occupy quantized stationary orbits where they do not radiate energy unless transitioning between levels.',
        icon: 'Orbit',
        color: 'text-cyan-400'
      },
      {
        title: 'Isotopes and Isobars',
        content: 'Isotopes have the same atomic number (protons) but different mass numbers (neutrons), e.g., Carbon-12 and Carbon-14. Isobars have the same mass number but different atomic numbers (e.g., Argon-40 and Calcium-40).',
        icon: 'Layers',
        color: 'text-indigo-400'
      }
    ],
    math: {
      title: 'Bohr-Bury Maximum Electron Rule',
      intro: 'The maximum number of electrons accommodated in any principal energy shell n is given by the formula:',
      formula: 'N_{\\text{max}} = 2n^2',
      variables: [
        { symbol: 'n', definition: 'Principal shell number (K=1, L=2, M=3, N=4)' },
        { symbol: 'Nmax', definition: 'Maximum electrons in that shell' }
      ],
      minGradeLevel: 9
    },
    conclusion: {
      title: 'Foundation of Modern Physics',
      content: 'The journey from Thomson’s plum pudding to Bohr’s quantized orbitals laid the groundwork for quantum mechanics, enabling modern solid-state transistors, lasers, and computational chips.',
      highlight: 'Quantized Orbits',
      highlightNote: 'Bohr’s stationary energy states'
    },
    modules: [
      {
        title: 'Rutherford’s Alpha Scattering',
        desc: 'Simulate alpha particles passing through and bouncing off gold nuclei.',
        completed: false,
        objectives: ['Understand the 1-in-20,000 deflection significance', 'Deduce that atoms are mostly empty space'],
        interactiveLabel: 'Run Alpha Scattering Sim',
        interactiveType: 'simulation',
        quiz: {
          question: 'What did Rutherford conclude from the fact that most alpha particles passed through gold foil without deflection?',
          options: ['Gold atoms have no mass', 'Most of the space inside the atom is completely empty', 'Electrons are as heavy as protons', 'The nucleus occupies the entire atom'],
          correctAnswer: 1
        }
      },
      {
        title: 'Bohr Shells & Electron Capacity',
        desc: 'Distribute electrons across K, L, M shells according to 2n².',
        completed: false,
        objectives: ['Apply the 2n² rule to K, L, M shells', 'Determine valence electrons of elements 1 to 20'],
        interactiveLabel: 'Populate Electron Shells',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'What is the maximum number of electrons that can be held in the L-shell (n = 2)?',
          options: ['2 electrons', '8 electrons', '18 electrons', '32 electrons'],
          correctAnswer: 1
        }
      },
      {
        title: 'Isotopes & Fractional Atomic Masses',
        desc: 'Understand why Chlorine has an atomic mass of 35.5 u.',
        completed: false,
        objectives: ['Define isotopes and isobars', 'Calculate average atomic mass from isotopic abundances'],
        interactiveLabel: 'Compare Chlorine Isotopes',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'Isotopes of a chemical element possess:',
          options: ['Same mass number, different atomic number', 'Same atomic number (protons), different mass number (neutrons)', 'Different number of protons and electrons', 'Identical physical and nuclear decay properties'],
          correctAnswer: 1
        }
      }
    ]
  },

  // Class 9 -> Science -> DNA Double Helix
  'Class 9::DNA': {
    classId: 'Class 9',
    subjectId: 'Science',
    topicId: 'DNA',
    gradeLevel: 9,
    ageBand: 'Ages 14–15',
    title: 'DNA: The Hereditary Blueprint',
    subtitle: 'Molecular Genetics & the Double Helix Architecture',
    intro: 'Every physical trait that makes you who you are — your eye color, height, and natural talents — is encoded in microscopic chemical threads called Deoxyribonucleic Acid (DNA). Solved by James Watson, Francis Crick, and Rosalind Franklin in 1953, the double helix structure of DNA is the ultimate biological information storage medium in the known universe.',
    category: 'Science',
    difficulty: 'Intermediate',
    duration: '25 min',
    iconName: 'Dna',
    color: 'emerald',
    whyLearnThis: 'Understanding DNA unlocks biotechnology, CRISPR gene editing, genetic disease prevention, forensic crime investigation, and the evolutionary history connecting all organisms on Earth.',
    visualExploration: 'Rotate the 3D double helix! Observe the two sugar-phosphate backbones winding around each other like a spiral staircase, held together in the center by complementary nitrogenous base pairs connected by hydrogen bonds.',
    howItWorks: 'DNA is built from four nucleotide bases: Adenine (A), Thymine (T), Guanine (G), and Cytosine (C). Because of their molecular shapes and hydrogen bonding, Adenine always pairs strictly with Thymine (A = T), and Guanine always pairs strictly with Cytosine (G ≡ C).',
    realLifeConnection: 'If you uncoiled all the microscopic DNA molecules from every cell in a single human body and laid them end-to-end, the strand would stretch from Earth to the Sun and back over 60 times!',
    tryItYourself: 'Given a DNA strand with the sequence 5’-A-T-G-C-C-A-3’, write out the complementary opposite strand: 3’-T-A-C-G-G-T-5’!',
    misconceptions: [
      'DNA is not loose inside the nucleus like cooked spaghetti — it is wound tightly around histone protein spools into nucleosomes, which condense into the visible chromosomes seen during cell division!'
    ],
    recap: [
      'DNA is a double-stranded helical polymer of nucleotides',
      'The sugar-phosphate backbone provides structural stability',
      'Complementary base pairing rules: A pairs with T (2 H-bonds), G pairs with C (3 H-bonds)',
      'Genes are specific sequences of DNA that code for functional proteins'
    ],
    challengeQuestion: 'Why does the complementary base pairing rule guarantee that DNA can replicate itself with near-perfect fidelity during cell division?',
    sections: [
      {
        title: 'The Nucleotide Monomer',
        content: 'Each nucleotide subunit consists of three parts: a 5-carbon deoxyribose sugar, a phosphate group, and one of four nitrogenous bases (A, T, G, or C).',
        icon: 'Layers',
        color: 'text-emerald-400'
      },
      {
        title: 'Complementary Base Pairing',
        content: 'Chargaff’s Rules established that in double-stranded DNA, the percentage of Adenine equals Thymine (%A = %T), and Guanine equals Cytosine (%G = %C).',
        icon: 'Target',
        color: 'text-cyan-400'
      },
      {
        title: 'Chromatin and Chromosomes',
        content: 'In human cells, 2 meters of DNA is compressed inside a microscopic 6-micrometer nucleus by wrapping around octameric histone proteins into chromatin fibers.',
        icon: 'Dna',
        color: 'text-purple-400'
      }
    ],
    conclusion: {
      title: 'The Code of Life',
      content: 'A simple four-letter alphabet (A, T, C, G) repeated across 3 billion base pairs in the human genome provides the entire operating system of human biology.',
      highlight: '3 Billion Base Pairs',
      highlightNote: 'The complete human genome code'
    },
    modules: [
      {
        title: 'The Double Helix Architecture',
        desc: 'Examine antiparallel strands and major/minor grooves in 3D.',
        completed: false,
        objectives: ['Identify sugar-phosphate backbone and base rungs', 'Understand antiparallel 5’ to 3’ orientation'],
        interactiveLabel: 'Inspect 3D DNA Helix',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'Which nitrogenous base pairs complementary with Adenine (A) in a DNA double helix?',
          options: ['Guanine (G)', 'Cytosine (C)', 'Thymine (T)', 'Uracil (U)'],
          correctAnswer: 2
        }
      },
      {
        title: 'Chargaff’s Equivalence Rules',
        desc: 'Calculate base pair percentages from experimental genomic samples.',
        completed: false,
        objectives: ['Apply A=T and G=C ratios', 'Calculate unknown base percentages'],
        interactiveLabel: 'Test Chargaff Calculator',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'If a DNA sample contains 30% Adenine, what percentage of Cytosine must it contain?',
          options: ['30%', '20%', '40%', '70%'],
          correctAnswer: 1
        }
      },
      {
        title: 'DNA Replication Mechanics',
        desc: 'Watch DNA unzipping to create two identical daughter helices.',
        completed: false,
        objectives: ['Understand semi-conservative replication', 'Observe template strand synthesis'],
        interactiveLabel: 'Simulate DNA Unzipping',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'Why is DNA replication called "semi-conservative"?',
          options: ['It uses half the energy of the cell', 'Each new DNA helix contains one original parent strand and one newly synthesized strand', 'Only half the DNA is copied', 'It occurs only in half of human cells'],
          correctAnswer: 1
        }
      }
    ]
  },

  // Class 9 -> Science -> Gravitation & Solar System
  'Class 9::SolarSystem': {
    classId: 'Class 9',
    subjectId: 'Science',
    topicId: 'SolarSystem',
    gradeLevel: 9,
    ageBand: 'Ages 14–15',
    title: 'Gravitation & Planetary Dynamics',
    subtitle: 'NCERT Science Chapter 10: Newton’s Universal Law & Kepler’s Laws',
    intro: 'Why does an apple fall towards Earth, and why does the Moon stay locked in orbit instead of flying into deep space? Sir Isaac Newton realized that the exact same invisible force — gravity — that pulls an apple from a tree also orchestrates the majestic orbits of planets around the Sun!',
    category: 'Science',
    difficulty: 'Intermediate',
    duration: '25 min',
    iconName: 'Orbit',
    color: 'blue',
    whyLearnThis: 'Gravitational physics makes modern space travel, satellite telecommunications, lunar landings, and GPS navigation possible. It governs the motion of moons, planets, and entire galaxies.',
    visualExploration: 'Observe the orbital simulation: Notice that planets closer to the Sun (like Mercury and Venus) travel at blazing speeds, while distant gas giants (like Uranus and Neptune) crawl along vast, sluggish orbital paths.',
    howItWorks: 'Newton’s Universal Law of Gravitation states that every object in the universe attracts every other object with a force directly proportional to the product of their masses, and inversely proportional to the square of the distance between their centers.',
    realLifeConnection: 'Ocean tides on Earth are caused by the differential gravitational tug of the Moon and the Sun pulling on Earth’s oceans, creating high tides twice every day!',
    tryItYourself: 'Inverse Square Law: If the distance between two planets is doubled (2r), the gravitational attraction drops to (1/2)² = 1/4th of its original strength!',
    misconceptions: [
      'Astronauts on the International Space Station are NOT in "zero gravity"! Earth’s gravity at their altitude is still nearly 90% as strong as on the surface. They float because the station is in continuous free-fall around the curve of Earth!'
    ],
    recap: [
      'Gravitational force F is proportional to (m₁m₂)/r²',
      'Kepler’s First Law: Planets orbit in ellipses with the Sun at one focus',
      'Kepler’s Second Law: A line connecting Sun and planet sweeps equal areas in equal times',
      'Kepler’s Third Law: The square of orbital period T² is proportional to the cube of semi-major axis r³'
    ],
    challengeQuestion: 'If Earth were suddenly compressed to half its current radius while keeping the same mass, what would happen to your weight on the surface?',
    sections: [
      {
        title: 'Universal Law of Gravitation',
        content: 'Gravity is universally attractive and acts between all bodies with mass, mediated by the Universal Gravitational Constant G = 6.674 × 10⁻¹¹ N·m²/kg².',
        icon: 'Orbit',
        color: 'text-blue-400'
      },
      {
        title: 'Acceleration Due to Gravity (g)',
        content: 'Near Earth’s surface, gravity accelerates all falling masses at g ≈ 9.8 m/s², regardless of their mass (in the absence of air resistance).',
        icon: 'ArrowDown',
        color: 'text-cyan-400'
      },
      {
        title: 'Kepler’s Planetary Laws',
        content: 'Johannes Kepler derived three empirical laws of orbital motion: elliptical paths, equal area in equal time, and harmonic ratio T² ∝ r³.',
        icon: 'Compass',
        color: 'text-indigo-400'
      }
    ],
    math: {
      title: 'Newton’s Law of Universal Gravitation',
      intro: 'The magnitude of gravitational force between two masses m₁ and m₂ separated by distance r is:',
      formula: 'F = G \\cdot \\frac{m_1 \\cdot m_2}{r^2}',
      variables: [
        { symbol: 'F', definition: 'Gravitational attractive force (Newtons, N)' },
        { symbol: 'G', definition: 'Universal Gravitational Constant (6.674 × 10⁻¹¹ N·m²/kg²)' },
        { symbol: 'm1, m2', definition: 'Masses of the two interacting bodies (kg)' },
        { symbol: 'r', definition: 'Distance between their centers of mass (meters)' }
      ],
      minGradeLevel: 9
    },
    conclusion: {
      title: 'The Cosmic Weaver',
      content: 'Gravity is the weakest of the four fundamental forces, yet its infinite reach and cumulative power shape stars, solar systems, black holes, and the large-scale web of the cosmos.',
      highlight: 'F ∝ 1/r²',
      highlightNote: 'The inverse-square law of gravitation'
    },
    modules: [
      {
        title: 'Newton’s Inverse Square Law',
        desc: 'Vary planetary masses and orbital distances to observe gravitational force changes.',
        completed: false,
        objectives: ['Calculate gravitational force with F = G(m1m2)/r²', 'Analyze inverse-square distance effects'],
        interactiveLabel: 'Adjust Gravitational Masses',
        interactiveType: 'simulation',
        quiz: {
          question: 'What happens to the gravitational force between two planets if the distance between them is tripled (3x)?',
          options: ['It triples', 'It is reduced to 1/3rd', 'It is reduced to 1/9th (3²)', 'It stays constant'],
          correctAnswer: 2
        }
      },
      {
        title: 'Kepler’s Equal Area Law',
        desc: 'Observe how a planet speeds up at perihelion (closest to Sun) and slows down at aphelion.',
        completed: false,
        objectives: ['Verify Kepler’s 2nd Law', 'Connect orbital velocity to conservation of angular momentum'],
        interactiveLabel: 'Simulate Elliptical Sweep',
        interactiveType: 'simulation',
        quiz: {
          question: 'According to Kepler’s Second Law, where does a planet move fastest in its elliptical orbit?',
          options: ['At aphelion (farthest from the Sun)', 'At perihelion (closest to the Sun)', 'At the midpoint of the orbit', 'It travels at uniform constant speed everywhere'],
          correctAnswer: 1
        }
      },
      {
        title: 'Mass vs Weight',
        desc: 'Distinguish intrinsic mass (kg) from local gravitational weight (N).',
        completed: false,
        objectives: ['Calculate weight W = mg', 'Compare your weight on Earth vs Moon (g_moon ≈ 1.6 m/s²)'],
        interactiveLabel: 'Calculate Planetary Weight',
        interactiveType: 'calculator',
        quiz: {
          question: 'If an astronaut has a mass of 60 kg on Earth, what is their mass on the Moon where gravity is 1/6th?',
          options: ['10 kg', '60 kg (mass never changes)', '360 kg', '0 kg'],
          correctAnswer: 1
        }
      }
    ]
  }
};
