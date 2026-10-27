import { CourseData } from '../../services/contentService';

export const class3Curriculum: Record<string, CourseData> = {
  // Class 3 -> EVS – Environment -> Our Earth & Maps
  'Class 3::Globe': {
    classId: 'Class 3',
    subjectId: 'EVS – Environment',
    topicId: 'Globe',
    gradeLevel: 3,
    ageBand: 'Ages 8–9',
    title: 'Our Earth and Maps',
    subtitle: 'Understanding Globes, Hemispheres and the Equator',
    intro: 'A globe is a miniature, three-dimensional model of our planet Earth. Because Earth is round, flat paper maps can stretch or distort lands near the poles. By exploring a globe, we can clearly see the imaginary Equator line cutting across the middle, dividing Earth into the Northern and Southern Hemispheres!',
    category: 'EVS – Environment',
    difficulty: 'Beginner',
    duration: '15 min',
    iconName: 'Globe',
    color: 'emerald',
    whyLearnThis: 'Learning to read a globe and map helps us navigate our world, locate countries, and understand why different countries experience summer and winter at opposite times of the year.',
    visualExploration: 'Spin the 3D globe! Find the imaginary horizontal belt around the middle called the Equator. Everything above the Equator is the Northern Hemisphere, and everything below is the Southern Hemisphere.',
    howItWorks: 'Earth spins around an imaginary rod tilted through its center called the axis. This tilt means that when the Northern Hemisphere leans towards the Sun, it enjoys summer while the Southern Hemisphere leans away and experiences winter.',
    realLifeConnection: 'In India and Europe, people celebrate New Year in cold winter weather, while children in Australia celebrate New Year at the beach in the warm summer sunshine!',
    tryItYourself: 'Locate India or your home country on the globe. Is it north or south of the Equator line?',
    misconceptions: [
      'The Equator and axis lines are not painted on the real Earth — they are helpful imaginary lines drawn by scientists and mapmakers!'
    ],
    recap: [
      'A globe is a round 3D model of Earth',
      'The Equator divides Earth into Northern and Southern Hemispheres',
      'Earth rotates on a tilted axis once every 24 hours'
    ],
    challengeQuestion: 'Why is it very hot all year round near the Equator?',
    sections: [
      {
        title: 'The Equator Belt',
        content: 'The Equator is an imaginary line around the widest middle part of Earth. The Sun shines directly overhead here, making these lands warm and tropical all year.',
        icon: 'Sun',
        color: 'text-amber-400'
      },
      {
        title: 'Northern and Southern Hemispheres',
        content: 'Countries in the north have summer when countries in the south have winter. When Earth travels around the Sun, the tilt shifts which half gets direct sunlight.',
        icon: 'Layers',
        color: 'text-blue-400'
      },
      {
        title: 'Cardinals: North, South, East, West',
        content: 'Maps always point North to the top. When you face North, East is to your right where the Sun rises, and West is to your left where the Sun sets.',
        icon: 'Compass',
        color: 'text-emerald-400'
      }
    ],
    conclusion: {
      title: 'Our Planet in Miniature',
      content: 'A globe is the truest representation of our home. It reveals that borders are human drawings on a shared, spinning globe floating peacefully through space.',
      highlight: 'Equator & Hemispheres',
      highlightNote: 'Mapping our round planet accurately'
    },
    modules: [
      {
        title: 'Finding the Equator',
        desc: 'Discover the imaginary line that splits Earth into two halves.',
        completed: false,
        objectives: ['Identify the Equator', 'Distinguish Northern vs Southern Hemisphere'],
        interactiveLabel: 'Highlight Equator',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'What is the imaginary line dividing Earth into Northern and Southern halves?',
          options: ['The Prime Line', 'The Equator', 'The Tropic Border', 'The Horizon'],
          correctAnswer: 1
        }
      },
      {
        title: 'Opposite Seasons',
        desc: 'Learn why Australia and Europe have opposite seasons.',
        completed: false,
        objectives: ['Connect Earth tilt to seasonal differences', 'Observe sunlight distribution'],
        interactiveLabel: 'Simulate Seasons',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'When it is summer in the Northern Hemisphere, what season is it in the Southern Hemisphere?',
          options: ['Spring', 'Summer too', 'Winter', 'Autumn always'],
          correctAnswer: 2
        }
      },
      {
        title: 'Map Directions',
        desc: 'Master the four main cardinal directions.',
        completed: false,
        objectives: ['Identify North, South, East, West on a globe', 'Understand sunrise and sunset directions'],
        interactiveLabel: 'Test Directions',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'In which cardinal direction does the Sun rise every morning?',
          options: ['North', 'South', 'East', 'West'],
          correctAnswer: 2
        }
      }
    ]
  },

  // Class 3 -> EVS – Environment -> Desert Ecosystem
  'Class 3::Desert': {
    classId: 'Class 3',
    subjectId: 'EVS – Environment',
    topicId: 'Desert',
    gradeLevel: 3,
    ageBand: 'Ages 8–9',
    title: 'The Desert Ecosystem',
    subtitle: 'Surviving in Extreme Dry Lands',
    intro: 'A desert is an arid landscape that receives very little rain throughout the year. Because there are few clouds and little moisture in the air, the desert is baking hot under the blazing midday sun, but cools down dramatically into shivering cold temperatures at night!',
    category: 'EVS – Environment',
    difficulty: 'Beginner',
    duration: '15 min',
    iconName: 'Zap',
    color: 'amber',
    whyLearnThis: 'Desert life teaches us incredible lessons about adaptation, water conservation, and how living creatures thrive in tough climates.',
    visualExploration: 'Pan across the 3D desert! Notice the sweeping sand dunes sculpted by wind gusts, spiky green cacti storing water inside thick stems, and the rare green oasis fed by underground springs.',
    howItWorks: 'Instead of wide leaves that lose water to hot air, desert cacti have sharp spines that protect their stored moisture and provide shade to their fleshy green stems.',
    realLifeConnection: 'Camels can drink up to 40 gallons of water in one sitting and store rich fat inside their humps, allowing them to journey across the desert for weeks without food or water!',
    tryItYourself: 'Dip a wet paper towel in water. Lay one flat under a fan and fold another tightly inside plastic wrap. The folded one stays moist for hours — just like a succulent cactus!',
    misconceptions: [
      'Not all deserts are hot and sandy! Cold deserts like the Gobi Desert or Antarctica are freezing cold and covered in ice and gravel, yet receive very little precipitation.'
    ],
    recap: [
      'Deserts receive less than 25 cm of rain per year',
      'Days are scorching hot while nights can be surprisingly chilly',
      'Camels and cacti have special adaptations to store water'
    ],
    challengeQuestion: 'Why do many desert animals sleep underground during the day and hunt only at night?',
    sections: [
      {
        title: 'The Ship of the Desert',
        content: 'Camels have wide padded feet that do not sink into soft sand, two rows of long eyelashes to block sandstorms, and humps of fat for emergency energy.',
        icon: 'Heart',
        color: 'text-amber-400'
      },
      {
        title: 'Cactus Super-Powers',
        content: 'Cacti have waxy skin to prevent evaporation, sharp spines to deter thirsty animals, and shallow roots that spread far to catch sudden rain showers.',
        icon: 'Sparkles',
        color: 'text-emerald-400'
      },
      {
        title: 'Night Creatures (Nocturnal)',
        content: 'Fennec foxes, desert snakes, and scorpions hide in cool underground burrows by day and emerge under the stars when the air cools down.',
        icon: 'Moon',
        color: 'text-purple-400'
      }
    ],
    conclusion: {
      title: 'Masters of Survival',
      content: 'Desert ecosystems demonstrate the brilliant resilience of nature — life finds a way to flourish even where water is scarce.',
      highlight: 'Water Conservation',
      highlightNote: 'Nature’s ultimate survival specialists'
    },
    modules: [
      {
        title: 'Desert Climates',
        desc: 'Understand why deserts experience extreme heat by day and cold by night.',
        completed: false,
        objectives: ['Define an arid climate', 'Understand why dry air loses heat quickly'],
        interactiveLabel: 'Inspect Desert Terrain',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'Why do deserts get so cold at night compared to daytime?',
          options: ['Because there are no clouds or moisture to trap heat', 'The ground turns into ice', 'The Sun shines backwards', 'Animals blow cold air'],
          correctAnswer: 0
        }
      },
      {
        title: 'Camel Adaptations',
        desc: 'Explore the body features that make camels desert champions.',
        completed: false,
        objectives: ['Identify padded feet and long eyelashes', 'Dispel the water-in-hump myth'],
        interactiveLabel: 'Explore Camel Features',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'What do camels store inside their humps?',
          options: ['Pure drinking water', 'Fat for energy when food is scarce', 'Sand for digging', 'Baby camels'],
          correctAnswer: 1
        }
      },
      {
        title: 'The Secret of Cacti',
        desc: 'See how desert plants survive without frequent rain.',
        completed: false,
        objectives: ['Learn about waxy coatings and spines', 'Understand succulent water storage'],
        interactiveLabel: 'View Cactus Structure',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'Why do cacti have sharp needles instead of broad green leaves?',
          options: ['To look like monsters', 'To prevent water from evaporating into hot air', 'To attract birds', 'To catch insects'],
          correctAnswer: 1
        }
      }
    ]
  }
};
