import type { Task, DeleteResponse } from '../types';

const API_BASE = '/api/todos';

//const BIN_ID = '68accf96ae596e708fd5c01e';
//const MASTER_KEY = '$2a$10$TZSBh4LblnE7rgs.yRLL9ecUJjhqHQiDMP72tdIyXhkR98AjJBMcG';
//const API_BASE = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

export const getTodos = async (): Promise<Task[]> => {
  try {
    const response = await fetch(API_BASE, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    return data.record;
  } catch (error) {
    console.error('Could not fetch todos:', error);
    return [];
  }
};

export const addTodo = async (
  todo: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Task> => {
  try {
    const currentTodos = await getTodos();

    const response = await fetch(API_BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ todo, currentTodos }),
    });

    if (!response.ok) {
      throw new Error(`Failed to add todo: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding todo:', error);
    throw error;
  }
};

export const updateTodo = async (updatedTodo: Task): Promise<Task> => {
  try {
    const currentTodos = await getTodos();

    const response = await fetch(API_BASE, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ updatedTodo, currentTodos }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update todo: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
};

export const deleteTodo = async (todoId: string): Promise<DeleteResponse> => {
  try {
    const currentTodos = await getTodos();

    const response = await fetch(API_BASE, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ todoId, currentTodos }),
    });

    if (!response.ok) {
      throw new Error(`Failed to delete todo: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};
