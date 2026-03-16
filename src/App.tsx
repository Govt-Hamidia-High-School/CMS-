import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Bell, 
  Search, 
  User,
  ChevronRight,
  Sparkles,
  LayoutDashboard
} from 'lucide-react';
import { NAV_ITEMS, MOCK_STATS } from './constants';
import { UserRole } from './types';

// Components
import Dashboard from './components/Dashboard';
import AITools from './components/AITools';
import StudentList from './components/StudentList';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userRole, setUserRole] = useState<UserRole>('Admin');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) setIsSidebarOpen(false);
      else setIsSidebarOpen(true);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-[#F8F9FA] flex text-slate-900 font-sans">
        {/* Sidebar */}
        <aside 
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0`}
        >
          <div className="h-full flex flex-col">
            <div className="p-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-200">
                C
              </div>
              <div>
                <h1 className="font-bold text-slate-900 leading-tight">CMSS Smart</h1>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Management System</p>
              </div>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar">
              {NAV_ITEMS.filter(item => item.roles.includes(userRole)).map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl transition-all group"
                >
                  <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">{item.title}</span>
                </Link>
              ))}
            </nav>

            <div className="p-4 border-t border-slate-100">
              <div className="bg-slate-50 rounded-2xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-slate-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 truncate">Principal Ali</p>
                  <p className="text-xs text-slate-500 truncate">{userRole}</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Header */}
          <header className="h-16 bg-white border-bottom border-slate-200 px-4 lg:px-8 flex items-center justify-between sticky top-0 z-40">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 hover:bg-slate-100 rounded-lg lg:hidden"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="hidden md:flex items-center bg-slate-100 rounded-xl px-3 py-1.5 w-64 lg:w-96">
                <Search className="w-4 h-4 text-slate-400 mr-2" />
                <input 
                  type="text" 
                  placeholder="Search students, records..." 
                  className="bg-transparent border-none focus:ring-0 text-sm w-full"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <Link 
                to="/ai-tools"
                className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl font-semibold text-sm hover:bg-emerald-100 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                <span className="hidden sm:inline">AI Tools</span>
              </Link>
              <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl relative">
                <Bell className="w-6 h-6" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
            </div>
          </header>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-8">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/ai-tools" element={<AITools />} />
                <Route path="/students" element={<StudentList />} />
                <Route path="*" element={
                  <div className="flex flex-col items-center justify-center h-full text-slate-400">
                    <LayoutDashboard className="w-16 h-16 mb-4 opacity-20" />
                    <p className="text-lg font-medium">Module coming soon...</p>
                  </div>
                } />
              </Routes>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </Router>
  );
}
