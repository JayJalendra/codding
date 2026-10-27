import { CourseData } from '../../services/contentService';

export const class5Curriculum: Record<string, CourseData> = {
  // Class 5 -> Science – Earth -> Volcano
  'Class 5::Volcano': {
    classId: 'Class 5',
    subjectId: 'Science – Earth',
    topicId: 'Volcano',
    gradeLevel: 5,
    ageBand: 'Ages 10–11',
    title: 'Volcanoes: Earth’s Fiery Vents',
    subtitle: 'Crust Fissures, Magma Chambers & Eruptions',
    intro: 'Deep beneath the solid ground you walk on, Earth is searing hot! Molten rock called magma is trapped under colossal pressure inside the upper mantle. A volcano is a rupture or vent in Earth’s crust that allows glowing red-hot magma, volcanic ash, and expanding gases to erupt onto the surface.',
    category: 'Science – Earth',
    difficulty: 'Intermediate',
    duration: '18 min',
    iconName: 'Flame',
    color: 'amber',
    whyLearnThis: 'Volcanoes shape our continents and create new land! The Hawaiian Islands, fertile agricultural soils in volcanic valleys, and the very air and water in Earth’s early atmosphere were created by ancient volcanic degassing.',
    visualExploration: 'Slice open the 3D volcano! Observe the underground magma chamber boiling under pressure, the central conduit pipe rising to the summit crater, and glowing orange lava cascades cooling into hard black basalt rock.',
    howItWorks: 'Magma is less dense than the heavy solid rock surrounding it, so it rises toward the surface. When dissolved gases (like water vapor and carbon dioxide) expand rapidly, they blast magma upward like shaking a warm bottle of soda before popping the cap!',
    realLifeConnection: 'Pumice stone — the lightweight, bubbly grey stone you might find in a bathroom or garden — is actually frozen volcanic foam formed when gas-rich lava cooled in mid-air!',
    tryItYourself: 'Mix baking soda and red-colored vinegar inside a small clay mound. The bubbling carbon dioxide gas pushes liquid foam out of the top, demonstrating how gas pressure drives volcanic eruptions!',
    misconceptions: [
      'Magma and lava are not two different materials — molten rock underground is called "magma", but as soon as it erupts onto the surface and touches air, it is called "lava"!'
    ],
    recap: [
      'Magma is molten rock underground; lava is molten rock on the surface',
      'Volcanoes occur mainly along the boundaries of moving tectonic plates',
      'Volcanoes can be active (currently erupting), dormant (sleeping), or extinct (dead)'
    ],
    challengeQuestion: 'Why is volcanic soil near dormant volcanoes often some of the most fertile farming land in the world?',
    sections: [
      {
        title: 'Magma vs Lava',
        content: 'Trapped deep in the mantle at over 1,000°C, molten liquid rock is called magma. When pressure forces it out onto Earth’s surface, it becomes glowing lava.',
        icon: 'Flame',
        color: 'text-amber-400'
      },
      {
        title: 'Anatomy of a Volcano',
        content: 'The Magma Chamber holds the molten reservoir, the Central Vent carries it upward, and the Crater or Caldera is the bowl-shaped mouth at the summit.',
        icon: 'Layers',
        color: 'text-red-400'
      },
      {
        title: 'Active, Dormant, or Extinct?',
        content: 'Active volcanoes erupt regularly. Dormant volcanoes have been quiet for centuries but could wake up. Extinct volcanoes will never erupt again.',
        icon: 'Zap',
        color: 'text-orange-400'
      }
    ],
    conclusion: {
      title: 'Earth’s Natural Recycler',
      content: 'Volcanoes demonstrate that our planet is alive and geologically dynamic, continuously recycling minerals from deep within the mantle to renew Earth’s surface.',
      highlight: '1,500 Active Volcanoes',
      highlightNote: 'Shaping new islands and fertile ground'
    },
    modules: [
      {
        title: 'Inside the Magma Chamber',
        desc: 'Explore the pressure cooker beneath a volcanic cone.',
        completed: false,
        objectives: ['Distinguish magma from lava', 'Identify magma chamber and conduit pipe'],
        interactiveLabel: 'Inspect Volcano Interior',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'What is the correct term for molten rock while it is still trapped beneath Earth’s surface?',
          options: ['Basalt', 'Lava', 'Magma', 'Obsidian'],
          correctAnswer: 2
        }
      },
      {
        title: 'What Causes an Eruption?',
        desc: 'Learn how expanding gas bubbles force liquid rock upward.',
        completed: false,
        objectives: ['Understand gas pressure in eruptions', 'Compare explosive vs gentle lava flows'],
        interactiveLabel: 'Trigger Eruption Sim',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'What drives explosive volcanic eruptions?',
          options: ['Cold seawater freezing', 'Trapped expanding gas bubbles under intense pressure', 'Strong mountain winds', 'Moonlight'],
          correctAnswer: 1
        }
      },
      {
        title: 'The Ring of Fire',
        desc: 'Map the horseshoe chain of volcanoes circling the Pacific Ocean.',
        completed: false,
        objectives: ['Locate the Pacific Ring of Fire', 'Connect plate boundaries to volcanic hotspots'],
        interactiveLabel: 'View Ring of Fire',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'Where are over 75% of the world’s active volcanoes located?',
          options: ['In central Europe', 'Along the Pacific Ring of Fire', 'In the Sahara Desert', 'At the South Pole'],
          correctAnswer: 1
        }
      }
    ]
  },

  // Class 5 -> Science – Earth -> Tornado
  'Class 5::Tornado': {
    classId: 'Class 5',
    subjectId: 'Science – Earth',
    topicId: 'Tornado',
    gradeLevel: 5,
    ageBand: 'Ages 10–11',
    title: 'Tornadoes: Atmospheric Vortexes',
    subtitle: 'Pressure Gradients, Updrafts & Storm Safety',
    intro: 'A tornado is one of nature’s most violent weather events: a rapidly spinning column of air that extends from the base of a dark thunderstorm supercell cloud all the way down to touch the ground. Wind speeds inside intense tornadoes can exceed 300 kilometers per hour!',
    category: 'Science – Earth',
    difficulty: 'Intermediate',
    duration: '18 min',
    iconName: 'Zap',
    color: 'cyan',
    whyLearnThis: 'Understanding how severe weather forms helps meteorologists warn communities hours in advance, saving thousands of lives through early storm shelters and emergency preparedness.',
    visualExploration: 'Spin around the 3D tornado simulation! Notice the rotating funnel cloud touching down, the suction zone at the base kicking up dust debris, and the massive cumulonimbus cloud rotating above it.',
    howItWorks: 'When warm, humid air rising from the south collides with cool, dry air sweeping in from the north at high altitude, winds traveling at different speeds and heights start rolling the air horizontally. A strong thunderstorm updraft tilts this spinning cylinder vertical, creating a roaring vortex!',
    realLifeConnection: 'Have you ever pulled the plug on a full bathtub of water? As water rushes down the drain, it spins into a miniature whirlpool vortex. A tornado is an atmospheric whirlpool of air doing the exact same thing in reverse!',
    tryItYourself: 'Tape two clear plastic bottles together neck-to-neck with a washer between them. Fill one bottle with water, swirl it in a circle, and turn it upside down to see a water tornado vortex!',
    misconceptions: [
      'Opening windows in your house during a tornado will NOT balance the pressure — it actually lets devastating high-speed winds inside! The safest place is always in an interior room or basement with no windows.'
    ],
    recap: [
      'A tornado is a violently rotating air column touching the ground',
      'Formed when warm moist air collides with cool dry air in severe supercells',
      'The Enhanced Fujita (EF) scale measures tornado intensity from EF-0 to EF-5'
    ],
    challengeQuestion: 'Why is the central part of the United States known as "Tornado Alley"?',
    sections: [
      {
        title: 'Collision of Air Masses',
        content: 'Warm, moist air is light and buoyant; cool, dry air is heavy and dense. When they collide violently, massive thunderstorm updrafts are triggered.',
        icon: 'Layers',
        color: 'text-cyan-400'
      },
      {
        title: 'The Rotating Mesocyclone',
        content: 'Wind shear (winds blowing in different directions at different altitudes) starts rotating the storm cloud into a spinning mesocyclone.',
        icon: 'Wind',
        color: 'text-blue-400'
      },
      {
        title: 'The Enhanced Fujita Scale',
        content: 'Meteorologists rate tornadoes from EF-0 (moderate tree damage, 105–137 km/h) to catastrophic EF-5 (winds over 322 km/h that can destroy well-built structures).',
        icon: 'Activity',
        color: 'text-purple-400'
      }
    ],
    conclusion: {
      title: 'Tracking the Storm',
      content: 'Modern Doppler radar satellites detect rotating winds inside clouds before a funnel cloud even drops, giving communities crucial minutes to reach safe shelters.',
      highlight: 'Up to 300+ km/h Winds',
      highlightNote: 'Nature’s most concentrated atmospheric power'
    },
    modules: [
      {
        title: 'Birth of a Vortex',
        desc: 'Trace the collision of contrasting air masses that triggers severe rotation.',
        completed: false,
        objectives: ['Understand wind shear and updrafts', 'Identify the supercell funnel cloud'],
        interactiveLabel: 'Simulate Vortex Formation',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'What collision of air masses typically sparks a tornado in central plains?',
          options: ['Dry cold air colliding with warm moist air', 'Cold air meeting freezing ice', 'Warm air meeting hotter air', 'Sea water meeting river water'],
          correctAnswer: 0
        }
      },
      {
        title: 'The Enhanced Fujita Scale',
        desc: 'Learn how scientists measure the strength of a tornado.',
        completed: false,
        objectives: ['Learn the EF rating system', 'Understand wind damage classification'],
        interactiveLabel: 'Compare EF Ratings',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'What is the highest and most destructive rating on the Enhanced Fujita scale?',
          options: ['EF-1', 'EF-3', 'EF-5', 'EF-10'],
          correctAnswer: 2
        }
      },
      {
        title: 'Severe Storm Safety',
        desc: 'Essential actions to take when a tornado warning sounds.',
        completed: false,
        objectives: ['Identify safe shelters', 'Debunk dangerous tornado myths'],
        interactiveLabel: 'Review Safety Plan',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'Where is the safest place to seek shelter during a tornado warning?',
          options: ['Under a large tree', 'In a basement or interior windowless room', 'In an open car on the highway', 'Next to a big glass window'],
          correctAnswer: 1
        }
      }
    ]
  },

  // Class 5 -> History -> Ancient Pyramids
  'Class 5::Pyramid': {
    classId: 'Class 5',
    subjectId: 'History',
    topicId: 'Pyramid',
    gradeLevel: 5,
    ageBand: 'Ages 10–11',
    title: 'The Great Pyramids of Giza',
    subtitle: 'Ancient Egyptian Engineering & Simple Machines',
    intro: 'Rising proudly from the golden sands of Giza over 4,500 years ago, the Great Pyramid of Khufu is the oldest and only surviving monument of the Seven Wonders of the Ancient World. Built by thousands of skilled Egyptian stone-masons and engineers without modern cranes or iron tools, it stood as the tallest structure on Earth for over 3,800 years!',
    category: 'History',
    difficulty: 'Intermediate',
    duration: '18 min',
    iconName: 'Landmark',
    color: 'amber',
    whyLearnThis: 'The pyramids show us how ancient humans mastered geometry, physics, organization, and simple machines (levers, inclined planes, and rollers) to construct timeless monuments.',
    visualExploration: 'Fly around the 3D Great Pyramid! Examine its four perfectly aligned triangular faces oriented directly to the cardinal directions (North, South, East, West), the limestone core blocks weighing over 2.5 tons each, and the internal ascending passages.',
    howItWorks: 'Ancient workers did not have wheels for heavy hauling. Instead, they placed massive limestone blocks onto heavy wooden sledges and pulled them over wet Nile silt sand, which reduced friction by nearly 50%, before hauling them up earthen ramps!',
    realLifeConnection: 'When modern construction teams move giant prefabricated bridge sections, they use sliding tracks and rollers based on the exact same friction-reducing principles pioneered along the ancient Nile.',
    tryItYourself: 'Try pulling a heavy toy box across dry carpet — it is hard! Now place a smooth plastic tray or wooden dowels underneath. It glides across with a fraction of the effort!',
    misconceptions: [
      'Archaeologists have confirmed that the pyramids were NOT built by enslaved captives, but by a celebrated, well-fed permanent workforce of Egyptian builders, artisans, and seasonal agricultural workers living in an organized village nearby.'
    ],
    recap: [
      'Built around 2560 BCE as royal tombs for pharaohs',
      'Contains over 2.3 million stone blocks averaging 2.5 tons each',
      'Engineers used ramps, sledges, and wet sand friction reduction'
    ],
    challengeQuestion: 'How did ancient Egyptian surveyors align the pyramid base so precisely to true North without modern compasses or GPS?',
    sections: [
      {
        title: 'Monumental Geometry',
        content: 'The Great Pyramid’s square base covers 13 acres with four faces aligned to true north with astounding accuracy — within 1/15th of a single degree!',
        icon: 'Shapes',
        color: 'text-amber-400'
      },
      {
        title: 'Hauling Heavy Stones',
        content: 'Limestone quarried nearby was transported on Nile barges. Workers poured water on the sand in front of wooden sledges to slide 2.5-ton blocks with half the pulling force.',
        icon: 'Wrench',
        color: 'text-orange-400'
      },
      {
        title: 'Internal Chambers',
        content: 'Deep inside lie the Grand Gallery, Queen’s Chamber, and King’s Chamber, protected by massive granite relieving blocks stacked to divert millions of tons of overhead weight.',
        icon: 'Layers',
        color: 'text-yellow-400'
      }
    ],
    conclusion: {
      title: 'Triumph of Human Ingenuity',
      content: 'The Great Pyramid proves that with collective organization, mathematical planning, and simple physics, humanity can create wonders that endure through thousands of years.',
      highlight: '2.3 Million Stones',
      highlightNote: 'A wonder standing for over 4,500 years'
    },
    modules: [
      {
        title: 'Who Built the Pyramids?',
        desc: 'Discover the skilled artisans, engineers, and workers behind Giza.',
        completed: false,
        objectives: ['Learn about pharaonic Egypt and royal tombs', 'Understand the skilled workforce evidence'],
        interactiveLabel: 'Inspect Pyramid Site',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'Why were the Egyptian pyramids originally constructed?',
          options: ['As grain silos', 'As royal tomb monuments for pharaohs', 'As military fortresses', 'As public swimming pools'],
          correctAnswer: 1
        }
      },
      {
        title: 'The Physics of Sledges & Wet Sand',
        desc: 'Explore how friction reduction made moving 2.5-ton stones possible.',
        completed: false,
        objectives: ['Understand friction reduction', 'Examine ancient ramp theories'],
        interactiveLabel: 'Test Sledge Friction',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'What simple trick did Egyptian workers use to reduce friction when pulling heavy sledges across sand?',
          options: ['Pouring water on sand in front of the sledge', 'Greasing the sand with honey', 'Pulling only on rainy days', 'Throwing stones ahead'],
          correctAnswer: 0
        }
      },
      {
        title: 'Internal Granite Chambers',
        desc: 'Look inside the King’s Chamber and relieving arches.',
        completed: false,
        objectives: ['Explore internal passageways', 'Understand compressive load redistribution'],
        interactiveLabel: 'Explore Inside Chambers',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'What special stone from Aswan was used to build the King’s Chamber and its stress-relieving roof?',
          options: ['Soft mud brick', 'Red granite', 'Wood', 'Volcanic pumice'],
          correctAnswer: 1
        }
      }
    ]
  }
};
