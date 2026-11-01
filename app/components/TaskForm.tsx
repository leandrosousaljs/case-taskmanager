'use client';

import { useState } from 'react';

const TaskForm = () => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');

  return (
    <form>
      <input
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        required
        type="text"
        placeholder="Título da tarefa"
      />
      <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Descrição da tarefa" />
      <button type="submit">Criar</button>
    </form>
  );
};

export default TaskForm;
