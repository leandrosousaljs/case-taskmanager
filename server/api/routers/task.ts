import { tasks } from '@/server/data/task-store';
import { publicProcedure, router } from '../trpc';
import { z } from 'zod';

export const taskRouter = router({
  list: publicProcedure.query(() => {
    return tasks;
  }),

  create: publicProcedure
    .input(
      z.object({
        titulo: z.string().trim().min(1, 'O título é obrigatório'),
        descricao: z.string().trim().optional(),
      }),
    )
    .mutation(({ input }) => {
      const newTask = {
        id: crypto.randomUUID(),
        titulo: input.titulo,
        descricao: input.descricao || '',
        dataCriacao: new Date(),
      };

      tasks.push(newTask);

      return newTask;
    }),
});
