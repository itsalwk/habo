import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Edit2, Check, X } from "lucide-react";

interface Goal {
  id: string;
  title: string;
  description: string;
}

interface GoalCardProps {
  goal: Goal;
  onUpdate: (goal: Goal) => void;
}

export function GoalCard({ goal, onUpdate }: GoalCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(goal.title);
  const [editDescription, setEditDescription] = useState(goal.description);

  const handleSave = () => {
    onUpdate({
      ...goal,
      title: editTitle,
      description: editDescription
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(goal.title);
    setEditDescription(goal.description);
    setIsEditing(false);
  };

  return (
    <Card className="p-4 h-48 flex flex-col border-2 border-muted bg-card hover:shadow-sm transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-muted-foreground">
          goal #{goal.id}
        </h3>
        
        {!isEditing ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
          >
            <Edit2 className="h-3 w-3" />
          </Button>
        ) : (
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSave}
              className="h-6 w-6 p-0 text-green-600 hover:text-green-700"
            >
              <Check className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancel}
              className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>

      <div className="flex-1">
        {!isEditing ? (
          <div className="space-y-2">
            <h4 className="font-medium text-foreground leading-tight">
              {goal.title || "Click to add a goal"}
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {goal.description || "Add a description for your goal..."}
            </p>
          </div>
        ) : (
          <div className="space-y-2 h-full">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Goal title..."
              className="w-full text-sm font-medium bg-transparent border-none outline-none focus:ring-0 p-0 placeholder:text-muted-foreground"
            />
            <Textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              placeholder="Goal description..."
              className="flex-1 text-sm resize-none border-none bg-transparent shadow-none focus-visible:ring-0 p-0 placeholder:text-muted-foreground"
            />
          </div>
        )}
      </div>
    </Card>
  );
}