import React from 'react';
import {
  Activity,
  BookOpen,
  Briefcase,
  Cake,
  CalendarDays,
  Clock,
  Compass,
  FileText,
  Gift,
  Handshake,
  Heart,
  Scale,
  Sparkles,
  Telescope,
  Timer,
  Users,
} from 'lucide-react';
import { CalculatorMeta } from '../data/calculatorsCatalog';

interface CalculatorIconProps {
  name: CalculatorMeta['iconName'] | 'BookOpen' | 'Compass';
  className?: string;
}

export const CalculatorIcon: React.FC<CalculatorIconProps> = ({ name, className = 'h-5 w-5' }) => {
  switch (name) {
    case 'Clock':
      return <Clock className={className} />;
    case 'Cake':
      return <Cake className={className} />;
    case 'Scale':
      return <Scale className={className} />;
    case 'Users':
      return <Users className={className} />;
    case 'Handshake':
      return <Handshake className={className} />;
    case 'Heart':
      return <Heart className={className} />;
    case 'Sparkles':
      return <Sparkles className={className} />;
    case 'CalendarDays':
      return <CalendarDays className={className} />;
    case 'Telescope':
      return <Telescope className={className} />;
    case 'Briefcase':
      return <Briefcase className={className} />;
    case 'Gift':
      return <Gift className={className} />;
    case 'Timer':
      return <Timer className={className} />;
    case 'FileText':
      return <FileText className={className} />;
    case 'Activity':
      return <Activity className={className} />;
    case 'BookOpen':
      return <BookOpen className={className} />;
    case 'Compass':
      return <Compass className={className} />;
  }
};
