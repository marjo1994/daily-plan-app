import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import todoIcon from '../assets/to-do-icon.svg';
import plusIcon from '../assets/plus-icon-2.svg';
import completedIcon from '../assets/completed-task-icon.svg';
import statusIcon from '../assets/status-icon.svg';
import imgPlaceholder from '../assets/img-placeholder.jpg';
import type { Task } from '../types';
import { getTodos } from '../api';
import { ProgressBar } from '../components/ProgressBar';
import { AddTaskModal } from '../components/AddTaskModal';
import { STATUS_LABELS } from '../constants/statusLabels';
import { PRIORITY_LABELS } from '../constants/priorityLabels';
import { formatUSDate } from '../utils/FormatDate';

export const MainDashboard = () => {
  const [isAddModalOpen, setAddModelOpen] = useState(false);

  const handleOpenAddModal = () => setAddModelOpen(true);
  const handleCloseAddModal = () => setAddModelOpen(false);

  const { data, isLoading, isError, error } = useQuery<Task[]>({
    queryKey: ['todos'],
    queryFn: getTodos,
  });

  //console.log('data', data);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  const completedTasks = data?.filter((i: Task) => i.status == 'completed');

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
              <span className="btn-label" onClick={handleOpenAddModal}>
                Add Task
              </span>
            </button>
          </div>
          <p className="section-date">
            20 June <span>Today</span>
          </p>
          {data?.map((task: Task) => (
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
          ))}
        </div>
        <div className="section-dashboard">
          <div className="section-header">
            <div className="section-name">
              <img src={statusIcon} alt="status icon" />
              <span className="section-label">Task Status</span>
            </div>
          </div>
          {data && <ProgressBar data={data} />}
        </div>
        <div className="section-dashboard">
          <div className="section-header">
            <div className="section-name">
              <img src={completedIcon} alt="status icon" />
              <span className="section-label">Completed Task</span>
            </div>
          </div>
          {completedTasks?.map((task: Task) => (
            <div key={task.id} className="todo-card completed">
              <div className="todo-content">
                <div className="todo-text">
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <div className="todo-information">
                    <p>
                      Status:{' '}
                      <span className="status -completed">
                        {' '}
                        {STATUS_LABELS[task.status]}
                      </span>
                    </p>
                    <p className="todo-date">
                      Created on: {formatUSDate(task.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="todo-img">
                  <img src={task.image} alt={task.title} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <AddTaskModal isOpen={isAddModalOpen} onClose={handleCloseAddModal} />
    </div>
  );
};
