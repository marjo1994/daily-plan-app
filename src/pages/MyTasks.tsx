import { useEffect, useState } from 'react';
import deleteIcon from '../assets/deleteIcon.svg';
import modifyIcon from '../assets/editIcon.svg';
import imgPlaceholder from '../assets/img-placeholder.jpg';
import { useTodoStore } from '../store/useTodoStore';
import type { Task } from '../types';
import { PRIORITY_LABELS } from '../constants/priorityLabels';
import { STATUS_LABELS } from '../constants/statusLabels';
import { formatUSDate } from '../utils/FormatDate';

export const MyTasks = () => {
  const [selectedTodoId, setSelectedTodoId] = useState<string | null>(null);
  const { todos, isLoading, isError, error, fetchTodos } = useTodoStore();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  useEffect(() => {
    if (todos.length > 0 && !selectedTodoId) {
      setSelectedTodoId(todos[0].id);
    }
  }, [todos, selectedTodoId]);

  const selectedTodo = selectedTodoId
    ? todos.find(todo => todo.id === selectedTodoId)
    : null;

  const handleTodoClick = (todoId: string) => {
    setSelectedTodoId(todoId);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error}</div>;

  return (
    <div className="my-tasks">
      <section className="todos">
        <h2>My Tasks</h2>
        {todos.map((task: Task) => (
          <button
            key={task.id}
            className="todo-link"
            onClick={() => handleTodoClick(task.id)}
          >
            <div className={`todo-card ${task.priority}`} key={task.id}>
              <div className="todo-content">
                <div className="todo-text">
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                </div>
                <div className="todo-img">
                  {task.image ? (
                    <img
                      className="thumbnail-img"
                      src={task.image}
                      alt={task.title}
                    />
                  ) : (
                    <img src={imgPlaceholder} alt="Placeholder img" />
                  )}
                </div>
              </div>
              <div className="todo-information">
                <p>
                  Priority:{' '}
                  <span className={`priority -${task.priority}`}>
                    {PRIORITY_LABELS[task.priority]}
                  </span>
                </p>
                <p>
                  Status:{' '}
                  <span className={`status -${task.status}`}>
                    {STATUS_LABELS[task.status]}
                  </span>
                </p>
                <p className="todo-date">
                  Created on: {formatUSDate(task.createdAt)}
                </p>
              </div>
            </div>
          </button>
        ))}
      </section>
      <section className="todo-info">
        {selectedTodo ? (
          <>
            <div className="todo-header">
              <div className="todo-img">
                {selectedTodo.image ? (
                  <img
                    className="thumbnail-img"
                    src={selectedTodo.image}
                    alt={selectedTodo.title}
                  />
                ) : (
                  <img src={imgPlaceholder} alt="Placeholder img" />
                )}
              </div>
              <div>
                <h2>{selectedTodo.title}</h2>
                <p>
                  Priority :{' '}
                  <span className={`priority -${selectedTodo.priority}`}>
                    {PRIORITY_LABELS[selectedTodo.priority]}
                  </span>
                </p>
                <p>
                  Status :{' '}
                  <span className={`status -${selectedTodo.status}`}>
                    {STATUS_LABELS[selectedTodo.status]}
                  </span>
                </p>
                <p className="todo-date">
                  Created on: {formatUSDate(selectedTodo.createdAt)}
                </p>
              </div>
            </div>
            <div className="todo-large-description">
              <div>
                <div className="task-section">
                  <span className="section-label">Task Title:</span>
                  <p className="task-content">{selectedTodo.title}</p>
                </div>
                <div className="task-section">
                  <span className="section-label">Task Description:</span>
                  <p className="task-content">{selectedTodo.description}</p>
                </div>
                {selectedTodo.dueDate && (
                  <div className="task-section">
                    <span className="section-label">
                      Deadline for Submissions:
                    </span>
                    <p className="task-content">{selectedTodo.dueDate}</p>
                  </div>
                )}
              </div>
              <div className="actions-todo">
                <button type="button">
                  <img src={deleteIcon} alt="delete icon" />
                </button>
                <button type="button">
                  <img src={modifyIcon} alt="modify icon" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div>Select a task to view details</div>
        )}
      </section>
    </div>
  );
};
