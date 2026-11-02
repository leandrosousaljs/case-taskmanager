'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { trpcClient } from '@/trpc/client';
import { TRPCClientError } from '@trpc/client';

const DeleteTaskButton = ({ id }: { id: string }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleClick = async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      await trpcClient.task.delete.mutate({ id });

      router.refresh();
    } catch (error) {
      if (error instanceof TRPCClientError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Ocorreu um erro ao excluir a tarefa.');
      }
      console.error('Erro ao excluir a tarefa:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleClick} disabled={isLoading}>
        {isLoading ? 'Excluindo...' : 'Excluir'}
      </button>
      {errorMessage && <p role="alert">{errorMessage}</p>}
    </div>
  );
};

export default DeleteTaskButton;
