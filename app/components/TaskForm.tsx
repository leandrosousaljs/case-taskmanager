'use client';

import { trpcClient } from '@/trpc/client';
import { TRPCClientError } from '@trpc/client';
import { useRouter } from 'next/navigation';

import React, { useState } from 'react';

const TaskForm = () => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const router = useRouter();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!titulo.trim()) return;

    setSuccessMessage('');
    setErrorMessage('');
    setIsLoading(true);

    try {
      await trpcClient.task.create.mutate({
        titulo: titulo.trim(),
        descricao: descricao.trim(),
      });

      setTitulo('');
      setDescricao('');
      setSuccessMessage('Tarefa criada com sucesso!');
      router.push('/');
      router.refresh();
    } catch (error) {
      if (error instanceof TRPCClientError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Ocorreu um erro ao criar a tarefa.');
      }
      console.error('Erro ao criar a tarefa:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
          type="text"
          placeholder="Título da tarefa"
        />
        <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Descrição da tarefa" />
        <button disabled={isLoading} type="submit">
          {isLoading ? 'Criando...' : 'Criar Tarefa'}
        </button>
      </form>

      {errorMessage && <p role="alert">{errorMessage}</p>}
      {successMessage && <p role="status">{successMessage}</p>}
    </>
  );
};

export default TaskForm;
