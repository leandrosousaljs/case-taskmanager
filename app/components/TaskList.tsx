import { Task } from '@/server/data/taskStore';
import TaskItem from './TaskItem';

const TaskList = ({ tasks }: { tasks: Task[] }) => {
  return (
    <>
      {tasks.length === 0 ? (
        <div>Nenhuma tarefa encontrada.</div>
      ) : (
        <div>
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}
    </>
  );
};

export default TaskList;
