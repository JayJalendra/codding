import { useState, useEffect, useMemo } from 'react';
import { X, BookOpen, CheckCircle2, ChevronDown, ChevronUp, Play, Target, HelpCircle, Sparkles, Beaker, Zap, Eye, Calculator, Microscope, Dna, Globe, Atom, Cpu, Activity, Database, Layers, Box, PenTool, Rocket, Shield, Grid, FlaskConical, Scale, Flame, Sigma, Volume2, StopCircle, Magnet, Waves, Lightbulb, Compass, AlertCircle, Award, Sun, Moon, Wind, ArrowDown, Clock } from 'lucide-react';
import { Topic, Theme } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { useHoloAudio } from '../hooks/useHoloAudio';
import { contentService, CourseData, Module } from '../services/contentService';
import { getGradeAwareCourse, getAvailableGradesForTopic, parseGradeLevel } from '../data/classCurriculum';
import { AerodynamicsViewer } from './AerodynamicsViewer';
import { PlasmaViewer } from './PlasmaViewer';
import { useStore } from '../store/useStore';

interface CoursePanelProps {
  activeTopic: Topic;
  onClose: () => void;
  theme: Theme;
}

const iconMap: Record<string, any> = {
  BookOpen, CheckCircle2, ChevronDown, ChevronUp, Play, Target, HelpCircle, Sparkles, Beaker, Zap, Eye, Calculator, Microscope, Dna, Globe, Atom, Cpu, Activity, Database, Layers, Box, PenTool, Rocket, Shield, Grid, FlaskConical, Scale, Flame, Sigma, Volume2, StopCircle, Magnet, Waves, Lightbulb, Compass, AlertCircle, Award, Sun, Moon, Wind, ArrowDown, Clock
};

