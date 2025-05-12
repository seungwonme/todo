"use client";

/**
 * @file Todo.tsx
 * @description Todo 페이지 컴포넌트
 *
 * 완성된 Todo 앱을 표시하는 페이지 컴포넌트입니다.
 * 헤더와 푸터를 포함한 전체 레이아웃을 구성합니다.
 */

import { TodoApp } from "@/components/TodoApp";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Todo() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="bg-card shadow-sm py-4 border-b">
        <div className="container max-w-7xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-card-foreground">
            Next.js + Supabase TodoList
          </h1>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 py-8">
        <TodoApp />
      </main>

      <footer className="bg-card border-t py-4">
        <div className="container max-w-7xl mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2025 TodoList App. 모든 권리 보유.
        </div>
      </footer>
    </div>
  );
}
