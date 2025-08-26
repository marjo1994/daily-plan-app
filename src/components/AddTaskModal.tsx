import React, { useState } from 'react';
import { Modal } from './Modal';
import { useTodoStore } from '../store/useTodoStore';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STATUS_OPTIONS = [
  { value: 'todo', label: 'To Do', color: '#f21e1e' },
  { value: 'inprogress', label: 'In Progress', color: '#0225ff' },
  { value: 'completed', label: 'Completed', color: '#05a301' },
] as const;

const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low', color: '#05a301' },
  { value: 'moderate', label: 'Moderate', color: '#3ABEFF' },
  { value: 'extreme', label: 'Extreme', color: '#f21e1e' },
] as const;

type StatusType = (typeof STATUS_OPTIONS)[number]['value'];
type PriorityType = (typeof PRIORITY_OPTIONS)[number]['value'];

export const AddTaskModal: React.FC<AddTaskModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { addTodo } = useTodoStore();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
  });
  const [status, setStatus] = useState<StatusType>('todo');
  const [priority, setPriority] = useState<PriorityType>('moderate');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setSubmitting(true);
    try {
      await addTodo({
        ...formData,
        status,
        priority,
      });

      setFormData({
        title: '',
        description: '',
        dueDate: '',
      });
      setStatus('todo');
      setPriority('moderate');

      onClose();
    } catch (error) {
      console.error('Failed to add todo:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Task">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            placeholder="Enter a title"
            required
            onChange={handleInputChange}
            disabled={submitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleInputChange}
            disabled={submitting}
          />
        </div>

        <div className="form-group checkbox-group">
          <label className="checkbox-group-label">Status</label>
          <div className="checkbox-options">
            {STATUS_OPTIONS.map(option => (
              <label
                key={option.value}
                className={`checkbox-option ${status === option.value ? 'selected' : ''}`}
                data-status={option.value}
              >
                <input
                  type="radio"
                  name="status"
                  value={option.value}
                  checked={status === option.value}
                  onChange={() => setStatus(option.value)}
                  disabled={submitting}
                  className="checkbox-input"
                />
                <span
                  className="checkbox-custom"
                  style={{
                    borderColor:
                      status === option.value ? option.color : undefined,
                    backgroundColor:
                      status === option.value ? option.color : undefined,
                  }}
                ></span>
                <span className="checkbox-label">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="form-group checkbox-group">
          <label className="checkbox-group-label">Priority</label>
          <div className="checkbox-options">
            {PRIORITY_OPTIONS.map(option => (
              <label
                key={option.value}
                className={`checkbox-option ${priority === option.value ? 'selected' : ''}`}
                data-priority={option.value}
              >
                <input
                  type="radio"
                  name="priority"
                  value={option.value}
                  checked={priority === option.value}
                  onChange={() => setPriority(option.value)}
                  disabled={submitting}
                  className="checkbox-input"
                />
                <span
                  className="checkbox-custom"
                  style={{
                    borderColor:
                      priority === option.value ? option.color : undefined,
                    backgroundColor:
                      priority === option.value ? option.color : undefined,
                  }}
                ></span>
                <span className="checkbox-label">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            placeholder="Enter task description"
            rows={8}
            required
            onChange={handleInputChange}
            disabled={submitting}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn">
            Done
          </button>
        </div>
      </form>
    </Modal>
  );
};
