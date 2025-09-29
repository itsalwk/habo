import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Habit {
  id: string;
  name: string;
  section: 'morning' | 'afternoon' | 'night';
  completions: Record<string, boolean>;
}

interface ProgressStatsProps {
  habits: Habit[];
  currentMonth: number;
  currentYear: number;
}

const SECTION_ICONS = {
  morning: '○',
  afternoon: '●',
  night: '◐'
};

export function ProgressStats({ habits, currentMonth, currentYear }: ProgressStatsProps) {
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  const getMonthlyStats = () => {
    const stats = {
      totalHabits: habits.length,
      totalPossibleCompletions: habits.length * daysInMonth,
      actualCompletions: 0,
      sectionStats: {
        morning: { completed: 0, total: 0 },
        afternoon: { completed: 0, total: 0 },
        night: { completed: 0, total: 0 }
      }
    };

    habits.forEach(habit => {
      const sectionTotal = daysInMonth;
      stats.sectionStats[habit.section].total += sectionTotal;
      
      for (let day = 1; day <= daysInMonth; day++) {
        const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        if (habit.completions[dateKey]) {
          stats.actualCompletions++;
          stats.sectionStats[habit.section].completed++;
        }
      }
    });

    return stats;
  };

  const stats = getMonthlyStats();
  const overallPercentage = stats.totalPossibleCompletions > 0 
    ? Math.round((stats.actualCompletions / stats.totalPossibleCompletions) * 100)
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Overall Progress */}
      <Card className="p-4 text-center border-border bg-card">
        <div className="text-3xl font-bold text-foreground mb-2">{overallPercentage}%</div>
        <div className="text-sm text-muted-foreground mb-3">Overall Progress</div>
        <Progress value={overallPercentage} className="h-2 mb-2" />
        <div className="text-xs text-muted-foreground">
          {stats.actualCompletions}/{stats.totalPossibleCompletions} completed
        </div>
      </Card>

      {/* Morning Progress */}
      <Card className="p-4 text-center border-border bg-card">
        <div className="text-2xl font-bold text-foreground mb-2">
          {stats.sectionStats.morning.total > 0 
            ? Math.round((stats.sectionStats.morning.completed / stats.sectionStats.morning.total) * 100)
            : 0}%
        </div>
        <div className="text-sm text-foreground flex items-center justify-center gap-2 mb-3">
          <span>{SECTION_ICONS.morning}</span> Morning
        </div>
        <Progress 
          value={stats.sectionStats.morning.total > 0 
            ? (stats.sectionStats.morning.completed / stats.sectionStats.morning.total) * 100
            : 0} 
          className="h-2 mb-2" 
        />
        <div className="text-xs text-muted-foreground">
          {stats.sectionStats.morning.completed}/{stats.sectionStats.morning.total}
        </div>
      </Card>

      {/* Afternoon Progress */}
      <Card className="p-4 text-center border-border bg-card">
        <div className="text-2xl font-bold text-foreground mb-2">
          {stats.sectionStats.afternoon.total > 0 
            ? Math.round((stats.sectionStats.afternoon.completed / stats.sectionStats.afternoon.total) * 100)
            : 0}%
        </div>
        <div className="text-sm text-foreground flex items-center justify-center gap-2 mb-3">
          <span>{SECTION_ICONS.afternoon}</span> Afternoon
        </div>
        <Progress 
          value={stats.sectionStats.afternoon.total > 0 
            ? (stats.sectionStats.afternoon.completed / stats.sectionStats.afternoon.total) * 100
            : 0} 
          className="h-2 mb-2" 
        />
        <div className="text-xs text-muted-foreground">
          {stats.sectionStats.afternoon.completed}/{stats.sectionStats.afternoon.total}
        </div>
      </Card>

      {/* Night Progress */}
      <Card className="p-4 text-center border-border bg-card">
        <div className="text-2xl font-bold text-foreground mb-2">
          {stats.sectionStats.night.total > 0 
            ? Math.round((stats.sectionStats.night.completed / stats.sectionStats.night.total) * 100)
            : 0}%
        </div>
        <div className="text-sm text-foreground flex items-center justify-center gap-2 mb-3">
          <span>{SECTION_ICONS.night}</span> Night
        </div>
        <Progress 
          value={stats.sectionStats.night.total > 0 
            ? (stats.sectionStats.night.completed / stats.sectionStats.night.total) * 100
            : 0} 
          className="h-2 mb-2" 
        />
        <div className="text-xs text-muted-foreground">
          {stats.sectionStats.night.completed}/{stats.sectionStats.night.total}
        </div>
      </Card>
    </div>
  );
}