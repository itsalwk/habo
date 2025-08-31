import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, GripVertical } from "lucide-react";

interface Habit {
  id: string;
  name: string;
  section: 'morning' | 'afternoon' | 'night';
  completions: Record<string, boolean>;
}

interface HabitManagerProps {
  habits: Habit[];
  onAddHabit: (habit: Omit<Habit, 'id' | 'completions'>) => void;
  onDeleteHabit: (habitId: string) => void;
  onUpdateHabit: (habit: Habit) => void;
}

export function HabitManager({ habits, onAddHabit, onDeleteHabit, onUpdateHabit }: HabitManagerProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newHabitName, setNewHabitName] = useState("");
  const [newHabitSection, setNewHabitSection] = useState<'morning' | 'afternoon' | 'night'>('morning');

  const handleAddHabit = () => {
    if (newHabitName.trim()) {
      onAddHabit({
        name: newHabitName.trim(),
        section: newHabitSection
      });
      setNewHabitName("");
      setIsAdding(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddHabit();
    } else if (e.key === 'Escape') {
      setIsAdding(false);
      setNewHabitName("");
    }
  };

  const sectionColors = {
    morning: 'bg-morning-light border-morning text-foreground',
    afternoon: 'bg-afternoon-light border-afternoon text-foreground',
    night: 'bg-night-light border-night text-foreground'
  };

  const sectionIcons = {
    morning: '☀️',
    afternoon: '🌸', 
    night: '🌙'
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Manage Habits</h2>
        <Button
          onClick={() => setIsAdding(true)}
          size="sm"
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Habit
        </Button>
      </div>

      {/* Add New Habit Form */}
      {isAdding && (
        <Card className="p-4 mb-4 bg-muted/50">
          <div className="space-y-3">
            <Input
              placeholder="Enter habit name..."
              value={newHabitName}
              onChange={(e) => setNewHabitName(e.target.value)}
              onKeyDown={handleKeyPress}
              autoFocus
              className="bg-background"
            />
            <div className="flex gap-2">
              <Select value={newHabitSection} onValueChange={(value: any) => setNewHabitSection(value)}>
                <SelectTrigger className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">☀️ Morning</SelectItem>
                  <SelectItem value="afternoon">🌸 Afternoon</SelectItem>
                  <SelectItem value="night">🌙 Night</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleAddHabit} size="sm">
                Add
              </Button>
              <Button 
                onClick={() => {
                  setIsAdding(false);
                  setNewHabitName("");
                }} 
                variant="outline" 
                size="sm"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Existing Habits */}
      <div className="space-y-2">
        {habits.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No habits yet. Add your first habit to get started!</p>
          </div>
        ) : (
          habits.map((habit) => (
            <div
              key={habit.id}
              className={`
                flex items-center gap-3 p-3 rounded-lg border-2 transition-all duration-200
                ${sectionColors[habit.section]}
              `}
            >
              <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
              
              <span className="text-lg">{sectionIcons[habit.section]}</span>
              
              <div className="flex-1">
                <span className="font-medium">{habit.name}</span>
                <span className="text-sm text-muted-foreground ml-2">
                  ({habit.section})
                </span>
              </div>
              
              <Button
                onClick={() => onDeleteHabit(habit.id)}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
