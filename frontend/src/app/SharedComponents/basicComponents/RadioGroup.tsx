'use client';

import { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';

export interface RadioGroupHandle {
  getValue: () => string;
  setValue: (val: string) => void;
}

interface RadioOption {
  label: string;
  value: string;
}

interface RadioGroupAtomProps {
  label: string;
  options: RadioOption[];
  defaultValue?: string;
}

const RadioGroupAtom = forwardRef<RadioGroupHandle, RadioGroupAtomProps>(
  ({ label, options, defaultValue = '' }, ref) => {
    const [selected, setSelected] = useState(defaultValue);

    useEffect(() => {
      setSelected(defaultValue);
    }, [defaultValue]);

    useImperativeHandle(ref, () => ({
      getValue: () => selected,
      setValue: (val: string) => setSelected(val),
    }));

    return (
      <FormControl>
        <FormLabel>{label}</FormLabel>
        <RadioGroup
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          {options.map((opt) => (
            <FormControlLabel
              key={opt.value}
              value={opt.value}
              control={<Radio />}
              label={opt.label}
            />
          ))}
        </RadioGroup>
      </FormControl>
    );
  }
);

export default RadioGroupAtom;
