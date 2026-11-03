import Link from 'next/link';
import { notFound } from 'next/navigation';

import { createCallerInstance } from '@/server/api/root';
import { TRPCError } from '@trpc/server';
import TaskForm from '@/app/components/TaskForm';
import type { Task } from '@/server/data/taskStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

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
    <main className="container mx-auto px-4 py-8 max-w-2xl">
      <Button variant="ghost" asChild className="mb-6 -ml-4 gap-2">
        <Link href="/">
          <ArrowLeft className="w-4 h-4" />
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Editar Tarefa</CardTitle>
        </CardHeader>
        <CardContent>
          <TaskForm key={task.id} task={task} />
        </CardContent>
      </Card>
    </main>
  );
};

export default EditPage;
