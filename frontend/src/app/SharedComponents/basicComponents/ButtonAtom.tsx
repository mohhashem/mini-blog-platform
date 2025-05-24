'use client';

import { Button } from '@mui/material';

interface ButtonAtomProps {
  label: string;
  onClick: () => void;
  variant?: 'contained' | 'outlined' | 'text';
}

const ButtonAtom = ({ label, onClick, variant = 'contained' }: ButtonAtomProps) => {
  return (
    <Button onClick={onClick} variant={variant}>
      {label}
    </Button>
  );
};

export default ButtonAtom;
