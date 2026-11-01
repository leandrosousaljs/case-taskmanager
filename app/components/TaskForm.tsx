'use client';

import { trpcClient } from '@/trpc/client';
import React, { useState } from 'react';

const TaskForm = () => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!titulo.trim()) return;
    setIsLoading(true);

    try {
      await trpcClient.task.create.mutate({
        titulo: titulo.trim(),
        descricao: descricao.trim(),
      });

      setTitulo('');
      setDescricao('');
    } catch (error) {
      console.error('Erro ao criar a tarefa:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
  );
};

export default TaskForm;
