"use client";

/**
 * @file Todo.tsx
 * @description Todo 페이지 컴포넌트
 *
 * 완성된 Todo 앱을 표시하는 페이지 컴포넌트입니다.
 * 헤더와 푸터를 포함한 전체 레이아웃을 구성합니다.
 */

import { TodoApp } from "@/components/TodoApp";

export default function Todo() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-white shadow-sm py-4 border-b">
        <div className="container max-w-7xl mx-auto px-4">
          <h1 className="text-xl font-semibold text-gray-800">
            Next.js + Supabase TodoList
          </h1>
        </div>
      </header>

      <main className="flex-1 py-8">
        <TodoApp />
      </main>

      <footer className="bg-white border-t py-4">
        <div className="container max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
          © 2025 TodoList App. 모든 권리 보유.
        </div>
      </footer>
    </div>
  );
}
