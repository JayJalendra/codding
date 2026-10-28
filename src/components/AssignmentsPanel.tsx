import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, FileCheck, Plus, Calendar, Clock, Award, 
  CheckCircle2, AlertCircle, Trash2, Send, BookOpen, User, 
  Sparkles, ExternalLink
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { Assignment, StudentSubmission, Topic } from '../types';

export function AssignmentsPanel() {
  const { 
    isAssignmentsOpen, 
    setIsAssignmentsOpen, 
    assignments, 
    addAssignment, 
    deleteAssignment,
    submissions,
    addSubmission,
    userRole, 
    user,
    activeTopic,
    setActiveTopic,
    activeClass,
    theme 
  } = useStore();

  const isTeacher = userRole === 'teacher' || user?.role === 'teacher';

  const [activeTab, setActiveTab] = useState<'list' | 'create' | 'review'>('list');
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  
  // Create Assignment Form State (Teacher)
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newTopic, setNewTopic] = useState<Topic>(activeTopic || 'SolarSystem');
  const [newClass, setNewClass] = useState(activeClass || '9');
  const [newDueDate, setNewDueDate] = useState('');
  const [newPoints, setNewPoints] = useState(50);

  // Student Submission State
  const [submissionAnswer, setSubmissionAnswer] = useState('');
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  if (!isAssignmentsOpen) return null;

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim()) return;

    const asg: Assignment = {
      id: `asg-${Date.now()}`,
      title: newTitle.trim(),
      description: newDescription.trim(),
      topic: newTopic,
      targetClass: newClass,
      dueDate: newDueDate || '2026-11-15',
      assignedBy: user?.displayName || 'Instructor',
      createdAt: Date.now(),
      totalPoints: newPoints,
      submissionsCount: 0
    };

    addAssignment(asg);
    setNewTitle('');
    setNewDescription('');
    setActiveTab('list');
  };

  const handleStudentSubmit = (assignmentId: string) => {
    if (!submissionAnswer.trim()) {
      alert('Please provide your scientific report or findings before submitting.');
      return;
    }

    const sub: StudentSubmission = {
      id: `sub-${Date.now()}`,
      assignmentId,
      studentUid: user?.uid || 'offline_student',
      studentName: user?.displayName || 'Sandbox Scholar',
      submittedAt: Date.now(),
      answers: { 'response': submissionAnswer.trim() },
      status: 'submitted'
    };

    addSubmission(sub);
    setSubmissionSuccess(true);
    setSubmissionAnswer('');
    setTimeout(() => {
      setSubmissionSuccess(false);
      setSelectedAssignment(null);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-xl animate-fade-in font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-4xl h-[85vh] bg-zinc-950/95 border border-white/10 rounded-[32px] shadow-[0_0_80px_rgba(99,102,241,0.15)] flex flex-col overflow-hidden relative"
      >
        {/* Ambient glow */}
        <div className={`absolute top-0 right-0 w-80 h-80 ${isTeacher ? 'bg-cyan-500/10' : 'bg-indigo-500/10'} rounded-full blur-[100px] pointer-events-none`} />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-2xl ${isTeacher ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' : 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'} border`}>
              <FileCheck size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">
                  {isTeacher ? 'Coursework & Assessment Director' : 'My Curriculum Assignments'}
                </h2>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black uppercase tracking-wider ${
                  isTeacher ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                }`}>
                  {isTeacher ? 'Teacher Mode' : 'Student Scholar'}
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                {isTeacher 
                  ? 'Author 3D lab assignments, distribute deadlines, and review student laboratory submissions.' 
                  : 'Track assigned 3D lab investigations, view deadlines, and submit your experimental reports.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isTeacher && (
              <div className="flex gap-1.5 p-1 bg-white/5 rounded-xl border border-white/10 mr-2">
                <button
                  onClick={() => { setActiveTab('list'); setSelectedAssignment(null); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'list' ? 'bg-cyan-500 text-zinc-950 shadow-sm' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Assignments ({assignments.length})
                </button>
                <button
                  onClick={() => { setActiveTab('create'); setSelectedAssignment(null); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeTab === 'create' ? 'bg-cyan-500 text-zinc-950 shadow-sm' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Plus size={14} /> New Assignment
                </button>
              </div>
            )}
            <button
              onClick={() => setIsAssignmentsOpen(false)}
              className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10 transition-all"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6 relative z-10 custom-scrollbar">
          
          {/* TEACHER CREATE ASSIGNMENT FORM */}
          {isTeacher && activeTab === 'create' && (
            <form onSubmit={handleCreateAssignment} className="max-w-2xl mx-auto space-y-5 animate-fade-in">
              <div className="flex items-center gap-2 pb-3 border-b border-white/10 text-cyan-300">
                <Sparkles size={18} />
                <h3 className="text-sm font-bold uppercase tracking-wider">Publish New 3D Spatial Assignment</h3>
              </div>

              <div>
                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1.5">Assignment Title</label>
                <input
                  required
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Earth Dynamo & Magnetic Field Simulation Lab"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500/50"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1.5">Target Grade</label>
                  <select
                    value={newClass}
                    onChange={(e) => setNewClass(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500/50 font-mono"
                  >
                    {['1', '2', '3', '4', '5', '6', '9', '10', '11', '12'].map(c => (
                      <option key={c} value={c}>Class {c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1.5">Linked 3D Topic</label>
                  <select
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value as Topic)}
                    className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500/50 font-mono"
                  >
                    {['SolarSystem', 'Atom', 'Globe', 'DNA', 'AircraftAerodynamics', 'HumanHeart', 'Geometry'].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1.5">Max Score</label>
                  <input
                    type="number"
                    min="10"
                    max="100"
                    value={newPoints}
                    onChange={(e) => setNewPoints(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1.5">Submission Deadline</label>
                <input
                  type="date"
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1.5">Investigation Instructions & Prompt</label>
                <textarea
                  required
                  rows={4}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Detail the instructions: which simulation controls to adjust, parameters to record, and questions for students to answer..."
                  className="w-full p-4 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500/50 resize-none leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('list')}
                  className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 font-bold text-xs uppercase tracking-wider transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                >
                  Publish & Assign to Class {newClass}
                </button>
              </div>
            </form>
          )}

          {/* ASSIGNMENTS LIST VIEW */}
          {activeTab === 'list' && !selectedAssignment && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                  {isTeacher ? 'Active Classroom Coursework' : `Assigned to Class ${activeClass}`}
                </span>
                <span className="text-xs text-zinc-500">
                  {assignments.length} total assignments found
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {assignments.map(asg => {
                  const studentSub = submissions.find(s => s.assignmentId === asg.id && s.studentUid === (user?.uid || 'offline_student'));
                  return (
                    <div 
                      key={asg.id}
                      className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between gap-4 group"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-white/5 text-zinc-300 border border-white/10">
                            Class {asg.targetClass} • {asg.topic}
                          </span>
                          <span className="text-xs font-mono text-emerald-400 font-bold">
                            {asg.totalPoints} pts
                          </span>
                        </div>

                        <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                          {asg.title}
                        </h4>

                        <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                          {asg.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-500">
                        <div className="flex items-center gap-1.5 font-mono">
                          <Calendar size={13} />
                          <span>Due: {asg.dueDate}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          {isTeacher ? (
                            <>
                              <span className="text-[10px] text-cyan-300 font-mono font-bold bg-cyan-500/10 px-2 py-0.5 rounded">
                                {submissions.filter(s => s.assignmentId === asg.id).length} Submissions
                              </span>
                              <button
                                onClick={() => deleteAssignment(asg.id)}
                                className="p-1.5 rounded-lg text-zinc-500 hover:text-rose-400 transition-colors"
                                title="Delete assignment"
                              >
                                <Trash2 size={14} />
                              </button>
                            </>
                          ) : (
                            studentSub ? (
                              <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                                <CheckCircle2 size={12} /> {studentSub.status === 'graded' ? `Graded (${studentSub.grade}/${asg.totalPoints})` : 'Submitted'}
                              </span>
                            ) : (
                              <button
                                onClick={() => setSelectedAssignment(asg)}
                                className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] uppercase tracking-wider transition-all"
                              >
                                Start Work
                              </button>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STUDENT WORK / SUBMISSION VIEW */}
          {selectedAssignment && !isTeacher && (
            <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    Class {selectedAssignment.targetClass} • {selectedAssignment.topic}
                  </span>
                  <button 
                    onClick={() => setSelectedAssignment(null)}
                    className="text-xs text-zinc-400 hover:text-white"
                  >
                    Back to List
                  </button>
                </div>

                <h3 className="text-lg font-bold text-white tracking-tight">{selectedAssignment.title}</h3>
                <p className="text-xs text-zinc-300 leading-relaxed">{selectedAssignment.description}</p>

                <div className="flex items-center gap-4 pt-2 text-xs text-zinc-400 font-mono">
                  <span>Due: {selectedAssignment.dueDate}</span>
                  <span>Worth: {selectedAssignment.totalPoints} Points</span>
                  <span>Teacher: {selectedAssignment.assignedBy}</span>
                </div>

                <button
                  onClick={() => {
                    setActiveTopic(selectedAssignment.topic);
                    setIsAssignmentsOpen(false);
                  }}
                  className="mt-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-indigo-300 border border-indigo-500/30 text-xs font-bold flex items-center gap-1.5"
                >
                  <ExternalLink size={13} />
                  Open {selectedAssignment.topic} 3D Model Scene
                </button>
              </div>

              {/* Submission Input Box */}
              <div className="space-y-3">
                <label className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider block">
                  Your Lab Findings & Scientific Response
                </label>
                <textarea
                  rows={6}
                  value={submissionAnswer}
                  onChange={(e) => setSubmissionAnswer(e.target.value)}
                  placeholder="Record your observations, mathematical findings, and deductions from interacting with the 3D model..."
                  className="w-full p-4 rounded-2xl bg-black/50 border border-white/10 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/50 resize-none font-sans leading-relaxed"
                />

                {submissionSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                    <CheckCircle2 size={16} />
                    <span>Assignment successfully submitted to instructor!</span>
                  </div>
                )}

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setSelectedAssignment(null)}
                    className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-bold uppercase tracking-wider"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleStudentSubmit(selectedAssignment.id)}
                    className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(99,102,241,0.4)] flex items-center gap-1.5"
                  >
                    <Send size={13} />
                    Submit Laboratory Report
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-black/40 flex items-center justify-between relative z-10 text-xs text-zinc-500">
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <CheckCircle2 size={14} className={isTeacher ? 'text-cyan-400' : 'text-indigo-400'} />
            <span>{isTeacher ? 'Classroom Assessment Registry active.' : 'Personal Student Coursework synchronized.'}</span>
          </div>
          <button
            onClick={() => setIsAssignmentsOpen(false)}
            className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all"
          >
            Close
          </button>
        </div>

      </motion.div>
    </div>
  );
}