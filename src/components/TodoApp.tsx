"use client";

/**
 * @file TodoApp.tsx
 * @description Todo 앱 컴포넌트
 *
 * TodoForm과 TodoList를 조합하여 완전한 Todo 앱을 구성하는 컴포넌트입니다.
 * Supabase를 통해 데이터를 관리하며, 할 일 추가/수정/삭제 기능을 제공합니다.
 */

import { useEffect, useState } from "react";
import { TodoForm } from "@/components/TodoForm";
import { TodoList, Todo } from "@/components/TodoList";
import { createClient } from "@supabase/supabase-js";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

// Supabase 클라이언트 초기화
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setTodos(data || []);
    } catch (error) {
      console.error("할 일을 불러오는 중 오류가 발생했습니다:", error);
      toast.error("할 일을 불러오는 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const addTodo = async (title: string) => {
    try {
      const { data, error } = await supabase
        .from("todos")
        .insert([{ title }])
        .select()
        .single();

      if (error) throw error;

      setTodos([data, ...todos]);
      toast.success("할 일이 추가되었습니다.");
    } catch (error) {
      console.error("할 일을 추가하는 중 오류가 발생했습니다:", error);
      toast.error("할 일을 추가하는 중 오류가 발생했습니다.");
    }
  };

  const toggleTodo = async (id: string, isCompleted: boolean) => {
    try {
      const { error } = await supabase
        .from("todos")
        .update({ is_completed: isCompleted })
        .eq("id", id);

      if (error) throw error;

      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, is_completed: isCompleted } : todo,
        ),
      );
    } catch (error) {
      console.error("할 일 상태를 변경하는 중 오류가 발생했습니다:", error);
      toast.error("할 일 상태를 변경하는 중 오류가 발생했습니다.");
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const { error } = await supabase.from("todos").delete().eq("id", id);

      if (error) throw error;

      setTodos(todos.filter((todo) => todo.id !== id));
      toast.success("할 일이 삭제되었습니다.");
    } catch (error) {
      console.error("할 일을 삭제하는 중 오류가 발생했습니다:", error);
      toast.error("할 일을 삭제하는 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="container max-w-md mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-center mb-8">Todo 리스트</h1>
      <TodoForm onAddTodo={addTodo} isLoading={isLoading} />
      <TodoList
        todos={todos}
        isLoading={isLoading}
        onToggleTodo={toggleTodo}
        onDeleteTodo={deleteTodo}
      />
      <Toaster position="top-center" />
    </div>
  );
}