export function CoursePanel({ activeTopic: propsTopic, onClose: propsClose, theme: propsTheme }: Partial<CoursePanelProps> = {}) {
  const store = useStore();
  const activeTopic = propsTopic || store.activeTopic;
  const activeClass = store.activeClass || 'Class 1';
  const theme = propsTheme || store.theme;
  const onClose = propsClose || (() => store.setIsCourseOpen(false));

  const [viewingClass, setViewingClass] = useState<string>(activeClass);
  useEffect(() => {
    setViewingClass(activeClass);
  }, [activeClass]);

  const [expandedModule, setExpandedModule] = useState<number | null>(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showQuizResult, setShowQuizResult] = useState<Record<number, boolean>>({});
  const [showEnrichmentFormula, setShowEnrichmentFormula] = useState(false);
  const [dynamicCourse, setDynamicCourse] = useState<CourseData | null>(null);

  const localCourse = useMemo(() => getGradeAwareCourse(activeTopic, viewingClass), [activeTopic, viewingClass]);
  const displayCourse = dynamicCourse || localCourse;
  const availableGrades = useMemo(() => getAvailableGradesForTopic(activeTopic), [activeTopic]);
  const [loading, setLoading] = useState(true);
  
  const { stop, init } = useHoloAudio();
  const [playingText, setPlayingText] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    // Use local course data immediately if available
    if (localCourse) {
      setLoading(false);
    }
    
    const fetchCourse = async () => {
      try {
        const course = await contentService.getCourse(activeTopic, viewingClass);
        if (course) {
          setDynamicCourse(course);
        } else {
          setDynamicCourse(null);
        }
      } catch (error) {
        console.error("Failed to fetch course:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [activeTopic, viewingClass]);

  const handleQuizAnswer = (moduleIndex: number, optionIndex: number) => {
    setQuizAnswers(prev => ({ ...prev, [moduleIndex]: optionIndex }));
    setShowQuizResult(prev => ({ ...prev, [moduleIndex]: true }));
  };

  // Generic fallback for other models
  const defaultCourse: CourseData = {
    title: 'Advanced Holographic Studies',
    subtitle: 'Interactive Analysis',
    intro: 'This module provides an interactive exploration of advanced concepts using high-fidelity holographic projections. Analyze the structure, dynamics, and underlying principles of the subject matter.',
    sections: [
      {
        title: "Structural Analysis",
        content: "Examine the component parts and their spatial relationships. The holographic model allows for non-destructive disassembly and internal inspection.",
        icon: "Box",
        color: "text-blue-400"
      },
      {
        title: "Functional Dynamics",
        content: "Observe how the system operates in real-time. Dynamic simulations reveal the interaction between different elements and forces.",
        icon: "Activity",
        color: "text-green-400"
      }
    ],
    math: {
      title: "Core Principles",
      intro: "The system is governed by fundamental laws:",
      formula: "f(x) = Σ ni",
      variables: [
        { symbol: "f(x)", definition: "System function" },
        { symbol: "n", definition: "Component variable" }
      ]
    },
    conclusion: {
      title: "Synthesis",
      content: "By integrating structural knowledge with functional dynamics, we gain a complete understanding of the system's behavior and significance.",
      highlight: "System Integrated",
      highlightNote: "Analysis Complete"
    },
    modules: [
      { 
        title: 'Introduction to Structure', 
        desc: 'Basic principles and visualization.', 
        completed: true,
        objectives: ['Understand basic structural components.', 'Navigate the 3D environment.'],
        interactiveLabel: 'Initialize Visualization',
        quiz: { question: 'What is the primary benefit of 3D visualization?', options: ['Cost', 'Spatial understanding', 'Speed', 'Color'], correctAnswer: 1 }
      }
    ]
  };

  const course: CourseData = displayCourse || defaultCourse;

  // Grade safety and formula gating
  const studentGradeLevel = parseGradeLevel(viewingClass);
  const minFormulaGrade = course.math?.minGradeLevel ?? 9;
  const isFormulaEligible = studentGradeLevel >= minFormulaGrade;
  const canShowFormula = course.math && (isFormulaEligible || showEnrichmentFormula);

  const handlePlayAudio = (text: string) => {
    if (playingText === text) {
      window.speechSynthesis.cancel();
      setPlayingText(null);
      return;
    }

    // Clean text for speech
    const cleanText = text
      .replace(/#+\s/g, '') // Remove headers
      .replace(/\*\*/g, '') // Remove bold
      .replace(/\*/g, '')   // Remove italics
      .replace(/`[^`]*`/g, '') // Remove code blocks
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Handle links
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.name.includes('Google') && v.lang.includes('en')) || 
                           voices.find(v => v.lang.includes('en')) || 
                           voices[0];
    
    if (preferredVoice) utterance.voice = preferredVoice;
    utterance.rate = 1.0;
    
    utterance.onstart = () => setPlayingText(text);
    utterance.onend = () => setPlayingText(null);
    utterance.onerror = () => setPlayingText(null);

    window.speechSynthesis.cancel(); // Stop any pending speech
    window.speechSynthesis.speak(utterance);
    init(); // Initialize audio context if needed
  };
  
  const isLightTheme = theme.id === 'white' || theme.id === 'ios-light';

  if (loading) {
    return (
      <div className={`relative h-full w-full md:w-[600px] ${isLightTheme ? 'bg-white' : 'bg-black/98'} backdrop-blur-md border-l ${theme.border} shadow-2xl flex flex-col items-center justify-center`}>
        <div className={theme.textMuted}>Loading curriculum content for {viewingClass}...</div>
      </div>
    );
  }

  const completedCount = course.modules.filter((m: Module) => m.completed).length;
  const progress = Math.round((completedCount / course.modules.length) * 100);

  return (
    <div className={`relative h-full w-full md:w-[600px] ${isLightTheme ? 'bg-[#F2F2F7]' : 'bg-[#0a0a0a]/95'} backdrop-blur-3xl border-l ${theme.border} shadow-2xl flex flex-col font-sans safe-right`}>
      {/* Header */}
      <div className={`sticky top-0 z-10 ${isLightTheme ? 'bg-white/80' : 'bg-[#0a0a0a]/80'} backdrop-blur-md border-b ${theme.border} pt-5 pb-3 px-6 safe-top shadow-sm`}>
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 ${isLightTheme ? 'bg-indigo-500/10 text-indigo-600' : `bg-${theme.primary}/10 text-${theme.primary}`} rounded-xl border ${isLightTheme ? 'border-indigo-500/20' : `border-${theme.primary}/20`}`}>
              <BookOpen size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {course.classId || viewingClass}
                </span>
                {course.ageBand && (
                  <span className="text-[10px] text-zinc-400 font-medium">{course.ageBand}</span>
                )}
              </div>
              <h2 className={`text-xl font-bold ${isLightTheme ? 'text-zinc-900' : 'text-white'} tracking-tight leading-tight mt-0.5`}>{course.title}</h2>
              <p className={`text-xs ${theme.textMuted} font-medium`}>{course.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onClose} className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold ${isLightTheme ? 'text-zinc-500 hover:text-zinc-900' : 'text-zinc-400 hover:text-white'} hover:bg-black/5 rounded-lg transition-all`}>
              <X size={15} /> Back
            </button>
          </div>
        </div>

        {/* Grade-Level Switcher Pills */}
        {availableGrades.length > 1 && (
          <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
            <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest shrink-0">Grade Level:</span>
            {availableGrades.map((g) => {
              const isCurrent = g.classId === viewingClass;
              return (
                <button
                  key={g.classId}
                  onClick={() => {
                    setViewingClass(g.classId);
                    store.setActiveClass(g.classId);
                    setQuizAnswers({});
                    setShowQuizResult({});
                    setShowEnrichmentFormula(false);
                  }}
                  className={`px-2 py-0.5 rounded-md text-[9px] font-mono font-bold tracking-wide transition-all shrink-0 ${
                    isCurrent
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/40'
                      : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
                  }`}
                  title={`View lesson tailored for ${g.classId}`}
                >
                  {g.classId}
                </button>
              );
            })}
          </div>
        )}
        
        {/* Progress Bar */}
        <div className="w-full bg-white/5 rounded-full h-1 mt-2.5 overflow-hidden">
          <motion.div 
            className={`h-full bg-${theme.primary} rounded-full`}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        <div className="flex justify-between items-center mt-1.5">
          <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Lesson Progress</span>
          <span className={`text-[9px] font-bold text-${theme.primary}`}>{progress}%</span>
        </div>
      </div>

      {/* Content */}
      <div className={`flex-1 overflow-y-auto p-6 ${isLightTheme ? 'text-zinc-700' : 'text-zinc-300'} space-y-6 custom-scrollbar safe-bottom`}>
        
        {/* Intro */}
        <section className="relative">
          <div className={`absolute -inset-4 ${isLightTheme ? 'bg-indigo-500/5' : 'bg-gradient-to-b from-white/5 to-transparent'} rounded-2xl -z-10`} />
          <div className="flex justify-between items-start gap-4">
            <p className={`text-base leading-relaxed ${isLightTheme ? 'text-zinc-800' : 'text-zinc-200'} font-medium`}>
              {course.intro}
            </p>
            <button 
              onClick={() => handlePlayAudio(course.intro)}
              className={`p-2.5 rounded-xl transition-all shrink-0 shadow-lg ${playingText === course.intro ? `bg-${theme.primary} text-white shadow-${theme.primary}/20` : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'}`}
              title={playingText === course.intro ? "Stop Audio" : "Listen to Lesson Intro"}
            >
              {playingText === course.intro ? <StopCircle size={20} /> : <Volume2 size={20} />}
            </button>
          </div>
        </section>

        {/* Why Learn This? */}
        {course.whyLearnThis && (
          <section className="bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-transparent border border-amber-500/20 rounded-2xl p-5 relative overflow-hidden">
            <div className="flex items-center gap-2.5 text-amber-400 mb-2">
              <div className="p-1.5 rounded-lg bg-amber-500/20">
                <Lightbulb size={16} />
              </div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">Why Learn This?</h4>
            </div>
            <p className="text-sm leading-relaxed text-zinc-200 font-medium">{course.whyLearnThis}</p>
          </section>
        )}

        {/* Visual 3D Exploration */}
        {course.visualExploration && (
          <section className="bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-transparent border border-cyan-500/20 rounded-2xl p-5 relative overflow-hidden">
            <div className="flex items-center gap-2.5 text-cyan-400 mb-2">
              <div className="p-1.5 rounded-lg bg-cyan-500/20">
                <Eye size={16} />
              </div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300">Visual 3D Exploration</h4>
            </div>
            <p className="text-sm leading-relaxed text-zinc-200">{course.visualExploration}</p>
          </section>
        )}

        {/* Rich Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {course.sections.map((section, idx) => {
            const IconComponent = typeof section.icon === 'string' ? (iconMap[section.icon] || BookOpen) : section.icon;
            return (
            <div key={idx} className={`${isLightTheme ? 'bg-white border-zinc-200' : 'bg-white/[0.03] border-white/5 hover:border-white/10'} hover:bg-white flex-1 border transition-all duration-300 p-5 rounded-2xl space-y-3 group relative overflow-hidden shadow-sm`}>
              <div className={`absolute top-0 right-0 w-32 h-32 bg-current opacity-[0.03] -mr-10 -mt-10 rounded-full blur-2xl ${section.color}`} />
              <div className="flex justify-between items-start relative z-10">
                <div className={`flex items-center gap-2.5 ${section.color} mb-1`}>
                  <div className="p-1.5 rounded-lg bg-current/10">
                    <IconComponent size={18} />
                  </div>
                  <h3 className={`text-base font-bold ${isLightTheme ? 'text-zinc-900' : 'text-white'} tracking-tight`}>{section.title}</h3>
                </div>
                <button 
                  onClick={() => handlePlayAudio(section.content)}
                  className={`p-1.5 rounded-lg transition-all opacity-0 group-hover:opacity-100 ${playingText === section.content ? `bg-${theme.primary} text-white opacity-100` : 'bg-black/40 text-zinc-400 hover:text-white hover:bg-black/60'}`}
                  title="Read Section"
                >
                  {playingText === section.content ? <StopCircle size={15} /> : <Volume2 size={15} />}
                </button>
              </div>
              <p className="text-xs leading-relaxed text-zinc-400 relative z-10">
                {section.content}
              </p>
            </div>
          )})}
        </div>

        {/* How It Works & Real-Life Connection */}
        {(course.howItWorks || course.realLifeConnection) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {course.howItWorks && (
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2 text-indigo-400">
                  <Zap size={16} />
                  <h5 className="text-xs font-bold uppercase tracking-wider text-indigo-300">How It Works</h5>
                </div>
                <p className="text-xs leading-relaxed text-zinc-300">{course.howItWorks}</p>
              </div>
            )}
            {course.realLifeConnection && (
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Compass size={16} />
                  <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-300">Real-Life Connection</h5>
                </div>
                <p className="text-xs leading-relaxed text-zinc-300">{course.realLifeConnection}</p>
              </div>
            )}
          </div>
        )}

        {/* Try It Yourself */}
        {course.tryItYourself && (
          <section className="bg-gradient-to-r from-purple-500/10 to-indigo-500/5 border border-purple-500/20 rounded-2xl p-5 flex items-start gap-3.5">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 shrink-0">
              <Sparkles size={18} />
            </div>
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-1">Try It Yourself (Activity)</h5>
              <p className="text-xs leading-relaxed text-zinc-200">{course.tryItYourself}</p>
            </div>
          </section>
        )}

        {/* Common Misconceptions */}
        {course.misconceptions && course.misconceptions.length > 0 && (
          <section className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-5 space-y-2.5">
            <div className="flex items-center gap-2 text-rose-400">
              <AlertCircle size={16} />
              <h5 className="text-xs font-bold uppercase tracking-wider text-rose-300">Common Misconception</h5>
            </div>
            <ul className="space-y-1.5 text-xs text-zinc-300">
              {course.misconceptions.map((m, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Math Section (Formula Gating Enforced) */}
        {canShowFormula && course.math && (
          <section className="bg-gradient-to-br from-indigo-500/10 to-purple-500/5 border border-indigo-500/20 p-6 rounded-2xl space-y-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5 text-indigo-400">
                  <div className="p-1.5 rounded-lg bg-indigo-500/20">
                    <Calculator size={18} />
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight">{course.math.title}</h3>
                </div>
                {course.math.minGradeLevel && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    Grade {course.math.minGradeLevel}+
                  </span>
                )}
              </div>
              <div className="space-y-3 text-xs">
                <p className="text-zinc-300 text-sm">{course.math.intro}</p>
                <div className="bg-[#050505] border border-indigo-500/20 p-5 rounded-xl font-mono text-center text-xl text-indigo-300 shadow-inner tracking-wider overflow-x-auto">
                  {course.math.formula}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {course.math.variables.map((v, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 bg-black/20 p-2.5 rounded-lg border border-white/5">
                      <strong className="text-indigo-300 font-mono bg-indigo-500/10 px-1.5 py-0.5 rounded text-xs">{v.symbol}</strong>
                      <span className="text-zinc-400 text-xs leading-relaxed">{v.definition}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Optional Formula Disclosure for Intermediate Students */}
        {!isFormulaEligible && course.math && studentGradeLevel >= 6 && (
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-indigo-300">Advanced Mathematical Formula Available</p>
              <p className="text-[10px] text-zinc-400">Recommended for Grade {minFormulaGrade}+ curriculum</p>
            </div>
            <button
              onClick={() => setShowEnrichmentFormula(!showEnrichmentFormula)}
              className="px-3 py-1.5 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs font-semibold hover:bg-indigo-500/30 transition-all"
            >
              {showEnrichmentFormula ? 'Hide Formula' : 'Preview Formula'}
            </button>
          </div>
        )}

        {/* Quick Recap */}
        {course.recap && course.recap.length > 0 && (
          <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400">
              <CheckCircle2 size={16} />
              <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-300">Quick Recap</h5>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {course.recap.map((point, idx) => (
                <div key={idx} className="flex items-center gap-2.5 bg-black/20 p-2.5 rounded-xl border border-white/5 text-xs text-zinc-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Challenge Question */}
        {course.challengeQuestion && (
          <section className="bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-transparent border border-blue-500/20 rounded-2xl p-4 flex items-start gap-3">
            <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 shrink-0 mt-0.5">
              <HelpCircle size={16} />
            </div>
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-blue-300 mb-0.5">Challenge Question</h5>
              <p className="text-xs leading-relaxed text-zinc-200">{course.challengeQuestion}</p>
            </div>
          </section>
        )}

        {/* Conclusion */}
        {course.conclusion && (
          <section className="space-y-4 bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-white tracking-tight">{course.conclusion.title}</h3>
            <p className="text-sm leading-relaxed text-zinc-300">
              {course.conclusion.content}
            </p>
            <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/5 border border-emerald-500/20 p-4 rounded-xl text-center mt-4">
              <p className="text-emerald-400 font-mono text-lg font-bold tracking-tight">{course.conclusion.highlight}</p>
              <p className="text-xs text-emerald-500/70 mt-1 font-medium uppercase tracking-widest">{course.conclusion.highlightNote}</p>
            </div>
          </section>
        )}

        {/* Interactive Modules List */}
        <div className="pt-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
              <Target size={15} className={`text-${theme.primary}`} />
              Grade-Tailored Interactive Lessons
            </h4>
            <span className={`text-[10px] font-bold bg-${theme.primary}/10 text-${theme.primary} px-2.5 py-0.5 rounded-full border border-${theme.primary}/20`}>
              {course.modules.length} Modules
            </span>
          </div>
          
          <div className="space-y-3">
            {course.modules.map((module: Module, index: number) => {
              const isExpanded = expandedModule === index;
              const hasAnsweredQuiz = showQuizResult[index];
              const isCorrect = quizAnswers[index] === module.quiz.correctAnswer;

              return (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    module.completed 
                      ? `bg-${theme.primary}/[0.03] border-${theme.primary}/30 shadow-[0_0_20px_rgba(var(--${theme.primary}-rgb),0.05)]` 
                      : isExpanded ? 'bg-white/[0.04] border-white/20 shadow-lg' : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/10'
                  }`}
                >
                  {/* Module Header */}
                  <div 
                    onClick={() => setExpandedModule(isExpanded ? null : index)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-[11px] transition-all duration-200 relative group overflow-hidden cursor-pointer ${
                    module.completed 
                      ? 'text-white' 
                      : `${isLightTheme ? 'text-zinc-600 hover:text-zinc-900 border-zinc-200' : 'text-zinc-400 hover:text-zinc-100 border-transparent'} hover:bg-black/5 border`
                  }`}
                >
                    <div className="flex-1">
                      <div className="flex items-center gap-2.5 mb-1">
                        <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-md tracking-wider ${module.completed ? `bg-${theme.primary}/20 text-${theme.primary}` : 'bg-white/10 text-zinc-400'}`}>
                          MOD {(index + 1).toString().padStart(2, '0')}
                        </span>
                        <h5 className={`font-bold text-sm tracking-tight ${module.completed ? `text-${theme.primary}` : 'text-zinc-100'}`}>
                          {module.title}
                        </h5>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed">{module.desc}</p>
                    </div>
                    <div className="flex items-center gap-2.5 shrink-0 ml-3">
                      {module.completed && (
                        <div className={`p-1 rounded-full bg-${theme.primary}/20 text-${theme.primary}`}>
                          <CheckCircle2 size={15} />
                        </div>
                      )}
                      <div className={`p-1 rounded-full transition-colors ${isExpanded ? 'bg-white/10 text-white' : 'bg-transparent text-zinc-500'}`}>
                        {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-white/10 bg-black/40"
                      >
                        <div className="p-5 space-y-5">
                          {/* Objectives */}
                          <div>
                            <h6 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                              <BookOpen size={13} /> Learning Objectives
                            </h6>
                            <ul className="space-y-1.5">
                              {module.objectives.map((obj, i) => (
                                <li key={i} className="text-xs text-zinc-300 flex items-start gap-2.5 bg-white/5 p-2.5 rounded-xl border border-white/5">
                                  <span className={`w-1.5 h-1.5 rounded-full bg-${theme.primary} mt-1.5 shrink-0`} />
                                  <span className="leading-relaxed">{obj}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Interactive Action */}
                          {module.interactiveType === 'simulation' || module.interactiveType === '3d-viewer' || module.interactiveType === 'calculator' ? (
                            <div className="space-y-3">
                              <div className="aspect-video bg-black/40 rounded-xl border border-white/5 overflow-hidden relative group">
                                {activeTopic === 'AircraftAerodynamics' ? (
                                  <AerodynamicsViewer />
                                ) : activeTopic === 'Plasma' ? (
                                  <PlasmaViewer />
                                ) : (
                                  <div className="w-full h-full flex flex-col items-center justify-center space-y-3">
                                    <div className={`p-4 rounded-full bg-${theme.primary}/10 text-${theme.primary} animate-pulse shadow-[0_0_40px_rgba(var(--${theme.primary}-rgb),0.1)]`}>
                                      <Zap size={36} />
                                    </div>
                                    <div className="text-center">
                                      <div className={`text-base font-bold text-${theme.primary} tracking-tight`}>
                                        {module.interactiveLabel}
                                      </div>
                                      <div className="text-[9px] text-zinc-500 uppercase tracking-widest mt-0.5">
                                        Interactive 3D Simulation Active
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          ) : (
                            <button 
                              onClick={() => {
                                if (module.simulationId === 'virtual-lab') {
                                  store.setIsVirtualLabOpen(true);
                                } else if (module.simulationId === 'circuit-builder') {
                                  store.setIsCircuitBuilderOpen(true);
                                } else if (module.simulationId === 'aerodynamics') {
                                  store.setActiveTopic('AircraftAerodynamics');
                                } else if (module.simulationId === 'relativity') {
                                  store.setActiveTopic('Relativity');
                                }
                              }}
                              className={`w-full py-3 rounded-xl bg-gradient-to-r from-${theme.primary}/20 to-transparent hover:from-${theme.primary}/30 border border-${theme.primary}/30 text-${theme.primary} text-xs font-bold transition-all flex items-center justify-center gap-2.5 group shadow-lg relative overflow-hidden`}
                            >
                              <Play size={16} className="group-hover:scale-125 transition-transform" />
                              <span className="relative z-10">{module.interactiveLabel}</span>
                            </button>
                          )}

                          {/* Quiz Section */}
                          <div className="bg-white/[0.03] rounded-xl p-4 border border-white/10 relative overflow-hidden">
                            <div className="relative z-10">
                              <div className="flex items-center gap-2 mb-2">
                                <Target size={13} className="text-zinc-400" />
                                <h6 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Knowledge Check</h6>
                              </div>
                              <p className="text-xs text-zinc-100 mb-3 font-medium leading-relaxed">{module.quiz.question}</p>
                              
                              <div className="space-y-1.5">
                                {module.quiz.options.map((option, optIdx) => (
                                  <button
                                    key={optIdx}
                                    onClick={() => handleQuizAnswer(index, optIdx)}
                                    disabled={hasAnsweredQuiz}
                                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs transition-all duration-200 ${
                                      hasAnsweredQuiz
                                        ? optIdx === module.quiz.correctAnswer
                                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                          : optIdx === quizAnswers[index]
                                            ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                                            : 'bg-white/5 text-zinc-500 opacity-40 border border-transparent'
                                        : 'bg-black/40 hover:bg-white/10 text-zinc-300 border border-white/10 hover:border-white/20'
                                    }`}
                                  >
                                    <div className="flex items-center justify-between">
                                      <span className="font-medium">{option}</span>
                                      {hasAnsweredQuiz && optIdx === module.quiz.correctAnswer && (
                                        <CheckCircle2 size={15} className="text-emerald-400" />
                                      )}
                                    </div>
                                  </button>
                                ))}
                              </div>
                              
                              {hasAnsweredQuiz && (
                                <motion.div 
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className={`mt-3 text-xs font-bold text-center p-2 rounded-lg ${isCorrect ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}
                                >
                                  {isCorrect ? '🎉 Great Job! Concept Mastered.' : 'Keep exploring the 3D model to understand why!'}
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}