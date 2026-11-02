'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { trpcClient } from '@/trpc/client';
import { TRPCClientError } from '@trpc/client';
import type { Task } from '@/server/data/taskStore';

type TaskFormProps = {
  task?: Task;
};

const TaskForm = ({ task }: TaskFormProps) => {
  const [titulo, setTitulo] = useState(task?.titulo ?? '');
  const [descricao, setDescricao] = useState(task?.descricao ?? '');
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
      if (task) {
        await trpcClient.task.update.mutate({
          id: task.id,
          titulo: titulo.trim(),
          descricao: descricao.trim(),
        });
      } else {
        await trpcClient.task.create.mutate({
          titulo: titulo.trim(),
          descricao: descricao.trim(),
        });
      }

      setSuccessMessage(task ? 'Tarefa atualizada com sucesso!' : 'Tarefa criada com sucesso!');
      router.push('/');
    } catch (error) {
      if (error instanceof TRPCClientError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(task ? 'Ocorreu um erro ao atualizar a tarefa.' : 'Ocorreu um erro ao criar a tarefa.');
      }
      console.error(task ? 'Erro ao atualizar a tarefa:' : 'Erro ao criar a tarefa:', error);
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
          {isLoading ? (task ? 'Salvando...' : 'Criando...') : task ? 'Salvar Alterações' : 'Criar Tarefa'}
        </button>
      </form>

      {errorMessage && <p role="alert">{errorMessage}</p>}
      {successMessage && <p role="status">{successMessage}</p>}
    </>
  );
};

export default TaskForm;
