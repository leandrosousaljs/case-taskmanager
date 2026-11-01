import { createCallerInstance } from '@/server/api/root';

export default async function Home() {
  const tasks = await createCallerInstance.task.list();

  return (
    <main>
      <div>
        {tasks.map((task) => (
          <div key={task.id}>{task.titulo}</div>
        ))}
      </div>
    </main>
  );
}
