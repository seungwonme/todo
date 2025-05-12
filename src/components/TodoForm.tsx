"use client";

/**
 * @file TodoForm.tsx
 * @description Todo 입력 폼 컴포넌트
 *
 * 새로운 할 일을 추가하기 위한 폼 컴포넌트입니다.
 * 할 일 내용을 입력하고 추가 버튼을 클릭하면 새로운 할 일이 추가됩니다.
 */

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface TodoFormProps {
  onAddTodo: (title: string) => void;
  isLoading?: boolean;
}

export function TodoForm({ onAddTodo, isLoading = false }: TodoFormProps) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTodo(title.trim());
      setTitle("");
    }
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            placeholder="새로운 할 일을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" size="sm" disabled={isLoading || !title.trim()}>
            <Plus className="h-4 w-4 mr-2" />
            추가
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
