import Link from 'next/link';
import { connection } from 'next/server';

import { createCallerInstance } from '@/server/api/root';
import TaskList from './components/TaskList';

export const instant = false;

export default async function Home() {
  await connection();

  const tasks = await createCallerInstance.task.list();

  return (
    <main>
      <Link href="/tasks/new" className="bg-blue-500">
        Nova Tarefa
      </Link>
      <TaskList tasks={tasks} />
    </main>
  );
}
