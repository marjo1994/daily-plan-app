import { useEffect, useState, type ReactNode } from 'react';

interface ProgressProviderProps {
  valueStart: number;
  valueEnd: number;
  children: (value: number) => ReactNode;
}

export const ProgressProvider: React.FC<ProgressProviderProps> = ({
  valueStart,
  valueEnd,
  children,
}) => {
  const [value, setValue] = useState(valueStart);
  useEffect(() => {
    setValue(valueEnd);
  }, [valueEnd]);

  return children(value);
};
export default ProgressProvider;
