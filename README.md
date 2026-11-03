# Task Manager

Aplicação de gerenciamento de tarefas desenvolvida com Next.js e tRPC, permite criar, visualizar, editar e excluir tarefas.

## Funcionalidades

- **Criar tarefas** — título e descrição.
- **Listar tarefas** — com scroll infinito e carregamento dinâmico.
- **Editar tarefas** — alterar título e descrição.
- **Excluir tarefas** — com confirmação.
- **Notificações toast** — feedback visual das ações.

## Tecnologias

- **Next.js 16** — framework React com App Router.
- **tRPC** — API type-safe.
- **TypeScript** — tipagem estática.
- **Zod** — validação de dados.
- **Tailwind CSS** — estilização.
- **shadcn/ui** — componentes de interface.
- **Sonner** — notificações toast.

## Como executar

Requisitos: Node.js 24 ou superior.

```bash
# Clonar o repositório
git clone https://github.com/leandrosousaljs/case-taskmanager.git

# Entrar na pasta do projeto
cd case-taskmanager

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

Acesse em [http://localhost:3000](http://localhost:3000).
