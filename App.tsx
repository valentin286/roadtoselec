import React, { useState, useEffect, useRef } from 'react';
import { CATEGORIES as INITIAL_CATEGORIES, LEAGUES, INITIAL_MISSIONS } from './constants';
import { Category, Topic, AppView, Question, ExamResult, User, Role, StudySession, UserProgress, LeagueTier, Mission, Feedback } from './types';
import { GoogleGenAI } from "@google/genai";
import { Button } from './components/Button';
import { LoadingSpinner } from './components/LoadingSpinner';
import { 
  BookOpen, 
  Brain, 
  CheckCircle, 
  ChevronLeft, 
  ChevronRight,
  GraduationCap, 
  Home, 
  Layout, 
  Menu,
  XCircle,
  Clock,
  Briefcase,
  Plane,
  Puzzle,
  Utensils,
  Newspaper,
  History,
  GitBranch,
  Repeat,
  FileText,
  Mail,
  Link,
  LogOut,
  Users,
  Settings,
  Plus,
  Trash2,
  FolderPlus,
  Edit3,
  Save,
  FileEdit,
  Eye,
  Code,
  Info,
  Moon,
  Sun,
  X,
  ArrowUp,
  ArrowDown,
  BarChart,
  Calendar,
  AlertCircle,
  Lightbulb,
  Bookmark,
  Check,
  Award,
  MoreVertical,
  Layers,
  FileQuestion,
  Search,
  Lock,
  Star,
  Zap,
  Image as ImageIcon,
  Trophy,
  Medal,
  Crown,
  Sparkles,
  Shield,
  Target,
  Flame,
  FlaskConical,
  MessageCircle,
  MessageSquare,
  FolderInput
} from 'lucide-react';

// Initialize AI for Image Generation
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// --- GAMIFICATION HELPERS ---
const calculateLevel = (xp: number) => Math.floor(Math.sqrt(xp / 100)) + 1;
const getLevelProgress = (xp: number) => {
  const level = calculateLevel(xp);
  const currentLevelBaseXP = 100 * Math.pow(level - 1, 2);
  const nextLevelBaseXP = 100 * Math.pow(level, 2);
  return Math.min(100, Math.max(0, ((xp - currentLevelBaseXP) / (nextLevelBaseXP - currentLevelBaseXP)) * 100));
};

const getRank = (percentage: number) => {
  if (percentage === 100) return { name: "LEGEND", emoji: "👑", color: "text-yellow-600 bg-yellow-100 border-yellow-200 dark:bg-yellow-900/40 dark:border-yellow-700 dark:text-yellow-400", icon: Crown };
  if (percentage >= 90) return { name: "ELITE", emoji: "💎", color: "text-cyan-600 bg-cyan-100 border-cyan-200 dark:bg-cyan-900/40 dark:border-cyan-700 dark:text-cyan-400", icon: Award };
  if (percentage >= 70) return { name: "VETERAN", emoji: "⚔️", color: "text-indigo-600 bg-indigo-100 border-indigo-200 dark:bg-indigo-900/40 dark:border-indigo-700 dark:text-indigo-400", icon: Medal };
  if (percentage >= 50) return { name: "SCOUT", emoji: "🧭", color: "text-emerald-600 bg-emerald-100 border-emerald-200 dark:bg-emerald-900/40 dark:border-emerald-700 dark:text-emerald-400", icon: Brain };
  return { name: "ROOKIE", emoji: "🥚", color: "text-slate-500 bg-slate-100 border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400", icon: BookOpen };
};

// Title based on Level (XP Purpose)
const getUserTitle = (level: number) => {
  if (level >= 50) return "Grandmaster of English";
  if (level >= 20) return "Language Archmage";
  if (level >= 10) return "Grammar Knight";
  if (level >= 5) return "Sentence Builder";
  return "Novice Learner";
};

// Icon mapping helper
const getIcon = (iconName: string) => {
  const icons: Record<string, React.ReactNode> = {
    Clock: <Clock className="w-5 h-5" />,
    History: <History className="w-5 h-5" />,
    GitBranch: <GitBranch className="w-5 h-5" />,
    Repeat: <Repeat className="w-5 h-5" />,
    Plane: <Plane className="w-5 h-5" />,
    Briefcase: <Briefcase className="w-5 h-5" />,
    Puzzle: <Puzzle className="w-5 h-5" />,
    Utensils: <Utensils className="w-5 h-5" />,
    Newspaper: <Newspaper className="w-5 h-5" />,
    BookOpen: <BookOpen className="w-5 h-5" />,
    FileText: <FileText className="w-5 h-5" />,
    Mail: <Mail className="w-5 h-5" />,
    Link: <Link className="w-5 h-5" />,
    Shield: <Shield className="w-5 h-5" />,
    Crown: <Crown className="w-5 h-5" />,
    Zap: <Zap className="w-5 h-5" />,
    Target: <Target className="w-5 h-5" />,
    Calendar: <Calendar className="w-5 h-5" />,
  };
  return icons[iconName] || <BookOpen className="w-5 h-5" />;
};

const INITIAL_USERS: User[] = [
  { id: '1', name: 'Profesor Admin', username: 'admin', role: 'admin', xp: 500, league: 'Gold', impactScore: 100, streakDays: 10, lastActivityDate: '2023-10-27' },
  { id: '2', name: 'Estudiante Demo', username: 'student', role: 'student', xp: 120, league: 'Bronze', impactScore: 10, streakDays: 2, lastActivityDate: '2023-10-27' },
  { id: '3', name: 'Alex Johnson', username: 'alexj', role: 'student', xp: 2150, league: 'Gold', impactScore: 45, streakDays: 15, lastActivityDate: '2023-10-27' },
  { id: '4', name: 'Sarah Lee', username: 'sarah', role: 'student', xp: 800, league: 'Silver', impactScore: 20, streakDays: 5, lastActivityDate: '2023-10-26' },
  { id: '5', name: 'Mike Brown', username: 'mike', role: 'student', xp: 3500, league: 'Platinum', impactScore: 120, streakDays: 30, lastActivityDate: '2023-10-27' },
];

