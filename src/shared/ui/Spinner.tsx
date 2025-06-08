import React from 'react';
import { Loader } from 'lucide-react';

interface SpinnerProps {
  size?: number;
  wrapperClassName?: string;
  colorClass?: string;
  speedClass?: string;
  textClassName?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 44,
  wrapperClassName = '',
  colorClass = 'text-blue-500',
  speedClass = 'animate-spin',
  textClassName = 'mt-1',
}) => {
  const strokeWidth = 2;

  return (
    <div className={`flex flex-col items-center justify-center ${wrapperClassName}`}>
      <Loader size={size} className={`${colorClass} ${speedClass}`} strokeWidth={strokeWidth} />
      <span className={textClassName}>Rates loading...</span>
    </div>
  );
};

export default Spinner;
