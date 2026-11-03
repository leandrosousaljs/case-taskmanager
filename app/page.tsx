import Link from 'next/link';
import { connection } from 'next/server';

import { createCallerInstance } from '@/server/api/root';
import TaskList from './components/TaskList';
import { Button } from '@/components/ui/button';

export const instant = false;

export default async function Home() {
  await connection();

  const tasks = await createCallerInstance.task.list();

  return (
    <main className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Minhas Tarefas</h1>
        </div>
        <Button asChild className="gap-2">
          <Link href="/tasks/new">Nova Tarefa</Link>
        </Button>
      </div>

      <TaskList tasks={tasks} />
    </main>
  );
}
