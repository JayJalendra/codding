import { CourseData } from '../../services/contentService';

export const class2Curriculum: Record<string, CourseData> = {
  // Class 2 -> Our World -> Our Earth
  'Class 2::Globe': {
    classId: 'Class 2',
    subjectId: 'Our World',
    topicId: 'Globe',
    gradeLevel: 2,
    ageBand: 'Ages 7–8',
    title: 'Our Earth: Continents and Oceans',
    subtitle: 'Exploring Land, Water & the Poles',
    intro: 'Earth is a giant round globe with huge patches of land called continents and vast bodies of salty water called oceans. At the very top is the chilly North Pole where polar bears roam, and at the bottom is the frozen South Pole where penguins slide on ice!',
    category: 'Our World',
    difficulty: 'Beginner',
    duration: '12 min',
    iconName: 'Globe',
    color: 'emerald',
    whyLearnThis: 'Knowing the continents and oceans helps us understand maps, travel, and where animals and people live all over the world.',
    visualExploration: 'Spin the 3D globe to see the seven giant continents! Notice the North Pole at the top covered in glistening ice, and the deep blue Pacific ocean wrapping around half the planet.',
    howItWorks: 'Earth is slightly tilted as it travels around the Sun. This gentle tilt gives us warm summer seasons and cozy winter seasons!',
    realLifeConnection: 'When birds fly thousands of miles to escape the winter frost, they travel from one continent to another using the stars and Earth as their map.',
    tryItYourself: 'Find your home continent on the 3D globe. Then spin around to find where Antarctica is freezing at the very bottom!',
    misconceptions: [
      'Polar bears and penguins do not live together! Polar bears live at the North Pole, while penguins live at the South Pole.'
    ],
    recap: [
      'There are 7 large landmasses called continents',
      'Oceans cover more than two-thirds of Earth',
      'The North and South Poles are the coldest places on our planet'
    ],
    challengeQuestion: 'Can you name the ocean that sits between Africa and Australia?',
    sections: [
      {
        title: 'The Seven Continents',
        content: 'Asia, Africa, North America, South America, Antarctica, Europe, and Australia. Asia is the biggest of them all!',
        icon: 'Globe',
        color: 'text-emerald-400'
      },
      {
        title: 'Vast Blue Oceans',
        content: 'The Pacific, Atlantic, Indian, Arctic, and Southern oceans hold 97% of all water on Earth. They are salty and full of marine life.',
        icon: 'Waves',
        color: 'text-blue-400'
      },
      {
        title: 'The Frozen Poles',
        content: 'The North Pole and South Pole get very little direct sunlight, keeping their glaciers frozen white all year round.',
        icon: 'Sparkles',
        color: 'text-cyan-400'
      }
    ],
    conclusion: {
      title: 'Our Connected Planet',
      content: 'No matter which continent we live on, we all share the same water, breathe the same air, and look up at the same Sun.',
      highlight: '7 Continents, 5 Oceans',
      highlightNote: 'One shared home for all of humanity'
    },
    modules: [
      {
        title: 'Continents Explorer',
        desc: 'Spot and name the huge land areas on our globe.',
        completed: false,
        objectives: ['Identify what a continent is', 'Locate major landmasses'],
        interactiveLabel: 'Find Continents',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'What do we call the huge areas of land on Earth?',
          options: ['Islands', 'Continents', 'Puddles', 'Caves'],
          correctAnswer: 1
        }
      },
      {
        title: 'Ocean Wonders',
        desc: 'Explore the vast waters of the planet.',
        completed: false,
        objectives: ['Learn about salty oceans', 'Understand how much water covers Earth'],
        interactiveLabel: 'View Oceans',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'Is ocean water fresh like tap water or salty?',
          options: ['Sweet like juice', 'Salty', 'Fizzy like soda', 'Sour like lemon'],
          correctAnswer: 1
        }
      },
      {
        title: 'Poles of Ice',
        desc: 'Visit the freezing top and bottom of Earth.',
        completed: false,
        objectives: ['Locate the North Pole and South Pole', 'Discover cold climates'],
        interactiveLabel: 'Zoom to the Poles',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'Where do wild penguins live?',
          options: ['At the South Pole (Antarctica)', 'In hot deserts', 'In thick treetops', 'At the North Pole only'],
          correctAnswer: 0
        }
      }
    ]
  },

  // Class 2 -> Our World -> Plants & Forests
  'Class 2::Rainforest': {
    classId: 'Class 2',
    subjectId: 'Our World',
    topicId: 'Rainforest',
    gradeLevel: 2,
    ageBand: 'Ages 7–8',
    title: 'Plants and Forests',
    subtitle: "Nature's Lush Green Blanket",
    intro: 'Step inside a lush green forest! Tall trees reach up toward the warm sunshine, broad green leaves catch rainwater, and colorful butterflies flutter from flower to flower. Forests provide fresh, clean air for all animals and humans to breathe.',
    category: 'Our World',
    difficulty: 'Beginner',
    duration: '12 min',
    iconName: 'Sparkles',
    color: 'emerald',
    whyLearnThis: 'Trees are the green lungs of our planet. When trees breathe, they give us fresh oxygen to live!',
    visualExploration: 'Look around the 3D forest! See the tall emergent trees touching the clouds, the thick green canopy where monkeys swing, and the shady forest floor where mushrooms grow.',
    howItWorks: 'Plants use their green leaves to catch sunlight. They drink water from the soil through roots and make food for themselves while cleaning the air.',
    realLifeConnection: 'The wooden table you sit at, the paper in your notebooks, and delicious fruits like bananas and mangoes all come from trees!',
    tryItYourself: 'Go outside and touch the bark of a nearby tree. Feel how rough and sturdy it is — like armor protecting the living tree inside.',
    misconceptions: [
      'Plants are not motionless objects — they turn their leaves towards the Sun and drink water through their roots all day long!'
    ],
    recap: [
      'Trees make fresh oxygen for us to breathe',
      'Forests are homes for birds, monkeys, tigers, and insects',
      'Roots drink water and keep soil tightly in place'
    ],
    challengeQuestion: 'Can you spot which layer of the forest gets the most sunlight in the 3D model?',
    sections: [
      {
        title: 'Parts of a Tree',
        content: 'Roots stay underground to drink water. The sturdy trunk carries water up, and green leaves make sweet plant food from sunlight.',
        icon: 'Sparkles',
        color: 'text-emerald-400'
      },
      {
        title: 'Forest Animals',
        content: 'Parrots nest in high branches, tree frogs cling to wet leaves, and deer graze on fresh grasses near streams.',
        icon: 'Heart',
        color: 'text-amber-400'
      },
      {
        title: 'Fresh Air and Rain',
        content: 'Forests release moisture into the clouds, helping rain clouds form so rivers stay fresh and full.',
        icon: 'Waves',
        color: 'text-cyan-400'
      }
    ],
    conclusion: {
      title: 'Protecting Our Forests',
      content: 'Planting trees and recycling paper helps protect forest homes so wild animals have safe places to live forever.',
      highlight: 'Trees Give Life',
      highlightNote: 'Clean air, cool shade, and homes for wildlife'
    },
    modules: [
      {
        title: 'How Trees Drink',
        desc: 'Follow water from soil roots up to leafy branches.',
        completed: false,
        objectives: ['Understand what roots do', 'See how water travels in trees'],
        interactiveLabel: 'Trace Tree Roots',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'Which part of a plant drinks water from the soil?',
          options: ['Flowers', 'Roots', 'Bark', 'Fruit'],
          correctAnswer: 1
        }
      },
      {
        title: 'Clean Air Makers',
        desc: 'Discover how green leaves give us oxygen.',
        completed: false,
        objectives: ['Learn what oxygen is', 'Appreciate plants as air cleaners'],
        interactiveLabel: 'View Leaf Breathing',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'What do green trees give us to breathe?',
          options: ['Dust', 'Oxygen', 'Smoke', 'Steam'],
          correctAnswer: 1
        }
      },
      {
        title: 'Forest Habitats',
        desc: 'Explore which animals live in treetops vs forest ground.',
        completed: false,
        objectives: ['Identify tree-dwelling animals', 'Understand natural habitats'],
        interactiveLabel: 'Spot Forest Animals',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'Which animal loves to swing between high tree branches?',
          options: ['Goldfish', 'Monkey', 'Whale', 'Penguin'],
          correctAnswer: 1
        }
      }
    ]
  },

  // Class 2 -> Space -> Planets & Solar System
  'Class 2::SolarSystem': {
    classId: 'Class 2',
    subjectId: 'Space',
    topicId: 'SolarSystem',
    gradeLevel: 2,
    ageBand: 'Ages 7–8',
    title: 'Planets and the Solar System',
    subtitle: 'Our Sun and its 8 Planet Family',
    intro: 'Blast off into space! At the center of our solar family is the gigantic, glowing Sun. Eight curious planets dance around it in giant circular tracks called orbits. Earth is the third rock from the Sun — the only planet with liquid oceans and living creatures!',
    category: 'Space',
    difficulty: 'Beginner',
    duration: '12 min',
    iconName: 'Orbit',
    color: 'indigo',
    whyLearnThis: 'Looking up at night stars shows us that our Earth is part of a grand cosmic neighborhood traveling through space!',
    visualExploration: 'Spin the 3D Solar System! Watch tiny Mercury speed around the Sun, spot giant Jupiter with its colorful swirling storms, and admire Saturn wearing its gorgeous glittering rings.',
    howItWorks: 'The Sun has a strong gravitational pull that gently holds all eight planets in their tracks, like a parent holding hands with children on a carousel.',
    realLifeConnection: 'When you see the Moon shining at night, it is actually catching sunlight and reflecting it back to your eyes like a mirror!',
    tryItYourself: 'Have someone stand in the middle as the Sun while you walk in a circle around them as planet Earth!',
    misconceptions: [
      'The Sun is not a planet — it is a gigantic, super-hot star that gives us all our light and warmth!'
    ],
    recap: [
      'The Sun is at the center of our solar system',
      'Eight planets orbit around the Sun',
      'Earth is the third planet, where we all live'
    ],
    challengeQuestion: 'Which planet has bright, beautiful rings made of ice and dust?',
    sections: [
      {
        title: 'The Great Golden Sun',
        content: 'The Sun is so huge that over one million Earths could fit inside it! It sends light across space to keep us warm.',
        icon: 'Sun',
        color: 'text-amber-400'
      },
      {
        title: 'Rocky Little Planets',
        content: 'Mercury, Venus, Earth, and Mars are solid rocky worlds close to the Sun where you could stand on firm ground.',
        icon: 'Orbit',
        color: 'text-blue-400'
      },
      {
        title: 'Gas Giants with Rings',
        content: 'Jupiter and Saturn are gigantic balls of swirling gas. Saturn has shiny rings made of millions of floating ice chunks!',
        icon: 'Sparkles',
        color: 'text-purple-400'
      }
    ],
    conclusion: {
      title: 'Our Cosmic Journey',
      content: 'Earth is riding on a non-stop space voyage around the Sun every single day, keeping us safe and warm.',
      highlight: '8 Planets in Harmony',
      highlightNote: 'Orbiting our glowing Sun'
    },
    modules: [
      {
        title: 'Meet the Sun',
        desc: 'Discover the superstar at the center of our planetary family.',
        completed: false,
        objectives: ['Identify the Sun as a star', 'Understand sunlight and warmth'],
        interactiveLabel: 'Inspect the Sun',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'What is at the center of our Solar System?',
          options: ['The Moon', 'The Sun', 'Earth', 'A black hole'],
          correctAnswer: 1
        }
      },
      {
        title: 'Earth: The Third Planet',
        desc: 'Find Earth in its orbital path.',
        completed: false,
        objectives: ['Locate Earth as third planet', 'Understand why Earth is just right for life'],
        interactiveLabel: 'Find Planet Earth',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'Which planet from the Sun is our Earth?',
          options: ['First', 'Second', 'Third', 'Tenth'],
          correctAnswer: 2
        }
      },
      {
        title: 'Ringed Wonder Saturn',
        desc: 'Explore the most glamorous planet in our solar neighborhood.',
        completed: false,
        objectives: ['Identify Saturn', 'Observe its ice-and-rock rings'],
        interactiveLabel: 'View Saturn Rings',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'What makes Saturn so special and easy to recognize?',
          options: ['It is made of green grass', 'It has magnificent shiny rings', 'It is freezing blue', 'It is tiny like a coin'],
          correctAnswer: 1
        }
      }
    ]
  },

  // Class 2 -> Our Body -> Human Heart
  'Class 2::HumanHeart': {
    classId: 'Class 2',
    subjectId: 'Our Body',
    topicId: 'HumanHeart',
    gradeLevel: 2,
    ageBand: 'Ages 7–8',
    title: 'The Human Heart',
    subtitle: "Your Body's Tireless Super-Pump",
    intro: 'Your heart is a strong muscle about the size of your clenched fist, nestled right inside your chest. It works non-stop day and night, pumping fresh red blood filled with oxygen and energy to every part of your body — from the tip of your nose to your little toes!',
    category: 'Our Body',
    difficulty: 'Beginner',
    duration: '10 min',
    iconName: 'Heart',
    color: 'red',
    whyLearnThis: 'Your heart never takes a nap! Knowing how it works helps you understand why running makes it beat faster and how eating healthy food keeps it happy.',
    visualExploration: 'Watch the 3D heart squeeze and relax in rhythm! Notice the thick muscular walls and the big tubes (arteries and veins) carrying blood in and out like garden hoses.',
    howItWorks: 'When you squeeze a water squirt toy, water shoots out. When you let go, it fills back up. The heart does that exact same squeeze-and-fill rhythm about 80 times every minute!',
    realLifeConnection: 'Next time you run during gym class or chase your friends, put your hand to your chest. Your heart speeds up to pump extra energy to your running leg muscles!',
    tryItYourself: 'Clench your fist tight, then open it. Squeeze, relax, squeeze, relax. That is how your heart pumps every single second without ever stopping!',
    misconceptions: [
      'Your heart is not shaped like a cartoon valentine heart with sharp points — it is shaped like a sturdy pear tilted slightly to the left!'
    ],
    recap: [
      'The heart is a fist-sized muscular pump',
      'It sends oxygen-rich blood to all muscles and organs',
      'Running and playing sports makes our heart beat faster and stronger'
    ],
    challengeQuestion: 'How does your heart change its rhythm when you are fast asleep versus running in a race?',
    sections: [
      {
        title: 'The Squeeze and Fill',
        content: 'When the heart relaxes, it fills with blood. When it squeezes tight, it sends blood traveling through blood vessels like speedy water slides.',
        icon: 'Activity',
        color: 'text-red-400'
      },
      {
        title: 'Feeling Your Pulse',
        content: 'Place two fingers gently on your wrist just below your thumb. Can you feel a steady tap-tap? That is your heart pumping in real time!',
        icon: 'Heart',
        color: 'text-pink-400'
      },
      {
        title: 'Keeping Heart Happy',
        content: 'Running, swimming, dancing, skipping rope, and eating crunchy vegetables keep your heart muscle strong and healthy.',
        icon: 'Sparkles',
        color: 'text-emerald-400'
      }
    ],
    conclusion: {
      title: 'A Hero in Your Chest',
      content: 'Your heart beats around 100,000 times each day! Treat it kindly with exercise, good food, and plenty of laughs.',
      highlight: 'Beat, Beat, Beat',
      highlightNote: 'Pumping life every second'
    },
    modules: [
      {
        title: 'Fist-Sized Wonder',
        desc: 'Discover the size and place of the heart inside your chest.',
        completed: false,
        objectives: ['Learn heart size and location', 'Observe muscular pumping'],
        interactiveLabel: 'Inspect Heart Muscle',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'About how big is your heart?',
          options: ['As big as a car', 'About the size of your clenched fist', 'As tiny as a pea', 'As tall as a tree'],
          correctAnswer: 1
        }
      },
      {
        title: 'Fast and Slow Heartbeats',
        desc: 'Learn why the heart changes speed when you exercise.',
        completed: false,
        objectives: ['Understand pulse changes with activity', 'Connect heart rate to energy needs'],
        interactiveLabel: 'Test Exercise Pulse',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'What happens to your heart when you sprint fast in a playground?',
          options: ['It stops completely', 'It beats faster to supply energy', 'It turns upside down', 'It falls asleep'],
          correctAnswer: 1
        }
      },
      {
        title: 'Heart Healthy Habits',
        desc: 'How to keep your heart pump strong.',
        completed: false,
        objectives: ['Identify heart-healthy foods', 'Encourage physical play'],
        interactiveLabel: 'Review Healthy Habits',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'Which of these is wonderful for keeping your heart strong?',
          options: ['Running and playing outside', 'Sitting still all day', 'Never drinking water', 'Eating only candy'],
          correctAnswer: 0
        }
      }
    ]
  }
};
