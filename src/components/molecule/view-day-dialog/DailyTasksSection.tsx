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
import { ChevronDown, X, Plus, Check, Edit2 } from "lucide-react";
import { DailyTaskOptional } from "@/lib/db/drizzle/zod";
import cuid from "cuid";

interface TaskItemProps {
  task: DailyTaskOptional;
  onToggleTask: (taskId: string) => void;
  onRemoveTask: (taskId: string) => void;
  onUpdateTask: (taskId: string, title: string) => void;
}

const TaskItem = ({
  task,
  onToggleTask,
  onRemoveTask,
  onUpdateTask,
}: TaskItemProps) => {
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  const startEditing = (task: DailyTaskOptional, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingTaskId(task.id);
    setEditingTitle(task.title);
  };

  const saveEdit = () => {
    if (editingTitle.trim() && editingTaskId) {
      onUpdateTask(editingTaskId, editingTitle.trim());
    }
    setEditingTaskId(null);
    setEditingTitle("");
  };

  const cancelEdit = () => {
    setEditingTaskId(null);
    setEditingTitle("");
  };

  const handleEditKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      saveEdit();
    } else if (e.key === "Escape") {
      cancelEdit();
    }
  };

  const handleTaskClick = (taskId: string, e: React.MouseEvent) => {
    if (
      (e.target as HTMLElement).closest("button") ||
      (e.target as HTMLElement).closest("input")
    ) {
      return;
    }
    onToggleTask(taskId);
  };

  return (
    <div
      key={task.id}
      className="group flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50 sm:py-1"
      onClick={(e) => handleTaskClick(task.id, e)}
    >
      <Checkbox
        checked={task.completed}
        onCheckedChange={() => onToggleTask(task.id)}
        className="shrink-0"
        onClick={(e) => e.stopPropagation()}
      />

      {editingTaskId === task.id ? (
        <div className="flex flex-1 items-center gap-2">
          <Input
            value={editingTitle}
            onChange={(e) => setEditingTitle(e.target.value)}
            onKeyDown={handleEditKeyPress}
            onBlur={saveEdit}
            className="h-6 flex-1 border-none bg-transparent px-0 shadow-none focus-visible:ring-0"
            autoFocus
            onClick={(e) => e.stopPropagation()}
          />
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              saveEdit();
            }}
            className="h-6 w-6 p-0"
          >
            <Check size={12} />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              cancelEdit();
            }}
            className="h-6 w-6 p-0"
          >
            <X size={12} />
          </Button>
        </div>
      ) : (
        <>
          <span
            className={`flex-1 select-none ${
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
            onClick={(e) => startEditing(task, e)}
            className="h-6 w-6 p-0 opacity-0 transition-opacity group-hover:opacity-100"
          >
            <Edit2 size={12} />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              onRemoveTask(task.id);
            }}
            className="h-6 w-6 p-0 opacity-0 transition-opacity group-hover:opacity-100"
          >
            <X size={12} />
          </Button>
        </>
      )}
    </div>
  );
};

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

  const updateTask = (taskId: string, title: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, title: title } : task,
    );
    onTasksChange(updatedTasks);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  return (
    <>
      <div className="space-y-1">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleTask={toggleTask}
            onRemoveTask={removeTask}
            onUpdateTask={updateTask}
          />
        ))}
      </div>

      <div
        className={`flex items-center gap-3 px-2 py-1 ${
          tasks.length > 0
            ? "mt-3 border-t border-gray-200 pt-2 dark:border-gray-700"
            : ""
        }`}
      >
        <div className="flex h-4 w-4 shrink-0 items-center justify-center">
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
    </>
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
