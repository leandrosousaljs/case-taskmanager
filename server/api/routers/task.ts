import { tasks } from '@/server/data/task-store';
import { publicProcedure, router } from '../trpc';

export const taskRouter = router({
  list: publicProcedure.query(() => {
    return tasks;
  }),
});
