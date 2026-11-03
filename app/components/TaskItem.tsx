import Link from 'next/link';

import { Task } from '@/server/data/taskStore';
import DeleteTaskButton from './DeleteTaskButton';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';

const TaskItem = ({ task }: { task: Task }) => {
  const dataFormatada = new Date(task.dataCriacao).toLocaleDateString('pt-BR');

  return (
    <Card className="overflow-hidden border-l-4 border-l-amber-500 hover:shadow-md transition-shadow">
      <CardContent className="pt-0">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="font-semibold text-lg text-foreground leading-tight flex-1">{task.titulo}</h3>
          <Badge variant="secondary" className="shrink-0">
            {dataFormatada}
          </Badge>
        </div>

        {task.descricao && (
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">{task.descricao}</p>
        )}
      </CardContent>

      <CardFooter className="flex gap-2 justify-end border-t pt-4">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/tasks/${task.id}/edit`} className="flex items-center gap-2">
            <Pencil className="w-4 h-4" />
            Editar
          </Link>
        </Button>
        <DeleteTaskButton id={task.id} />
      </CardFooter>
    </Card>
  );
};

export default TaskItem;
