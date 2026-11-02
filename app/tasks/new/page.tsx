import Link from 'next/link';

import TaskForm from '@/app/components/TaskForm';

const NewTask = () => {
  return (
    <>
      <h1>Nova Tarefa</h1>
      <TaskForm />
      <Link href="/">Voltar para a lista de tarefas</Link>
    </>
  );
};

export default NewTask;
