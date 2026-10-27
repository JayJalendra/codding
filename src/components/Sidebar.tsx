import type { ReactNode } from 'react';
import { 
  LayoutDashboard,
  Atom, Dna, Orbit, Sparkles, Upload, Zap, FlaskConical, 
  Binary, Shapes, Landmark, Wrench, GraduationCap, Library, Heart, Activity, Cpu, Rocket, BookOpenText,
  Search, ChevronRight, Globe, X, Image as ImageIcon, Monitor, Sun, Moon,
  BookOpen
} from 'lucide-react';
import { Topic } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { HyperVisionLogo } from './HyperVisionLogo';
import { useState, useMemo } from 'react';
import { useStore } from '../store/useStore';
import { useShallow } from 'zustand/react/shallow';
import { DEFAULT_THEME, WHITE_THEME } from '../constants/themes';

interface SimItem {
  id: Topic;
  label: string;
  icon: ReactNode;
  status?: 'Completed' | 'In Progress';
  isNew?: boolean;
}

interface SubjectGroup {
  subject: string;
  color: string;
  items: SimItem[];
}

interface ClassGroup {
  className: string;
  emoji: string;
  subjects: SubjectGroup[];
}

const CLASS_HIERARCHY: ClassGroup[] = [
  {
    className: 'Dashboard',
    emoji: '🏠',
    subjects: [
      {
        subject: 'Overview',
        color: 'indigo',
        items: [
          { id: 'Dashboard', label: 'Overview', icon: <LayoutDashboard size={15} /> },
        ]
      }
    ]
  },

  // ── Class 1 ─────────────────────────────────────────────────────────────
  {
    className: 'Class 1',
    emoji: '🌱',
    subjects: [
      {
        subject: 'Our World',
        color: 'emerald',
        items: [
          { id: 'Globe', label: 'Our Earth', icon: <Globe size={15} /> },
        ]
      },
      {
        subject: 'Our Body',
        color: 'red',
        items: [
          { id: 'HumanBody', label: 'Human Body', icon: <Activity size={15} /> },
        ]
      },
      {
        subject: 'Mathematics',
        color: 'blue',
        items: [
          { id: 'Geometry', label: 'Basic Shapes', icon: <Shapes size={15} /> },
        ]
      },
    ]
  },

  // ── Class 2 ─────────────────────────────────────────────────────────────
  {
    className: 'Class 2',
    emoji: '🌿',
    subjects: [
      {
        subject: 'Our World',
        color: 'emerald',
        items: [
          { id: 'Globe', label: 'Our Earth', icon: <Globe size={15} /> },
          { id: 'Rainforest', label: 'Plants & Forests', icon: <Sparkles size={15} />, isNew: true },
        ]
      },
      {
        subject: 'Space',
        color: 'indigo',
        items: [
          { id: 'SolarSystem', label: 'Planets & Solar System', icon: <Orbit size={15} />, isNew: true },
        ]
      },
      {
        subject: 'Our Body',
        color: 'red',
        items: [
          { id: 'HumanBody', label: 'Human Body', icon: <Activity size={15} /> },
          { id: 'HumanHeart', label: 'Human Heart', icon: <Heart size={15} />, isNew: true },
        ]
      },
      {
        subject: 'Mathematics',
        color: 'blue',
        items: [
          { id: 'Geometry', label: 'Shapes & Figures', icon: <Shapes size={15} /> },
        ]
      },
    ]
  },

  // ── Class 3 ─────────────────────────────────────────────────────────────
  {
    className: 'Class 3',
    emoji: '🌍',
    subjects: [
      {
        subject: 'EVS – Environment',
        color: 'emerald',
        items: [
          { id: 'Globe', label: 'Our Earth & Maps', icon: <Globe size={15} /> },
          { id: 'Rainforest', label: 'Forests & Plants', icon: <Sparkles size={15} />, isNew: true },
          { id: 'Desert', label: 'Desert Ecosystem', icon: <Zap size={15} />, isNew: true },
        ]
      },
      {
        subject: 'EVS – Our Body',
        color: 'red',
        items: [
          { id: 'HumanBody', label: 'Our Body', icon: <Activity size={15} /> },
        ]
      },
      {
        subject: 'Mathematics',
        color: 'blue',
        items: [
          { id: 'Geometry', label: 'Shapes & Geometry', icon: <Shapes size={15} /> },
        ]
      },
    ]
  },

  // ── Class 4 ─────────────────────────────────────────────────────────────
  {
    className: 'Class 4',
    emoji: '🔬',
    subjects: [
      {
        subject: 'EVS – Science',
        color: 'cyan',
        items: [
          { id: 'HumanBody', label: 'Human Body Systems', icon: <Activity size={15} /> },
          { id: 'Microscope', label: 'Magnification & Lenses', icon: <Wrench size={15} /> },
        ]
      },
      {
        subject: 'EVS – Earth & Space',
        color: 'sky',
        items: [
          { id: 'Globe', label: 'Earth & Maps', icon: <Globe size={15} /> },
          { id: 'SolarSystem', label: 'Sun, Moon & Planets', icon: <Orbit size={15} /> },
        ]
      },
      {
        subject: 'Mathematics',
        color: 'blue',
        items: [
          { id: 'Geometry', label: 'Solids & Shapes', icon: <Shapes size={15} /> },
          { id: 'Fractals', label: 'Patterns in Nature', icon: <Binary size={15} /> },
        ]
      },
    ]
  },

  // ── Class 5 ─────────────────────────────────────────────────────────────
  {
    className: 'Class 5',
    emoji: '🚀',
    subjects: [
      {
        subject: 'Science – Our Body',
        color: 'red',
        items: [
          { id: 'HumanBody', label: 'Human Body', icon: <Activity size={15} /> },
          { id: 'HumanHeart', label: 'Heart & Circulation', icon: <Heart size={15} />, isNew: true },
        ]
      },
      {
        subject: 'Science – Space',
        color: 'indigo',
        items: [
          { id: 'SolarSystem', label: 'Solar System', icon: <Orbit size={15} /> },
        ]
      },
      {
        subject: 'Science – Earth',
        color: 'emerald',
        items: [
          { id: 'Rainforest', label: 'Tropical Rainforest', icon: <Sparkles size={15} />, isNew: true },
          { id: 'Desert', label: 'Desert Ecosystem', icon: <Zap size={15} />, isNew: true },
          { id: 'Tornado', label: 'Tornado & Weather', icon: <Zap size={15} />, isNew: true },
          { id: 'Volcano', label: 'Volcanoes', icon: <Zap size={15} />, isNew: true },
        ]
      },
      {
        subject: 'History',
        color: 'amber',
        items: [
          { id: 'Pyramid', label: 'Ancient Pyramids', icon: <Landmark size={15} /> },
        ]
      },
      {
        subject: 'Mathematics',
        color: 'blue',
        items: [
          { id: 'Geometry', label: 'Geometry', icon: <Shapes size={15} /> },
        ]
      },
    ]
  },

  // ── Class 6 ─────────────────────────────────────────────────────────────
  {
    className: 'Class 6',
    emoji: '⚗️',
    subjects: [
      {
        subject: 'Science – Matter',
        color: 'cyan',
        items: [
          { id: 'Atom', label: 'Introduction to Atoms', icon: <Atom size={15} /> },
          { id: 'CrystalLattice', label: 'States of Matter', icon: <Sparkles size={15} /> },
        ]
      },
      {
        subject: 'Science – Living World',
        color: 'emerald',
        items: [
          { id: 'Cell', label: 'The Cell', icon: <Dna size={15} />, isNew: true },
          { id: 'AnimalCell', label: 'Animal Cell', icon: <Dna size={15} />, isNew: true },
          { id: 'Microscope', label: 'Microscope Lab', icon: <Wrench size={15} /> },
        ]
      },
      {
        subject: 'Geography',
        color: 'sky',
        items: [
          { id: 'Globe', label: 'Globe & Maps', icon: <Globe size={15} /> },
          { id: 'Rainforest', label: 'Tropical Rainforest', icon: <Globe size={15} />, isNew: true },
          { id: 'Desert', label: 'Desert Regions', icon: <Globe size={15} />, isNew: true },
          { id: 'Tornado', label: 'Weather & Climate', icon: <Zap size={15} />, isNew: true },
          { id: 'Volcano', label: 'Volcanic Activity', icon: <Zap size={15} />, isNew: true },
        ]
      },
      {
        subject: 'History',
        color: 'amber',
        items: [
          { id: 'AncientRome', label: 'Ancient Civilisations', icon: <Landmark size={15} /> },
          { id: 'Pyramid', label: 'Great Pyramid of Giza', icon: <Landmark size={15} /> },
        ]
      },
      {
        subject: 'Mathematics',
        color: 'violet',
        items: [
          { id: 'Geometry', label: 'Basic Geometry', icon: <Shapes size={15} /> },
          { id: 'Fractals', label: 'Patterns & Symmetry', icon: <Binary size={15} /> },
        ]
      },
    ]
  },

  // ── Class 9 ─────────────────────────────────────────────────────────────
  {
    className: 'Class 9',
    emoji: '📗',
    subjects: [
      {
        subject: 'Science',
        color: 'cyan',
        items: [
          { id: 'Atom', label: 'Atomic Structure', icon: <Atom size={15} />, status: 'Completed' },
          { id: 'DNA', label: 'DNA Helix', icon: <Dna size={15} />, status: 'In Progress' },
          { id: 'AnimalCell', label: 'Animal Cell', icon: <Dna size={15} />, isNew: true },
          { id: 'Microscope', label: 'Microscope', icon: <Wrench size={15} /> },
          { id: 'SolarSystem', label: 'Solar System', icon: <Orbit size={15} /> },
        ]
      },
      {
        subject: 'Mathematics',
        color: 'blue',
        items: [
          { id: 'Geometry', label: 'Geometric Solids', icon: <Shapes size={15} /> },
        ]
      },
      {
        subject: 'Social Studies',
        color: 'amber',
        items: [
          { id: 'Globe', label: 'Interactive Globe', icon: <Globe size={15} /> },
          { id: 'AncientRome', label: 'Ancient Rome', icon: <Landmark size={15} /> },
          { id: 'Pyramid', label: 'Great Pyramid', icon: <Landmark size={15} /> },
        ]
      },
    ]
  },
  {
    className: 'Class 10',
    emoji: '📘',
    subjects: [
      {
        subject: 'Physics',
        color: 'sky',
        items: [
          { id: 'Drone', label: 'Drone Technology', icon: <Wrench size={15} /> },
        ]
      },
      {
        subject: 'Chemistry',
        color: 'pink',
        items: [
          { id: 'OrganicChemistry', label: 'Organic Chemistry', icon: <FlaskConical size={15} /> },
          { id: 'CrystalLattice', label: 'Crystal Lattice', icon: <Sparkles size={15} /> },
        ]
      },
      {
        subject: 'Biology',
        color: 'emerald',
        items: [
          { id: 'HumanHeart', label: 'Human Heart', icon: <Heart size={15} />, isNew: true },
          { id: 'HumanBody', label: 'Human Body', icon: <Activity size={15} />, isNew: true },
        ]
      },
      {
        subject: 'Mathematics',
        color: 'violet',
        items: [
          { id: 'Fractals', label: 'Fractal Geometry', icon: <Binary size={15} /> },
        ]
      },
    ]
  },
  {
    className: 'Class 11',
    emoji: '📙',
    subjects: [
      {
        subject: 'Physics',
        color: 'indigo',
        items: [
          { id: 'QuantumPhysics', label: 'Quantum Physics', icon: <Zap size={15} />, isNew: true },
          { id: 'Plasma', label: 'Plasma Physics', icon: <Zap size={15} />, isNew: true },
          { id: 'MillikanOilDrop', label: 'Millikan Oil Drop', icon: <FlaskConical size={15} />, isNew: true },
        ]
      },
      {
        subject: 'Mathematics',
        color: 'blue',
        items: [
          { id: 'Calculus', label: 'Calculus Lab', icon: <Binary size={15} />, isNew: true },
        ]
      },
    ]
  },
  {
    className: 'Class 12',
    emoji: '📕',
    subjects: [
      {
        subject: 'Physics',
        color: 'purple',
        items: [
          { id: 'Relativity', label: 'Theory of Relativity', icon: <Orbit size={15} />, isNew: true },
          { id: 'NuclearReactor', label: 'Nuclear Reactor', icon: <Zap size={15} />, isNew: true },
        ]
      },
      {
        subject: 'Engineering',
        color: 'orange',
        items: [
          { id: 'NeuralNetwork', label: 'Neural Network', icon: <Cpu size={15} />, isNew: true },
          { id: 'AircraftAerodynamics', label: 'Advanced Aerodynamics', icon: <Rocket size={15} />, isNew: true },
          { id: 'FingerprintSensor', label: 'Fingerprint Sensor', icon: <Cpu size={15} />, isNew: true },
          { id: 'Display', label: 'LCD Display', icon: <Monitor size={15} />, isNew: true },
          { id: 'Satellite', label: 'Satellite System', icon: <Orbit size={15} />, isNew: true },
          { id: 'DysonSphere', label: 'Dyson Sphere', icon: <Orbit size={15} />, isNew: true },
          { id: 'Missile', label: 'Missile Technology', icon: <Rocket size={15} />, isNew: true },
        ]
      },
      {
        subject: 'Biology',
        color: 'emerald',
        items: [
          { id: 'Virus', label: 'Coronavirus (SARS-CoV-2)', icon: <Activity size={15} />, isNew: true },
        ]
      },
    ]
  },
  {
    className: 'Tools',
    emoji: '🛠️',
    subjects: [
      {
        subject: 'AI & Creation',
        color: 'fuchsia',
        items: [
          { id: 'ImageTo3D', label: 'Image to 3D', icon: <ImageIcon size={15} />, isNew: true },
          { id: 'AIGenerator', label: 'Hologram Generator', icon: <Sparkles size={15} />, isNew: true },
          { id: 'Custom', label: 'Procedural Generator', icon: <Shapes size={15} /> },
          { id: 'Upload', label: 'Upload Model', icon: <Upload size={15} /> },
        ]
      },
    ]
  },
  {
    className: 'Library',
    emoji: '📚',
    subjects: [
      {
        subject: 'Resources',
        color: 'indigo',
        items: [
          { id: 'Saved', label: 'Saved Holograms', icon: <Library size={15} /> },
          { id: 'NCERTBooks', label: 'NCERT Books', icon: <BookOpenText size={15} />, isNew: true },
        ]
      },
    ]
  },
];

