import Link from 'next/link';

import TaskForm from '@/app/components/TaskForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

const NewTask = () => {
  return (
    <main className="container mx-auto px-4 py-8 max-w-2xl">
      <Button variant="ghost" asChild className="mb-6 -ml-4 gap-2">
        <Link href="/">
          <ArrowLeft className="w-4 h-4" />
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Nova Tarefa</CardTitle>
        </CardHeader>
        <CardContent>
          <TaskForm />
        </CardContent>
      </Card>
    </main>
  );
};

export default NewTask;
