import { useNavigate, useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import LogoutButton from '@/features/auth/ui/LogoutButton';

export default function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const title = useMemo(() => {
    if (pathname.startsWith('/convert')) return 'Convert';
    if (pathname.startsWith('/rates')) return 'Rates';
    return '';
  }, [pathname]);

  return (
    <header data-testid="header" className="bg-white shadow-sm w-full fixed top-0 z-10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate('/rates')}>
            {title || 'App'}
          </h1>
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
