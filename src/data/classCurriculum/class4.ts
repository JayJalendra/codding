import { CourseData } from '../../services/contentService';

export const class4Curriculum: Record<string, CourseData> = {
  // Class 4 -> EVS – Science -> Microscope
  'Class 4::Microscope': {
    classId: 'Class 4',
    subjectId: 'EVS – Science',
    topicId: 'Microscope',
    gradeLevel: 4,
    ageBand: 'Ages 9–10',
    title: 'Magnification and Lenses',
    subtitle: 'Unlocking the Invisible Microscopic World',
    intro: 'All around you is an invisible universe of tiny wonders — plant cells, dust pollen grains, and microscopic pond creatures that are too small for your naked eyes to see. A microscope uses curved glass lenses to bend light rays, magnifying microscopic objects up to hundreds of times their real size!',
    category: 'EVS – Science',
    difficulty: 'Beginner',
    duration: '15 min',
    iconName: 'Wrench',
    color: 'cyan',
    whyLearnThis: 'Microscopes revolutionized science! They allowed doctors to discover germs that cause illnesses and enabled scientists to inspect the tiny cells that build all living plants and animals.',
    visualExploration: 'Rotate the 3D microscope! Identify the eyepiece lens at the top, the revolving nosepiece holding different objective lenses (like 10x and 40x zoom), the flat stage with clips to hold glass slides, and the focus knobs on the side.',
    howItWorks: 'A convex lens is thicker in the middle than at the edges. When light passes through, the lens bends (refracts) light rays together to a focal point, making objects appear much larger to your eye.',
    realLifeConnection: 'Have you ever held a magnifying glass over a coin or an insect? A microscope is simply a precision machine using two or more magnifying lenses stacked together for extreme zoom!',
    tryItYourself: 'Drop a small water droplet on a piece of clear plastic over newspaper print. Notice how the rounded water droplet acts like a natural magnifying lens, making the letters look huge!',
    misconceptions: [
      'Microscopes do not make the object physically grow bigger — they bend light to spread the image across more receptors on your eye’s retina!'
    ],
    recap: [
      'Microscopes use curved glass lenses to magnify tiny objects',
      'The eyepiece and objective lens work together to multiply magnification',
      'Coarse and fine focus knobs bring blurred specimens into razor-sharp focus'
    ],
    challengeQuestion: 'If the eyepiece lens is 10x and the objective lens is 40x, how many times larger does the specimen appear?',
    sections: [
      {
        title: 'Bending Light with Lenses',
        content: 'Light travels in straight lines until it enters curved glass. Convex lenses bend light rays inward to a single focal point, creating an enlarged virtual image.',
        icon: 'Eye',
        color: 'text-cyan-400'
      },
      {
        title: 'Key Parts of a Microscope',
        content: 'The Eyepiece (Ocular), Objective lenses, Specimen Stage, Mirror or Lamp light source, and the Coarse and Fine Adjustment Knobs for precision focusing.',
        icon: 'Wrench',
        color: 'text-blue-400'
      },
      {
        title: 'Preparing a Glass Slide',
        content: 'Specimens must be sliced super-thin so light can pass right through them. A glass coverslip is gently lowered on top to keep the sample flat without air bubbles.',
        icon: 'Layers',
        color: 'text-indigo-400'
      }
    ],
    math: {
      title: 'Total Magnification',
      intro: 'To calculate how much bigger an object looks in a compound microscope, multiply the two lens powers:',
      formula: 'Total Magnification = Eyepiece Lens \\times Objective Lens',
      variables: [
        { symbol: 'Total', definition: 'Overall zoom multiplier (e.g., 400x)' },
        { symbol: 'Eyepiece', definition: 'Magnification of the ocular top lens (usually 10x)' },
        { symbol: 'Objective', definition: 'Magnification of the bottom rotating lens (e.g., 40x)' }
      ],
      minGradeLevel: 4
    },
    conclusion: {
      title: 'The Hidden Universe',
      content: 'Under a microscope, a single drop of pond water looks like an alien ocean teeming with swimming organisms, and an onion skin looks like a magnificent brick wall of living cells!',
      highlight: 'Magnifying 100x – 1000x',
      highlightNote: 'Revealing the building blocks of life'
    },
    modules: [
      {
        title: 'Anatomy of the Microscope',
        desc: 'Identify the structural and optical parts of a student microscope.',
        completed: false,
        objectives: ['Locate eyepiece, objectives, stage, and focus knobs', 'Understand how light passes through'],
        interactiveLabel: 'Inspect Microscope Parts',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'Where do you place the glass slide with your specimen on a microscope?',
          options: ['Inside the eyepiece', 'On the flat stage clips', 'Inside the mirror', 'Under the heavy base'],
          correctAnswer: 1
        }
      },
      {
        title: 'Calculating Zoom Power',
        desc: 'Multiply eyepiece and objective lens magnification.',
        completed: false,
        objectives: ['Calculate total magnification', 'Compare 10x vs 40x objective lens view'],
        interactiveLabel: 'Calculate Magnification',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'If the eyepiece lens is 10x and the objective lens is 10x, what is the total magnification?',
          options: ['20x', '100x', '1000x', '10x'],
          correctAnswer: 1
        }
      },
      {
        title: 'Focusing with Precision',
        desc: 'Use coarse and fine adjustments to turn blurry circles into clear images.',
        completed: false,
        objectives: ['Differentiate coarse vs fine adjustment knobs', 'Prevent lens collisions with slides'],
        interactiveLabel: 'Adjust Focus Wheel',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'Which knob should you turn gently when viewing specimens at high zoom to avoid cracking the slide?',
          options: ['The coarse focus knob', 'The fine adjustment knob', 'The stage clip', 'The base switch'],
          correctAnswer: 1
        }
      }
    ]
  },

  // Class 4 -> Mathematics -> Patterns in Nature
  'Class 4::Fractals': {
    classId: 'Class 4',
    subjectId: 'Mathematics',
    topicId: 'Fractals',
    gradeLevel: 4,
    ageBand: 'Ages 9–10',
    title: 'Patterns in Nature',
    subtitle: 'Self-Repeating Geometric Wonder',
    intro: 'Have you ever examined a broccoli head closely? A tiny floret looks almost exactly like the big broccoli head itself! In nature and mathematics, shapes that repeat their pattern smaller and smaller inside themselves are called self-similar patterns or fractals.',
    category: 'Mathematics',
    difficulty: 'Beginner',
    duration: '15 min',
    iconName: 'Binary',
    color: 'blue',
    whyLearnThis: 'Recognizing patterns is the core superpower of mathematicians, artists, and computer programmers! Fractals explain how tree branches grow, rivers flow, and snowflakes freeze.',
    visualExploration: 'Zoom deep into the 3D fractal! Notice that no matter how close you zoom in, the intricate branching arms repeat the same geometric rule over and over forever.',
    howItWorks: 'A simple geometric rule is repeated (iterated) again and again: "Start with one branch, split into two branches, then split each new branch into two more." From one simple instruction grows an entire branching tree!',
    realLifeConnection: 'Look at the back of a green fern leaf, a Romanesco broccoli, or the branching veins on an autumn maple leaf. Nature uses this trick to pack maximum surface area into a compact space!',
    tryItYourself: 'Draw a letter "Y" on paper. At the tip of each upper arm, draw another smaller "Y". Keep repeating three times. You will have drawn a beautiful fractal tree!',
    misconceptions: [
      'Fractals are not chaotic or messy — they are generated by very strict, clean mathematical rules repeated over and over!'
    ],
    recap: [
      'Self-similarity means a small part resembles the whole shape',
      'Nature uses repeating patterns in trees, clouds, coastlines, and lungs',
      'Simple mathematical rules repeated can create infinite beauty'
    ],
    challengeQuestion: 'Can you find another vegetable or fruit in your kitchen that shows self-repeating patterns?',
    sections: [
      {
        title: 'Self-Similarity',
        content: 'When you zoom in on a small piece of a fractal, it looks identical or nearly identical to the whole shape. Think of Russian nesting dolls made of geometry!',
        icon: 'Layers',
        color: 'text-blue-400'
      },
      {
        title: 'Snowflake Symmetry',
        content: 'Every snowflake grows six identical fractal arms as water vapor freezes, forming intricate hexagonal crystals in freezing winter clouds.',
        icon: 'Sparkles',
        color: 'text-cyan-400'
      },
      {
        title: 'Branching Systems',
        content: 'Rivers branching into streams, trees branching into twigs, and blood vessels branching into capillaries all follow the same fractal efficiency.',
        icon: 'Activity',
        color: 'text-indigo-400'
      }
    ],
    conclusion: {
      title: 'Mathematics in Nature',
      content: 'Mathematics is not just numbers in a textbook — it is the hidden architectural blueprint of flowers, sea shells, and the entire natural world.',
      highlight: 'Nature’s Code',
      highlightNote: 'Infinite complexity from simple rules'
    },
    modules: [
      {
        title: 'Discovering Self-Similarity',
        desc: 'Observe how zooming in reveals identical smaller structures.',
        completed: false,
        objectives: ['Define self-similarity in simple terms', 'Identify fractal patterns in everyday objects'],
        interactiveLabel: 'Zoom 3D Fractal',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'What is it called when a small piece of a shape looks like the whole shape?',
          options: ['Disappearing', 'Self-similarity', 'Melting', 'Fading'],
          correctAnswer: 1
        }
      },
      {
        title: 'The Snowflake Rule',
        desc: 'Explore the 6-sided symmetry of frozen water crystals.',
        completed: false,
        objectives: ['Count snowflake branches', 'Connect freezing water to geometry'],
        interactiveLabel: 'Inspect Snowflake',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'How many main symmetrical arms does a natural snowflake always have?',
          options: ['4 arms', '6 arms', '8 arms', '10 arms'],
          correctAnswer: 1
        }
      },
      {
        title: 'Tree Branching Geometry',
        desc: 'See how one trunk splits into millions of leaves.',
        completed: false,
        objectives: ['Understand the repeating branching rule', 'Connect fractal trees to river networks'],
        interactiveLabel: 'Grow Fractal Tree',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'Which of these natural systems follows a branching fractal pattern?',
          options: ['Tree branches and twigs', 'Lightning bolts', 'Blood vessels in our lungs', 'All of the above!'],
          correctAnswer: 3
        }
      }
    ]
  }
};
