import { publicProcedure, router } from '../trpc';

export const taskRouter = router({
  list: publicProcedure.query(() => {
    return [
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
    ];
  }),
});
