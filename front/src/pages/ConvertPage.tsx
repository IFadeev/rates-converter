import { type FC } from 'react';
import ConvertControls from '@/features/convert/ui/ConvertControls';

export const ConvertPage: FC = () => {
  return (
    <div className="p-4 space-y-6">
      <ConvertControls />
    </div>
  );
};

export default ConvertPage;
