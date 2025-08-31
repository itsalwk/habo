import { useState } from "react";
import { Button } from "@/components/ui/button";
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
  morning: 'bg-morning-light',
  afternoon: 'bg-afternoon-light',
  night: 'bg-night-light'
};

const SECTION_GRID_COLORS = {
  morning: 'bg-morning',
  afternoon: 'bg-afternoon',
  night: 'bg-night'
};

export function HabitGrid({ habits, onToggleHabit }: HabitGridProps) {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  
  const navigateYear = (direction: 'prev' | 'next') => {
    setCurrentYear(prev => direction === 'prev' ? prev - 1 : prev + 1);
  };

  const formatDate = (month: number, day: number) => {
    return `${currentYear}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const getDaysInMonth = (month: number) => {
    return new Date(currentYear, month + 1, 0).getDate();
  };

  const groupedHabits = habits.reduce((acc, habit) => {
    if (!acc[habit.section]) {
      acc[habit.section] = [];
    }
    acc[habit.section].push(habit);
    return acc;
  }, {} as Record<string, Habit[]>);

  return (
    <div className="w-full max-w-full mx-auto p-6 bg-background">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold tracking-wider text-foreground mb-6 font-serif">
          HABITS
        </h1>
        
        {/* Year Navigation */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigateYear('prev')}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <span className="text-2xl font-bold text-primary px-6">{currentYear}</span>
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigateYear('next')}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Month Headers */}
      <div className="overflow-x-auto">
        <div className="min-w-[1200px]">
          <div className="grid grid-cols-[200px_repeat(12,_1fr)] gap-px bg-border border border-border">
            <div className="bg-background p-2"></div>
            {MONTHS.map((month, index) => (
              <div key={month} className="bg-background p-2 text-center text-sm font-medium text-foreground border-r border-border">
                {month}
              </div>
            ))}
          </div>
          
          {/* Day Headers */}
          <div className="grid grid-cols-[200px_repeat(12,_1fr)] gap-px bg-border">
            <div className="bg-background p-1"></div>
            {MONTHS.map((_, monthIndex) => (
              <div key={monthIndex} className="bg-background border-r border-border">
                <div className="grid grid-cols-5 gap-px text-[10px] text-muted-foreground text-center">
                  {Array.from({ length: Math.min(31, getDaysInMonth(monthIndex)) }, (_, dayIndex) => {
                    if ((dayIndex + 1) % 5 === 1 || dayIndex + 1 === 1 || dayIndex + 1 === 10 || dayIndex + 1 === 15 || dayIndex + 1 === 20 || dayIndex + 1 === 25 || dayIndex + 1 === 30) {
                      return (
                        <div key={dayIndex} className="p-[2px]">
                          {dayIndex + 1}
                        </div>
                      );
                    }
                    return <div key={dayIndex} className="p-[2px]"></div>;
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Habit Sections */}
          {Object.entries(groupedHabits).map(([section, sectionHabits]) => (
            <div key={section} className="border-t-2 border-border">
              {/* Section Header */}
              <div className="grid grid-cols-[200px_repeat(12,_1fr)] gap-px bg-border">
                <div className={`${SECTION_COLORS[section as keyof typeof SECTION_COLORS]} p-3 flex items-center gap-2 border-r border-border`}>
                  <span className="text-lg">{SECTION_ICONS[section as keyof typeof SECTION_ICONS]}</span>
                  <span className="text-sm font-medium text-foreground">{section}.</span>
                </div>
                {MONTHS.map((_, monthIndex) => (
                  <div key={monthIndex} className={`${SECTION_COLORS[section as keyof typeof SECTION_COLORS]} border-r border-border`}></div>
                ))}
              </div>
              
              {/* Habits */}
              {sectionHabits.map((habit) => (
                <div key={habit.id} className="grid grid-cols-[200px_repeat(12,_1fr)] gap-px bg-border border-b border-border">
                  <div className="bg-background p-2 text-sm font-medium text-foreground border-r border-border flex items-center">
                    {habit.name}
                  </div>
                  {MONTHS.map((_, monthIndex) => (
                    <div key={monthIndex} className="bg-background border-r border-border p-1">
                      <div className="grid grid-cols-5 gap-[1px]">
                        {Array.from({ length: getDaysInMonth(monthIndex) }, (_, dayIndex) => {
                          const day = dayIndex + 1;
                          const dateKey = formatDate(monthIndex, day);
                          const isCompleted = habit.completions[dateKey] || false;
                          
                          return (
                            <button
                              key={day}
                              onClick={() => onToggleHabit(habit.id, dateKey)}
                              className={`
                                w-3 h-3 border border-border transition-all duration-200 hover:scale-125
                                ${isCompleted 
                                  ? `${SECTION_GRID_COLORS[habit.section as keyof typeof SECTION_GRID_COLORS]} opacity-80` 
                                  : 'bg-background hover:bg-muted'
                                }
                              `}
                              title={`${habit.name} - ${MONTHS[monthIndex]} ${day}, ${currentYear}`}
                            />
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}