// Color map for subject pill styles
const SUBJECT_COLOR: Record<string, { dot: string; text: string; bg: string }> = {
  cyan:    { dot: 'bg-cyan-400',    text: 'text-cyan-400',    bg: 'bg-cyan-400/10' },
  blue:    { dot: 'bg-blue-400',    text: 'text-blue-400',    bg: 'bg-blue-400/10' },
  amber:   { dot: 'bg-amber-400',   text: 'text-amber-400',   bg: 'bg-amber-400/10' },
  sky:     { dot: 'bg-sky-400',     text: 'text-sky-400',     bg: 'bg-sky-400/10' },
  pink:    { dot: 'bg-pink-400',    text: 'text-pink-400',    bg: 'bg-pink-400/10' },
  emerald: { dot: 'bg-emerald-400', text: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  violet:  { dot: 'bg-violet-400',  text: 'text-violet-400',  bg: 'bg-violet-400/10' },
  indigo:  { dot: 'bg-indigo-400',  text: 'text-indigo-400',  bg: 'bg-indigo-400/10' },
  purple:  { dot: 'bg-purple-400',  text: 'text-purple-400',  bg: 'bg-purple-400/10' },
  orange:  { dot: 'bg-orange-400',  text: 'text-orange-400',  bg: 'bg-orange-400/10' },
  fuchsia: { dot: 'bg-fuchsia-400', text: 'text-fuchsia-400', bg: 'bg-fuchsia-400/10' },
};

export function Sidebar() {
  const {
    activeTopic, setActiveTopic,
    setActiveClass, setActiveSubject,
    setIsCourseOpen,
    setIsUploadOpen,
    setIsHelpOpen,
    setIsLibraryOpen,
    setIsSyllabusOpen,
    setIsTranscriptionOpen,
    isTranscriptionOpen,
    setIsSidebarOpen,
    theme,
    setTheme,
    isMobile
  } = useStore(useShallow(state => ({
    activeTopic: state.activeTopic, setActiveTopic: state.setActiveTopic,
    setActiveClass: state.setActiveClass, setActiveSubject: state.setActiveSubject,
    setIsCourseOpen: state.setIsCourseOpen,
    setIsUploadOpen: state.setIsUploadOpen,
    setIsHelpOpen: state.setIsHelpOpen,
    setIsLibraryOpen: state.setIsLibraryOpen,
    setIsSyllabusOpen: state.setIsSyllabusOpen,
    setIsTranscriptionOpen: state.setIsTranscriptionOpen,
    isTranscriptionOpen: state.isTranscriptionOpen,
    setIsSidebarOpen: state.setIsSidebarOpen,
    theme: state.theme,
    setTheme: state.setTheme,
    isMobile: state.isMobile
  })));

  const isLight = theme.id === 'white';

  const onSelectTopic = (topic: Topic, className?: string, subject?: string) => {
    if ((topic as string) === 'Transcription') {
      setIsTranscriptionOpen(!isTranscriptionOpen);
      if (isMobile) setIsSidebarOpen(false);
      return;
    }
    setActiveTopic(topic);
    if (className && className !== 'Dashboard' && className !== 'Tools' && className !== 'Library') {
      setActiveClass(className);
    }
    if (subject) {
      setActiveSubject(subject);
    }
    setIsCourseOpen(false);
    if (topic === 'Upload') setIsUploadOpen(true);
    if (isMobile) setIsSidebarOpen(false);
  };

  const onOpenLibrary = () => setIsLibraryOpen(true);
  const onOpenSyllabus = () => setIsSyllabusOpen(true);
  const onClose = () => setIsSidebarOpen(false);
  const toggleTheme = () => setTheme(isLight ? DEFAULT_THEME : WHITE_THEME);

  const [searchQuery, setSearchQuery] = useState('');

  // Expanded state: class-level and subject-level
  const [expandedClasses, setExpandedClasses] = useState<Record<string, boolean>>({
    'Dashboard': true,
    'Class 1': false,
    'Class 2': false,
    'Class 3': false,
    'Class 4': false,
    'Class 5': false,
    'Class 6': false,
    'Class 9': false,
    'Class 10': false,
    'Class 11': false,
    'Class 12': false,
    'Tools': false,
    'Library': false,
  });

  const [expandedSubjects, setExpandedSubjects] = useState<Record<string, boolean>>({});

  const toggleClass = (cls: string) => {
    setExpandedClasses(prev => ({ ...prev, [cls]: !prev[cls] }));
  };

  const toggleSubject = (key: string) => {
    setExpandedSubjects(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const subjectKey = (cls: string, sub: string) => `${cls}::${sub}`;

  // Flat search
  const flatItems = useMemo(() => {
    const result: (SimItem & { className: string; subject: string })[] = [];
    CLASS_HIERARCHY.forEach(cls =>
      cls.subjects.forEach(sub =>
        sub.items.forEach(item => result.push({ ...item, className: cls.className, subject: sub.subject }))
      )
    );
    return result;
  }, []);

  const searchResults = useMemo(() => {
    if (!searchQuery) return [];
    return flatItems.filter(item =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, flatItems]);

  const isSearching = searchQuery.length > 0;

  return (
    <>
      {isMobile && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        />
      )}
      <motion.aside 
        initial={isMobile ? { x: -280 } : { x: 0, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={isMobile ? { x: -280 } : { opacity: 0 }}
        transition={{ type: 'spring', damping: 30, stiffness: 250, restDelta: 0.001 }}
        className={`${isMobile ? 'fixed inset-y-0 left-0 z-50 shadow-[40px_0_100px_rgba(0,0,0,0.6)]' : 'relative z-20'} w-64 crystal-glass border-r ${theme.border} flex flex-col h-full transition-colors duration-300`}
      >
        {/* Header */}
        <div className={`p-6 border-b ${theme.border} space-y-4 relative ${isMobile ? 'safe-top safe-left' : ''}`}>
          <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
          <div className="flex items-center justify-between">
            <motion.div whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 400, damping: 10 }} className="flex items-center justify-start">
              <HyperVisionLogo size="sm" />
            </motion.div>
            {isMobile && (
              <button 
                onClick={onClose}
                className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-zinc-400 border border-white/10 transition-all active:scale-90"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Search */}
          <div className="relative group">
            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-indigo-400 transition-all duration-300" />
            <input 
              type="text" 
              placeholder="Search simulations..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-2xl py-3 pl-10 pr-4 text-[11px] font-mono text-zinc-900 dark:text-zinc-200 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all"
            />
          </div>

          {/* Quick buttons */}
          <div className="grid grid-cols-2 gap-2">
            {(['Library', 'Syllabus'] as const).map((btn) => (
              <motion.button 
                key={btn}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={btn === 'Library' ? onOpenLibrary : onOpenSyllabus}
                className="group relative flex flex-col items-center justify-center gap-1.5 p-3 liquid-glass rounded-2xl transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                {btn === 'Library' ? <Library className="text-indigo-400" size={16} /> : <BookOpenText className="text-pink-400" size={16} />}
                <span className={`text-[9px] font-black ${btn === 'Library' ? 'text-indigo-400' : 'text-pink-400'} uppercase tracking-[0.1em]`}>{btn}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar scroll-smooth">

          {/* Search Results */}
          {isSearching && (
            <div className="space-y-1">
              <p className="text-[9px] font-bold text-indigo-400/70 uppercase tracking-[0.3em] px-3 py-1">
                Results ({searchResults.length})
              </p>
              {searchResults.length === 0 && (
                <p className="text-[11px] text-zinc-500 px-3 py-2">No simulations found.</p>
              )}
              {searchResults.map(item => (
                <SimButton
                  key={item.id}
                  item={item}
                  activeTopic={activeTopic}
                  isTranscriptionOpen={isTranscriptionOpen}
                  onSelectTopic={() => onSelectTopic(item.id, item.className, item.subject)}
                />
              ))}
            </div>
          )}

          {/* Class → Subject → Simulations Tree */}
          {!isSearching && CLASS_HIERARCHY.map((cls) => {
            const isDashboard = cls.className === 'Dashboard';

            // Dashboard: render items directly without class/subject nesting
            if (isDashboard) {
              return (
                <div key={cls.className} className="mb-2">
                  {cls.subjects[0].items.map(item => (
                    <SimButton
                      key={item.id}
                      item={item}
                      activeTopic={activeTopic}
                      isTranscriptionOpen={isTranscriptionOpen}
                      onSelectTopic={() => onSelectTopic(item.id, 'Dashboard', 'Overview')}
                    />
                  ))}
                </div>
              );
            }

            const isClassOpen = expandedClasses[cls.className] ?? false;

            return (
              <div key={cls.className} className="mb-1">
                {/* Class Header */}
                <motion.button
                  onClick={() => toggleClass(cls.className)}
                  whileHover={{ x: 2 }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-2xl text-[11px] font-bold transition-all group ${
                    isClassOpen
                      ? 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20'
                      : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-100 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <span className="text-base leading-none">{cls.emoji}</span>
                  <span className="flex-1 text-left tracking-wide">{cls.className}</span>
                  <motion.div
                    animate={{ rotate: isClassOpen ? 90 : 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    <ChevronRight size={12} className="text-zinc-600 group-hover:text-indigo-400 transition-colors" />
                  </motion.div>
                </motion.button>

                {/* Subjects + Simulations */}
                <AnimatePresence initial={false}>
                  {isClassOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: 'spring', damping: 28, stiffness: 220 }}
                      className="overflow-hidden ml-3 mt-1 space-y-1 border-l border-white/5 pl-3"
                    >
                      {cls.subjects.map((sub) => {
                        const sKey = subjectKey(cls.className, sub.subject);
                        const isSubOpen = expandedSubjects[sKey] ?? false;
                        const colors = SUBJECT_COLOR[sub.color] ?? SUBJECT_COLOR['indigo'];

                        // If only 1 subject (like Dashboard-style classes), skip subject header
                        const skipSubjectHeader = cls.subjects.length === 1 && cls.className !== 'Class 9' && cls.className !== 'Class 10';

                        if (skipSubjectHeader) {
                          return (
                            <div key={sub.subject} className="space-y-1">
                              {sub.items.map(item => (
                                <SimButton
                                  key={item.id}
                                  item={item}
                                  activeTopic={activeTopic}
                                  isTranscriptionOpen={isTranscriptionOpen}
                                  onSelectTopic={() => onSelectTopic(item.id, cls.className, sub.subject)}
                                />
                              ))}
                            </div>
                          );
                        }

                        return (
                          <div key={sub.subject}>
                            {/* Subject Header */}
                            <button
                              onClick={() => toggleSubject(sKey)}
                              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-white/5 transition-all group"
                            >
                              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${colors.dot}`} />
                              <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${colors.text} flex-1 text-left`}>
                                {sub.subject}
                              </span>
                              <span className={`text-[9px] ${colors.text} opacity-60`}>{sub.items.length}</span>
                              <motion.div
                                animate={{ rotate: isSubOpen ? 90 : 0 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                              >
                                <ChevronRight size={10} className="text-zinc-600 group-hover:text-zinc-300" />
                              </motion.div>
                            </button>

                            {/* Simulation Items */}
                            <AnimatePresence initial={false}>
                              {isSubOpen && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ type: 'spring', damping: 28, stiffness: 220 }}
                                  className="overflow-hidden space-y-0.5 mt-0.5"
                                >
                                  {sub.items.map(item => (
                                    <SimButton
                                      key={item.id}
                                      item={item}
                                      activeTopic={activeTopic}
                                      isTranscriptionOpen={isTranscriptionOpen}
                                      onSelectTopic={() => onSelectTopic(item.id, cls.className, sub.subject)}
                                    />
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className={`p-4 border-t ${theme.border} crystal-glass space-y-2 relative rounded-t-3xl ${isMobile ? 'safe-bottom safe-left' : ''}`}>
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-200/50 dark:via-white/20 to-transparent" />

          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={toggleTheme}
            className={`w-full flex items-center gap-3 px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${
              isLight
                ? 'bg-zinc-900/10 text-zinc-700 border-zinc-300/40 hover:bg-zinc-900/20'
                : 'bg-amber-500/10 text-amber-300 border-amber-500/20 hover:bg-amber-500/20 hover:border-amber-500/40'
            }`}
          >
            {isLight
              ? <Moon size={14} className="text-zinc-500" />
              : <Sun size={14} className="text-amber-400" />
            }
            {isLight ? 'Switch to Dark' : 'Switch to Light'}
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => useStore.getState().setIsSubscriptionOpen(true)}
            className="w-full flex items-center gap-3 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest bg-gradient-to-r from-indigo-500/10 dark:from-indigo-600/20 to-purple-500/10 dark:to-purple-600/20 text-indigo-700 dark:text-indigo-300 hover:text-indigo-900 dark:hover:text-white border border-indigo-500/20 dark:border-indigo-500/30 hover:border-indigo-500/40 dark:hover:border-indigo-500/50 transition-all"
          >
            <GraduationCap size={14} className="text-indigo-600 dark:text-indigo-400" />
            Upgrade Access
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => useStore.getState().setIsSettingsOpen(true)}
            className="w-full flex items-center gap-3 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 border border-transparent hover:border-zinc-200/60 dark:hover:border-white/20 transition-all"
          >
            <BookOpen size={14} className="text-zinc-400 dark:text-zinc-500" />
            System Setup
          </motion.button>
        </div>
      </motion.aside>
    </>
  );
}

// ── Reusable simulation button ──────────────────────────────────────────────
function SimButton({ item, activeTopic, isTranscriptionOpen, onSelectTopic }: {
  item: SimItem;
  activeTopic: Topic;
  isTranscriptionOpen: boolean;
  onSelectTopic: (t: Topic) => void;
}) {
  const isActive = activeTopic === item.id || (item.id === 'Transcription' && isTranscriptionOpen);
  return (
    <motion.button
      onClick={() => onSelectTopic(item.id)}
      whileHover={!isActive ? { x: 3 } : {}}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[11px] transition-all duration-200 relative group overflow-hidden ${
        isActive
          ? 'text-indigo-900 dark:text-white shadow-sm dark:shadow-lg'
          : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100/50 dark:hover:bg-white/5 border border-transparent hover:border-zinc-200 dark:hover:border-white/10'
      }`}
    >
      {isActive && (
        <motion.div
          layoutId="active-nav-glow"
          className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 dark:from-indigo-600/30 to-purple-500/10 dark:to-purple-600/30 border border-indigo-500/20 dark:border-white/20 rounded-xl shadow-[0_0_15px_rgba(99,102,241,0.1)] dark:shadow-[0_0_20px_rgba(99,102,241,0.3)]"
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      )}

      <span className={`relative z-10 transition-all duration-300 ${
        isActive
          ? 'text-indigo-600 dark:text-indigo-300 scale-110'
          : 'text-zinc-500 dark:text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-200'
      }`}>
        {item.icon}
      </span>

      <span className={`relative z-10 font-semibold tracking-normal flex-1 text-left text-[11px] ${isActive ? 'dark:text-glow' : ''}`}>
        {item.label}
      </span>

      <div className="relative z-10 flex items-center gap-1">
        {item.isNew && !isActive && (
          <span className="text-[8px] font-black text-fuchsia-400 uppercase tracking-wider">New</span>
        )}
        {item.status && !isActive && (
          <span className={`text-[8px] font-bold uppercase tracking-wide ${item.status === 'Completed' ? 'text-emerald-500' : 'text-amber-400'}`}>
            {item.status === 'Completed' ? '✓' : '●'}
          </span>
        )}
        {isActive && (
          <motion.div
            layoutId="active-indicator-dot"
            className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-white shadow-[0_0_10px_rgba(79,70,229,0.5)] dark:shadow-[0_0_15px_rgba(255,255,255,1)]"
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        )}
      </div>
    </motion.button>
  );
}
