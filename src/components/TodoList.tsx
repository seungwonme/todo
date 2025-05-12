"use client";

/**
 * @file TodoList.tsx
 * @description Todo 리스트 컴포넌트
 *
 * 모든 할 일 항목을 표시하는 컴포넌트입니다.
 * 각 항목은 TodoItem 컴포넌트로 렌더링됩니다.
 */

import { TodoItem } from "@/components/TodoItem";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export interface Todo {
  id: string;
  title: string;
  is_completed: boolean;
  created_at?: string;
  updated_at?: string;
}

interface TodoListProps {
  todos: Todo[];
  isLoading?: boolean;
  onToggleTodo: (id: string, isCompleted: boolean) => void;
  onDeleteTodo: (id: string) => void;
}

export function TodoList({
  todos,
  isLoading = false,
  onToggleTodo,
  onDeleteTodo,
}: TodoListProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>할 일 목록</CardTitle>
          <CardDescription>로딩 중...</CardDescription>
        </CardHeader>
        <CardContent>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between py-3 px-1 border-b border-gray-100"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="h-4 w-4 rounded" />
                <Skeleton className="h-4 w-48" />
              </div>
              <Skeleton className="h-8 w-8 rounded" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>할 일 목록</CardTitle>
        <CardDescription>해야 할 일들을 관리해보세요.</CardDescription>
      </CardHeader>
      <CardContent>
        {todos.length === 0 ? (
          <p className="text-center text-muted-foreground py-6">
            할 일이 없습니다. 새로운 할 일을 추가해주세요.
          </p>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              title={todo.title}
              isCompleted={todo.is_completed}
              onToggle={onToggleTodo}
              onDelete={onDeleteTodo}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
}
