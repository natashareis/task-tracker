import { Task } from './Task';

const Tasks = ({ tasks, onDelete, onToggle }) => {
  return (
    <>
      {tasks.map((task) => (
        <Task 
          key={task[0]} 
          task={{ 
            id: task[0], 
            text: task[1], 
            day: task[2], 
            reminder: task[3] 
          }} 
          onDelete={onDelete} 
          onToggle={onToggle} 
        />
      ))}
    </>
  );
};

export default Tasks;
