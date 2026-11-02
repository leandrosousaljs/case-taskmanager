import Link from 'next/link';

import { Task } from '@/server/data/taskStore';
import DeleteTaskButton from './DeleteTaskButton';

const TaskItem = ({ task }: { task: Task }) => {
  return (
    <div>
      <h2>{task.titulo}</h2>
      {task.descricao && <p>{task.descricao}</p>}
      <p>Data de criação: {task.dataCriacao.toLocaleDateString('pt-BR')}</p>
      <Link href={`/tasks/${task.id}/edit`}>Editar</Link>
      <DeleteTaskButton id={task.id} />
    </div>
  );
};

export default TaskItem;
