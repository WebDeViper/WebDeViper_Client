import { Button } from '@material-tailwind/react';

interface ButtonDefaultProps {
  children: React.ReactNode;
}

export function ButtonDefault({ children }: ButtonDefaultProps) {
  return <Button>{children}</Button>;
}
