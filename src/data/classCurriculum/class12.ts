import { CourseData } from '../../services/contentService';

export const class12Curriculum: Record<string, CourseData> = {
  // Class 12 -> Physics -> Theory of Relativity
  'Class 12::Relativity': {
    classId: 'Class 12',
    subjectId: 'Physics',
    topicId: 'Relativity',
    gradeLevel: 12,
    ageBand: 'Ages 17–18',
    title: 'Special Theory of Relativity',
    subtitle: 'NCERT / Higher Physics: Lorentz Transformations & Spacetime Mechanics',
    intro: 'In 1905, Albert Einstein published "On the Electrodynamics of Moving Bodies," radically revolutionizing our fundamental understanding of space, time, and causality. Overturning Newtonian absolute space and universal time, Einstein demonstrated that measurements of time intervals, spatial lengths, and relativistic mass are relative to the observer’s inertial reference frame, unified by the universal invariant speed of light in vacuum: c = 299,792,458 m/s.',
    category: 'Physics',
    difficulty: 'Advanced',
    duration: '35 min',
    iconName: 'Orbit',
    color: 'purple',
    whyLearnThis: 'Relativity is not mere abstract philosophy — without relativistic time dilation corrections, the GPS navigation chips in every smartphone and airplane would drift by over 11 kilometers of navigational error every single day!',
    visualExploration: 'Manipulate the relative velocity slider (v/c) in the 3D Minkowski spacetime viewer! As speed approaches 0.99c, observe the dramatic dilation of the moving clock (time stretching out), physical length contraction along the direction of motion, and optical relativistic Doppler beaming.',
    howItWorks: 'The theory rests on two foundational postulates: 1) The laws of physics take identical form in all inertial reference frames; 2) The speed of light in vacuum (c) is constant for all observers regardless of the motion of the light source or observer. This necessitates the Lorentz Transformation equations replacing classical Galilean relativity.',
    realLifeConnection: 'Atmospheric Muons: Highly unstable subatomic particles created by cosmic rays in the upper atmosphere have a rest lifetime of only 2.2 microseconds, which should only allow them to travel ~660 meters before decaying. Yet millions reach sea level 10 km below every second! Why? Because at 0.998c, their internal clocks are dilated by factor γ ≈ 15, giving them plenty of time to reach Earth’s surface!',
    tryItYourself: 'Calculate the Lorentz Factor γ at 0.8c: γ = 1 / √(1 - 0.8²) = 1 / √(1 - 0.64) = 1 / √0.36 = 1 / 0.6 = 1.667! At 80% the speed of light, a 1-meter ruler contracts to 60 cm, and 1 second on a moving clock takes 1.67 seconds of observer time!',
    misconceptions: [
      'An observer inside a moving spaceship does NOT feel their time slowing down or their body squishing! In their own rest frame, everything is completely normal; time dilation and length contraction are strictly geometric projections observed between relative moving reference frames.'
    ],
    recap: [
      'Speed of light c is an absolute invariant across all inertial frames',
      'Lorentz factor γ = 1 / √(1 - v²/c²) approaches infinity as v approaches c',
      'Moving clocks tick slower (Time Dilation: Δt = γ·Δt₀)',
      'Objects contract along the direction of motion (Length Contraction: L = L₀/γ)',
      'Mass and energy are interchangeable: E² = (pc)² + (m₀c²)²'
    ],
    challengeQuestion: 'Can an object with non-zero rest mass ever be accelerated to reach or exceed the speed of light in vacuum? Why or why not?',
    sections: [
      {
        title: 'The Two Postulates of STR',
        content: '1) Principle of Relativity: Physical laws are invariant under Lorentz transformations between inertial frames. 2) Constancy of c: Light speed in vacuum is invariant for all observers.',
        icon: 'Orbit',
        color: 'text-purple-400'
      },
      {
        title: 'Time Dilation & the Twin Paradox',
        content: 'Proper time Δt₀ is measured by a clock at rest relative to the events. To an observer seeing the clock move at velocity v, time dilates: Δt = γ·Δt₀. The accelerated twin on a space voyage returns biologically younger.',
        icon: 'Clock',
        color: 'text-indigo-400'
      },
      {
        title: 'Mass-Energy Equivalence: E = mc²',
        content: 'Mass is concentrated, condensed energy. In high-energy particle collisions, rest mass converts to kinetic energy and radiation, and photons can spontaneously materialize into electron-positron pairs.',
        icon: 'Zap',
        color: 'text-cyan-400'
      }
    ],
    math: {
      title: 'Lorentz Transformations & Relativistic Invariants',
      intro: 'The fundamental spacetime transformation and mass-energy relation under Special Relativity are:',
      formula: '\\gamma = \\frac{1}{\\sqrt{1 - \\frac{v^2}{c^2}}} \\quad | \\quad \\Delta t = \\gamma \\Delta t_0 \\quad | \\quad L = \\frac{L_0}{\\gamma} \\quad | \\quad E = \\sqrt{(p c)^2 + (m_0 c^2)^2}',
      variables: [
        { symbol: 'γ', definition: 'Lorentz Factor (always ≥ 1, dimensionless)' },
        { symbol: 'v', definition: 'Relative velocity between inertial reference frames (m/s)' },
        { symbol: 'c', definition: 'Speed of light in vacuum (2.998 × 10⁸ m/s)' },
        { symbol: 'Δt0', definition: 'Proper time interval measured in the co-moving rest frame' },
        { symbol: 'L0', definition: 'Proper length measured in the rest frame of the object' },
        { symbol: 'E', definition: 'Total relativistic energy of the particle (Joules or GeV)' },
        { symbol: 'm0', definition: 'Invariant rest mass of the particle (kg)' },
        { symbol: 'p', definition: 'Relativistic momentum (p = γ·m₀·v)' }
      ],
      minGradeLevel: 12
    },
    conclusion: {
      title: 'Spacetime as a Unified Fabric',
      content: 'Einstein demonstrated that space and time are not independent entities, but interconnected dimensions of a four-dimensional pseudo-Riemannian continuum called Spacetime.',
      highlight: 'E = mc² & γ Factor',
      highlightNote: 'The transformation of modern cosmology and physics'
    },
    modules: [
      {
        title: 'The Lorentz Factor & Time Dilation',
        desc: 'Calculate time dilation and explore the experimental evidence of atmospheric muons.',
        completed: false,
        objectives: ['Calculate γ for speeds from 0.1c to 0.999c', 'Apply Δt = γ·Δt₀ to relativistic particle decays'],
        interactiveLabel: 'Simulate Light Clock',
        interactiveType: 'simulation',
        quiz: {
          question: 'If a spaceship travels at a velocity of v = 0.6c relative to Earth, what is its Lorentz factor γ?',
          options: ['1.0', '1.25', '1.67', '2.0'],
          correctAnswer: 1
        }
      },
      {
        title: 'Length Contraction Mechanics',
        desc: 'Observe the physical spatial contraction of moving rods along their axis of velocity.',
        completed: false,
        objectives: ['Calculate length contraction L = L₀/γ', 'Understand why transverse dimensions remain invariant'],
        interactiveLabel: 'Run Relativistic Rod Sim',
        interactiveType: 'simulation',
        quiz: {
          question: 'In which direction does length contraction occur for a high-speed relativistic vehicle?',
          options: ['In all directions equally (it shrinks in volume)', 'Strictly parallel to the direction of relative motion', 'Strictly perpendicular to motion', 'It expands rather than contracting'],
          correctAnswer: 1
        }
      },
      {
        title: 'Relativistic Energy & Momentum',
        desc: 'Analyze particle collision kinematics at the Large Hadron Collider (LHC).',
        completed: false,
        objectives: ['Calculate rest energy E₀ = m₀c²', 'Apply the energy-momentum invariant E² - (pc)² = (m₀c²)²'],
        interactiveLabel: 'Collide Relativistic Particles',
        interactiveType: 'calculator',
        quiz: {
          question: 'For a massless particle such as a photon (m₀ = 0), what does the general relativistic energy equation reduce to?',
          options: ['E = 0', 'E = p·c', 'E = ½mv²', 'E = m·g·h'],
          correctAnswer: 1
        }
      }
    ]
  },

  // Class 12 -> Engineering -> Neural Networks
  'Class 12::NeuralNetwork': {
    classId: 'Class 12',
    subjectId: 'Engineering',
    topicId: 'NeuralNetwork',
    gradeLevel: 12,
    ageBand: 'Ages 17–18',
    title: 'Artificial Neural Networks & Deep Learning',
    subtitle: 'Matrix Transformations, Activation Functions & Backpropagation',
    intro: 'Inspired by the biological neural architectures of the human cerebral cortex, Artificial Neural Networks (ANNs) form the algorithmic backbone of modern Artificial Intelligence. By mapping non-linear mathematical functions through layers of interconnected artificial neurons, deep networks learn complex representations directly from raw data — powering computer vision, natural language transformers, and autonomous robotics.',
    category: 'Engineering',
    difficulty: 'Advanced',
    duration: '35 min',
    iconName: 'Cpu',
    color: 'orange',
    whyLearnThis: 'Deep learning is driving the Fourth Industrial Revolution: automated medical diagnostics, self-driving vehicles, generative AI models (like Gemini and GPT), and computational genomics.',
    visualExploration: 'Interact with the 3D neural network! Track forward activation signals flowing from input neurons, through weighted synaptical connections into hidden layers, and illuminating the final softmax classification output nodes. Toggle weights to see synapse lines thicken and glow!',
    howItWorks: 'Each neuron computes a linear combination: z = Σ(w_i · x_i) + b (dot product of inputs and weights plus a bias scalar). This sum is passed through a non-linear activation function (like ReLU or Sigmoid) to introduce non-linearity. During training, backpropagation uses the Chain Rule of calculus to compute loss gradients with respect to each weight, updating them via Gradient Descent.',
    realLifeConnection: 'When facial recognition unlocks your phone in 0.2 seconds, a deep convolutional neural network processes your camera pixels through 50+ hidden layers to extract facial embeddings resistant to lighting and angle variations!',
    tryItYourself: 'Calculate a single neuron output: Inputs x = [1, 2], Weights w = [0.5, -0.2], Bias b = 0.1. Linear sum z = (1×0.5) + (2×-0.2) + 0.1 = 0.5 - 0.4 + 0.1 = 0.2. Applying ReLU(0.2) = 0.2!',
    misconceptions: [
      'Neural networks are NOT black-box magic — they are high-dimensional, multivariable calculus optimization systems performing matrix multiplications and partial differential gradient descent!'
    ],
    recap: [
      'Neuron output: a = σ(W·x + b), where σ is an activation function',
      'Activation functions (ReLU, Sigmoid) enable networks to learn non-linear decision boundaries',
      'Loss function (MSE, Cross-Entropy) quantifies the error between prediction and ground truth',
      'Backpropagation applies the multivariate chain rule to calculate ∂L/∂W for gradient descent'
    ],
    challengeQuestion: 'Why does a deep neural network with ONLY linear activation functions (no non-linear σ) collapse into an equivalent single-layer linear model regardless of how many layers you add?',
    sections: [
      {
        title: 'The Perceptron Architecture',
        content: 'Invented by Frank Rosenblatt, the artificial perceptron computes a weighted sum of inputs plus bias, mapped through an activation function: a = f(wᵀx + b).',
        icon: 'Layers',
        color: 'text-orange-400'
      },
      {
        title: 'Activation Functions: Why Non-Linearity Matters',
        content: 'Without non-linear activations like ReLU (max(0, z)) or Sigmoid, stacking multiple hidden layers cannot learn complex curves or classification boundaries (Universal Approximation Theorem).',
        icon: 'Activity',
        color: 'text-amber-400'
      },
      {
        title: 'Backpropagation & Gradient Descent',
        content: 'Weights are updated iteratively in the direction of steepest loss descent: W ← W - η(∂L/∂W), where η is the learning rate and ∂L/∂W is calculated using the calculus chain rule.',
        icon: 'Cpu',
        color: 'text-red-400'
      }
    ],
    math: {
      title: 'Neuron Activation & Gradient Descent Update',
      intro: 'The mathematical operations of forward inference and backward parameter optimization are:',
      formula: 'z = \\sum_{i=1}^n w_i x_i + b \\quad | \\quad a = \\text{ReLU}(z) = \\max(0, z) \\quad | \\quad w_{ij} \\leftarrow w_{ij} - \\eta \\frac{\\partial L}{\\partial w_{ij}}',
      variables: [
        { symbol: 'z', definition: 'Pre-activation linear combination (scalar or vector)' },
        { symbol: 'wi', definition: 'Synaptic connection weights (trainable parameters)' },
        { symbol: 'xi', definition: 'Input features or activation from previous layer' },
        { symbol: 'b', definition: 'Bias offset scalar term' },
        { symbol: 'a', definition: 'Activated post-synaptic output passed to the next layer' },
        { symbol: 'L', definition: 'Objective loss / cost function (e.g., Cross-Entropy Loss)' },
        { symbol: 'η', definition: 'Learning rate hyperparameter (step size in gradient descent)' }
      ],
      minGradeLevel: 12
    },
    conclusion: {
      title: 'The Architecture of Machine Intelligence',
      content: 'By scaling billions of parameters across deep transformer architectures, neural networks achieve emergent reasoning, natural language translation, and protein folding prediction.',
      highlight: 'Backpropagation via Chain Rule',
      highlightNote: 'Optimization across high-dimensional parameter spaces'
    },
    modules: [
      {
        title: 'Forward Propagation Dynamics',
        desc: 'Pass multi-dimensional inputs through hidden matrix weights to compute outputs.',
        completed: false,
        objectives: ['Perform matrix multiplication W·x + b', 'Evaluate Sigmoid vs ReLU activation functions'],
        interactiveLabel: 'Step Forward Propagation',
        interactiveType: 'simulation',
        quiz: {
          question: 'What is the mathematical output of the Rectified Linear Unit (ReLU) activation function for an input of z = -3.5?',
          options: ['-3.5', '0.0', '1.0', '3.5'],
          correctAnswer: 1
        }
      },
      {
        title: 'Loss Functions & Error Surfaces',
        desc: 'Observe the loss surface decrease as weights converge toward global minima.',
        completed: false,
        objectives: ['Calculate Mean Squared Error and Cross-Entropy', 'Identify local minima and saddle points'],
        interactiveLabel: 'Visualize Loss Surface',
        interactiveType: '3d-viewer',
        quiz: {
          question: 'What hyperparameter controls the step size taken along the negative gradient during training weight updates?',
          options: ['Batch size', 'Learning rate (η)', 'Number of hidden layers', 'Momentum cutoff'],
          correctAnswer: 1
        }
      },
      {
        title: 'Backpropagation Chain Rule',
        desc: 'Trace error gradients backwards from output loss to input layer weights.',
        completed: false,
        objectives: ['Apply the calculus chain rule ∂L/∂w = (∂L/∂a)(∂a/∂z)(∂z/∂w)', 'Understand vanishing gradient challenges'],
        interactiveLabel: 'Trace Backprop Gradients',
        interactiveType: 'calculator',
        quiz: {
          question: 'What fundamental mathematical theorem enables backpropagation to efficiently calculate gradients across multi-layer networks?',
          options: ['Pythagorean theorem', 'The Chain Rule of multivariable calculus', 'Euler’s formula', 'The Binomial theorem'],
          correctAnswer: 1
        }
      }
    ]
  }
};
