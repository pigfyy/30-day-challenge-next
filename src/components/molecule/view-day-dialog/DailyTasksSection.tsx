import React, { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";
import { Input } from "../../ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, X, Plus, Check } from "lucide-react";
import { DailyTaskOptional } from "@/lib/db/drizzle/zod";
import cuid from "cuid";

interface DailyTasksListProps {
  tasks: DailyTaskOptional[];
  onTasksChange: (tasks: DailyTaskOptional[]) => void;
}

const DailyTasksList = ({ tasks, onTasksChange }: DailyTasksListProps) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const addTask = () => {
    if (newTaskTitle.trim()) {
      const newTask: DailyTaskOptional = {
        id: cuid(),
        title: newTaskTitle.trim(),
        completed: false,
        order: tasks.length,
      };
      onTasksChange([...tasks, newTask]);
      setNewTaskTitle("");
    }
  };

  const toggleTask = (taskId: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task,
    );
    onTasksChange(updatedTasks);
  };

  const removeTask = (taskId: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    const reorderedTasks = updatedTasks.map((task, index) => ({
      ...task,
      order: index,
    }));
    onTasksChange(reorderedTasks);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div key={task.id} className="group flex items-center gap-3">
          <Checkbox
            checked={task.completed}
            onCheckedChange={() => toggleTask(task.id)}
            className="flex-shrink-0"
          />
          <span
            className={`flex-1 ${
              task.completed
                ? "text-gray-500 line-through"
                : "text-gray-900 dark:text-gray-100"
            }`}
          >
            {task.title}
          </span>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => removeTask(task.id)}
            className="opacity-0 transition-opacity group-hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}

      <div
        className={`flex items-center gap-3 ${
          tasks.length > 0
            ? "border-t border-gray-200 dark:border-gray-700"
            : ""
        }`}
      >
        <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center">
          <Plus className="h-3 w-3 text-gray-400" />
        </div>
        <Input
          placeholder="Add a new task..."
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 border-none px-0 shadow-none focus-visible:ring-0"
        />
        {newTaskTitle.trim() && (
          <Button size="sm" onClick={addTask} variant="ghost">
            <Check className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

interface DailyTasksSectionProps {
  tasks: DailyTaskOptional[];
  onTasksChange: (tasks: DailyTaskOptional[]) => void;
}

export const DailyTasksSection = ({
  tasks,
  onTasksChange,
}: DailyTasksSectionProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible defaultOpen={true} open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex items-center gap-8">
        <span className="text-md font-bold">Daily Tasks</span>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <Separator className={`mt-1 ${tasks.length === 0 ? "mb-2" : "mb-3"}`} />
      <CollapsibleContent>
        <DailyTasksList tasks={tasks} onTasksChange={onTasksChange} />
      </CollapsibleContent>
    </Collapsible>
  );
};
