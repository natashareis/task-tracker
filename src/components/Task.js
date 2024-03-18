import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

export const Task = ({ task, onDelete, onToggle }) => {
  const [reminder, setReminder] = useState(task.reminder);

  const toggleReminder = () => {
    const newReminderState = !reminder;
    setReminder(newReminderState);
    onToggle(task.id, newReminderState);
  };

  const handleDelete = () => {
    onDelete(task.id);
    alert(`Task "${task.text}" deleted.`);
  };

  return (
    <div className={`task ${reminder ? 'reminder' : ''}`} onDoubleClick={toggleReminder}>
      <h3>
        {task.text}{' '}
        <FaTimes
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={handleDelete}
        />
      </h3>
      <p>{task.day}</p>
    </div>
  );
};
