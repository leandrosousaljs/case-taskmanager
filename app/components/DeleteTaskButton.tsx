'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { trpcClient } from '@/trpc/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { Trash2 } from 'lucide-react';

const DeleteTaskButton = ({ id }: { id: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();

  const handleClick = async () => {
    const confirmDelete = window.confirm('Deseja realmente excluir esta tarefa?');
    if (!confirmDelete) return;

    setIsLoading(true);

    try {
      await trpcClient.task.delete.mutate({ id });
      showToast('Tarefa excluída com sucesso!', 'success');
      router.refresh();
    } catch (error) {
      showToast('Ocorreu um erro ao excluir a tarefa.', 'error');
      console.error('Erro ao excluir a tarefa:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleClick} disabled={isLoading} variant="destructive" size="sm" className="gap-2">
      <Trash2 className="w-4 h-4" />
      {isLoading ? 'Excluindo...' : 'Excluir'}
    </Button>
  );
};

export default DeleteTaskButton;
