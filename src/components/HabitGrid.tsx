import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Habit {
  id: string;
  name: string;
  section: 'morning' | 'afternoon' | 'night';
  completions: Record<string, boolean>; // date -> completed
}

interface HabitGridProps {
  habits: Habit[];
  onToggleHabit: (habitId: string, date: string) => void;
}

const MONTHS = [
  'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
  'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
];

const SECTION_ICONS = {
  morning: '☀️',
  afternoon: '🌸', 
  night: '🌙'
};

const SECTION_COLORS = {
  morning: 'bg-morning-light border-morning',
  afternoon: 'bg-afternoon-light border-afternoon',
  night: 'bg-night-light border-night'
};

export function HabitGrid({ habits, onToggleHabit }: HabitGridProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const formatDate = (day: number) => {
    return `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const groupedHabits = habits.reduce((acc, habit) => {
    if (!acc[habit.section]) {
      acc[habit.section] = [];
    }
    acc[habit.section].push(habit);
    return acc;
  }, {} as Record<string, Habit[]>);

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-6xl font-bold tracking-tight text-foreground mb-8">
          HABITS
        </h1>
        
        {/* Month Navigation */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigateMonth('prev')}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex gap-6 text-sm font-medium text-muted-foreground">
            {MONTHS.map((month, index) => (
              <button
                key={month}
                onClick={() => setCurrentDate(new Date(currentYear, index, 1))}
                className={`px-2 py-1 rounded transition-colors ${
                  index === currentMonth 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-muted'
                }`}
              >
                {month}
              </button>
            ))}
          </div>
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigateMonth('next')}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Habit Sections */}
      <div className="space-y-6">
        {Object.entries(groupedHabits).map(([section, sectionHabits]) => (
          <Card key={section} className={`p-6 border-2 ${SECTION_COLORS[section as keyof typeof SECTION_COLORS]}`}>
            <div className="mb-4">
              <h2 className="text-lg font-medium text-foreground flex items-center gap-2">
                <span className="text-xl">{SECTION_ICONS[section as keyof typeof SECTION_ICONS]}</span>
                {section}.
              </h2>
            </div>
            
            <div className="space-y-3">
              {sectionHabits.map((habit) => (
                <div key={habit.id} className="flex items-center gap-4">
                  <div className="w-32 text-sm font-medium text-foreground">
                    {habit.name}
                  </div>
                  
                  <div className="flex gap-1">
                    {Array.from({ length: daysInMonth }, (_, i) => {
                      const day = i + 1;
                      const dateKey = formatDate(day);
                      const isCompleted = habit.completions[dateKey] || false;
                      
                      return (
                        <button
                          key={day}
                          onClick={() => onToggleHabit(habit.id, dateKey)}
                          className={`
                            w-6 h-6 text-xs font-medium rounded border-2 transition-all duration-200
                            hover:scale-110 hover:shadow-sm
                            ${isCompleted 
                              ? `${SECTION_COLORS[habit.section].replace('light', 'DEFAULT')} text-foreground` 
                              : 'bg-empty border-border hover:bg-muted'
                            }
                          `}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}