import { useState } from "react";
import { HabitGrid } from "@/components/HabitGrid";
import { GoalCard } from "@/components/GoalCard";
import { ProgressStats } from "@/components/ProgressStats";
import { HabitManager } from "@/components/HabitManager";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Settings, TrendingUp } from "lucide-react";

interface Habit {
  id: string;
  name: string;
  section: 'morning' | 'afternoon' | 'night';
  completions: Record<string, boolean>;
}

interface Goal {
  id: string;
  title: string;
  description: string;
}

const Index = () => {
  const [showManager, setShowManager] = useState(false);
  
  // Sample data - in a real app this would come from a backend
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: '1',
      name: 'Arrange room',
      section: 'morning',
      completions: {
        '2024-01-01': true,
        '2024-01-02': true,
        '2024-01-03': true,
        '2024-01-04': false,
        '2024-01-05': true,
      }
    },
    {
      id: '2', 
      name: 'Brush room',
      section: 'morning',
      completions: {
        '2024-01-01': true,
        '2024-01-02': true,
        '2024-01-03': false,
        '2024-01-04': true,
      }
    },
    {
      id: '3',
      name: 'Meditate',
      section: 'morning', 
      completions: {
        '2024-01-01': true,
        '2024-01-02': false,
        '2024-01-03': true,
        '2024-01-04': true,
        '2024-01-05': true,
        '2024-01-06': true,
        '2024-01-07': true,
        '2024-01-08': true,
        '2024-01-09': false,
        '2024-01-10': true,
      }
    },
    {
      id: '4',
      name: 'Morning read',
      section: 'morning',
      completions: {
        '2024-01-01': true,
        '2024-01-02': false,
        '2024-01-03': true,
        '2024-01-04': false,
        '2024-01-05': true,
        '2024-01-06': true,
        '2024-01-07': false,
        '2024-01-08': true,
        '2024-01-09': true,
      }
    },
    {
      id: '5',
      name: 'Breakfast',
      section: 'morning',
      completions: {
        '2024-01-01': true,
        '2024-01-02': true,
        '2024-01-03': true,
        '2024-01-04': false,
        '2024-01-05': true,
        '2024-01-06': true,
        '2024-01-07': true,
        '2024-01-08': false,
      }
    },
    {
      id: '6',
      name: 'Brush teeth',
      section: 'afternoon',
      completions: {
        '2024-01-01': true,
        '2024-01-02': true,
        '2024-01-03': true,
        '2024-01-04': true,
        '2024-01-05': false,
        '2024-01-06': true,
        '2024-01-07': true,
        '2024-01-08': true,
        '2024-01-09': false,
      }
    },
    {
      id: '7',
      name: 'Extra studying',
      section: 'afternoon',
      completions: {
        '2024-01-01': true,
        '2024-01-02': false,
        '2024-01-03': true,
        '2024-01-04': true,
        '2024-01-05': false,
        '2024-01-06': true,
        '2024-01-07': false,
        '2024-01-08': true,
      }
    },
    {
      id: '8',
      name: 'Workout',
      section: 'afternoon',
      completions: {
        '2024-01-01': false,
        '2024-01-02': true,
        '2024-01-03': false,
        '2024-01-04': true,
        '2024-01-05': true,
        '2024-01-06': false,
        '2024-01-07': true,
      }
    },
    {
      id: '9',
      name: 'Planning',
      section: 'afternoon',
      completions: {
        '2024-01-01': true,
        '2024-01-02': true,
        '2024-01-03': false,
        '2024-01-04': true,
        '2024-01-05': true,
        '2024-01-06': true,
        '2024-01-07': false,
        '2024-01-08': true,
        '2024-01-09': true,
      }
    },
    {
      id: '10',
      name: 'Night read',
      section: 'night',
      completions: {
        '2024-01-01': true,
        '2024-01-02': false,
        '2024-01-03': true,
        '2024-01-04': false,
        '2024-01-05': true,
        '2024-01-06': true,
        '2024-01-07': true,
        '2024-01-08': false,
        '2024-01-09': true,
        '2024-01-10': true,
      }
    }
  ]);

  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Get clearer skin',
      description: 'get a clearer skin and a consistent workout.'
    },
    {
      id: '2', 
      title: 'Study goals',
      description: 'study and get a higher gpa'
    },
    {
      id: '3',
      title: 'Guitar practice',
      description: 'get better at guitar'
    }
  ]);

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const handleToggleHabit = (habitId: string, date: string) => {
    setHabits(prev => prev.map(habit => {
      if (habit.id === habitId) {
        return {
          ...habit,
          completions: {
            ...habit.completions,
            [date]: !habit.completions[date]
          }
        };
      }
      return habit;
    }));
  };

  const handleAddHabit = (newHabit: Omit<Habit, 'id' | 'completions'>) => {
    const habit: Habit = {
      ...newHabit,
      id: Date.now().toString(),
      completions: {}
    };
    setHabits(prev => [...prev, habit]);
  };

  const handleDeleteHabit = (habitId: string) => {
    setHabits(prev => prev.filter(habit => habit.id !== habitId));
  };

  const handleUpdateHabit = (updatedHabit: Habit) => {
    setHabits(prev => prev.map(habit => 
      habit.id === updatedHabit.id ? updatedHabit : habit
    ));
  };

  const handleUpdateGoal = (updatedGoal: Goal) => {
    setGoals(prev => prev.map(goal =>
      goal.id === updatedGoal.id ? updatedGoal : goal
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-2">
            <Button
              variant={showManager ? "default" : "outline"}
              onClick={() => setShowManager(!showManager)}
              size="sm"
              className="flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              {showManager ? "Hide" : "Manage"} Habits
            </Button>
          </div>
          
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Stats
          </Button>
        </div>

        {/* Progress Stats */}
        <div className="mb-8">
          <ProgressStats 
            habits={habits} 
            currentMonth={currentMonth}
            currentYear={currentYear}
          />
        </div>

        {/* Habit Manager */}
        {showManager && (
          <div className="mb-8">
            <HabitManager
              habits={habits}
              onAddHabit={handleAddHabit}
              onDeleteHabit={handleDeleteHabit}
              onUpdateHabit={handleUpdateHabit}
            />
          </div>
        )}

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Habit Grid - Takes up 3 columns */}
          <div className="lg:col-span-3">
            <HabitGrid 
              habits={habits}
              onToggleHabit={handleToggleHabit}
            />
          </div>

          {/* Goals Section - Takes up 1 column */}
          <div className="space-y-4">
            {goals.map(goal => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onUpdate={handleUpdateGoal}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
