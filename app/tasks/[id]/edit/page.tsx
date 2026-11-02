import Link from 'next/link';
import { notFound } from 'next/navigation';

import { createCallerInstance } from '@/server/api/root';
import { TRPCError } from '@trpc/server';
import TaskForm from '@/app/components/TaskForm';
import type { Task } from '@/server/data/taskStore';

type EditPageProps = {
  params: Promise<{ id: string }>;
};

export const instant = false;

const EditPage = async ({ params }: EditPageProps) => {
  const { id } = await params;

  let task: Task;

  try {
    task = await createCallerInstance.task.getById({ id });
  } catch (error) {
    if (error instanceof TRPCError && error.code === 'NOT_FOUND') {
      notFound();
    }

    throw error;
  }

  return (
    <div>
      <h2>Editar Tarefa</h2>
      <TaskForm task={task} />
      <Link href={'/'}>Voltar</Link>
    </div>
  );
};

export default EditPage;
