import { LucideIcon } from 'lucide-react';

export type UserRole = 'SuperAdmin' | 'Admin' | 'Teacher' | 'Student' | 'Parent' | 'Accountant' | 'Librarian';

export interface NavItem {
  title: string;
  icon: LucideIcon;
  path: string;
  roles: UserRole[];
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  class: string;
  attendance: number;
  feesStatus: 'Paid' | 'Pending' | 'Partial';
}

export interface DashboardStat {
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
}
