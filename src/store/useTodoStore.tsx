import { create } from 'zustand';
import type { Task, TodoStore } from '../types';
import { getTodos, addTodo as apiAddTodo } from '../api';

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
  addTodo: async (
    todoData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<void> => {
    set({ isLoading: true, isError: false, error: null });
    try {
      const newTodo = await apiAddTodo(todoData);

      set(state => ({
        todos: [...state.todos, newTodo],
        isLoading: false,
      }));
    } catch (error) {
      set({
        isError: true,
        error: error instanceof Error ? error.message : 'Failed to add todo',
        isLoading: false,
      });
      throw error;
    }
  },
}));
