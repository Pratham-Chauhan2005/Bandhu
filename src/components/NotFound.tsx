
import { SearchX } from 'lucide-react';

type NotFoundProps = {
    title: string;
    message: string;
};

export default function NotFound({ title, message }: NotFoundProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16">
      <SearchX className="h-16 w-16 text-primary mb-4" />
      <h2 className="text-2xl font-bold text-foreground mb-2">{title}</h2>
      <p className="text-muted-foreground max-w-md">{message}</p>
    </div>
  );
}
