import { CourseData } from '../../services/contentService';

export const class6Curriculum: Record<string, CourseData> = {
  // Class 6 -> Science – Matter -> Introduction to Atoms
  'Class 6::Atom': {
    classId: 'Class 6',
    subjectId: 'Science – Matter',
    topicId: 'Atom',
    gradeLevel: 6,
    ageBand: 'Ages 11–12',
    title: 'Introduction to Atoms and Matter',
    subtitle: 'The Fundamental Building Blocks of the Universe',
    intro: 'If you take a pure copper wire and cut it in half, then cut that half in half, and keep cutting forever — will you ever reach a particle that cannot be cut anymore? Over 2,400 years ago, ancient philosophers called this ultimate indivisible unit "atomos" (meaning uncuttable). Today we know that everything in the cosmos — the water you drink, the air you breathe, and the stars in the night sky — is built from tiny atoms!',
    category: 'Science – Matter',
    difficulty: 'Intermediate',
    duration: '20 min',
    iconName: 'Atom',
    color: 'cyan',
    whyLearnThis: 'Atoms explain everything in chemistry and physics! Understanding atoms reveals how elements combine to form water, sugar, medicines, and the solid ground beneath our feet.',
    visualExploration: 'Examine the 3D atomic model! Look at the dense central nucleus where heavy protons and neutral neutrons reside, surrounded by energetic electrons whizzing around in cloud-like orbital shells at incredible speeds.',
    howItWorks: 'An atom consists of three subatomic particles: positive protons (+) and neutral neutrons (0) locked tightly together in the center nucleus by strong nuclear forces, and tiny negative electrons (-) orbiting around the outside like planets around a star.',
    realLifeConnection: 'Water is made of two Hydrogen atoms bonded to one Oxygen atom (H₂O). Salt on your dinner table is one Sodium atom bonded to one Chlorine atom (NaCl)!',
    tryItYourself: 'Rub a plastic ruler against a dry wool sweater and hold it near tiny scraps of paper. The ruler picks up extra electrons from the wool, creating static electricity that pulls the paper upwards!',
    misconceptions: [
      'Atoms are NOT solid billiard balls! In reality, atoms are 99.9999999% empty space. If an atom’s nucleus were the size of a cricket ball placed in the center of a stadium, the outermost electrons would be like gnats buzzing around the upper bleachers!'
    ],
    recap: [
      'Matter is made of tiny particles called atoms',
      'The center nucleus contains positive protons and neutral neutrons',
      'Negative electrons orbit outside the nucleus in electron shells',
      'Atoms of different elements have different numbers of protons'
    ],
    challengeQuestion: 'What keeps the negatively charged electrons from flying away into space away from the nucleus?',
    sections: [
      {
        title: 'The Central Nucleus',
        content: 'Discovered by Ernest Rutherford in 1911, the nucleus contains virtually all the mass of the atom packed into an incredibly small, dense central core.',
        icon: 'CircleDot',
        color: 'text-cyan-400'
      },
      {
        title: 'The Subatomic Trio',
        content: 'Protons carry a positive charge (+1), Electrons carry an equal negative charge (-1), and Neutrons carry zero charge (0). Opposite charges attract each other!',
        icon: 'Zap',
        color: 'text-blue-400'
      },
      {
        title: 'Elements & the Periodic Table',
        content: 'The number of protons (Atomic Number Z) determines which element an atom is. Hydrogen has 1 proton, Carbon has 6, and Gold has 79!',
        icon: 'Grid',
        color: 'text-indigo-400'
      }
    ],
    conclusion: {
      title: 'The Architects of Reality',
      content: 'Only 118 different types of elements combine in infinite variations to build every rock, ocean, tree, planet, and living person in the universe.',
      highlight: '118 Known Elements',
      highlightNote: 'The cosmic alphabet of all matter'
    },
    modules: [
      {
        title: 'The Nucleus and Orbitals',
        desc: 'Explore the dense central core and the surrounding electron shells.',
        completed: false,
        objectives: ['Identify protons, neutrons, and electrons', 'Understand electrical charges (+, -, 0)'],
        interactiveLabel: 'Inspect 3D Atom',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'Which subatomic particle carries a negative electrical charge and orbits outside the nucleus?',
          options: ['Proton', 'Neutron', 'Electron', 'Photon'],
          correctAnswer: 2
        }
      },
      {
        title: 'What Defines an Element?',
        desc: 'Learn how atomic number gives each element its unique chemical identity.',
        completed: false,
        objectives: ['Define atomic number', 'Relate proton count to element identity'],
        interactiveLabel: 'Toggle Element Shells',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'What subatomic particle number tells you exactly which chemical element an atom is?',
          options: ['Number of electrons only', 'Number of protons in the nucleus (Atomic Number)', 'Number of water molecules', 'Size of the laboratory beaker'],
          correctAnswer: 1
        }
      },
      {
        title: 'Molecules: Atoms Joining Hands',
        desc: 'See how atoms share or exchange electrons to form chemical compounds.',
        completed: false,
        objectives: ['Differentiate atoms from molecules', 'Observe chemical bonds in water and salt'],
        interactiveLabel: 'Simulate Chemical Bond',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'What do two Hydrogen atoms and one Oxygen atom make when chemically bonded together?',
          options: ['Table salt', 'Water (H₂O)', 'Pure gold', 'Carbon dioxide'],
          correctAnswer: 1
        }
      }
    ]
  },

  // Class 6 -> Science – Living World -> The Cell
  'Class 6::Cell': {
    classId: 'Class 6',
    subjectId: 'Science – Living World',
    topicId: 'Cell',
    gradeLevel: 6,
    ageBand: 'Ages 11–12',
    title: 'The Cell: Basic Unit of Life',
    subtitle: 'From Robert Hooke’s Cork to Living Organisms',
    intro: 'Just as a magnificent skyscraper is built brick by brick, every living organism on Earth — from the tiniest microscopic amoeba to the colossal blue whale — is composed of tiny living bricks called cells. The cell is the fundamental structural and functional unit of all life!',
    category: 'Science – Living World',
    difficulty: 'Intermediate',
    duration: '20 min',
    iconName: 'Dna',
    color: 'emerald',
    whyLearnThis: 'Every biological process in your body — digesting food, healing a paper cut, fighting off a cold, and growing taller — happens because your cells are hard at work.',
    visualExploration: 'Peer inside the 3D cell model! Observe the outer protective plasma membrane, the jelly-like cytoplasm flowing with nutrients, the commanding nucleus guarding genetic blueprints, and oval mitochondria generating cellular energy.',
    howItWorks: 'Cells carry out all life functions: taking in nutrients, converting food to usable energy, getting rid of waste products, and dividing into two daughter cells to allow growth and tissue repair.',
    realLifeConnection: 'When you scrape your knee on the sidewalk, skin cells at the edges of the scrape start dividing rapidly to produce millions of new cells until your skin is smoothly healed!',
    tryItYourself: 'Peel the thinnest, transparent tissue-like membrane from between the layers of an onion slice. Lay it flat on a glass slide with a drop of iodine under a microscope to see cell walls and nuclei clearly!',
    misconceptions: [
      'Cells are not flat circles drawn in biology textbooks — they are dynamic, 3D fluid containers packed with moving parts, transport tunnels, and bustling cellular machines!'
    ],
    recap: [
      'Robert Hooke first observed dead cork cells in 1665',
      'The cell is the basic structural and functional unit of life',
      'All living cells come from the division of pre-existing cells (Cell Theory)'
    ],
    challengeQuestion: 'Why do plant cells have a rigid outer cell wall, while animal cells only have a flexible cell membrane?',
    sections: [
      {
        title: 'Discovery of the Cell',
        content: 'In 1665, English scientist Robert Hooke looked at a thin slice of tree cork under his homemade microscope and noticed tiny box-like compartments that reminded him of monks’ rooms ("cells").',
        icon: 'Microscope',
        color: 'text-emerald-400'
      },
      {
        title: 'The Cell Membrane & Cytoplasm',
        content: 'The cell membrane acts as a selective gatekeeper, deciding what nutrients enter and what wastes leave. The cytoplasm is the jelly fluid where all cellular reactions take place.',
        icon: 'Layers',
        color: 'text-blue-400'
      },
      {
        title: 'The Nucleus: Control Center',
        content: 'The nucleus contains chromosomes packed with DNA instruction manuals that tell the cell how to grow, build proteins, and function.',
        icon: 'Dna',
        color: 'text-purple-400'
      }
    ],
    conclusion: {
      title: 'The Miracle of the Cell',
      content: 'Your body alone contains over 30 trillion cells, all working together in flawless coordination to keep your heart beating, eyes seeing, and mind thinking.',
      highlight: '30 Trillion Cells',
      highlightNote: 'Working in harmony inside you'
    },
    modules: [
      {
        title: 'Cell Theory Basics',
        desc: 'Understand the three founding principles of cellular biology.',
        completed: false,
        objectives: ['Learn the history of cell discovery', 'Understand the three tenets of cell theory'],
        interactiveLabel: 'View Cork Cell Sim',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'Who first observed and coined the biological term "cell" in 1665?',
          options: ['Albert Einstein', 'Robert Hooke', 'Isaac Newton', 'Charles Darwin'],
          correctAnswer: 1
        }
      },
      {
        title: 'The Control Center (Nucleus)',
        desc: 'Explore the genetic vault inside the eukaryotic cell.',
        completed: false,
        objectives: ['Identify the nucleus and nuclear membrane', 'Understand DNA role in guiding cell activity'],
        interactiveLabel: 'Zoom into Nucleus',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'What is the primary role of the nucleus in an animal or plant cell?',
          options: ['Pumping blood', 'Acting as the control center holding genetic instructions', 'Absorbing direct sunlight', 'Making bones hard'],
          correctAnswer: 1
        }
      },
      {
        title: 'Plant vs Animal Cells',
        desc: 'Compare rigid plant cell walls and chloroplasts with animal cell structures.',
        completed: false,
        objectives: ['Identify chloroplasts and cell walls in plants', 'Understand why animal cells are flexible'],
        interactiveLabel: 'Compare Cell Types',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'Which of these structures is found in green plant cells for photosynthesis, but NEVER in animal cells?',
          options: ['Cell membrane', 'Chloroplast', 'Cytoplasm', 'Nucleus'],
          correctAnswer: 1
        }
      }
    ]
  },

  // Class 6 -> Geography -> Globe & Maps
  'Class 6::Globe': {
    classId: 'Class 6',
    subjectId: 'Geography',
    topicId: 'Globe',
    gradeLevel: 6,
    ageBand: 'Ages 11–12',
    title: 'Globe: Latitudes, Longitudes & Time Zones',
    subtitle: 'NCERT Geography Chapter 2: The Grid System of Earth',
    intro: 'To pinpoint any city, ship at sea, or airplane in flight with precision, geographers developed an interlocking grid of imaginary lines circling Earth. Parallels of Latitude run horizontally east-west, while Meridians of Longitude run vertically from the North Pole to the South Pole!',
    category: 'Geography',
    difficulty: 'Intermediate',
    duration: '20 min',
    iconName: 'Globe',
    color: 'sky',
    whyLearnThis: 'The geographic coordinate system is the foundation of GPS navigation, air traffic control, maritime shipping, and international standard time calculation.',
    visualExploration: 'Spin the 3D globe with the geographic grid overlay enabled! Notice the Equator at 0° latitude, the Tropic of Cancer at 23.5°N, the Tropic of Capricorn at 23.5°S, and the Prime Meridian passing through Greenwich, London at 0° longitude.',
    howItWorks: 'Earth rotates 360° on its axis in 24 hours. That means Earth rotates 15° of longitude every single hour (360 ÷ 24 = 15°/hour), or 1° of longitude every 4 minutes. As you travel east, local time moves ahead; as you travel west, local time moves behind!',
    realLifeConnection: 'India’s Standard Time (IST) is calculated along the Standard Meridian of 82°30’ E passing through Mirzapur near Prayagraj. This makes IST exactly 5 hours and 30 minutes ahead of Greenwich Mean Time (GMT +5:30)!',
    tryItYourself: 'Calculate: If it is 12:00 noon in Greenwich, London (0°), what time is it in India along the 82.5°E meridian? (82.5 × 4 minutes = 330 minutes = 5 hours 30 minutes ahead = 5:30 PM)!',
    misconceptions: [
      'Latitudes are parallel and NEVER meet each other, but Longitudes are NOT parallel — they converge and meet at points at the North Pole and South Pole!'
    ],
    recap: [
      'Parallels of Latitude measure angular distance north or south of the Equator (0° to 90°)',
      'Meridians of Longitude measure angular distance east or west of the Prime Meridian (0° to 180°)',
      'Earth rotates 15° of longitude every hour (1° every 4 minutes)',
      'The International Date Line is approximately along the 180° meridian'
    ],
    challengeQuestion: 'What happens to the calendar date when a ship sails across the International Date Line from West to East?',
    sections: [
      {
        title: 'Important Parallels of Latitude',
        content: 'Equator (0°), Tropic of Cancer (23.5° N), Tropic of Capricorn (23.5° S), Arctic Circle (66.5° N), and Antarctic Circle (66.5° S) define Earth’s major climate zones (Torrid, Temperate, and Frigid).',
        icon: 'Layers',
        color: 'text-amber-400'
      },
      {
        title: 'The Prime Meridian & Time',
        content: 'The 0° longitude passes through the Royal Astronomical Observatory in Greenwich, UK. It serves as the global benchmark for world time zones.',
        icon: 'Clock',
        color: 'text-blue-400'
      },
      {
        title: 'The Coordinate Grid (GPS)',
        content: 'By stating a point’s Latitude and Longitude (e.g., New Delhi at 28.6° N, 77.2° E), any location on the planet is pinpointed to within centimeters.',
        icon: 'MapPin',
        color: 'text-emerald-400'
      }
    ],
    math: {
      title: 'Longitude and Time Rate',
      intro: 'Earth completes one full 360° rotation in 24 hours. The rate of time change per degree of longitude is:',
      formula: '1^\\circ \\text{ Longitude} = \\frac{24 \\times 60 \\text{ minutes}}{360^\\circ} = 4 \\text{ minutes}',
      variables: [
        { symbol: '360°', definition: 'One complete rotation of Earth' },
        { symbol: '24 hrs', definition: 'Time taken for one rotation (1,440 minutes)' },
        { symbol: '4 min', definition: 'Time difference for every 1° of longitude' }
      ],
      minGradeLevel: 6
    },
    conclusion: {
      title: 'Mastering the Earth Grid',
      content: 'The geographic coordinate grid brings order to our globe, uniting international travel, commerce, timekeeping, and scientific exploration.',
      highlight: '360° in 24 Hours',
      highlightNote: '4 minutes per degree of longitude'
    },
    modules: [
      {
        title: 'Latitudes and Heat Zones',
        desc: 'Explore the Torrid, Temperate, and Frigid climate zones bounded by key latitudes.',
        completed: false,
        objectives: ['Identify Tropic of Cancer and Tropic of Capricorn', 'Understand the Torrid Zone'],
        interactiveLabel: 'Highlight Heat Zones',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'What parallel of latitude marks the northern boundary of the warm tropical Torrid Zone?',
          options: ['Arctic Circle (66.5° N)', 'Tropic of Cancer (23.5° N)', 'Equator (0°)', 'Prime Meridian (0°)'],
          correctAnswer: 1
        }
      },
      {
        title: 'Calculating Longitude Time',
        desc: 'Calculate local time differences between Greenwich and world cities.',
        completed: false,
        objectives: ['Use the 1° = 4 minutes rule', 'Calculate time east vs west of Prime Meridian'],
        interactiveLabel: 'Test Time Calculator',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'How much time difference corresponds to 15 degrees of longitude?',
          options: ['15 minutes', '1 hour (60 minutes)', '24 hours', '4 seconds'],
          correctAnswer: 1
        }
      },
      {
        title: 'Indian Standard Time (IST)',
        desc: 'Discover why India chose 82°30’ E as its national timekeeper.',
        completed: false,
        objectives: ['Locate the Standard Meridian of India', 'Understand the GMT +5:30 relationship'],
        interactiveLabel: 'View IST Meridian',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'What is Indian Standard Time (IST) relative to Greenwich Mean Time (GMT)?',
          options: ['GMT -5:30 (behind)', 'GMT +5:30 (ahead)', 'Exactly identical to GMT', 'GMT +12:00'],
          correctAnswer: 1
        }
      }
    ]
  }
};
