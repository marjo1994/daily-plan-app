import { create } from 'zustand';
import type { Task, TodoStore } from '../types';
import { getTodos } from '../api';

export const useTodoStore = create<TodoStore>(set => ({
  todos: [],
  isLoading: false,
  isError: false,
  error: null,
  fetchTodos: async (): Promise<void> => {
    set({ isLoading: true, isError: false, error: null });
    try {
      const todos: Task[] = await getTodos();
      set({ todos, isLoading: false });
    } catch (error) {
      set({
        isError: true,
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false,
      });
    }
  },
}));
