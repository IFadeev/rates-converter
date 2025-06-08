import { type FC, useState, useEffect } from 'react';
import { Icon, iconLoaded, loadIcon } from '@iconify/react';

interface CurrencyIconProps {
  code: string;
  size?: number;
}

const colors = [
  'bg-red-500',
  'bg-green-500',
  'bg-blue-500',
  'bg-yellow-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-orange-500',
  'bg-teal-500',
  'bg-indigo-500',
  'bg-gray-500',
];

const CurrencyIcon: FC<CurrencyIconProps> = ({ code, size = 24 }) => {
  const iconName = `cryptocurrency-color:${code.toLowerCase()}`;
  const [available, setAvailable] = useState<boolean>(iconLoaded(iconName));
  const [tried, setTried] = useState(false);

  useEffect(() => {
    if (available || tried) return;
    setTried(true);

    loadIcon(iconName)
      .then(() => {
        setAvailable(true);
      })
      .catch(() => {
        setAvailable(false);
      });
  }, [iconName, available, tried]);

  if (available) {
    return <Icon icon={iconName} width={size} height={size} />;
  }

  const color = colors[code.toUpperCase().charCodeAt(0) % colors.length];
  return (
    <span
      className={`${color} inline-flex items-center justify-center rounded-full text-white`}
      style={{ width: size, height: size, fontSize: size * 0.6 }}
    >
      {code.slice(0, 2).toUpperCase()}
    </span>
  );
};

export default CurrencyIcon;
