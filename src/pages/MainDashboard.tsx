import { useQuery } from '@tanstack/react-query';
import todoIcon from '../assets/to-do-icon.svg';
import plusIcon from '../assets/plus-icon-2.svg';
import pendingIcon from '../assets/pending-icon.svg';
import completedIcon from '../assets/completed-task-icon.svg';
import statusIcon from '../assets/status-icon.svg';
import completedBarIcon from '../assets/completed-bar-icon.svg';
import type { Task } from '../types';
import { fetchTasks } from '../api';

export const MainDashboard = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTasks,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="main-dashboard">
      <h1 className="welcome-text">Welcome back, Sundar</h1>
      <div className="content-dashboard">
        <div className="section-dashboard">
          <div className="section-header">
            <div className="section-name">
              <img src={todoIcon} alt="to do icon" />
              <span className="section-label">To-Do</span>
            </div>
            <button className="btn">
              <span className="btn-icon">
                <img src={plusIcon} alt="plus icon" />
              </span>
              <span className="btn-label">Add Task</span>
            </button>
          </div>
          <p className="section-date">
            20 June <span>Today</span>
          </p>
          {data.map((task: Task) => (
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
                  <span className={`status -${task.status}`}>
                    {task.status}
                  </span>
                </p>
                <p className="todo-date">Created on: 20/06/2023</p>
              </div>
            </div>
          ))}
        </div>
        <div className="section-dashboard">
          <div className="section-header">
            <div className="section-name">
              <img src={statusIcon} alt="status icon" />
              <span className="section-label">Task Status</span>
            </div>
          </div>
        </div>
        <div className="section-dashboard">
          <div className="section-header">
            <div className="section-name">
              <img src={completedIcon} alt="status icon" />
              <span className="section-label">Completed Task</span>
            </div>
          </div>

          <div className="todo-card completed">
            <div className="todo-status">
              <img src={completedBarIcon} alt="completed bar icon" />
            </div>
            <div className="todo-content">
              <div className="todo-text">
                <h3>Conduct meeting</h3>
                <p>
                  Buy gifts on the way and pick up cake from the bakery. (6 PM |
                  Fresh Elements).....
                </p>
                <div className="todo-information">
                  <p>
                    Status:{' '}
                    <span className="status -completed">Not Started</span>
                  </p>
                  <p className="todo-date">Created on: 20/06/2023</p>
                </div>
              </div>
              <div className="todo-img">
                <img src="" alt="" />
              </div>
            </div>
          </div>
          <div className="todo-card completed">
            <div className="todo-status">
              <img src={completedBarIcon} alt="completed bar icon" />
            </div>
            <div className="todo-content">
              <div className="todo-text">
                <h3>Conduct meeting</h3>
                <p>
                  Buy gifts on the way and pick up cake from the bakery. (6 PM |
                  Fresh Elements).....
                </p>
                <div className="todo-information">
                  <p>
                    Status:{' '}
                    <span className="status -completed">Not Started</span>
                  </p>
                  <p className="todo-date">Created on: 20/06/2023</p>
                </div>
              </div>
              <div className="todo-img">
                <img src="" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
