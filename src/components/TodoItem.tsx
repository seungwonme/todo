/**
 * @file TodoItem.tsx
 * @description Todo 아이템 컴포넌트
 *
 * 개별 할 일 항목을 표시하고 상태를 변경하는 컴포넌트입니다.
 * 체크박스로 완료 상태를 토글하고, 삭제 버튼으로 항목을 제거합니다.
 */

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TodoItemProps {
  id: string;
  title: string;
  isCompleted: boolean;
  onToggle: (id: string, isCompleted: boolean) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({
  id,
  title,
  isCompleted,
  onToggle,
  onDelete,
}: TodoItemProps) {
  const [checked, setChecked] = useState(isCompleted);

  const handleToggle = () => {
    const newCheckedState = !checked;
    setChecked(newCheckedState);
    onToggle(id, newCheckedState);
  };

  return (
    <div className="flex items-center justify-between py-3 px-1 border-b border-gray-100">
      <div className="flex items-center gap-3">
        <Checkbox
          id={`todo-${id}`}
          checked={checked}
          onCheckedChange={handleToggle}
        />
        <label
          htmlFor={`todo-${id}`}
          className={cn(
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 transition-all",
            checked && "line-through text-muted-foreground",
          )}
        >
          {title}
        </label>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(id)}
        aria-label="할 일 삭제"
      >
        <Trash2 className="h-4 w-4 text-muted-foreground" />
      </Button>
    </div>
  );
}
