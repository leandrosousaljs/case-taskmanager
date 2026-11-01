import { Task } from '@/server/data/taskStore';

const TaskItem = ({ task }: { task: Task }) => {
  return (
    <div>
      <h2>{task.titulo}</h2>
      {task.descricao && <p>{task.descricao}</p>}
      <p>Data de criação: {task.dataCriacao.toLocaleDateString()}</p>
    </div>
  );
};

export default TaskItem;
