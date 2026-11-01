import { createCallerInstance } from '@/server/api/root';
import TaskList from './components/TaskList';

export default async function Home() {
  const tasks = await createCallerInstance.task.list();

  return (
    <main>
      <TaskList tasks={tasks} />
    </main>
  );
}
