import { Task } from '@/server/data/taskStore';

const TaskList = ({ tasks }: { tasks: Task[] }) => {
  return (
    <>
      {tasks.length === 0 ? (
        <div>Nenhuma tarefa encontrada.</div>
      ) : (
        <div>
          {tasks.map((task) => (
            <div key={task.id}>{task.titulo}</div>
          ))}
        </div>
      )}
    </>
  );
};

export default TaskList;
