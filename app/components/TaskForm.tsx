'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { trpcClient } from '@/trpc/client';
import type { Task } from '@/server/data/taskStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/toast';

type TaskFormProps = {
  task?: Task;
};

const TaskForm = ({ task }: TaskFormProps) => {
  const [titulo, setTitulo] = useState(task?.titulo ?? '');
  const [descricao, setDescricao] = useState(task?.descricao ?? '');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();

  useEffect(() => {
    setTitulo(task?.titulo ?? '');
    setDescricao(task?.descricao ?? '');
  }, [task?.id]);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!titulo.trim()) {
      showToast('O título é obrigatório.', 'error');
      return;
    }

    setIsLoading(true);

    try {
      if (task) {
        await trpcClient.task.update.mutate({
          id: task.id,
          titulo: titulo.trim(),
          descricao: descricao.trim(),
        });
        showToast('Tarefa atualizada com sucesso!', 'success');
      } else {
        await trpcClient.task.create.mutate({
          titulo: titulo.trim(),
          descricao: descricao.trim(),
        });
        showToast('Tarefa criada com sucesso!', 'success');
      }

      router.push('/');
    } catch (error) {
      showToast(task ? 'Erro ao atualizar a tarefa.' : 'Erro ao criar a tarefa.', 'error');
      console.error(task ? 'Erro ao atualizar a tarefa:' : 'Erro ao criar a tarefa:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="space-y-2">
        <label htmlFor="titulo" className="text-sm font-medium text-foreground">
          Título
        </label>
        <Input
          id="titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
          type="text"
          placeholder="Digite o título da tarefa"
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="descricao" className="text-sm font-medium text-foreground">
          Descrição
        </label>
        <Textarea
          id="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Digite a descrição da tarefa"
          disabled={isLoading}
        />
      </div>

      <Button disabled={isLoading} type="submit" size="lg" className="w-full mt-2">
        {isLoading ? (task ? 'Salvando...' : 'Criando...') : task ? 'Salvar Alterações' : 'Criar Tarefa'}
      </Button>
    </form>
  );
};

export default TaskForm;
