import { z } from 'zod';
import { TRPCError } from '@trpc/server';

import { tasks } from '@/server/data/taskStore';
import { publicProcedure, router } from '../trpc';

export const taskRouter = router({
  list: publicProcedure.query(() => {
    return tasks;
  }),

  listPaginated: publicProcedure
    .input(
      z.object({
        offset: z.number().int().min(0).default(0),
        limit: z.number().int().min(1).max(50).default(10),
      }),
    )
    .query(({ input }) => {
      const items = tasks.slice(input.offset, input.offset + input.limit);

      const nextOffset = input.offset + items.length;
      const hasMore = nextOffset < tasks.length;

      return {
        items,
        nextOffset: hasMore ? nextOffset : null,
        hasMore,
      };
    }),

  getById: publicProcedure
    .input(
      z.object({
        id: z.string().trim().min(1, 'O ID é obrigatório'),
      }),
    )
    .query(({ input }) => {
      const task = tasks.find((t) => t.id === input.id);

      if (!task) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Tarefa não encontrada',
        });
      }

      return task;
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
        descricao: input.descricao,
        dataCriacao: new Date(),
      };

      tasks.unshift(newTask);

      return newTask;
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        titulo: z.string().trim().min(1, 'O título é obrigatório'),
        descricao: z.string().trim().optional(),
      }),
    )
    .mutation(({ input }) => {
      const task = tasks.find((t) => t.id === input.id);

      if (!task) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Tarefa não encontrada',
        });
      }

      task.titulo = input.titulo;
      task.descricao = input.descricao;

      return task;
    }),

  delete: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(({ input }) => {
      const taskIndex = tasks.findIndex((t) => t.id === input.id);

      if (taskIndex === -1) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Tarefa não encontrada',
        });
      }

      const deletedTask = tasks.splice(taskIndex, 1)[0];

      return deletedTask;
    }),
});
