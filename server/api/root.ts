import { taskRouter } from './routers/task';
import { createCallerFactory, router } from './trpc';

export const appRouter = router({
  task: taskRouter,
});

const createCaller = createCallerFactory(appRouter);

export const createCallerInstance = createCaller({});

export type AppRouter = typeof appRouter;
