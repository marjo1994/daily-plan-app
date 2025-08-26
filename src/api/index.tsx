import { useQuery } from '@tanstack/react-query';
import type { Task } from '../types';

const BIN_ID = '68accf96ae596e708fd5c01e';
const MASTER_KEY =
  '$2a$10$TZSBh4LblnE7rgs.yRLL9ecUJjhqHQiDMP72tdIyXhkR98AjJBMcG';

const BASE_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const getTodos = async () => {
  try {
    const response = await fetch(`${BASE_URL}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': MASTER_KEY,
      },
      mode: 'cors',
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    //console.log('Todos:', data);
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

    const newTodo: Task = {
      ...todo,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedTodos = [...currentTodos, newTodo];
    const response = await fetch(`${BASE_URL}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': MASTER_KEY,
      },
      body: JSON.stringify(updatedTodos),
    });

    if (!response.ok) {
      throw new Error(`Failed to add todo: ${response.statusText}`);
    }
    return newTodo;
  } catch (error) {
    console.error('Error adding todo:', error);
    throw error;
  }
};

export const updateTodo = async (updatedTodo: Task): Promise<Task> => {
  try {
    const currentTodos = await getTodos();

    const updatedTodos = currentTodos.map((todo: Task) =>
      todo.id === updatedTodo.id
        ? { ...updatedTodo, updatedAt: new Date().toISOString() }
        : todo
    );
    const response = await fetch(`${BASE_URL}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': MASTER_KEY,
      },
      body: JSON.stringify(updatedTodos),
    });

    if (!response.ok) {
      throw new Error(`Failed to update todo: ${response.statusText}`);
    }
    return updatedTodo;
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
};
