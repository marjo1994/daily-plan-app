import { useEffect } from 'react';
import deleteIcon from '../assets/deleteIcon.svg';
import modifyIcon from '../assets/editIcon.svg';
import pendingIcon from '../assets/pending-icon.svg';
import { useTodoStore } from '../store/useTodoStore';
import type { Task } from '../types';

export const MyTasks = () => {
  const { todos, isLoading, isError, error, fetchTodos } = useTodoStore();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error}</div>;

  console.log(todos);
  return (
    <div className="my-tasks">
      <section className="todos">
        <h2>My Tasks</h2>
        {todos.map((task: Task) => (
          <div className="todo-card" key={task.id}>
            <div className="todo-status">
              <img src={pendingIcon} alt="progress icon" />
            </div>
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
                <span className={`status -${task.status}`}>{task.status}</span>
              </p>
              <p className="todo-date">Created on: 20/06/2023</p>
            </div>
          </div>
        ))}
      </section>
      <section className="todo-info">
        <div className="todo-header">
          <div>
            <img src="" alt="" />
          </div>
          <div>
            <h2>Title</h2>
            <p>
              Priority : <span>Extreme</span>
            </p>
            <p>
              Status : <span className="status -inprogress">In progress</span>
            </p>
            <p className="todo-date">Created on: 20/06/2023</p>
          </div>
        </div>
        <div className="todo-large-description">
          <div>
            <div className="task-section">
              <span className="section-label">Task Title:</span>
              <p className="task-content">Document Submission</p>
            </div>

            <div className="task-section">
              <span className="section-label">Objective:</span>
              <p className="task-content">
                To submit required documents for something important
              </p>
            </div>

            <div className="task-section">
              <span className="section-label">Task Description:</span>
              <p className="task-content">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English.
              </p>
            </div>

            <div className="task-section">
              <span className="section-label">Additional Notes:</span>
              <ul className="task-content">
                <li>Note1</li>
                <li>Note2</li>
                <li>Note3</li>
              </ul>
            </div>
            <div className="task-section">
              <span className="section-label">Deadline for Submissions:</span>
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
      </section>
    </div>
  );
};
