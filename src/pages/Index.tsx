import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { HabitGrid } from "@/components/HabitGrid";
import { GoalCard } from "@/components/GoalCard";
import { ProgressStats } from "@/components/ProgressStats";
import { HabitManager } from "@/components/HabitManager";
import { Moon, Sun, Settings, TrendingUp, Calendar, Target } from "lucide-react";

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
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showManager, setShowManager] = useState(false);
  
  // Minimalist sample data
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: '1',
      name: 'Meditation',
      section: 'morning',
      completions: {
        '2024-01-01': true,
        '2024-01-02': true,
        '2024-01-03': false,
        '2024-01-04': true,
        '2024-01-05': true,
      }
    },
    {
      id: '2', 
      name: 'Exercise',
      section: 'morning',
      completions: {
        '2024-01-01': true,
        '2024-01-02': false,
        '2024-01-03': true,
        '2024-01-04': true,
      }
    },
    {
      id: '3',
      name: 'Deep Work',
      section: 'afternoon', 
      completions: {
        '2024-01-01': true,
        '2024-01-02': true,
        '2024-01-03': true,
        '2024-01-04': false,
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
      name: 'Reading',
      section: 'night',
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
      name: 'Journaling',
      section: 'night',
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
    }
  ]);

  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Build Consistent Habits',
      description: 'Establish a routine that supports long-term growth and well-being.'
    },
    {
      id: '2', 
      title: 'Read 24 Books',
      description: 'Complete two books per month throughout the year.'
    },
    {
      id: '3',
      title: 'Maintain 90% Completion',
      description: 'Achieve a 90% habit completion rate across all tracked habits.'
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

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen bg-background text-foreground transition-all duration-300`}>
      {/* ChatGPT-inspired Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Habo</h1>
                <p className="text-xs text-muted-foreground">Advanced Habit Tracker</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowManager(!showManager)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Settings className="w-4 h-4 mr-2" />
                {showManager ? "Hide" : "Manage"}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Progress Overview */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-muted-foreground" />
              <CardTitle className="text-lg font-medium">Progress Overview</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ProgressStats 
              habits={habits} 
              currentMonth={currentMonth}
              currentYear={currentYear}
            />
          </CardContent>
        </Card>

        {/* Habit Manager */}
        {showManager && (
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Habit Management</CardTitle>
              <p className="text-sm text-muted-foreground">Add, edit, or remove your daily habits</p>
            </CardHeader>
            <CardContent>
              <HabitManager
                habits={habits}
                onAddHabit={handleAddHabit}
                onDeleteHabit={handleDeleteHabit}
                onUpdateHabit={handleUpdateHabit}
              />
            </CardContent>
          </Card>
        )}

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Habit Grid - Takes up 3 columns */}
          <div className="lg:col-span-3">
            <Card className="border-border bg-card">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium">Daily Habits</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Track your progress with our minimalist, year-long view
                </p>
              </CardHeader>
              <CardContent>
                <HabitGrid 
                  habits={habits}
                  onToggleHabit={handleToggleHabit}
                />
              </CardContent>
            </Card>
          </div>

          {/* Goals Section - Takes up 1 column */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-muted-foreground" />
              <h2 className="text-lg font-medium">Personal Goals</h2>
            </div>
            
            <div className="space-y-4">
              {goals.map((goal) => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  onUpdate={handleUpdateGoal}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Motivational Section - ChatGPT style */}
        <Card className="bg-primary text-primary-foreground border-0">
          <CardContent className="py-8 text-center">
            <p className="text-lg font-medium mb-2">
              "The secret of getting ahead is getting started."
            </p>
            <p className="text-sm opacity-75">— Mark Twain</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
