type TaskStatus = 'todo' | 'inprogress' | 'completed';

type TaskPriority = 'low' | 'moderate' | 'extreme';

export interface Task {
  id: number;
  title: string;
  description: string;
  image: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
}
