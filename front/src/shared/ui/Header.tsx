import { useNavigate, useLocation } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const title = location.pathname.startsWith('/convert')
    ? 'Convert'
    : location.pathname.startsWith('/rates')
      ? 'Rates'
      : '';

  return (
    <header data-testid="header" className="bg-white shadow-sm w-full fixed top-0 z-10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate('/rates')}>
            {title || 'App'}
          </h1>
        </div>
      </div>
    </header>
  );
}
