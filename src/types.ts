type TaskStatus = 'todo' | 'inprogress' | 'completed';

type TaskPriority = 'low' | 'moderate' | 'extreme';

export interface Task {
  id: string;
  title: string;
  description: string;
  image?: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string;
  updatedAt: string;
  completedAt?: string | null;
  dueDate: string;
}

export interface TodoStore {
  todos: Task[];
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  fetchTodos: () => Promise<void>;
  addTodo: (
    todo: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>
  ) => Promise<void>;
}
