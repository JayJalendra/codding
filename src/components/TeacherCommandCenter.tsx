import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, ShieldCheck, Radio, Users, Sparkles, BookOpen, 
  Presentation, Lock, CheckCircle2,
  Share2, Award, Zap, AlertCircle
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { Topic } from '../types';

interface ConnectedStudent {
  id: string;
  name: string;
  avatar: string;
  activeTopic: string;
  focusScore: number;
  status: 'active' | 'idle' | 'question';
}

const MOCK_STUDENTS: ConnectedStudent[] = [
  { id: 'std-1', name: 'Aarav Sharma', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150', activeTopic: 'SolarSystem', focusScore: 94, status: 'active' },
  { id: 'std-2', name: 'Diya Patel', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150', activeTopic: 'EarthDynamics', focusScore: 88, status: 'question' },
  { id: 'std-3', name: 'Rohan Verma', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150', activeTopic: 'Atom', focusScore: 91, status: 'active' },
  { id: 'std-4', name: 'Ananya Iyer', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150', activeTopic: 'AircraftAerodynamics', focusScore: 76, status: 'idle' },
  { id: 'std-5', name: 'Kabir Mehta', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150', activeTopic: 'SolarSystem', focusScore: 98, status: 'active' },
];

export function TeacherCommandCenter() {
  const { 
    setIsTeacherControlOpen, 
    activeTopic, 
    setActiveTopic,
    activeClass,
    setActiveClass,
    isBroadcastingTopic,
    setIsBroadcastingTopic,
    setIsLessonCreatorOpen,
    setIsTeachersDeskOpen,
    setIsTranscriptionOpen,
    isTranscriptionOpen
  } = useStore();

  const [students, setStudents] = useState<ConnectedStudent[]>(MOCK_STUDENTS);
  const [selectedStudent, setSelectedStudent] = useState<ConnectedStudent | null>(null);
  const [announcementText, setAnnouncementText] = useState('');
  const [broadcastSent, setBroadcastSent] = useState(false);
  const [lockSimulationControls, setLockSimulationControls] = useState(false);

  const onClose = () => setIsTeacherControlOpen(false);

  const handleBroadcastCurrentTopic = () => {
    setBroadcastSent(true);
    setTimeout(() => setBroadcastSent(false), 2500);
  };

  const handleSendQuizPrompt = () => {
    alert(`Pushed instant formative quiz for "${activeTopic}" to all ${students.length} synchronized students!`);
  };

  const handleFocusCheck = (studentId: string) => {
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, status: 'active', focusScore: Math.min(100, s.focusScore + 5) } : s));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-xl animate-fade-in font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-5xl h-[90vh] bg-zinc-950/95 border border-cyan-500/30 rounded-[32px] shadow-[0_0_80px_rgba(6,182,212,0.15)] flex flex-col overflow-hidden relative"
      >
        {/* Glow accouterment */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              <ShieldCheck size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">Instructor Control Matrix</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Teacher Clearance Level 4
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Classroom Telemetry, Real-time Sync & Interactive Hologram Director
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10 transition-all"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10 custom-scrollbar">
          
          {/* Left Column: Classroom Telemetry & Direct Student Sync */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Real-time broadcast control card */}
            <div className="bg-white/[0.03] border border-cyan-500/20 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-cyan-300">
                  <Radio size={16} className="animate-pulse" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider">Synchronized Broadcast Station</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[11px] font-bold text-emerald-400 font-mono">{students.length} Learners Connected</span>
                </div>
              </div>

              <div className="bg-black/40 rounded-xl p-4 border border-white/5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold block">Active Hologram Topic</span>
                    <span className="text-sm font-bold text-white font-mono">{activeTopic}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold block">Target Grade Tier</span>
                    <span className="text-sm font-bold text-cyan-300 font-mono">Class {activeClass}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleBroadcastCurrentTopic}
                      className="px-4 py-2 rounded-xl bg-cyan-500 text-zinc-950 font-bold text-xs uppercase tracking-wider hover:bg-cyan-400 transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                    >
                      <Share2 size={14} />
                      {broadcastSent ? 'Broadcast Sent!' : 'Push 3D Model to All'}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs text-zinc-400">
                  <span className="flex items-center gap-2">
                    <Lock size={13} className={lockSimulationControls ? 'text-amber-400' : 'text-zinc-500'} />
                    Lock Student Navigation (Follow Teacher Camera)
                  </span>
                  <button 
                    onClick={() => setLockSimulationControls(!lockSimulationControls)}
                    className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase transition-all ${
                      lockSimulationControls 
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                        : 'bg-white/5 text-zinc-400 hover:text-white border border-white/10'
                    }`}
                  >
                    {lockSimulationControls ? 'Locked' : 'Unlocked'}
                  </button>
                </div>
              </div>

              {/* Instant Quick Actions */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => {
                    onClose();
                    setIsTeachersDeskOpen(true);
                  }}
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all group"
                >
                  <Presentation size={18} className="text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-xs font-bold text-white">Teacher's Desk</div>
                  <div className="text-[10px] text-zinc-400 mt-0.5">Air-draw & AI Diagram Solver</div>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    setIsLessonCreatorOpen(true);
                  }}
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all group"
                >
                  <BookOpen size={18} className="text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-xs font-bold text-white">Lesson Architect</div>
                  <div className="text-[10px] text-zinc-400 mt-0.5">Create custom modules & quizes</div>
                </button>

                <button
                  onClick={() => {
                    setIsTranscriptionOpen(!isTranscriptionOpen);
                  }}
                  className={`p-3 rounded-xl border text-left transition-all group ${
                    isTranscriptionOpen 
                      ? 'bg-indigo-500/20 border-indigo-500/40' 
                      : 'bg-white/5 hover:bg-white/10 border-white/10'
                  }`}
                >
                  <Radio size={18} className="text-indigo-400 mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-xs font-bold text-white">Live Voice Sync</div>
                  <div className="text-[10px] text-zinc-400 mt-0.5">
                    {isTranscriptionOpen ? 'Live Captions Transmitting' : 'Broadcast voice to students'}
                  </div>
                </button>
              </div>
            </div>

            {/* Connected Student Live Telemetry Table */}
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-cyan-400" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-200">
                    Live Student Telemetry & Engagement
                  </h3>
                </div>
                <button 
                  onClick={handleSendQuizPrompt}
                  className="text-[10px] font-bold uppercase px-3 py-1.5 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 transition-all flex items-center gap-1.5"
                >
                  <Zap size={12} />
                  Deploy Instant Poll
                </button>
              </div>

              <div className="space-y-2">
                {students.map(s => (
                  <div 
                    key={s.id}
                    onClick={() => setSelectedStudent(s)}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                      selectedStudent?.id === s.id 
                        ? 'bg-cyan-500/10 border-cyan-500/40' 
                        : 'bg-black/30 border-white/5 hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img src={s.avatar} alt={s.name} className="w-9 h-9 rounded-full object-cover border border-white/10" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{s.name}</span>
                          {s.status === 'question' && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                              <AlertCircle size={10} /> Hand Raised
                            </span>
                          )}
                          {s.status === 'idle' && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                              Inactive
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-zinc-500 font-mono">Viewing: {s.activeTopic}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-xs font-bold text-emerald-400 font-mono">{s.focusScore}%</div>
                        <div className="text-[9px] text-zinc-500 uppercase tracking-widest">Focus Index</div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFocusCheck(s.id);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-bold text-zinc-300 hover:text-white transition-all"
                      >
                        Nudge
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Pedagogical Director & Curriculum Master */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Grade Scaffolding Override */}
            <div className="bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent border border-indigo-500/20 rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-2 text-indigo-300">
                <Award size={16} />
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider">Curriculum Tier Controller</h4>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                As a teacher, you have override clearance to shift the learning depth and mathematical formula visibility across all active student devices simultaneously.
              </p>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Global Class Synchronization</label>
                <div className="grid grid-cols-4 gap-1.5">
                  {['1', '2', '3', '4', '5', '6', '9', '10', '11', '12'].map((cls) => (
                    <button
                      key={cls}
                      onClick={() => setActiveClass(cls)}
                      className={`py-2 rounded-xl text-xs font-bold font-mono transition-all ${
                        activeClass === cls
                          ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)] border border-indigo-400'
                          : 'bg-black/40 text-zinc-400 hover:text-white border border-white/5 hover:bg-white/5'
                      }`}
                    >
                      Class {cls}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Live Announcement Broadcast */}
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 space-y-3">
              <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
                <Sparkles size={14} className="text-cyan-400" />
                HUD Announcement to All Screens
              </h4>
              <textarea
                value={announcementText}
                onChange={(e) => setAnnouncementText(e.target.value)}
                placeholder="Type an announcement to display across every student's 3D viewport (e.g. 'Observe the electron cloud oscillation')..."
                className="w-full h-24 p-3 rounded-xl bg-black/50 border border-white/10 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500/50 resize-none font-sans"
              />
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    if (!announcementText.trim()) return;
                    alert(`Dispatched HUD announcement: "${announcementText}" to all active student screens.`);
                    setAnnouncementText('');
                  }}
                  disabled={!announcementText.trim()}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all"
                >
                  Broadcast HUD Alert
                </button>
              </div>
            </div>

            {/* Selected Student Details Card */}
            {selectedStudent && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-cyan-500/5 border border-cyan-500/30 rounded-2xl p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img src={selectedStudent.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <div className="text-xs font-bold text-white">{selectedStudent.name}</div>
                      <div className="text-[10px] text-zinc-400 font-mono">ID: {selectedStudent.id}</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedStudent(null)}
                    className="text-zinc-500 hover:text-white text-xs"
                  >
                    Close
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 text-center text-xs">
                  <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
                    <div className="text-cyan-300 font-bold font-mono">{selectedStudent.activeTopic}</div>
                    <div className="text-[9px] text-zinc-500 uppercase tracking-widest mt-0.5">Active Topic</div>
                  </div>
                  <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
                    <div className="text-emerald-400 font-bold font-mono">{selectedStudent.focusScore}%</div>
                    <div className="text-[9px] text-zinc-500 uppercase tracking-widest mt-0.5">Engagement</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      setActiveTopic(selectedStudent.activeTopic as Topic);
                      onClose();
                    }}
                    className="flex-1 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/10 transition-all text-center"
                  >
                    View Student Scene
                  </button>
                </div>
              </motion.div>
            )}

          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-black/40 flex items-center justify-between relative z-10 text-xs text-zinc-500">
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <CheckCircle2 size={14} className="text-cyan-400" />
            <span>Instructor Sandbox Active — All modifications remain isolated until published.</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all"
          >
            Close Matrix
          </button>
        </div>

      </motion.div>
    </div>
  );
}