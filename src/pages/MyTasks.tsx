import { useEffect, useState } from 'react';
import deleteIcon from '../assets/deleteIcon.svg';
import modifyIcon from '../assets/editIcon.svg';
import pendingIcon from '../assets/pending-icon.svg';
import { useTodoStore } from '../store/useTodoStore';
import type { Task } from '../types';

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
            <div className="todo-card" key={task.id}>
              <div className="todo-content">
                <div className="todo-text">
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                </div>
                <div className="todo-img">
                  <img
                    className="thumbnail-img"
                    src={task.image}
                    alt={task.title}
                  />
                </div>
              </div>
              <div className="todo-information">
                <p>
                  Priority: <span>{task.priority}</span>
                </p>
                <p>
                  Status:{' '}
                  <span className={`status -${task.status}`}>
                    {task.status}
                  </span>
                </p>
                <p className="todo-date">Created on: 20/06/2023</p>
              </div>
            </div>
          </button>
        ))}
      </section>
      <section className="todo-info">
        {selectedTodo ? (
          <>
            <div className="todo-header">
              <div>
                <img src="" alt="" />
              </div>
              <div>
                <h2>{selectedTodo.title}</h2>
                <p>
                  Priority : <span>{selectedTodo.priority}</span>
                </p>
                <p>
                  Status :{' '}
                  <span className={`status -${selectedTodo.status}`}>
                    {selectedTodo.status}
                  </span>
                </p>
                <p className="todo-date">Created on: 20/06/2023</p>
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
                <div className="task-section">
                  <span className="section-label">
                    Deadline for Submissions:
                  </span>
                  <p className="task-content"></p>
                </div>
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
