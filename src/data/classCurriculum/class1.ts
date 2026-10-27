import { CourseData } from '../../services/contentService';

export const class1Curriculum: Record<string, CourseData> = {
  // Class 1 -> Our World -> Our Earth
  'Class 1::Globe': {
    classId: 'Class 1',
    subjectId: 'Our World',
    topicId: 'Globe',
    gradeLevel: 1,
    ageBand: 'Ages 6–8',
    title: 'Our Earth',
    subtitle: 'Our Wonderful Spinning Home',
    intro: 'Welcome to Earth! Our Earth is a giant, beautiful round ball floating gently in space. It spins round and round like a slow merry-go-round. When our side faces the warm Sun, we have bright daytime to play and learn. When we turn away, peaceful nighttime arrives so we can rest under the stars.',
    category: 'Our World',
    difficulty: 'Beginner',
    duration: '10 min',
    iconName: 'Globe',
    color: 'emerald',
    whyLearnThis: 'Earth is our only home in the whole universe! Understanding how it turns helps us know why morning brings sunlight and evening brings bedtime.',
    visualExploration: 'Look at the 3D globe in front of you! Can you see the big blue parts? Those are oceans full of playful dolphins and whales. The green and brown patches are lands where we build our houses and animals live. Try spinning Earth with your finger!',
    howItWorks: 'Imagine holding a torch towards a toy ball in a dark bedroom. The side facing the torch is bright (Daytime!), while the other side is dark (Nighttime!). Earth does the exact same thing with the warm light of our Sun.',
    realLifeConnection: 'When you are eating breakfast in the morning, children living on the other side of Earth are putting on their pyjamas and going to sleep!',
    tryItYourself: 'Stand up and spin slowly like a top. When your face looks at a window, shout "Daytime!" When your back is to the window, whisper "Nighttime!"',
    misconceptions: [
      'The Sun does not actually run across the sky — Earth is the one slowly turning us towards and away from the Sun!'
    ],
    recap: [
      'Earth is shaped like a giant round ball',
      'Blue parts are water oceans, green parts are land',
      'Earth spins around to give us day and night'
    ],
    challengeQuestion: 'Can you spin the 3D globe until you find where the ocean is the biggest?',
    sections: [
      {
        title: 'Land and Water',
        content: 'Most of our planet is covered in deep blue water called oceans. The rest is land where tall trees grow, birds sing, and people build homes.',
        icon: 'Globe',
        color: 'text-emerald-400'
      },
      {
        title: 'Day and Night',
        content: 'As Earth turns like a merry-go-round, the side facing the Sun gets warm sunshine (Day). The side turned away is cozy and dark (Night).',
        icon: 'Sun',
        color: 'text-amber-400'
      },
      {
        title: 'The Sky Above',
        content: 'Earth is wrapped in a blanket of clean air that we breathe. Clouds float in it and rain falls to help pretty flowers grow.',
        icon: 'Sparkles',
        color: 'text-cyan-400'
      }
    ],
    // NO math section for Class 1!
    conclusion: {
      title: 'Our Beautiful Home',
      content: 'We must love and take care of Earth by planting green trees, saving water, and keeping our parks clean and tidy.',
      highlight: 'Earth is Home',
      highlightNote: 'A wonderful planet for all living things'
    },
    modules: [
      {
        title: 'What Shape is Earth?',
        desc: 'Observe the 3D globe and discover the shape of our home planet.',
        completed: false,
        objectives: ['Identify that Earth is round like a ball', 'Spot the blue oceans and green land'],
        interactiveLabel: 'Spin the Globe',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'What shape is our planet Earth?',
          options: ['Flat like a plate', 'Round like a ball', 'Pointy like a triangle', 'Square like a box'],
          correctAnswer: 1
        }
      },
      {
        title: 'Day and Night Fun',
        desc: 'See how Earth turns into the warm sunshine.',
        completed: false,
        objectives: ['Learn why day follows night', 'Observe the light on the globe'],
        interactiveLabel: 'Watch Sunlight',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'What makes daytime bright on Earth?',
          options: ['The warm Sun', 'Streetlights', 'The Moon', 'A giant flashlight'],
          correctAnswer: 0
        }
      },
      {
        title: 'Oceans and Lands',
        desc: 'Explore the colors of our globe.',
        completed: false,
        objectives: ['Recognize blue as ocean water', 'Recognize green/brown as land'],
        interactiveLabel: 'Find the Oceans',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'What is the big blue part shown on the globe?',
          options: ['Ice cream', 'Water in oceans', 'Blue grass', 'Plastic paint'],
          correctAnswer: 1
        }
      }
    ]
  },

  // Class 1 -> Our Body -> Human Body
  'Class 1::HumanBody': {
    classId: 'Class 1',
    subjectId: 'Our Body',
    topicId: 'HumanBody',
    gradeLevel: 1,
    ageBand: 'Ages 6–8',
    title: 'Our Amazing Body',
    subtitle: 'Head to Toe Wonder',
    intro: 'Your body is your personal super-suit! It helps you run, jump, sing, laugh, and dream. Inside you, hard bones hold you up like the frame of a tent, strong muscles help you smile and sprint, and your heart beats with a gentle thump-thump every second of your life.',
    category: 'Our Body',
    difficulty: 'Beginner',
    duration: '10 min',
    iconName: 'Heart',
    color: 'red',
    whyLearnThis: 'Your body is special! When you know how it works, you can keep it strong and happy by eating colorful fruits, drinking water, and running outside.',
    visualExploration: 'Look inside the 3D body! Notice the hard skull that protects your thinking brain like a sturdy bike helmet, and the rib cage that wraps around your heart like a soft cage.',
    howItWorks: 'Bones give us our shape so we do not flop like jelly. Muscles pull on our bones so we can kick a ball or give a warm hug!',
    realLifeConnection: 'Put your hand on your chest right now. Can you feel that thump-thump? That is your heart pumping fresh blood to every toe and fingertip.',
    tryItYourself: 'Wiggle your ten toes! Bend your knees and touch your toes. Every single movement is your bones and muscles working as a team!',
    misconceptions: [
      'Bones are not dry sticks — they are living parts of your body that grow bigger and stronger as you grow!'
    ],
    recap: [
      'Bones keep us standing tall',
      'Muscles help us run, jump, and smile',
      'The heart pumps blood all day and all night'
    ],
    challengeQuestion: 'Can you count how many times your heart beats in 10 seconds after jumping 5 times?',
    sections: [
      {
        title: 'Bones: Our Sturdy Frame',
        content: 'Without bones, we would be soft like a jellyfish! Over 200 bones connect together to make our skeleton.',
        icon: 'Activity',
        color: 'text-amber-400'
      },
      {
        title: 'Muscles: Our Movers',
        content: 'Muscles are stretchy like rubber bands. When you smile, over a dozen tiny face muscles work together!',
        icon: 'Zap',
        color: 'text-red-400'
      },
      {
        title: 'Our Five Super Senses',
        content: 'Eyes to see colors, ears to hear music, a nose to smell flowers, a tongue to taste apples, and skin to feel hugs.',
        icon: 'Sparkles',
        color: 'text-pink-400'
      }
    ],
    // NO math section for Class 1!
    conclusion: {
      title: 'Take Care of Your Body',
      content: 'Eat fresh fruits, drink clean water, sleep well, and play outdoors every day to keep your body super strong!',
      highlight: 'You are Unique',
      highlightNote: 'Your body is your greatest treasure'
    },
    modules: [
      {
        title: 'The Sturdy Skeleton',
        desc: 'Discover how bones hold us up and protect our organs.',
        completed: false,
        objectives: ['Learn what bones do', 'Find the skull and ribs'],
        interactiveLabel: 'Explore Skeleton',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'What would happen if we had no bones?',
          options: ['We could fly', 'We would flop like jelly', 'We would run faster', 'Nothing would change'],
          correctAnswer: 1
        }
      },
      {
        title: 'The Beating Heart',
        desc: 'Listen to the gentle rhythm of the heart pump.',
        completed: false,
        objectives: ['Understand that the heart pumps blood', 'Feel your own pulse'],
        interactiveLabel: 'View the Heart',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'What sound does your heart make as it pumps?',
          options: ['Beep-beep', 'Thump-thump', 'Ding-dong', 'Tick-tock'],
          correctAnswer: 1
        }
      },
      {
        title: 'Our Five Senses',
        desc: 'How we explore and enjoy the world.',
        completed: false,
        objectives: ['Name the five senses', 'Match sense organs with their jobs'],
        interactiveLabel: 'Test Senses',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'Which body part helps us hear songs and stories?',
          options: ['Nose', 'Ears', 'Elbows', 'Toes'],
          correctAnswer: 1
        }
      }
    ]
  },

  // Class 1 -> Mathematics -> Basic Shapes
  'Class 1::Geometry': {
    classId: 'Class 1',
    subjectId: 'Mathematics',
    topicId: 'Geometry',
    gradeLevel: 1,
    ageBand: 'Ages 6–8',
    title: 'Fun with Shapes',
    subtitle: 'Circles, Squares & Triangles Everywhere',
    intro: 'Look around you! Everything you see is made of fun shapes. A football is round like a sphere, a gift box is a cube, and a crunchy tortilla chip is a triangle. Shapes are the building blocks of everything in the universe!',
    category: 'Mathematics',
    difficulty: 'Beginner',
    duration: '10 min',
    iconName: 'Shapes',
    color: 'blue',
    whyLearnThis: 'Shapes help us draw animals, build tall toy towers, and recognize signs in the real world.',
    visualExploration: 'Spin the 3D shapes! Look at the cube with its 6 flat faces, the smooth round sphere with no corners at all, and the cone that looks like an upside-down ice cream cone!',
    howItWorks: 'Flat shapes live on paper (2D). Solid shapes you can hold in your hands like balls, blocks, and party hats (3D).',
    realLifeConnection: 'A pizza starts as a round circle, is cut into yummy triangles, and arrives inside a square box!',
    tryItYourself: 'Find three things in your room: one round like a ball, one flat like a book, and one shaped like a box.',
    misconceptions: [
      'A circle is flat like a drawing on paper, but a sphere is round all over like a basketball you can bounce!'
    ],
    recap: [
      'Circles are round with no corners',
      'Squares have 4 equal sides',
      'Cubes and spheres are solid 3D shapes'
    ],
    challengeQuestion: 'Which 3D shape can roll smoothly down a slide without stopping?',
    sections: [
      {
        title: 'Round Shapes',
        content: 'Circles and spheres have no sharp corners. They roll and bounce smoothly across the floor.',
        icon: 'CircleDot',
        color: 'text-blue-400'
      },
      {
        title: 'Straight Shapes',
        content: 'Squares and rectangles have straight edges and corners. You can stack them high like building blocks.',
        icon: 'Box',
        color: 'text-indigo-400'
      },
      {
        title: 'Pointy Shapes',
        content: 'Triangles have 3 corners. Think of mountain tops, party hats, and slices of watermelon!',
        icon: 'Shapes',
        color: 'text-purple-400'
      }
    ],
    conclusion: {
      title: 'Shape Detective',
      content: 'You can now spot shapes everywhere you look — at home, at school, and out on the playground!',
      highlight: 'Shapes are Everywhere',
      highlightNote: 'The foundation of drawing and building'
    },
    modules: [
      {
        title: 'Spot the Sphere',
        desc: 'Discover round shapes that can roll.',
        completed: false,
        objectives: ['Identify a sphere', 'Distinguish between flat circles and 3D spheres'],
        interactiveLabel: 'Roll the Sphere',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'Which of these is round like a ball?',
          options: ['A shoebox', 'A basketball', 'A ruler', 'A door'],
          correctAnswer: 1
        }
      },
      {
        title: 'The Sturdy Cube',
        desc: 'Count the flat faces of a toy block.',
        completed: false,
        objectives: ['Count faces of a cube', 'Understand flat surfaces'],
        interactiveLabel: 'Spin the Cube',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'What shape is a six-sided dice or a square toy block?',
          options: ['Cube', 'Cone', 'Cylinder', 'Ring'],
          correctAnswer: 0
        }
      },
      {
        title: 'Pointy Triangles',
        desc: 'Discover shapes with 3 sharp corners.',
        completed: false,
        objectives: ['Recognize triangles and cones', 'Count 3 corners'],
        interactiveLabel: 'Explore Triangle',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'How many corners does a triangle have?',
          options: ['2 corners', '3 corners', '4 corners', 'None'],
          correctAnswer: 1
        }
      }
    ]
  }
};
