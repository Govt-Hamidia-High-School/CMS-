import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  BookOpen, 
  GraduationCap, 
  Wallet, 
  HeartPulse, 
  ShieldAlert, 
  Settings,
  Library,
  Package,
  MessageSquare,
  Lightbulb,
  Briefcase
} from 'lucide-react';
import { NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { title: 'Dashboard', icon: LayoutDashboard, path: '/', roles: ['SuperAdmin', 'Admin', 'Teacher', 'Student', 'Parent', 'Accountant', 'Librarian'] },
  { title: 'Students', icon: Users, path: '/students', roles: ['SuperAdmin', 'Admin', 'Teacher'] },
  { title: 'Attendance', icon: Calendar, path: '/attendance', roles: ['SuperAdmin', 'Admin', 'Teacher'] },
  { title: 'Academics', icon: BookOpen, path: '/academics', roles: ['SuperAdmin', 'Admin', 'Teacher', 'Student'] },
  { title: 'Exams', icon: GraduationCap, path: '/exams', roles: ['SuperAdmin', 'Admin', 'Teacher', 'Student', 'Parent'] },
  { title: 'Finance', icon: Wallet, path: '/finance', roles: ['SuperAdmin', 'Admin', 'Accountant'] },
  { title: 'Health', icon: HeartPulse, path: '/health', roles: ['SuperAdmin', 'Admin', 'Teacher', 'Parent'] },
  { title: 'Safeguarding', icon: ShieldAlert, path: '/safeguarding', roles: ['SuperAdmin', 'Admin'] },
  { title: 'Library', icon: Library, path: '/library', roles: ['SuperAdmin', 'Admin', 'Librarian'] },
  { title: 'Inventory', icon: Package, path: '/inventory', roles: ['SuperAdmin', 'Admin'] },
  { title: 'Communication', icon: MessageSquare, path: '/communication', roles: ['SuperAdmin', 'Admin', 'Teacher', 'Parent'] },
  { title: 'Entrepreneurship', icon: Briefcase, path: '/entrepreneurship', roles: ['SuperAdmin', 'Admin', 'Teacher', 'Student'] },
  { title: 'Research Hub', icon: Lightbulb, path: '/research', roles: ['SuperAdmin', 'Admin', 'Teacher', 'Student'] },
  { title: 'Settings', icon: Settings, path: '/settings', roles: ['SuperAdmin', 'Admin'] },
];

export const MOCK_STATS = [
  { label: 'Total Students', value: '450', change: '+12%', trend: 'up', icon: Users },
  { label: 'Attendance Rate', value: '94%', change: '-2%', trend: 'down', icon: Calendar },
  { label: 'Fees Collected', value: 'PKR 1.2M', change: '+5%', trend: 'up', icon: Wallet },
  { label: 'Active Projects', value: '24', change: '+8', trend: 'up', icon: Lightbulb },
];
