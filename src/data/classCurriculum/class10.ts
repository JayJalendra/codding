import { CourseData } from '../../services/contentService';

export const class10Curriculum: Record<string, CourseData> = {
  // Class 10 -> Physics -> Drone Technology
  'Class 10::Drone': {
    classId: 'Class 10',
    subjectId: 'Physics',
    topicId: 'Drone',
    gradeLevel: 10,
    ageBand: 'Ages 15–16',
    title: 'Drone Technology & Quadcopter Aerodynamics',
    subtitle: 'Newtonian Flight Dynamics, Brushless Motors & Gyroscopic Control',
    intro: 'Unmanned Aerial Vehicles (UAVs) and quadcopters achieve stable, agile flight not through flapping wings or airplane rudders, but through the precise, computerized variation of rotational speeds across four counter-rotating brushless DC propellers. By independently adjusting motor RPM, a quadcopter maneuvers in 3D space across pitch, roll, and yaw axes with sub-centimeter accuracy.',
    category: 'Physics',
    difficulty: 'Intermediate',
    duration: '25 min',
    iconName: 'Wrench',
    color: 'sky',
    whyLearnThis: 'Drone technology powers precision agriculture, autonomous package delivery, cinematic videography, search-and-rescue operations in disaster zones, and industrial infrastructure inspections.',
    visualExploration: 'Rotate the 3D quadcopter model! Notice that diagonal motor pairs rotate in opposite directions (Motors 1 & 3 spin clockwise CW, while Motors 2 & 4 spin counter-clockwise CCW) to cancel out reactive aerodynamic torque and prevent the drone from spinning uncontrollably!',
    howItWorks: 'Lift is generated according to Newton’s Third Law and Bernoulli’s principle: rotating aerofoil propeller blades push air downwards, generating an equal and opposite upward thrust force. When Total Thrust equals the drone’s weight (T = mg), the drone hovers stably in mid-air.',
    realLifeConnection: 'The gyroscopes and accelerometers inside modern smartphones were originally miniaturized for UAV stabilization flight controllers using MEMS (Micro-Electro-Mechanical Systems) technology!',
    tryItYourself: 'To pitch forward: The rear motors spin faster to produce more lift at the back, tilting the drone’s thrust vector forward to push it horizontally through the air!',
    misconceptions: [
      'A quadcopter does NOT steer with a mechanical rudder like a boat or plane — it changes direction purely by speeding up or slowing down specific pairs of spinning motors!'
    ],
    recap: [
      'Four motors arranged diagonally: 2 CW and 2 CCW to cancel net yaw torque',
      'Hover occurs when total aerodynamic thrust equals gravitational weight (T = mg)',
      'Pitch tilts nose down/up; Roll tilts left/right; Yaw rotates horizontally',
      'Electronic Speed Controllers (ESCs) modulate motor RPM thousands of times per second'
    ],
    challengeQuestion: 'How does a quadcopter yaw (rotate clockwise) while keeping its altitude perfectly level?',
    sections: [
      {
        title: 'Counter-Rotating Propellers',
        content: 'Newton’s 3rd Law states every action has an equal opposite reaction. If all 4 blades spun clockwise, the drone chassis would violently spin counter-clockwise. Diagonal pairs cancel this reaction torque.',
        icon: 'RotateCw',
        color: 'text-sky-400'
      },
      {
        title: 'Pitch, Roll, and Yaw Axes',
        content: 'Pitch tilts the drone front-to-back to fly forward/reverse. Roll tilts side-to-side to fly laterally. Yaw rotates the heading clockwise or counter-clockwise about the vertical axis.',
        icon: 'Compass',
        color: 'text-cyan-400'
      },
      {
        title: 'The Flight Controller & IMU',
        content: 'An Inertial Measurement Unit (IMU) reads 3-axis accelerometer and gyroscope data at 1,000 Hz, computing PID control corrections to keep the drone level even in gusty crosswinds.',
        icon: 'Cpu',
        color: 'text-indigo-400'
      }
    ],
    math: {
      title: 'Quadcopter Hover Thrust Condition',
      intro: 'For a quadcopter of mass m with 4 identical rotors to hover stationary in calm air:',
      formula: 'T_{\\text{total}} = 4 \\times T_{\\text{motor}} = m \\cdot g',
      variables: [
        { symbol: 'Ttotal', definition: 'Total upward aerodynamic thrust (Newtons, N)' },
        { symbol: 'Tmotor', definition: 'Thrust produced by a single propeller' },
        { symbol: 'm', definition: 'Total take-off mass of the drone (kg)' },
        { symbol: 'g', definition: 'Acceleration due to gravity (9.8 m/s²)' }
      ],
      minGradeLevel: 10
    },
    conclusion: {
      title: 'The Robotics of Flight',
      content: 'Quadcopters represent the harmonious fusion of classical fluid mechanics, digital electronics, embedded microcontrollers, and modern lithium-polymer battery chemistry.',
      highlight: 'T = mg Hover State',
      highlightNote: 'Equilibrium of thrust and weight'
    },
    modules: [
      {
        title: 'Torque Cancellation & Yaw Control',
        desc: 'Understand why diagonal motors rotate in opposite directions.',
        completed: false,
        objectives: ['Analyze reactive motor torque', 'Control yaw rotation by unbalancing CW vs CCW motor pairs'],
        interactiveLabel: 'Test Motor Torque Sim',
        interactiveType: 'simulation',
        quiz: {
          question: 'Why do quadcopter propellers spin in opposite directions (2 clockwise, 2 counter-clockwise)?',
          options: ['To look symmetrical', 'To cancel out reactive torque and prevent the drone body from spinning', 'To save battery power', 'To make less noise'],
          correctAnswer: 1
        }
      },
      {
        title: 'Pitch and Roll Maneuvers',
        desc: 'Vary front vs rear motor speeds to drive horizontal translation.',
        completed: false,
        objectives: ['Differentiate pitch, roll, and yaw', 'Analyze tilted thrust vectors for forward flight'],
        interactiveLabel: 'Fly 3D Drone',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'To pitch forward and fly ahead, what must the flight controller do?',
          options: ['Turn off all motors', 'Spin rear motors faster than front motors', 'Spin left motors faster than right motors', 'Reverse all propeller blades'],
          correctAnswer: 1
        }
      },
      {
        title: 'Power and Payload Limits',
        desc: 'Calculate maximum payload weight before thrust-to-weight ratio falls below 1.0.',
        completed: false,
        objectives: ['Calculate thrust-to-weight ratio', 'Evaluate battery discharge C-ratings'],
        interactiveLabel: 'Test Payload Calculator',
        interactiveType: 'calculator',
        quiz: {
          question: 'What happens if a drone’s total thrust is less than its total gravitational weight (T < mg)?',
          options: ['It accelerates into space', 'It cannot take off and remains on the ground', 'It hovers at a fixed altitude', 'It spins in circles'],
          correctAnswer: 1
        }
      }
    ]
  },

  // Class 10 -> Chemistry -> Organic Chemistry
  'Class 10::OrganicChemistry': {
    classId: 'Class 10',
    subjectId: 'Chemistry',
    topicId: 'OrganicChemistry',
    gradeLevel: 10,
    ageBand: 'Ages 15–16',
    title: 'Carbon and its Compounds',
    subtitle: 'NCERT Chemistry Chapter 4: Tetravalency, Catenation & Hydrocarbons',
    intro: 'Carbon is the superstar element of the periodic table! Although it constitutes less than 0.03% of Earth’s crust and atmosphere, carbon forms millions of unique chemical compounds — far more than all the other 117 elements combined. From the DNA in your cells and medicines that save lives, to fuels, plastics, and diamond gemstones, organic chemistry is the chemistry of carbon.',
    category: 'Chemistry',
    difficulty: 'Intermediate',
    duration: '25 min',
    iconName: 'FlaskConical',
    color: 'pink',
    whyLearnThis: 'Carbon chemistry underpins pharmacology, polymer plastics, agricultural fertilizers, petroleum fuels, food biochemistry, and clean synthetic energy materials.',
    visualExploration: 'Inspect the 3D molecular structures! Examine methane (CH₄) with its symmetrical tetrahedral shape (109.5° bond angle), ethene (C₂H₄) with its rigid double bond, and ethanol (C₂H₅OH) displaying its reactive hydroxyl functional group.',
    howItWorks: 'Carbon has an atomic number of 6 with an electronic configuration of (2, 4). To achieve a stable octet, carbon shares 4 valence electrons with other atoms, forming 4 covalent bonds (Tetravalency). Its unique small atomic radius allows it to form strong, stable bonds with other carbon atoms, creating endless chains, branched trees, and rings (Catenation).',
    realLifeConnection: 'Diamond and graphite are both made of 100% pure carbon! In diamond, each carbon is bonded to 4 others in a rigid 3D lattice, making it the hardest natural substance. In graphite, carbon forms slippery 2D hexagonal sheets, making it soft enough to write in pencils and conduct electricity!',
    tryItYourself: 'Count the bonds in ethane (C₂H₆): Carbon shares one single bond with another carbon (C-C) and 3 bonds with hydrogen on each side, totaling 7 covalent bonds!',
    misconceptions: [
      'Organic compounds do not have to come from living organisms! In 1828, Friedrich Wöhler famously synthesized urea (an organic compound) in a laboratory from inorganic ammonium cyanate, proving that organic chemistry obeys standard chemical laws without needing a mystical "vital force".'
    ],
    recap: [
      'Carbon exhibits tetravalency (4 covalent bonds) and catenation (self-linking)',
      'Alkanes (CnH2n+2) are saturated hydrocarbons with single bonds',
      'Alkenes (CnH2n) and Alkynes (CnH2n-2) are unsaturated hydrocarbons with double/triple bonds',
      'Functional groups (alcohol -OH, aldehyde -CHO, carboxylic acid -COOH) dictate chemical reactivity'
    ],
    challengeQuestion: 'Why can’t a carbon atom easily gain 4 electrons (to form C⁴⁻) or lose 4 electrons (to form C⁴⁺) to achieve noble gas stability?',
    sections: [
      {
        title: 'Tetravalency and Catenation',
        content: 'With 4 valence electrons, carbon shares electrons covalently. Catenation allows carbon atoms to link together into straight chains, branched isomers, or closed rings.',
        icon: 'Grid',
        color: 'text-pink-400'
      },
      {
        title: 'Homologous Series',
        content: 'A series of organic compounds with the same functional group where adjacent members differ by a -CH₂- unit and 14 u in molecular mass (e.g., Methane, Ethane, Propane, Butane).',
        icon: 'Layers',
        color: 'text-purple-400'
      },
      {
        title: 'Functional Groups',
        content: 'Heteroatoms like Oxygen, Chlorine, or Nitrogen confer specific chemical properties: Alcohols (-OH), Aldehydes (-CHO), Ketones (>C=O), and Carboxylic acids (-COOH).',
        icon: 'FlaskConical',
        color: 'text-rose-400'
      }
    ],
    math: {
      title: 'General Formula of Hydrocarbon Families',
      intro: 'The molecular formula of straight-chain aliphatic hydrocarbons depends on their bond saturation:',
      formula: '\\text{Alkanes: } C_n H_{2n+2} \\quad | \\quad \\text{Alkenes: } C_n H_{2n} \\quad | \\quad \\text{Alkynes: } C_n H_{2n-2}',
      variables: [
        { symbol: 'n', definition: 'Number of carbon atoms in the molecule (n = 1, 2, 3...)' },
        { symbol: '2n+2', definition: 'Hydrogen atoms for saturated single-bond alkanes' },
        { symbol: '2n', definition: 'Hydrogen atoms for double-bond alkenes' },
        { symbol: '2n-2', definition: 'Hydrogen atoms for triple-bond alkynes' }
      ],
      minGradeLevel: 10
    },
    conclusion: {
      title: 'The Foundation of Biochemistry',
      content: 'Carbon’s versatile covalent architecture is the supreme structural scaffolding upon which proteins, nucleic acids, lipids, and the entire chemical machinery of life is constructed.',
      highlight: 'Catenation & Tetravalency',
      highlightNote: 'The secrets behind millions of carbon compounds'
    },
    modules: [
      {
        title: 'Covalent Bonding in Methane',
        desc: 'Explore electron dot structures and the tetrahedral geometry of CH₄.',
        completed: false,
        objectives: ['Draw Lewis electron dot structures', 'Understand single covalent bonds'],
        interactiveLabel: 'Inspect Methane 3D',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'How many pairs of electrons are shared between carbon and hydrogen in a single molecule of methane (CH₄)?',
          options: ['1 pair', '2 pairs', '4 pairs', '8 pairs'],
          correctAnswer: 2
        }
      },
      {
        title: 'Saturated vs Unsaturated Hydrocarbons',
        desc: 'Distinguish alkanes (single bonds) from alkenes and alkynes (double/triple bonds).',
        completed: false,
        objectives: ['Identify C-C double and triple bonds', 'Predict formulas using CnH2n and CnH2n-2'],
        interactiveLabel: 'Compare Alkane vs Alkene',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'What is the molecular formula of Propane (an alkane with n = 3 carbons)?',
          options: ['C₃H₆', 'C₃H₈', 'C₃H₄', 'CH₄'],
          correctAnswer: 1
        }
      },
      {
        title: 'Functional Groups and Nomenclature',
        desc: 'Identify alcohols (-OH) and carboxylic acids (-COOH).',
        completed: false,
        objectives: ['Recognize functional groups', 'Name simple compounds like Ethanol and Ethanoic acid'],
        interactiveLabel: 'Inspect Functional Groups',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'Which functional group characterizes alcohols like Ethanol?',
          options: ['-COOH group', '-OH group', '-CHO group', '-Cl group'],
          correctAnswer: 1
        }
      }
    ]
  },

  // Class 10 -> Biology -> Human Heart & Double Circulation
  'Class 10::HumanHeart': {
    classId: 'Class 10',
    subjectId: 'Biology',
    topicId: 'HumanHeart',
    gradeLevel: 10,
    ageBand: 'Ages 15–16',
    title: 'Circulatory System & Double Circulation',
    subtitle: 'NCERT Biology Chapter 6: Life Processes — Transportation in Humans',
    intro: 'In humans and birds, keeping oxygen-rich blood separated from deoxygenated blood is essential to supply the high metabolic energy required for maintaining a constant warm body temperature. The human heart accomplishes this using a four-chambered muscular design that drives blood through two separate circuits in a single complete heartbeat: Double Circulation!',
    category: 'Biology',
    difficulty: 'Intermediate',
    duration: '25 min',
    iconName: 'Heart',
    color: 'red',
    whyLearnThis: 'Cardiovascular health is the #1 medical topic worldwide. Understanding chamber dynamics, heart valves, blood pressure, and coronary circulation helps prevent hypertension and cardiac disorders.',
    visualExploration: 'Explore the 3D four-chambered heart! Trace the blue deoxygenated blood entering the Right Atrium through the Vena Cava, pumped to the lungs via Pulmonary Arteries, and returning as bright red oxygenated blood into the Left Atrium and powerful Left Ventricle to be blasted into the Aorta.',
    howItWorks: 'Double Circulation consists of two loops: 1) Pulmonary Circulation (Right Ventricle → Lungs → Left Atrium) to pick up oxygen and release CO₂; 2) Systemic Circulation (Left Ventricle → Body Tissues → Right Atrium) to deliver oxygen and nutrients to organs.',
    realLifeConnection: 'When a doctor checks your blood pressure with a cuff (sphygmomanometer), the two numbers (e.g. 120/80 mmHg) measure ventricular contraction pressure (Systolic, 120 mmHg) over ventricular relaxation pressure (Diastolic, 80 mmHg)!',
    tryItYourself: 'Notice that the muscular wall of the Left Ventricle is nearly three times thicker than the Right Ventricle. Why? Because the right ventricle only pumps blood nearby to the spongy lungs, while the left ventricle must generate enough hydraulic pressure to push blood to your brain and toes!',
    misconceptions: [
      'Veins do not carry blue blood! Deoxygenated blood is dark crimson red, while oxygenated blood is bright scarlet red. Veins only appear bluish through your skin because of how red vs blue light wavelengths scatter through human subcutaneous tissue.'
    ],
    recap: [
      'Four chambers: Right & Left Atria (receiving), Right & Left Ventricles (pumping)',
      'Valves (Tricuspid, Bicuspid/Mitral, Semilunar) ensure strictly unidirectional blood flow',
      'Double Circulation separates pulmonary gas exchange from systemic tissue delivery',
      'Normal resting blood pressure is approximately 120/80 mmHg'
    ],
    challengeQuestion: 'What would happen if the septum separating the right and left ventricles had a hole (ventricular septal defect)?',
    sections: [
      {
        title: 'Four-Chambered Architecture',
        content: 'The upper receiving Atria have thin walls, while the lower pumping Ventricles have thick muscular walls. The muscular Septum prevents mixing of oxygenated and deoxygenated blood.',
        icon: 'Layers',
        color: 'text-red-400'
      },
      {
        title: 'Pulmonary vs Systemic Loops',
        content: 'Pulmonary loop sends deoxygenated blood to lungs for gas exchange. Systemic loop pumps high-pressure oxygenated blood from the thick left ventricle through the Aorta to all organs.',
        icon: 'Activity',
        color: 'text-rose-400'
      },
      {
        title: 'One-Way Valves & Heart Sounds',
        content: 'Atrioventricular and semilunar valves snap shut to prevent backflow. The iconic "lub-dub" stethoscope sound is the audible snapping shut of these heart valves!',
        icon: 'Heart',
        color: 'text-pink-400'
      }
    ],
    math: {
      title: 'Blood Pressure and Pulse Pressure',
      intro: 'Arterial blood pressure fluctuates cyclically between peak systolic contraction and baseline diastolic rest:',
      formula: '\\text{Pulse Pressure} = P_{\\text{systolic}} - P_{\\text{diastolic}} = 120 - 80 = 40 \\text{ mmHg}',
      variables: [
        { symbol: 'Psystolic', definition: 'Peak arterial pressure during ventricular contraction (~120 mmHg)' },
        { symbol: 'Pdiastolic', definition: 'Minimum arterial pressure during ventricular relaxation (~80 mmHg)' },
        { symbol: 'mmHg', definition: 'Millimeters of mercury (standard hydrostatic pressure unit)' }
      ],
      minGradeLevel: 10
    },
    conclusion: {
      title: 'The Central Engine of Life',
      content: 'Your heart pumps approximately 5 liters of blood through 100,000 kilometers of blood vessels every minute, sustaining cellular respiration across every tissue in the human body.',
      highlight: 'Double Circulation',
      highlightNote: 'Zero mixing of oxygenated & deoxygenated blood'
    },
    modules: [
      {
        title: 'Trace Blood Pathways',
        desc: 'Follow a red blood cell through all four chambers and valves.',
        completed: false,
        objectives: ['Identify atria, ventricles, and septum', 'Trace vena cava, pulmonary artery, pulmonary vein, and aorta'],
        interactiveLabel: 'Simulate Blood Flow',
        interactiveType: 'simulation',
        quiz: {
          question: 'Which chamber of the human heart has the thickest muscular wall because it must pump blood to the entire body?',
          options: ['Right Atrium', 'Left Atrium', 'Right Ventricle', 'Left Ventricle'],
          correctAnswer: 3
        }
      },
      {
        title: 'The "Lub-Dub" Valve Mechanics',
        desc: 'Observe tricuspid, bicuspid, and aortic semilunar valve closures.',
        completed: false,
        objectives: ['Understand valve mechanisms', 'Explain the origin of heart sounds'],
        interactiveLabel: 'Inspect Heart Valves',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'What creates the "lub-dub" sound heard through a stethoscope during a cardiac cycle?',
          options: ['Blood splashing against the ribs', 'The rhythmic snapping shut of heart valves', 'Air escaping the lungs', 'Muscles rubbing against bones'],
          correctAnswer: 1
        }
      },
      {
        title: 'Blood Pressure & Hypertension',
        desc: 'Measure systolic and diastolic pressure values and understand risks of high blood pressure.',
        completed: false,
        objectives: ['Interpret 120/80 mmHg readings', 'Explain the physiological danger of arterial plaque'],
        interactiveLabel: 'Test Blood Pressure Sim',
        interactiveType: 'calculator',
        quiz: {
          question: 'In a healthy adult blood pressure reading of 120/80 mmHg, what does the number 120 represent?',
          options: ['Diastolic pressure during rest', 'Systolic pressure during ventricular contraction', 'Heart beats per minute', 'Oxygen saturation percentage'],
          correctAnswer: 1
        }
      }
    ]
  }
};
