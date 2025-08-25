import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ProgressProvider from '../utils/ProgressProvider.js';
import type { Task } from '../types.js';

export const ProgressBar = ({ data }: { data: Task[] }) => {
  const completedTasks = data.filter(i => i.status == 'completed').length;
  const inprogressTasks = data.filter(i => i.status == 'inprogress').length;
  const todoTasks = data.filter(i => i.status == 'todo').length;

  const total = data.length;

  const completedTasksPercentage = (completedTasks / total) * 100;
  const inprogressTasksPercentage = (inprogressTasks / total) * 100;
  const todoTasksPercentage = (todoTasks / total) * 100;

  return (
    <div className="circular-bars">
      <div className="circular-bar" style={{ width: 100, height: 100 }}>
        <ProgressProvider valueStart={0} valueEnd={completedTasksPercentage}>
          {(completedTasksPercentage: number) => (
            <CircularProgressbar
              value={completedTasksPercentage}
              text={`${completedTasksPercentage}%`}
              styles={{
                path: {
                  stroke: '#05a301',
                },
                text: {
                  fill: '#000000',
                },
              }}
            />
          )}
        </ProgressProvider>
        <div className="circular-bar-label">
          <div className="dot"></div>
          <span>Completed</span>
        </div>
      </div>
      <div className="circular-bar" style={{ width: 100, height: 100 }}>
        <ProgressProvider valueStart={0} valueEnd={inprogressTasksPercentage}>
          {(inprogressTasksPercentage: number) => (
            <CircularProgressbar
              value={inprogressTasksPercentage}
              text={`${inprogressTasksPercentage}%`}
              styles={{
                path: {
                  stroke: '#0225ff',
                },
                text: {
                  fill: '#000000',
                },
              }}
            />
          )}
        </ProgressProvider>
        <div className="circular-bar-label">
          <div className="dot"></div>
          <span>In progress</span>
        </div>
      </div>
      <div className="circular-bar" style={{ width: 100, height: 100 }}>
        <ProgressProvider valueStart={0} valueEnd={todoTasksPercentage}>
          {(todoTasksPercentage: number) => (
            <CircularProgressbar
              value={todoTasksPercentage}
              text={`${todoTasksPercentage}%`}
              styles={{
                path: {
                  stroke: '#f21e1e',
                },
                text: {
                  fill: '#000000',
                },
              }}
            />
          )}
        </ProgressProvider>
        <div className="circular-bar-label">
          <div className="dot"></div>
          <span>Not Started</span>
        </div>
      </div>
    </div>
  );
};
