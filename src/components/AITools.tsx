import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  BookOpen, 
  FileText, 
  MessageSquare, 
  AlertTriangle,
  Send,
  Loader2,
  Copy,
  Check
} from 'lucide-react';
import { 
  generateLessonPlan, 
  generateReportComment, 
  generateHomework, 
  detectAttendanceRisk 
} from '../services/geminiService';

type ToolType = 'lesson' | 'comment' | 'homework' | 'risk';

export default function AITools() {
  const [activeTool, setActiveTool] = useState<ToolType>('lesson');
  const [input, setInput] = useState('');
  const [grade, setGrade] = useState('8');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!input) return;
    setLoading(true);
    setResult('');
    try {
      let response = '';
      switch (activeTool) {
        case 'lesson':
          response = await generateLessonPlan(input, grade);
          break;
        case 'comment':
          response = await generateReportComment(input, 'Excellent performance in science');
          break;
        case 'homework':
          response = await generateHomework(input, grade);
          break;
        case 'risk':
          response = await detectAttendanceRisk(input);
          break;
      }
      setResult(response);
    } catch (error) {
      console.error(error);
      setResult('Error generating content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-5xl mx-auto space-y-8"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-emerald-600 text-white rounded-2xl shadow-lg shadow-emerald-200">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">AI Teaching Assistant</h2>
          <p className="text-slate-500">Powered by Google Gemini for CMSS Teachers</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar Tools */}
        <div className="space-y-3">
          {[
            { id: 'lesson', title: 'Lesson Plan Generator', icon: BookOpen, desc: 'Create structured plans in seconds' },
            { id: 'homework', title: 'Homework Creator', icon: FileText, desc: 'Generate quizzes & assignments' },
            { id: 'comment', title: 'Report Card Comments', icon: MessageSquare, desc: 'Personalized student feedback' },
            { id: 'risk', title: 'Attendance Risk Detector', icon: AlertTriangle, desc: 'Identify students at risk' },
          ].map((tool) => (
            <button
              key={tool.id}
              onClick={() => {
                setActiveTool(tool.id as ToolType);
                setResult('');
                setInput('');
              }}
              className={`w-full text-left p-4 rounded-2xl border transition-all ${
                activeTool === tool.id 
                  ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-100' 
                  : 'bg-white border-slate-200 text-slate-600 hover:border-emerald-300'
              }`}
            >
              <tool.icon className={`w-6 h-6 mb-2 ${activeTool === tool.id ? 'text-white' : 'text-emerald-600'}`} />
              <h4 className="font-bold">{tool.title}</h4>
              <p className={`text-xs ${activeTool === tool.id ? 'text-emerald-100' : 'text-slate-400'}`}>{tool.desc}</p>
            </button>
          ))}
        </div>

        {/* Input & Result Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                {activeTool === 'lesson' ? 'Topic' : activeTool === 'comment' ? 'Student Name' : activeTool === 'homework' ? 'Topic' : 'Attendance Data'}
              </label>
              {(activeTool === 'lesson' || activeTool === 'homework') && (
                <select 
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="text-sm border-slate-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(g => (
                    <option key={g} value={g}>Grade {g}</option>
                  ))}
                </select>
              )}
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                activeTool === 'lesson' ? 'e.g., Photosynthesis, Solar System...' :
                activeTool === 'comment' ? 'e.g., Ahmed Khan' :
                activeTool === 'homework' ? 'e.g., Fractions, Mughal Empire...' :
                'Paste attendance records here...'
              }
              className="w-full h-32 p-4 bg-slate-50 border-slate-200 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 text-slate-900"
            />
            <button
              onClick={handleGenerate}
              disabled={loading || !input}
              className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-emerald-100"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              Generate with AI
            </button>
          </div>

          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
            >
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">AI Generated Result</span>
                <button 
                  onClick={copyToClipboard}
                  className="p-2 hover:bg-white rounded-lg transition-colors text-slate-500 hover:text-emerald-600"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="p-6 prose prose-slate max-w-none whitespace-pre-wrap font-medium text-slate-700 leading-relaxed">
                {result}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
