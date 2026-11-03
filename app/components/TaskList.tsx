'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Task } from '@/server/data/taskStore';
import TaskItem from './TaskItem';
import { Inbox } from 'lucide-react';
import { useToast } from '@/components/ui/toast';
import { trpcClient } from '@/trpc/client';
import { Spinner } from '@/components/ui/spinner';

type TaskListProps = {
  initialTasks: Task[];
  initialOffset: number | null;
  initialHasMore: boolean;
};

const TaskList = ({ initialTasks, initialOffset, initialHasMore }: TaskListProps) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [offset, setOffset] = useState(initialOffset);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();
  const observerTarget = useRef<HTMLDivElement>(null);
  const isLoadingRef = useRef(false);

  const loadMore = useCallback(async () => {
    if (!hasMore || isLoadingRef.current || offset === null) return;

    isLoadingRef.current = true;
    setIsLoading(true);

    try {
      const response = await trpcClient.task.listPaginated.query({
        offset,
        limit: 10,
      });

      const newTasks = response.items.map((task) => ({
        ...task,
        dataCriacao: new Date(task.dataCriacao),
      }));

      setTasks((prev) => [...prev, ...newTasks]);
      setOffset(response.nextOffset);
      setHasMore(response.hasMore);
    } catch (error) {
      showToast('Erro ao carregar tarefas.', 'error');
      console.error('Erro ao carregar tarefas:', error);
    } finally {
      isLoadingRef.current = false;
      setIsLoading(false);
    }
  }, [hasMore, offset, showToast]);

  useEffect(() => {
    const target = observerTarget.current;

    if (!target || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      {
        rootMargin: '200px',
      },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  useEffect(() => {
    setTasks(initialTasks);
    setOffset(initialOffset);
    setHasMore(initialHasMore);
  }, [initialTasks, initialOffset, initialHasMore]);

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Inbox className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Nenhuma tarefa encontrada</h3>
        <p className="text-muted-foreground text-sm max-w-xs">
          Comece criando uma nova tarefa para organizar suas atividades.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
        {tasks.map((task) => (
          <>
            <TaskItem key={task.id} task={task} />
          </>
        ))}
      </div>
      <div ref={observerTarget} className="py-4 text-center">
        {isLoading && (
          <div className="flex justify-center py-4">
            <Spinner className="size-6" />
          </div>
        )}
      </div>
    </>
  );
};

export default TaskList;