// Helper: Normalize Text for flexible matching
const normalizeAnswer = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/’/g, "'") // Normalize apostrophes
    .replace(/won't/g, 'will not')
    .replace(/can't/g, 'can not')
    .replace(/shan't/g, 'shall not')
    .replace(/n't/g, ' not')
    .replace(/'re/g, ' are')
    .replace(/'m/g, ' am')
    .replace(/'ll/g, ' will')
    .replace(/'ve/g, ' have')
    .replace(/'d/g, ' would') 
    .replace(/[.,!?;]/g, '') 
    .replace(/\s+/g, ' '); 
};

// --- ADVANCED MARKDOWN RENDERER ---
const renderInlineText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 px-1 rounded">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return <em key={i} className="italic text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700/50 px-1 rounded">{part.slice(1, -1)}</em>;
    }
    return part;
  });
};

const renderMarkdown = (text: string, comicConfig?: { onGenerate: () => void, isGenerating: boolean, imageUrl: string | null }) => {
  if (!text) return null;
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let currentCardBuffer: React.ReactNode[] = [];
  let cardTitle = "";

  const flushCard = () => {
    if (currentCardBuffer.length > 0 || cardTitle) {
      elements.push(
        <div key={`card-${elements.length}`} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border-l-4 border-blue-500 p-6 mb-6 transition-transform hover:scale-[1.01] duration-300">
          {cardTitle && <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2"><Bookmark className="w-5 h-5 text-blue-500"/> {cardTitle}</h3>}
          <div className="space-y-3">{currentCardBuffer}</div>
        </div>
      );
      currentCardBuffer = [];
      cardTitle = "";
    }
  };

  lines.forEach((line, i) => {
    const trimmed = line.trim();
    if (trimmed === '') return;

    if (line.includes('<!-- COMIC_PLACEHOLDER -->')) {
      if (comicConfig) {
        flushCard();
        elements.push(
          <div key={`comic-${i}`} className="my-8 bg-slate-50 dark:bg-slate-900 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 text-center transition-all">
            {comicConfig.imageUrl ? (
               <div className="rounded-lg overflow-hidden shadow-xl animate-in fade-in zoom-in">
                  <img src={comicConfig.imageUrl} alt="AI Generated Comic" className="w-full h-auto" />
               </div>
            ) : (
               <div className="flex flex-col items-center">
                  <ImageIcon className="w-12 h-12 text-slate-400 mb-3" />
                  <p className="text-slate-500 mb-4">Visualiza el concepto con una viñeta generada por IA</p>
                  <Button onClick={comicConfig.onGenerate} disabled={comicConfig.isGenerating} className="flex gap-2">
                    {comicConfig.isGenerating ? <LoadingSpinner message="Creando..." /> : <><Sparkles className="w-4 h-4"/> Generar Comic IA</>}
                  </Button>
               </div>
            )}
          </div>
        );
      }
      return;
    }

    if (line.startsWith('# ')) {
      flushCard();
      elements.push(<h1 key={i} className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">{line.replace('# ', '')}</h1>);
    } 
    else if (line.startsWith('## ')) {
      flushCard();
      cardTitle = line.replace('## ', '');
    }
    else if (line.startsWith('### ')) {
      currentCardBuffer.push(<h4 key={i} className="text-lg font-bold mt-4 text-slate-700 dark:text-slate-200">{line.replace('### ', '')}</h4>);
    }
    else if (line.startsWith('![')) {
      const match = line.match(/!\[(.*?)\]\((.*?)\)/);
      if (match) {
        currentCardBuffer.push(
          <div key={i} className="my-6 rounded-xl overflow-hidden shadow-2xl border-4 border-slate-800 dark:border-slate-700 transform hover:scale-[1.02] transition-transform duration-500">
            <img src={match[2]} alt={match[1]} className="w-full h-auto object-cover" />
            {match[1] && <div className="bg-slate-900/80 text-white text-xs p-2 text-center w-full backdrop-blur-sm">{match[1]}</div>}
          </div>
        );
      }
    }
    else if (line.startsWith('- ') || line.startsWith('* ')) {
      currentCardBuffer.push(
        <li key={i} className="ml-4 list-none relative pl-6 text-slate-700 dark:text-slate-300 py-1">
          <span className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-teal-500"></span>
          {renderInlineText(line.replace(/^[-*] /, ''))}
        </li>
      );
    }
    else if (line.startsWith('> ')) {
      currentCardBuffer.push(
        <div key={i} className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/50 rounded-lg p-4 my-4 flex gap-3">
          <Lightbulb className="w-6 h-6 text-amber-500 shrink-0 mt-1" />
          <div className="text-slate-700 dark:text-slate-300 italic text-sm leading-relaxed">
            {renderInlineText(line.replace('> ', ''))}
          </div>
        </div>
      );
    }
    else {
      currentCardBuffer.push(<p key={i} className="text-slate-600 dark:text-slate-300 leading-relaxed">{renderInlineText(line)}</p>);
    }
  });

  flushCard(); 
  return <div className="space-y-2">{elements}</div>;
};

const LoginView = ({ onLogin }: { onLogin: (username: string) => void }) => {
  const [input, setInput] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900 p-4 transition-colors">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg max-w-md w-full border border-slate-200 dark:border-slate-700">
        <div className="flex justify-center mb-6">
          <div className="relative bg-gradient-to-br from-blue-600 to-violet-600 p-4 rounded-2xl shadow-xl shadow-blue-500/30">
            <FlaskConical className="text-white w-12 h-12" />
            <div className="absolute -top-3 -right-3 bg-white dark:bg-slate-800 rounded-full p-1.5 border-4 border-slate-100 dark:border-slate-900 shadow-sm">
                <MessageCircle className="w-6 h-6 text-violet-600 dark:text-violet-400" />
            </div>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center text-slate-800 dark:text-white mb-2">Valen's English Lab</h1>
        <p className="text-slate-500 dark:text-slate-400 text-center mb-8">Accede para continuar aprendiendo</p>
        
        <form onSubmit={(e) => { e.preventDefault(); onLogin(input); }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Usuario</label>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='Ej: admin, student'
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            />
          </div>
          <Button type="submit" fullWidth>Entrar</Button>
        </form>
        <div className="mt-4 text-xs text-center text-slate-400 dark:text-slate-500">
          <p>Admin: admin</p>
          <p>User: student</p>
        </div>
      </div>
    </div>
  );
};

const ContentEditor = ({ 
  topic, 
  onSave, 
  onCancel 
}: { 
  topic: Topic; 
  onSave: (updatedTopic: Topic) => void; 
  onCancel: () => void 
}) => {
  const [activeTab, setActiveTab] = useState<'theory' | 'questions'>('theory');
  const [theory, setTheory] = useState(topic.manualTheory || '');
  const [questions, setQuestions] = useState<Question[]>(topic.manualQuestions || []);
  const [showPreview, setShowPreview] = useState(false);
  const [qText, setQText] = useState('');
  const [qOptions, setQOptions] = useState(['', '', '', '']);
  const [qCorrect, setQCorrect] = useState(0); 
  const [qExplanation, setQExplanation] = useState('');

  const handleSave = () => {
    onSave({
      ...topic,
      manualTheory: theory.trim() !== '' ? theory : undefined,
      manualQuestions: questions.length > 0 ? questions : undefined
    });
  };

  const addQuestion = () => {
    if (!qText || qOptions.some(o => !o)) return alert("Completa todos los campos");
    const newQ: Question = {
      id: Date.now().toString(),
      text: qText,
      options: [...qOptions],
      correctAnswer: qOptions[qCorrect],
      explanation: qExplanation || 'Respuesta correcta.'
    };
    setQuestions([...questions, newQ]);
    setQText('');
    setQOptions(['', '', '', '']);
    setQCorrect(0);
    setQExplanation('');
  };

  const deleteQuestion = (idx: number) => {
    setQuestions(questions.filter((_, i) => i !== idx));
  };

  const updateOption = (idx: number, val: string) => {
    const newOpts = [...qOptions];
    newOpts[idx] = val;
    setQOptions(newOpts);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Editando: {topic.title}</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>Cancelar</Button>
          <Button onClick={handleSave}><Save className="w-4 h-4 mr-2 inline" /> Guardar Cambios</Button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="flex border-b border-slate-200 dark:border-slate-700">
          <button onClick={() => setActiveTab('theory')} className={`flex-1 py-3 text-sm font-medium ${activeTab === 'theory' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-500' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>Teoría (Markdown)</button>
          <button onClick={() => setActiveTab('questions')} className={`flex-1 py-3 text-sm font-medium ${activeTab === 'questions' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-500' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>Preguntas ({questions.length})</button>
        </div>

        <div className="p-6">
          {activeTab === 'theory' ? (
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center mb-4">
                 <p className="text-sm text-slate-500 dark:text-slate-400">{showPreview ? "Vista previa" : "Escribe la teoría usando Markdown"}</p>
                 <button onClick={() => setShowPreview(!showPreview)} className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-3 py-1.5 rounded-lg transition-colors">
                   {showPreview ? <><Code className="w-4 h-4" /> Editar</> : <><Eye className="w-4 h-4" /> Previsualizar</>}
                 </button>
              </div>
              {showPreview ? <div className="w-full min-h-[24rem] p-6 border rounded-lg bg-slate-50 dark:bg-slate-900 max-w-none overflow-y-auto">{renderMarkdown(theory)}</div> : <textarea className="w-full h-96 p-4 border rounded-lg font-mono text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white" value={theory} onChange={(e) => setTheory(e.target.value)} placeholder="# Título..." />}
            </div>
          ) : (
             <div className="space-y-8">
               <div className="space-y-4">
                 {questions.map((q, idx) => (
                   <div key={q.id} className="p-4 border rounded-lg flex justify-between items-start">
                     <div><p className="font-medium text-slate-800 dark:text-slate-200">{idx + 1}. {q.text}</p><p className="text-sm text-green-600 dark:text-green-400 mt-1">Correcta: {q.correctAnswer}</p></div>
                     <button onClick={() => deleteQuestion(idx)} className="text-red-500"><Trash2 className="w-4 h-4" /></button>
                   </div>
                 ))}
                 {questions.length === 0 && <p className="text-slate-400 italic">No hay preguntas creadas.</p>}
               </div>
               <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-100 dark:border-blue-800">
                <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-4">Añadir Nueva Pregunta</h4>
                <div className="space-y-3">
                  <input className="w-full p-2 border rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white" placeholder="Enunciado" value={qText} onChange={e => setQText(e.target.value)}/>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {qOptions.map((opt, i) => (<div key={i} className="flex items-center gap-2"><input type="radio" name="correctOpt" checked={qCorrect === i} onChange={() => setQCorrect(i)} /><input className="flex-1 p-2 border rounded text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white" placeholder={`Opción ${i + 1}`} value={opt} onChange={e => updateOption(i, e.target.value)}/></div>))}
                  </div>
                  <textarea className="w-full p-2 border rounded text-sm h-20 bg-white dark:bg-slate-800 text-slate-900 dark:text-white" placeholder="Explicación..." value={qExplanation} onChange={e => setQExplanation(e.target.value)}/>
                  <Button onClick={addQuestion} size="sm" fullWidth>Añadir Pregunta</Button>
                </div>
              </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const App = () => {
  // ... STATE ...
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('app_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('app_categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  const [progressHistory, setProgressHistory] = useState<UserProgress[]>(() => {
    const saved = localStorage.getItem('app_progress');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [studySessions, setStudySessions] = useState<StudySession[]>(() => {
    const saved = localStorage.getItem('app_sessions');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [completedExercises, setCompletedExercises] = useState<Record<string, Record<string, number[]>>>(() => {
    const saved = localStorage.getItem('app_completed_exercises');
    return saved ? JSON.parse(saved) : {};
  });

  const [missions, setMissions] = useState<Mission[]>(() => {
    const saved = localStorage.getItem('app_missions');
    return saved ? JSON.parse(saved) : INITIAL_MISSIONS;
  });

  const [feedbacks, setFeedbacks] = useState<Feedback[]>(() => {
    const saved = localStorage.getItem('app_feedbacks');
    return saved ? JSON.parse(saved) : [];
  });

  const sessionStartTimeRef = useRef<number | null>(null);

  const [currentView, setCurrentView] = useState<AppView | 'practice-select'>('login');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const [isTheoryPanelOpen, setIsTheoryPanelOpen] = useState(false);
  const [currentExerciseSet, setCurrentExerciseSet] = useState<number | null>(null);

  const [topicToEdit, setTopicToEdit] = useState<{catId: string, topic: Topic} | null>(null);
  const [editingCatMeta, setEditingCatMeta] = useState<{id: string, title: string, description: string} | null>(null);

  const [theoryContent, setTheoryContent] = useState<string>('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Comic State
  const [comicUrl, setComicUrl] = useState<string | null>(null);
  const [isGeneratingComic, setIsGeneratingComic] = useState(false);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [examResult, setExamResult] = useState<ExamResult | null>(null);

  const [adminTab, setAdminTab] = useState<'users' | 'resources' | 'analytics' | 'feedback'>('users');
  const [newUserName, setNewUserName] = useState('');
  const [newUserRole, setNewUserRole] = useState<Role>('student');
  const [newCatTitle, setNewCatTitle] = useState('');
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [movingTopic, setMovingTopic] = useState<{topicId: string, fromCatId: string} | null>(null);

  const [analyticsStudentId, setAnalyticsStudentId] = useState<string | null>(null);

  // ... EFFECTS ... 
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => { localStorage.setItem('app_users', JSON.stringify(users)); }, [users]);
  useEffect(() => { localStorage.setItem('app_categories', JSON.stringify(categories)); }, [categories]);
  useEffect(() => { localStorage.setItem('app_progress', JSON.stringify(progressHistory)); }, [progressHistory]);
  useEffect(() => { localStorage.setItem('app_sessions', JSON.stringify(studySessions)); }, [studySessions]);
  useEffect(() => { localStorage.setItem('app_completed_exercises', JSON.stringify(completedExercises)); }, [completedExercises]);
  useEffect(() => { localStorage.setItem('app_missions', JSON.stringify(missions)); }, [missions]);
  useEffect(() => { localStorage.setItem('app_feedbacks', JSON.stringify(feedbacks)); }, [feedbacks]);

  const startSessionTracking = () => { sessionStartTimeRef.current = Date.now(); };

  const endSessionTracking = (activityType: 'study' | 'practice' | 'exam') => {
    if (!sessionStartTimeRef.current || !currentUser || !selectedTopic) return;
    const duration = Math.round((Date.now() - sessionStartTimeRef.current) / 1000); 
    const newSession: StudySession = {
      id: Date.now().toString(),
      userId: currentUser.id,
      userName: currentUser.name,
      startTime: sessionStartTimeRef.current,
      durationSeconds: duration,
      activityType,
      topicId: selectedTopic.id,
      timestamp: Date.now()
    };
    setStudySessions(prev => [...prev, newSession]);
    sessionStartTimeRef.current = null;
  };

  const handleLogin = (username: string) => {
    const user = users.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (user) {
      setCurrentUser(user);
      if (user.role === 'admin') setCurrentView('admin-dashboard');
      else setCurrentView('dashboard');
    } else alert('Usuario no encontrado.');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('login');
    setSidebarOpen(false);
    resetSession();
    setSelectedCategory(null);
    setSelectedTopic(null);
  };

  const handleFeedback = () => {
    if (!currentUser) return;
    const content = prompt("Ayúdanos a mejorar. ¿Qué funcionalidad te gustaría ver?");
    if (content) {
      const newFeedback: Feedback = {
        id: Date.now().toString(),
        userId: currentUser.id,
        userName: currentUser.name,
        content,
        timestamp: Date.now(),
        read: false
      };
      setFeedbacks(prev => [newFeedback, ...prev]);
      alert("¡Gracias! Tu opinión es muy valiosa para nosotros.");
    }
  };

  const goHome = () => {
    if (currentUser?.role === 'admin') setCurrentView('admin-dashboard');
    else setCurrentView('dashboard');
    setSelectedCategory(null);
    setSelectedTopic(null);
    resetSession();
  };

  const selectCategory = (category: Category) => {
    setSelectedCategory(category);
    setCurrentView('topic-detail');
  };

  const resetSession = () => {
    setTheoryContent('');
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setShowFeedback(false);
    setExamResult(null);
    setIsTheoryPanelOpen(false);
    setCurrentExerciseSet(null);
    setComicUrl(null);
    setIsGeneratingComic(false);
  };

  const generateComic = async () => {
    if (!selectedTopic) return;
    setIsGeneratingComic(true);
    try {
      let prompt = "Create a 2-panel educational comic strip pixel art style. ";
      
      if (selectedTopic.id === 'past-simple-cont') {
         prompt += "Left panel: A detective in a trench coat investigating a crime scene with a magnifying glass (Past Continuous 'was investigating'). Right panel: The same detective suddenly finding a glowing golden key on the floor, surprised (Past Simple 'found'). 16-bit pixel art.";
      } else if (selectedTopic.id === 'pres-simple-cont') {
         prompt += "Left panel: A detective standing calmly in an office smoking a pipe, caption 'I solve crimes'. Right panel: The same detective running fast chasing a shadowy thief in a city street, sweating, caption 'I am chasing a suspect'. 16-bit pixel art.";
      } else {
         prompt += "A funny situation showing the difference between two grammar tenses. 16-bit pixel art.";
      }
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: prompt }] },
      });
      
      let imgUrl = null;
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          imgUrl = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }
      if (imgUrl) setComicUrl(imgUrl);
    } catch (error) {
       console.error(error);
       alert("Error generating image.");
    } finally {
       setIsGeneratingComic(false);
    }
  };

  // ... (Admin logic kept same)
  const openContentEditor = (catId: string, topic: Topic) => { setTopicToEdit({ catId, topic }); setCurrentView('content-editor'); };
  const saveContentChanges = (updatedTopic: Topic) => {
    if (!topicToEdit) return;
    setCategories(categories.map(c => {
      if (c.id === topicToEdit.catId) return { ...c, topics: c.topics.map(t => t.id === updatedTopic.id ? updatedTopic : t) };
      return c;
    }));
    setTopicToEdit(null); setCurrentView('admin-dashboard');
  };
  const addUser = () => { if (!newUserName.trim()) return; setUsers([...users, { id: Date.now().toString(), name: newUserName, username: newUserName.toLowerCase().replace(/\s/g, ''), role: newUserRole, xp: 0, league: 'Bronze', impactScore: 0, streakDays: 0, lastActivityDate: new Date().toISOString() }]); setNewUserName(''); };
  const deleteUser = (id: string) => { if (confirm('¿Estás seguro de eliminar este usuario?')) setUsers(users.filter(u => u.id !== id)); };
  const addCategory = () => { if (!newCatTitle.trim()) return; setCategories([...categories, { id: `cat-${Date.now()}`, title: newCatTitle, description: 'Nueva carpeta', topics: [], color: 'bg-slate-500' }]); setNewCatTitle(''); };
  const deleteCategory = (id: string) => { if (confirm('Se eliminarán todos los temas dentro de esta carpeta. ¿Continuar?')) setCategories(categories.filter(c => c.id !== id)); };
  const updateCategoryMeta = () => { if (!editingCatMeta) return; setCategories(categories.map(c => c.id === editingCatMeta.id ? { ...c, title: editingCatMeta.title, description: editingCatMeta.description } : c)); setEditingCatMeta(null); };
  const addTopic = (categoryId: string) => { if (!newTopicTitle.trim()) return; const newTopic: Topic = { id: `topic-${Date.now()}`, title: newTopicTitle, description: 'Pendiente de contenido', icon: 'BookOpen' }; setCategories(categories.map(c => { if (c.id === categoryId) return { ...c, topics: [...c.topics, newTopic] }; return c; })); setNewTopicTitle(''); setEditingCategoryId(null); };
  const moveTopic = (catId: string, topicIndex: number, direction: 'up' | 'down') => {
    setCategories(categories.map(c => {
      if (c.id !== catId) return c;
      const newTopics = [...c.topics];
      if (direction === 'up' && topicIndex > 0) [newTopics[topicIndex], newTopics[topicIndex - 1]] = [newTopics[topicIndex - 1], newTopics[topicIndex]];
      else if (direction === 'down' && topicIndex < newTopics.length - 1) [newTopics[topicIndex], newTopics[topicIndex + 1]] = [newTopics[topicIndex + 1], newTopics[topicIndex]];
      return { ...c, topics: newTopics };
    }));
  };
  const deleteTopic = (categoryId: string, topicId: string) => { if (confirm('¿Eliminar este tema?')) setCategories(categories.map(c => { if (c.id === categoryId) return { ...c, topics: c.topics.filter(t => t.id !== topicId) }; return c; })); };
  
  const moveTopicToCategory = (topicId: string, fromCatId: string, toCatId: string) => {
    if (fromCatId === toCatId) {
      setMovingTopic(null);
      return;
    }
    
    // Find topic
    const sourceCat = categories.find(c => c.id === fromCatId);
    const topic = sourceCat?.topics.find(t => t.id === topicId);
    
    if (!topic || !sourceCat) return;

    setCategories(prev => {
      return prev.map(cat => {
        if (cat.id === fromCatId) {
          // Remove from source
          return { ...cat, topics: cat.topics.filter(t => t.id !== topicId) };
        }
        if (cat.id === toCatId) {
          // Add to dest
          return { ...cat, topics: [...cat.topics, topic] };
        }
        return cat;
      });
    });
    setMovingTopic(null);
  };

  // ... (Content Loaders & Gameplay Logic)
  const prepareContent = (topic: Topic) => {
    if (topic.manualTheory && topic.manualTheory.trim().length > 0) {
      setTheoryContent(topic.manualTheory);
    } else {
      setTheoryContent("# Próximamente\n\nEl profesor aún no ha añadido el contenido teórico para este tema.");
    }
  };

  const startStudy = (topic: Topic) => {
    setSelectedTopic(topic);
    setCurrentView('study');
    startSessionTracking();
    prepareContent(topic);
    setComicUrl(null);
  };

  const preparePractice = (topic: Topic) => {
    if (!topic.manualQuestions || topic.manualQuestions.length === 0) {
      alert("No hay ejercicios disponibles para este tema.");
      return;
    }
    setSelectedTopic(topic);
    setCurrentView('practice-select');
  };

  const startPractice = (topic: Topic, exerciseIndex?: number) => {
    if (!topic.manualQuestions || topic.manualQuestions.length === 0) {
      alert("No hay ejercicios disponibles para este tema.");
      return;
    }
    setSelectedTopic(topic);
    resetSession();
    prepareContent(topic);
    setCurrentView('practice');
    startSessionTracking();

    let qs: Question[] = [];
    if (exerciseIndex !== undefined) {
      setCurrentExerciseSet(exerciseIndex);
      const start = exerciseIndex * 10;
      qs = topic.manualQuestions.slice(start, start + 10);
    } else {
      qs = [...topic.manualQuestions].sort(() => 0.5 - Math.random()).slice(0, 10);
    }
    setQuestions(qs);
  };

  const startExam = (topic: Topic) => {
    if (!topic.manualQuestions || topic.manualQuestions.length === 0) {
      alert("No hay examen disponible para este tema.");
      return;
    }
    setSelectedTopic(topic);
    resetSession();
    setCurrentView('exam');
    startSessionTracking();
    const shuffled = [...topic.manualQuestions].sort(() => 0.5 - Math.random()).slice(0, 20);
    setQuestions(shuffled);
  };

  const handleAnswer = (answer: string) => {
    const currentQ = questions[currentQuestionIndex];
    setUserAnswers(prev => ({ ...prev, [currentQ.id]: answer }));
    if (currentView === 'practice') {
      setShowFeedback(true);
    }
  };

  const goToQuestion = (index: number) => {
    if (index < 0 || index >= questions.length) return;
    setCurrentQuestionIndex(index);
    const qId = questions[index].id;
    const hasAnswered = !!userAnswers[qId];
    if (currentView === 'practice') setShowFeedback(hasAnswered);
  };

  const nextQuestion = () => goToQuestion(currentQuestionIndex + 1);
  const prevQuestion = () => goToQuestion(currentQuestionIndex - 1);

  const finishExam = () => {
    let duration = 0;
    if (sessionStartTimeRef.current) {
        duration = Math.round((Date.now() - sessionStartTimeRef.current) / 1000);
    }

    if (currentView === 'exam') {
        endSessionTracking('exam');
    } else if (currentView === 'practice') {
        endSessionTracking('practice');
        if (currentExerciseSet !== null && currentUser && selectedTopic) {
            setCompletedExercises(prev => {
              const userRecords = prev[currentUser.id] || {};
              const topicRecords = userRecords[selectedTopic.id] || [];
              if (!topicRecords.includes(currentExerciseSet)) {
                 return { ...prev, [currentUser.id]: { ...userRecords, [selectedTopic.id]: [...topicRecords, currentExerciseSet] } };
              }
              return prev;
            });
        }
    }
    
    let score = 0;
    const mistakes: { questionText: string; userAnswer: string; correctAnswer: string }[] = [];
    const results = questions.map(q => {
      const selected = userAnswers[q.id] || "";
      const cleanUser = normalizeAnswer(selected);
      const cleanCorrect = normalizeAnswer(q.correctAnswer);
      const isCorrect = cleanUser === cleanCorrect;
      if (isCorrect) score++;
      else mistakes.push({ questionText: q.text, userAnswer: selected, correctAnswer: q.correctAnswer });
      return { questionId: q.id, questionText: q.text, selected, correct: q.correctAnswer, isCorrect, explanation: q.explanation };
    });

    // ANTI-CHEAT MECHANIC: Speed Check
    const minSecondsPerQuestion = 3; // Unrealistic to read and answer faster than this on average
    const isFlaggedForSpeed = duration < (questions.length * minSecondsPerQuestion);
    
    let xpEarned = 0;
    if (currentUser) {
      // Calculate XP with Anti-cheat and Difficulty Logic
      const baseXP = 10;
      let multiplier = 1.0;
      
      // Streak Bonus
      if (currentUser.streakDays > 5) multiplier += 0.2;
      if (currentUser.streakDays > 10) multiplier += 0.5;

      // Penalties
      if (isFlaggedForSpeed) multiplier = 0.1; // 90% reduction for speed hacking

      xpEarned = Math.floor(score * baseXP * multiplier);
      
      // Update User State
      const updatedUser = { ...currentUser, xp: (currentUser.xp || 0) + xpEarned };
      
      // League Promotion Logic (Simple Simulation)
      const currentLeagueInfo = LEAGUES[updatedUser.league];
      const nextLeague = Object.entries(LEAGUES).find(([_, info]: [string, any]) => info.minXP > currentLeagueInfo.minXP && updatedUser.xp >= info.minXP);
      
      if (nextLeague) {
         updatedUser.league = nextLeague[0] as LeagueTier;
         // Alert user of promotion could go here
      }

      // Update Mission Progress
      const updatedMissions = missions.map(m => {
         if (m.id === 'm1' && currentView === 'practice') return { ...m, progress: Math.min(m.goal, m.progress + 1) };
         if (m.id === 'm2' && currentView === 'exam' && score === questions.length) return { ...m, progress: 1 };
         return m;
      });
      setMissions(updatedMissions);

      setCurrentUser(updatedUser);
      setUsers(users.map(u => u.id === currentUser.id ? updatedUser : u));

      // Save Progress
      const newProgress: UserProgress = {
        userId: currentUser.id,
        topicId: selectedTopic!.id,
        score,
        totalQuestions: questions.length,
        timestamp: Date.now(),
        mistakes,
        type: currentView === 'exam' ? 'exam' : 'practice',
        exerciseIndex: currentView === 'practice' ? currentExerciseSet! : undefined,
        xpEarned
      };
      setProgressHistory(prev => [...prev, newProgress]);
    }

    setExamResult({ 
      score, 
      total: questions.length, 
      answers: results, 
      topicTitle: selectedTopic?.title, 
      xpEarned, 
      type: currentView === 'practice' ? 'practice' : 'exam', 
      timestamp: Date.now(),
      timeTakenSeconds: duration,
      isFlaggedForSpeed
    });
    setCurrentView('results');
  };

  // --- RENDERERS ---

  const renderLeaderboard = () => {
    const sortedUsers = [...users].sort((a, b) => b.xp - a.xp);
    const userRankIndex = sortedUsers.findIndex(u => u.id === currentUser?.id);
    const currentLeagueData = LEAGUES[currentUser?.league || 'Bronze'];

    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* LEFT: League & Status */}
          <div className="w-full md:w-1/3 space-y-6">
             <div className={`bg-white dark:bg-slate-800 rounded-2xl shadow-lg border-t-8 ${currentLeagueData.color.split(' ')[0].replace('text-', 'border-')} p-6 text-center`}>
                <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${currentLeagueData.color} bg-opacity-20`}>
                   {getIcon(currentLeagueData.icon)}
                </div>
                <h2 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-wider">{currentUser?.league} League</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">Season ends in 2 days</p>
                <div className="bg-slate-100 dark:bg-slate-700 rounded-full h-2.5 mb-2 overflow-hidden">
                   <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <p className="text-xs text-slate-400">Top 10 promote to next tier</p>
             </div>

             <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                   <Flame className="w-6 h-6 text-orange-400 fill-orange-400 animate-pulse" />
                   <h3 className="font-bold text-lg">Daily Streak</h3>
                </div>
                <div className="flex items-baseline gap-2">
                   <span className="text-4xl font-black">{currentUser?.streakDays}</span>
                   <span className="text-indigo-200">days</span>
                </div>
                <p className="text-xs text-indigo-200 mt-2">Keep it up! 2x XP Bonus active.</p>
             </div>
          </div>

          {/* RIGHT: Leaderboard Table */}
          <div className="w-full md:w-2/3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
             <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                <h3 className="font-bold text-xl text-slate-800 dark:text-white">Global Ranking</h3>
                <div className="flex gap-2">
                   <button className="px-3 py-1 text-xs font-bold bg-slate-100 dark:bg-slate-700 rounded-full text-slate-600 dark:text-slate-300">This Week</button>
                   <button className="px-3 py-1 text-xs font-bold text-slate-400 hover:text-slate-600">All Time</button>
                </div>
             </div>
             <div className="divide-y divide-slate-100 dark:divide-slate-700">
                {sortedUsers.map((u, idx) => (
                   <div key={u.id} className={`p-4 flex items-center gap-4 ${u.id === currentUser?.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}>
                      <div className="w-8 text-center font-bold text-slate-400 text-lg">
                         {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : idx + 1}
                      </div>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-400 to-teal-400 flex items-center justify-center text-white font-bold">
                         {u.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                         <p className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                            {u.name}
                            {u.role === 'admin' && <Shield className="w-3 h-3 text-blue-500 fill-blue-500"/>}
                         </p>
                         <p className="text-xs text-slate-500 dark:text-slate-400">{u.league} League • {u.impactScore} Impact</p>
                      </div>
                      <div className="text-right">
                         <span className="block font-black text-slate-800 dark:text-white">{u.xp} XP</span>
                      </div>
                   </div>
                ))}
             </div>
          </div>
        </div>

        {/* MISSIONS SECTION */}
        <div className="mt-12">
           <h3 className="font-bold text-xl text-slate-800 dark:text-white mb-6 flex items-center gap-2">
              <Target className="w-6 h-6 text-red-500"/> Active Missions
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {missions.map(mission => (
                 <div key={mission.id} className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                       {getIcon(mission.icon)}
                    </div>
                    <div className="flex justify-between items-start mb-2">
                       <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${mission.type === 'daily' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'}`}>
                          {mission.type}
                       </span>
                       <span className="text-xs font-bold text-amber-500 flex items-center gap-1">
                          <Zap className="w-3 h-3"/> +{mission.xpReward} XP
                       </span>
                    </div>
                    <h4 className="font-bold text-slate-800 dark:text-white mb-1">{mission.title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">{mission.description}</p>
                    
                    <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                       <div 
                          className="bg-blue-500 h-full transition-all duration-500" 
                          style={{ width: `${(mission.progress / mission.goal) * 100}%` }}
                       ></div>
                    </div>
                    <div className="text-right mt-1 text-xs font-medium text-slate-400">
                       {mission.progress} / {mission.goal}
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </div>
    );
  };

  const renderHeader = () => {
    if (currentView === 'login') return null;
    const currentXP = currentUser?.xp || 0;
    const level = calculateLevel(currentXP);
    const title = getUserTitle(level);

    return (
      <header className="sticky top-0 z-40 w-full backdrop-blur-lg bg-white/75 dark:bg-slate-900/75 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {currentUser && (
              <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors">
                <Menu className="w-6 h-6" />
              </button>
            )}
            <div onClick={goHome} className="flex items-center gap-2 cursor-pointer group">
              <div className="relative bg-gradient-to-br from-blue-600 to-violet-600 p-2 rounded-xl shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                <FlaskConical className="text-white w-6 h-6" />
                <div className="absolute -top-1.5 -right-1.5 bg-white dark:bg-slate-800 rounded-full p-0.5 border-2 border-slate-100 dark:border-slate-900 shadow-sm">
                    <MessageCircle className="w-3 h-3 text-violet-600 dark:text-violet-400" />
                </div>
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-800 dark:text-white hidden sm:block">Valen's <span className="text-blue-600 dark:text-blue-400">English Lab</span></span>
            </div>
          </div>

          {currentUser && (
            <div className="flex items-center gap-3 sm:gap-6">
              {currentUser.role === 'student' && (
                <div className="hidden md:flex flex-col items-end cursor-pointer" onClick={() => setCurrentView('leaderboard')}>
                  <span className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-1">
                    {title}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Level {level} • {currentUser.league} League</span>
                </div>
              )}
              
              <div className="flex items-center gap-1 bg-amber-100 dark:bg-amber-900/30 px-3 py-1.5 rounded-full border border-amber-200 dark:border-amber-700/50 shadow-sm cursor-pointer hover:scale-105 transition-transform" onClick={() => setCurrentView('leaderboard')}>
                 <Trophy className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                 <span className="text-sm font-bold text-amber-800 dark:text-amber-300">{currentUser.xp || 0} XP</span>
              </div>

              <button 
                onClick={() => setDarkMode(!darkMode)} 
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          )}
        </div>
      </header>
    );
  };

  const renderSidebar = () => (
    <>
      {isSidebarOpen && <div className="fixed inset-0 bg-black/50 z-[90] backdrop-blur-sm transition-opacity" onClick={() => setSidebarOpen(false)} />}
      <div className={`fixed top-0 left-0 h-full w-80 bg-white dark:bg-slate-900 shadow-2xl transform transition-transform duration-300 ease-in-out z-[100] flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center shrink-0">
           <h2 className="font-bold text-xl text-slate-800 dark:text-white">Menu</h2>
           <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"><X className="w-5 h-5 text-slate-500" /></button>
        </div>

        {/* Main Nav Items - Pushed to top */}
        <div className="p-4 space-y-2 flex-1 overflow-y-auto">
           <button onClick={() => { goHome(); setSidebarOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors font-medium">
             <Home className="w-5 h-5"/> Home
           </button>
           {currentUser?.role === 'student' && (
             <>
               <button onClick={() => { setCurrentView('student-progress'); setSidebarOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors font-medium">
                 <BarChart className="w-5 h-5"/> My Progress
               </button>
               <button onClick={() => { setCurrentView('leaderboard'); setSidebarOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors font-medium">
                 <Trophy className="w-5 h-5"/> Leaderboard
               </button>
             </>
           )}
        </div>
        
        {/* Bottom Actions - Pushed to bottom of flex area */}
        <div className="p-4 space-y-2 shrink-0 border-t border-slate-100 dark:border-slate-800">
           <button onClick={() => { handleFeedback(); setSidebarOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors font-medium">
             <MessageSquare className="w-5 h-5"/> Feedback
           </button>
           <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors font-medium">
             <LogOut className="w-5 h-5"/> Logout
           </button>
        </div>

        {/* User Profile - Fixed at bottom */}
        <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 shrink-0">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center font-bold text-blue-600 dark:text-blue-400">
                {currentUser?.name.charAt(0)}
              </div>
              <div>
                 <p className="font-bold text-sm text-slate-800 dark:text-white">{currentUser?.name}</p>
                 <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{currentUser?.role}</p>
              </div>
           </div>
        </div>
      </div>
    </>
  );

  const renderDashboard = () => (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12 text-center animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-white mb-4 tracking-tight">
          Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">{currentUser?.name}</span> 👋
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Ready to grind? Select a category to boost your XP.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <div 
            key={category.id}
            onClick={() => selectCategory(category)}
            className="group relative bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden border border-slate-100 dark:border-slate-700/50"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${category.color.replace('bg-', 'from-').replace('500', '400')} to-transparent opacity-10 rounded-bl-[100px] group-hover:scale-110 transition-transform duration-500`}></div>
            
            <div className={`${category.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20 group-hover:rotate-6 transition-transform duration-300`}>
               <Layout className="text-white w-8 h-8" />
            </div>
            
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{category.title}</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6 line-clamp-2 leading-relaxed">{category.description}</p>
            
            <div className="flex items-center justify-between mt-auto">
               <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{category.topics.length} Topics</span>
               <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <ChevronRight className="w-5 h-5"/>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAdminDashboard = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Panel de Profesor</h1>
          <p className="text-slate-500 dark:text-slate-400">Gestiona estudiantes y contenido del curso.</p>
        </div>
        <div className="flex gap-3">
           <Button variant="outline" onClick={() => setCurrentView('dashboard')}>Ver como Alumno</Button>
           <div className="flex bg-white dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm overflow-x-auto">
             <button onClick={() => setAdminTab('users')} className={`px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${adminTab === 'users' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>Estudiantes</button>
             <button onClick={() => setAdminTab('resources')} className={`px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${adminTab === 'resources' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>Contenido</button>
             <button onClick={() => setAdminTab('analytics')} className={`px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${adminTab === 'analytics' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>Analíticas</button>
             <button onClick={() => setAdminTab('feedback')} className={`px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${adminTab === 'feedback' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>Feedback</button>
           </div>
        </div>
      </div>

      {adminTab === 'users' && (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
           <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row justify-between gap-4">
              <h3 className="font-bold text-lg text-slate-800 dark:text-white">Usuarios Registrados</h3>
              <div className="flex gap-2">
                 <input 
                   placeholder="Nombre usuario..." 
                   className="px-3 py-2 border rounded-lg text-sm bg-slate-50 dark:bg-slate-900 dark:border-slate-600 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                   value={newUserName}
                   onChange={e => setNewUserName(e.target.value)}
                 />
                 <select 
                   className="px-3 py-2 border rounded-lg text-sm bg-slate-50 dark:bg-slate-900 dark:border-slate-600 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                   value={newUserRole}
                   onChange={e => setNewUserRole(e.target.value as Role)}
                 >
                   <option value="student">Estudiante</option>
                   <option value="admin">Profesor</option>
                 </select>
                 <Button onClick={addUser} size="sm"><Plus className="w-4 h-4 mr-1 inline" /> Añadir</Button>
              </div>
           </div>
           <div className="divide-y divide-slate-100 dark:divide-slate-700">
              {users.map(u => (
                <div key={u.id} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                   <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${u.role === 'admin' ? 'bg-purple-500' : 'bg-blue-500'}`}>
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">{u.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">@{u.username} • {u.role === 'admin' ? 'Admin' : 'Estudiante'} • {u.xp || 0} XP</p>
                      </div>
                   </div>
                   {u.id !== currentUser?.id && (
                     <button onClick={() => deleteUser(u.id)} className="text-red-400 hover:text-red-600 p-2"><Trash2 className="w-4 h-4" /></button>
                   )}
                </div>
              ))}
           </div>
        </div>
      )}

      {adminTab === 'resources' && (
        <div className="space-y-8">
           <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
             <h3 className="font-bold text-lg mb-4 text-slate-800 dark:text-white">Estructura del Curso</h3>
             <div className="flex gap-2 mb-6">
                <input 
                  placeholder="Nueva Categoría..." 
                  className="flex-1 px-4 py-2 border rounded-lg bg-slate-50 dark:bg-slate-900 dark:border-slate-600 dark:text-white"
                  value={newCatTitle}
                  onChange={e => setNewCatTitle(e.target.value)}
                />
                <Button onClick={addCategory}><FolderPlus className="w-4 h-4 mr-2 inline"/> Crear</Button>
             </div>
             
             <div className="space-y-4">
                {categories.map(cat => (
                  <div key={cat.id} className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                     <div className="bg-slate-50 dark:bg-slate-700/50 p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                           {editingCatMeta?.id === cat.id ? (
                             <div className="flex gap-2">
                               <input value={editingCatMeta.title} onChange={e => setEditingCatMeta({...editingCatMeta, title: e.target.value})} className="px-2 py-1 text-sm border rounded dark:bg-slate-800 dark:border-slate-600 dark:text-white"/>
                               <input value={editingCatMeta.description} onChange={e => setEditingCatMeta({...editingCatMeta, description: e.target.value})} className="px-2 py-1 text-sm border rounded dark:bg-slate-800 dark:border-slate-600 dark:text-white"/>
                               <button onClick={updateCategoryMeta}><Check className="w-4 h-4 text-green-500"/></button>
                             </div>
                           ) : (
                             <div>
                               <h4 className="font-bold text-slate-800 dark:text-white">{cat.title}</h4>
                               <p className="text-xs text-slate-500 dark:text-slate-400">{cat.description}</p>
                             </div>
                           )}
                        </div>
                        <div className="flex items-center gap-2">
                           <button onClick={() => setEditingCatMeta({id: cat.id, title: cat.title, description: cat.description})} className="p-1.5 text-slate-400 hover:text-blue-500"><Edit3 className="w-4 h-4"/></button>
                           <button onClick={() => deleteCategory(cat.id)} className="p-1.5 text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4"/></button>
                        </div>
                     </div>
                     <div className="p-4 bg-white dark:bg-slate-800">
                        <div className="space-y-2 mb-4">
                           {cat.topics.map((topic, idx) => (
                             <div key={topic.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/30 group">
                                <div className="flex items-center gap-3">
                                   <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded text-blue-600 dark:text-blue-400">{getIcon(topic.icon)}</div>
                                   <span className="font-medium text-slate-700 dark:text-slate-200">{topic.title}</span>
                                </div>
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                   {movingTopic?.topicId === topic.id ? (
                                      <div className="flex gap-1 animate-in fade-in slide-in-from-right-5">
                                        <select 
                                          className="text-xs p-1 border rounded bg-white text-slate-700 border-slate-300 dark:bg-slate-900 dark:border-slate-600 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                                          onChange={(e) => moveTopicToCategory(topic.id, cat.id, e.target.value)}
                                          defaultValue=""
                                        >
                                          <option value="" disabled>Mover a...</option>
                                          {categories.map(c => (
                                            <option key={c.id} value={c.id}>{c.title}</option>
                                          ))}
                                        </select>
                                        <button onClick={() => setMovingTopic(null)}><X className="w-4 h-4 text-slate-400"/></button>
                                      </div>
                                   ) : (
                                      <button onClick={() => setMovingTopic({topicId: topic.id, fromCatId: cat.id})} className="p-1 text-slate-400 hover:text-purple-600" title="Mover a otra carpeta"><FolderInput className="w-4 h-4"/></button>
                                   )}
                                   <button onClick={() => moveTopic(cat.id, idx, 'up')} disabled={idx === 0} className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-30"><ArrowUp className="w-4 h-4"/></button>
                                   <button onClick={() => moveTopic(cat.id, idx, 'down')} disabled={idx === cat.topics.length - 1} className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-30"><ArrowDown className="w-4 h-4"/></button>
                                   <button onClick={() => openContentEditor(cat.id, topic)} className="p-1 text-blue-400 hover:text-blue-600"><FileEdit className="w-4 h-4"/></button>
                                   <button onClick={() => deleteTopic(cat.id, topic.id)} className="p-1 text-red-400 hover:text-red-600"><X className="w-4 h-4"/></button>
                                </div>
                             </div>
                           ))}
                        </div>
                        {editingCategoryId === cat.id ? (
                           <div className="flex gap-2 items-center animate-in fade-in slide-in-from-top-2">
                             <input 
                               autoFocus
                               placeholder="Título del tema..." 
                               className="flex-1 px-3 py-2 border rounded text-sm dark:bg-slate-900 dark:border-slate-600 dark:text-white"
                               value={newTopicTitle}
                               onChange={e => setNewTopicTitle(e.target.value)}
                               onKeyDown={e => e.key === 'Enter' && addTopic(cat.id)}
                             />
                             <Button size="sm" onClick={() => addTopic(cat.id)}>Añadir</Button>
                             <button onClick={() => setEditingCategoryId(null)}><X className="w-5 h-5 text-slate-400"/></button>
                           </div>
                        ) : (
                           <button onClick={() => setEditingCategoryId(cat.id)} className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1">
                             <Plus className="w-4 h-4"/> Añadir Tema
                           </button>
                        )}
                     </div>
                  </div>
                ))}
             </div>
           </div>
        </div>
      )}
      
      {adminTab === 'analytics' && (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
           <h3 className="font-bold text-lg mb-6 text-slate-800 dark:text-white">Progreso de Estudiantes</h3>
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {users.filter(u => u.role === 'student').map(student => (
                <div key={student.id} className="p-4 border rounded-xl hover:border-blue-400 transition-colors cursor-pointer" onClick={() => { setAnalyticsStudentId(student.id); setCurrentView('student-progress'); }}>
                   <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600">{student.name.charAt(0)}</div>
                      <div>
                        <p className="font-bold text-slate-800 dark:text-white">{student.name}</p>
                        <p className="text-xs text-slate-500">{student.xp || 0} XP</p>
                      </div>
                   </div>
                   <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full" style={{ width: `${Math.min(100, (student.xp || 0) / 10)}%` }}></div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      )}

      {adminTab === 'feedback' && (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
           <div className="flex justify-between items-center mb-6">
             <h3 className="font-bold text-lg text-slate-800 dark:text-white">Feedback Recibido</h3>
             <Button size="sm" variant="outline" onClick={() => { if(confirm('¿Borrar todo el feedback?')) setFeedbacks([]) }}>Limpiar Todo</Button>
           </div>
           
           {feedbacks.length === 0 ? (
             <p className="text-center text-slate-500 py-8">No hay mensajes de feedback aún.</p>
           ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {feedbacks.map(fb => (
                 <div key={fb.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900/50">
                    <div className="flex justify-between items-start mb-2">
                       <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-xs font-bold text-purple-600">
                             {fb.userName.charAt(0)}
                          </div>
                          <span className="font-bold text-sm text-slate-800 dark:text-white">{fb.userName}</span>
                       </div>
                       <span className="text-xs text-slate-400">{new Date(fb.timestamp).toLocaleDateString()}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{fb.content}</p>
                 </div>
               ))}
             </div>
           )}
        </div>
      )}
    </div>
  );

  const renderStudentProgress = () => {
    // If admin is viewing, use analyticsStudentId. If student, use currentUser.id
    const targetId = (currentUser?.role === 'admin' && analyticsStudentId) ? analyticsStudentId : currentUser?.id;
    if (!targetId) return <div>Error: Usuario no identificado</div>;

    const studentData = users.find(u => u.id === targetId);
    const history = progressHistory.filter(p => p.userId === targetId).sort((a, b) => b.timestamp - a.timestamp);
    
    // Calculate stats
    const totalPractice = history.filter(h => h.type === 'practice').length;
    const totalExams = history.filter(h => h.type === 'exam').length;
    const avgScore = history.length > 0 ? (history.reduce((acc, curr) => acc + (curr.score / curr.totalQuestions), 0) / history.length) * 100 : 0;
    
    return (
       <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-8">
             <button onClick={() => currentUser?.role === 'admin' ? setCurrentView('admin-dashboard') : setCurrentView('dashboard')} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                <ChevronLeft className="w-6 h-6 text-slate-600 dark:text-slate-400"/>
             </button>
             <div>
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white">{currentUser?.role === 'admin' ? `Progreso de ${studentData?.name}` : 'Mi Progreso'}</h1>
                <p className="text-slate-500 dark:text-slate-400">Estadísticas y resultados recientes</p>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
             <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="flex items-center gap-4">
                   <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg"><Brain className="w-6 h-6"/></div>
                   <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Ejercicios</p>
                      <p className="text-2xl font-bold text-slate-800 dark:text-white">{totalPractice}</p>
                   </div>
                </div>
             </div>
             <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="flex items-center gap-4">
                   <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-lg"><CheckCircle className="w-6 h-6"/></div>
                   <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Exámenes</p>
                      <p className="text-2xl font-bold text-slate-800 dark:text-white">{totalExams}</p>
                   </div>
                </div>
             </div>
             <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="flex items-center gap-4">
                   <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-lg"><Trophy className="w-6 h-6"/></div>
                   <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Precisión Media</p>
                      <p className="text-2xl font-bold text-slate-800 dark:text-white">{Math.round(avgScore)}%</p>
                   </div>
                </div>
             </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
             <div className="p-6 border-b border-slate-100 dark:border-slate-700">
                <h3 className="font-bold text-lg text-slate-800 dark:text-white">Historial de Actividad</h3>
             </div>
             <div className="divide-y divide-slate-100 dark:divide-slate-700">
                {history.length === 0 ? (
                   <div className="p-8 text-center text-slate-500">No hay actividad registrada.</div>
                ) : (
                   history.map((item, idx) => {
                      let topicName = item.topicId;
                      for(const c of categories) {
                         const t = c.topics.find(t => t.id === item.topicId);
                         if (t) { topicName = t.title; break; }
                      }

                      return (
                         <div key={idx} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-700/30">
                            <div>
                               <p className="font-medium text-slate-800 dark:text-white">{topicName}</p>
                               <p className="text-xs text-slate-500 capitalize">{item.type === 'exam' ? 'Examen Oficial' : `Práctica ${item.exerciseIndex !== undefined ? item.exerciseIndex + 1 : ''}`}</p>
                            </div>
                            <div className="flex items-center gap-6">
                               <div className="text-right">
                                  <span className={`text-lg font-bold ${(item.score / item.totalQuestions) >= 0.7 ? 'text-green-500' : 'text-orange-500'}`}>
                                     {Math.round((item.score / item.totalQuestions) * 100)}%
                                  </span>
                                  <p className="text-xs text-slate-400">{item.score}/{item.totalQuestions}</p>
                               </div>
                               <div className="text-xs text-slate-400 w-24 text-right">
                                  {new Date(item.timestamp).toLocaleDateString()}
                               </div>
                            </div>
                         </div>
                      );
                   })
                )}
             </div>
          </div>
       </div>
    );
  };

  const renderTopicDetail = () => {
    if (!selectedCategory) return null;

    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button 
          onClick={() => { setSelectedCategory(null); setCurrentView('dashboard'); }}
          className="flex items-center text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white mb-6 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-1" /> Volver a Categorías
        </button>

        <div className="mb-8 text-center">
          <div className={`inline-flex p-4 rounded-2xl ${selectedCategory.color} mb-4 shadow-lg shadow-blue-500/20`}>
             <Layout className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">{selectedCategory.title}</h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">{selectedCategory.description}</p>
        </div>

        <div className="space-y-4">
          {selectedCategory.topics.map((topic) => (
            <div key={topic.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-md transition-shadow">
               <div className="p-6">
                 <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                       <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg text-blue-600 dark:text-blue-400">
                         {getIcon(topic.icon)}
                       </div>
                       <div>
                         <h3 className="text-xl font-bold text-slate-800 dark:text-white">{topic.title}</h3>
                         <p className="text-slate-500 dark:text-slate-400 mt-1">{topic.description}</p>
                       </div>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
                    <Button variant="secondary" onClick={() => startStudy(topic)} className="flex items-center justify-center gap-2">
                      <BookOpen className="w-4 h-4" /> Estudiar
                    </Button>
                    <Button variant="outline" onClick={() => preparePractice(topic)} className="flex items-center justify-center gap-2">
                       <Brain className="w-4 h-4" /> Practicar
                    </Button>
                    <Button variant="outline" onClick={() => startExam(topic)} className="flex items-center justify-center gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-200 dark:hover:bg-red-900/20 dark:hover:text-red-400 dark:hover:border-red-900/50">
                       <CheckCircle className="w-4 h-4" /> Examen
                    </Button>
                 </div>
               </div>
            </div>
          ))}

          {selectedCategory.topics.length === 0 && (
             <div className="text-center py-12 bg-slate-50 dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
               <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3"/>
               <p className="text-slate-500 dark:text-slate-400">No hay temas en esta categoría aún.</p>
             </div>
          )}
        </div>
      </div>
    );
  };

  const renderPracticeSelection = () => {
    if (!selectedTopic) return null;
    const totalQuestions = selectedTopic.manualQuestions?.length || 0;
    const exercisesCount = Math.ceil(totalQuestions / 10);
    const userCompleted = (currentUser && completedExercises[currentUser.id]?.[selectedTopic.id]) || [];
    const isBossUnlocked = exercisesCount > 0 && userCompleted.length === exercisesCount;

    const getBestScore = (idx: number) => {
      if (!currentUser) return 0;
      const attempts = progressHistory.filter(p => p.userId === currentUser.id && p.topicId === selectedTopic.id && p.type === 'practice' && p.exerciseIndex === idx);
      if (attempts.length === 0) return 0;
      const best = attempts.reduce((prev, current) => (prev.score > current.score) ? prev : current);
      return best.score;
    };

    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => setCurrentView('topic-detail')}
            className="flex items-center text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-1" /> Volver
          </button>
          <div className="text-right">
             <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{selectedTopic.title}</h2>
             <p className="text-slate-500 dark:text-slate-400 text-sm">Selecciona un nivel de práctica</p>
          </div>
        </div>

        {exercisesCount > 0 ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: exercisesCount }).map((_, idx) => {
                const isCompleted = userCompleted.includes(idx);
                const bestScore = getBestScore(idx);
                const pct = (bestScore / 10) * 100;
                const rank = getRank(pct);
                const RankIcon = rank.icon;
                
                return (
                  <div 
                    key={idx}
                    onClick={() => startPractice(selectedTopic, idx)}
                    className={`relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] cursor-pointer group ${isCompleted ? 'bg-white dark:bg-slate-800 ring-2 ring-emerald-500/50 shadow-lg shadow-emerald-500/10' : 'bg-white dark:bg-slate-800 hover:shadow-xl border border-slate-200 dark:border-slate-700'}`}
                  >
                    {isCompleted && (
                      <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl shadow-sm">
                        COMPLETADO
                      </div>
                    )}
                    
                    <div className="flex justify-between items-start mb-6">
                      <div className={`p-4 rounded-xl ${isCompleted ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400'} transition-colors`}>
                        <Brain className="w-8 h-8"/>
                      </div>
                      {isCompleted ? (
                         <div className={`flex flex-col items-end`}>
                            <div className={`p-2 rounded-full mb-1 ${rank.color} border-2`}>
                               <RankIcon className="w-5 h-5"/>
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{rank.name}</span>
                         </div>
                      ) : (
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 flex items-center gap-1 text-xs font-bold uppercase tracking-wider">
                           Empezar <ChevronRight className="w-4 h-4"/>
                        </div>
                      )}
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        Práctica {idx + 1}
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">10 Preguntas de entrenamiento</p>
                      
                      {isCompleted && (
                        <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                           <div 
                             className={`h-full rounded-full ${pct >= 70 ? 'bg-emerald-500' : 'bg-orange-500'}`} 
                             style={{ width: `${pct}%` }}
                           ></div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Boss Challenge Unlock */}
            {isBossUnlocked && (
               <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 p-1 shadow-2xl transform hover:scale-[1.01] transition-transform cursor-pointer" onClick={() => startExam(selectedTopic)}>
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                  <div className="relative bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                     <div className="flex items-center gap-6">
                       <div className="p-4 bg-gradient-to-br from-orange-400 to-red-500 text-white rounded-2xl shadow-lg animate-pulse">
                          <Zap className="w-8 h-8" />
                       </div>
                       <div>
                          <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 mb-1">DESAFÍO FINAL DESBLOQUEADO</h3>
                          <p className="text-slate-600 dark:text-slate-300">Demuestra tu maestría en el Examen Oficial.</p>
                       </div>
                     </div>
                     <Button className="bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-8 py-3 rounded-full font-bold shadow-lg hover:bg-slate-800 dark:hover:bg-slate-100 whitespace-nowrap">
                        Comenzar Examen
                     </Button>
                  </div>
               </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
             <div className="bg-slate-100 dark:bg-slate-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-slate-400" />
             </div>
             <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">No hay ejercicios</h3>
             <p className="text-slate-500 dark:text-slate-400">El profesor aún no ha añadido prácticas para este tema.</p>
          </div>
        )}
      </div>
    );
  };

  const renderStudyMode = () => (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => { endSessionTracking('study'); setCurrentView('topic-detail'); }} className="flex items-center text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          <ChevronLeft className="w-5 h-5 mr-1" /> Volver
        </button>
        <span className="text-sm font-bold uppercase tracking-wider px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">Modo Estudio</span>
      </div>

      <div className="space-y-8 animate-fade-in">
        {renderMarkdown(theoryContent, {
           onGenerate: generateComic,
           isGenerating: isGeneratingComic,
           imageUrl: comicUrl
        })}
      </div>

      <div className="fixed bottom-0 left-0 w-full p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-700 flex justify-center z-10">
          <Button onClick={() => { endSessionTracking('study'); startPractice(selectedTopic!, 0); }} variant="primary" className="shadow-lg shadow-blue-500/20">
            Ir a Práctica <ChevronRight className="w-4 h-4 ml-2 inline" />
          </Button>
      </div>
      <div className="h-20"></div>
    </div>
  );

  const renderQuestionCard = (isExam: boolean) => {
    if (questions.length === 0) return <div>Error cargando preguntas.</div>;
    const question = questions[currentQuestionIndex];
    const hasAnswered = !!userAnswers[question.id];
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    const handleExit = () => {
       endSessionTracking(isExam ? 'exam' : 'practice');
       setCurrentView(isExam ? 'topic-detail' : 'practice-select');
    };

    return (
      <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden relative">
        <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 z-30 shadow-sm shrink-0 relative">
            <div className="flex items-center gap-4">
                <button 
                  type="button"
                  onClick={handleExit}
                  className="group bg-slate-50 dark:bg-slate-800 p-2 rounded-full shadow-sm border border-slate-200 dark:border-slate-700 hover:border-red-200 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                  title="Salir"
                >
                   <XCircle className="w-6 h-6 text-slate-400 group-hover:text-red-500 transition-colors" />
                </button>
                <div className="flex flex-col">
                  <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">
                    {isExam ? 'EXAMEN OFICIAL' : `EJERCICIO ${currentExerciseSet !== null ? currentExerciseSet + 1 : ''}`}
                  </span>
                  <h2 className="text-lg sm:text-xl font-black text-slate-800 dark:text-white leading-tight">
                    {selectedTopic?.title}
                  </h2>
                </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3 ml-12 sm:ml-0">
               <span className="text-sm font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
                  {currentQuestionIndex + 1} / {questions.length}
               </span>
               {!isExam && (
                 <button 
                   onClick={() => setIsTheoryPanelOpen(!isTheoryPanelOpen)}
                   className={`px-4 py-1.5 rounded-lg transition-all flex items-center gap-2 text-sm font-bold border ${isTheoryPanelOpen ? 'bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-900/40 dark:text-amber-200' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400 hover:text-blue-600 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'}`}
                 >
                   <Lightbulb className="w-4 h-4" /> Chuleta
                 </button>
               )}
            </div>
        </div>

        <div className="flex flex-1 overflow-hidden relative">
           <div className="flex-1 overflow-y-auto p-4 md:p-8 flex justify-center">
              <div className="max-w-2xl w-full">
                 <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full mb-8">
                    <div 
                      className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(37,99,235,0.3)]" 
                      style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                    ></div>
                 </div>

                 <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-700 p-6 md:p-10 relative overflow-hidden">
                    {/* Decorative background element */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-50 dark:from-blue-900/10 to-transparent rounded-bl-[100px] pointer-events-none"></div>
                    
                    <h3 className="text-2xl font-semibold text-slate-800 dark:text-white mb-8 leading-snug relative z-10">{question.text}</h3>

                    {isExam ? (
                       <div className="mb-8 relative z-10">
                          <input 
                            autoFocus
                            type="text"
                            autoComplete="off"
                            className="w-full p-4 text-lg rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-0 outline-none transition-all placeholder:text-slate-400 shadow-inner"
                            placeholder="Escribe la respuesta completa aquí..."
                            value={userAnswers[question.id] || ''}
                            onChange={(e) => handleAnswer(e.target.value)}
                          />
                       </div>
                    ) : (
                      <div className="space-y-3 mb-8 relative z-10">
                        {question.options.map((option, idx) => {
                          const isSelected = userAnswers[question.id] === option;
                          const isCorrect = option === question.correctAnswer;
                          let btnClass = "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 relative group ";
                          
                          if (showFeedback) {
                             if (isCorrect) btnClass += "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 shadow-md shadow-green-500/10";
                             else if (isSelected) btnClass += "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200";
                             else btnClass += "border-slate-100 dark:border-slate-700 opacity-50 grayscale";
                          } else {
                             btnClass += "border-slate-100 dark:border-slate-700 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700/50 hover:shadow-md";
                          }
                          
                          return (
                            <button key={idx} onClick={() => !showFeedback && !hasAnswered && handleAnswer(option)} disabled={showFeedback} className={btnClass}>
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-lg">{option}</span>
                                {showFeedback && isCorrect && <CheckCircle className="w-6 h-6 text-green-500 animate-in zoom-in spin-in-90 duration-300" />}
                                {showFeedback && isSelected && !isCorrect && <XCircle className="w-6 h-6 text-red-500 animate-in zoom-in" />}
                                {!showFeedback && <div className="w-4 h-4 rounded-full border-2 border-slate-300 group-hover:border-blue-400 transition-colors"></div>}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {!isExam && showFeedback && (
                      <div className="relative z-10 p-5 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-r-xl mb-8 animate-in fade-in slide-in-from-top-2 shadow-sm">
                        <h4 className="font-bold text-blue-900 dark:text-blue-200 mb-1 flex items-center gap-2">
                           <Info className="w-4 h-4"/> Explicación:
                        </h4>
                        <p className="text-blue-800 dark:text-blue-100 leading-relaxed text-sm md:text-base">{question.explanation}</p>
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-6 border-t border-slate-100 dark:border-slate-700 relative z-10">
                       <Button variant="ghost" onClick={prevQuestion} disabled={currentQuestionIndex === 0} className={currentQuestionIndex === 0 ? 'invisible' : ''}>
                         <ChevronLeft className="w-4 h-4 mr-1 inline"/> Anterior
                       </Button>
                       
                       {isLastQuestion ? (
                         <Button onClick={finishExam} className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg shadow-lg shadow-green-500/30 hover:scale-105 transition-transform">
                           Finalizar <CheckCircle className="w-5 h-5 ml-2 inline"/>
                         </Button>
                       ) : (
                         <Button onClick={nextQuestion} disabled={!isExam && !hasAnswered} className="px-6 py-2">
                           Siguiente <ChevronRight className="w-4 h-4 ml-1 inline"/>
                         </Button>
                       )}
                    </div>
                 </div>
              </div>
           </div>

           <div className={`absolute top-0 right-0 h-full w-full md:w-[450px] bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-slate-700 transform transition-transform duration-300 ease-in-out z-20 ${isTheoryPanelOpen ? 'translate-x-0' : 'translate-x-full'}`}>
              <div className="h-full flex flex-col">
                 <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-white flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-blue-500"/> Material de Apoyo
                    </h3>
                    <button onClick={() => setIsTheoryPanelOpen(false)} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors">
                      <X className="w-5 h-5 text-slate-500"/>
                    </button>
                 </div>
                 <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50 dark:bg-slate-900/50">
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      {renderMarkdown(theoryContent)}
                    </div>
                 </div>
              </div>
           </div>

        </div>
      </div>
    );
  };

  const renderResults = () => {
    if (!examResult) return null;
    const percentage = Math.round((examResult.score / examResult.total) * 100);
    const isPass = percentage >= 50;

    return (
      <div className="max-w-3xl mx-auto px-4 py-12 animate-in fade-in zoom-in duration-300">
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
          <div className={`p-12 text-center ${isPass ? 'bg-gradient-to-b from-green-50 to-white dark:from-green-900/20 dark:to-slate-800' : 'bg-gradient-to-b from-red-50 to-white dark:from-red-900/20 dark:to-slate-800'}`}>
            
            <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 shadow-xl ${isPass ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
              {isPass ? <Trophy className="w-12 h-12" /> : <XCircle className="w-12 h-12" />}
            </div>

            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">{isPass ? 'GG Well Played!' : 'Nice Try!'}</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg mb-8">{examResult.topicTitle}</p>
            
            {examResult.isFlaggedForSpeed && (
               <div className="mb-6 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm flex items-center justify-center gap-2">
                  <AlertCircle className="w-4 h-4"/> 
                  <span>Suspiciously fast completion. XP reduced.</span>
               </div>
            )}

            <div className="flex justify-center gap-8 mb-8">
               <div className="text-center">
                  <span className="block text-5xl font-black text-slate-800 dark:text-white mb-1">{percentage}%</span>
                  <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Score</span>
               </div>
               <div className="w-px bg-slate-200 dark:bg-slate-700"></div>
               <div className="text-center">
                  <span className="block text-5xl font-black text-slate-800 dark:text-white mb-1">{examResult.score}/{examResult.total}</span>
                  <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Correct</span>
               </div>
            </div>

            {isPass && examResult.xpEarned && (
               <div className="inline-flex items-center gap-2 px-6 py-3 bg-amber-100 dark:bg-amber-900/30 rounded-full border border-amber-200 dark:border-amber-700 text-amber-800 dark:text-amber-200 font-bold mb-8 animate-bounce">
                  <Star className="w-5 h-5 text-amber-500 fill-amber-500" /> +{examResult.xpEarned} XP Earned
               </div>
            )}
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/50 p-8 border-t border-slate-100 dark:border-slate-700">
            <h3 className="font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-blue-500"/> Performance Review
            </h3>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
               {examResult.answers.map((ans, idx) => {
                 const question = questions.find(q => q.id === ans.questionId);
                 if (!question) return null;
                 return (
                   <div key={idx} className={`p-4 rounded-xl border ${ans.isCorrect ? 'bg-green-50 border-green-200 dark:bg-green-900/10 dark:border-green-900/30' : 'bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-900/30'}`}>
                      <div className="flex gap-3">
                         <div className={`mt-1 shrink-0 ${ans.isCorrect ? 'text-green-600' : 'text-red-500'}`}>
                            {ans.isCorrect ? <Check className="w-5 h-5"/> : <X className="w-5 h-5"/>}
                         </div>
                         <div>
                            <p className="font-medium text-slate-800 dark:text-slate-200 mb-2">{question.text}</p>
                            <div className="text-sm space-y-1">
                               {!ans.isCorrect && (
                                  <p className="text-red-600 dark:text-red-400">Your Answer: <span className="font-semibold">{ans.selected || "(Skipped)"}</span></p>
                               )}
                               <p className="text-green-600 dark:text-green-400">Correct: <span className="font-semibold">{ans.correct}</span></p>
                            </div>
                         </div>
                      </div>
                   </div>
                 );
               })}
            </div>
            
            <div className="mt-8 flex gap-4">
              <Button onClick={() => setCurrentView('topic-detail')} variant="outline" fullWidth>Back to Topic</Button>
              <Button onClick={() => { 
                if (currentView === 'exam' || currentView === 'practice') {
                  startStudy(selectedTopic!); 
                } else {
                  setCurrentView('leaderboard');
                }
              }} fullWidth>Continue to Leaderboard</Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans pb-12 transition-colors duration-200">
      {renderHeader()}
      {renderSidebar()}
      <main className="transition-all duration-300">
        {currentView === 'login' && <LoginView onLogin={handleLogin} />}
        {currentView === 'admin-dashboard' && renderAdminDashboard()}
        {currentView === 'student-progress' && renderStudentProgress()}
        {currentView === 'content-editor' && topicToEdit && <ContentEditor topic={topicToEdit.topic} onSave={saveContentChanges} onCancel={() => { setTopicToEdit(null); setCurrentView('admin-dashboard'); }} />}
        {currentView === 'dashboard' && renderDashboard()}
        {currentView === 'topic-detail' && renderTopicDetail()}
        {currentView === 'practice-select' && renderPracticeSelection()}
        {currentView === 'leaderboard' && renderLeaderboard()}
        {(currentView === 'study' || currentView === 'practice' || currentView === 'exam') && isLoading && <LoadingSpinner />}
        {!isLoading && currentView === 'study' && renderStudyMode()}
        {!isLoading && currentView === 'practice' && renderQuestionCard(false)}
        {!isLoading && currentView === 'exam' && renderQuestionCard(true)}
        {currentView === 'results' && renderResults()}
      </main>
    </div>
  );
}