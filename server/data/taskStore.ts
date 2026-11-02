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
    id: '1',
    titulo: 'Estudar Next.js',
    descricao: 'Revisar SSR',
    dataCriacao: new Date(),
  },
  {
    id: '2',
    titulo: 'Implementar tRPC',
    descricao: 'Configurar o backend',
    dataCriacao: new Date(),
  },
]);
