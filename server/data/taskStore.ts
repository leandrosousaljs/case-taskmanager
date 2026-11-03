export type Task = {
  id: string;
  titulo: string;
  descricao?: string;
  dataCriacao: Date;
};

type TaskStoreGlobal = typeof globalThis & {
  taskStore?: Task[];
};

const globalForTaskStore = globalThis as TaskStoreGlobal;

export const tasks: Task[] = (globalForTaskStore.taskStore ??= [
  {
    id: crypto.randomUUID(),
    titulo: 'Estudar Next.js',
    descricao: 'Revisar SSR',
    dataCriacao: new Date(),
  },
  {
    id: crypto.randomUUID(),
    titulo: 'Estudar React',
    descricao: 'Revisar Hooks',
    dataCriacao: new Date(),
  },
  {
    id: crypto.randomUUID(),
    titulo: 'Estudar TypeScript',
    descricao: 'Revisar Tipagem',
    dataCriacao: new Date(),
  },
  {
    id: crypto.randomUUID(),
    titulo: 'Estudar Tailwind CSS',
    descricao: 'Revisar Classes',
    dataCriacao: new Date(),
  },
  {
    id: crypto.randomUUID(),
    titulo: 'Estudar Prisma',
    descricao: 'Revisar ORM',
    dataCriacao: new Date(),
  },
  {
    id: crypto.randomUUID(),
    titulo: 'Estudar TRPC',
    descricao: 'Revisar API',
    dataCriacao: new Date(),
  },
  {
    id: crypto.randomUUID(),
    titulo: 'Estudar Zod',
    descricao: 'Revisar Validação',
    dataCriacao: new Date(),
  },
  {
    id: crypto.randomUUID(),
    titulo: 'Estudar Sonner',
    descricao: 'Revisar Toasts',
    dataCriacao: new Date(),
  },
  {
    id: crypto.randomUUID(),
    titulo: 'Estudar Lucide',
    descricao: 'Revisar Ícones',
    dataCriacao: new Date(),
  },
  {
    id: crypto.randomUUID(),
    titulo: 'Estudar React Hook Form',
    descricao: 'Revisar Formulários',
    dataCriacao: new Date(),
  },
  {
    id: crypto.randomUUID(),
    titulo: 'Estudar React Query',
    descricao: 'Revisar Cache',
    dataCriacao: new Date(),
  },
  {
    id: crypto.randomUUID(),
    titulo: 'Estudar Zustand',
    descricao: 'Revisar State Management',
    dataCriacao: new Date(),
  },
]);
