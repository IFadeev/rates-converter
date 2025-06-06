import { NavLink } from 'react-router-dom';
import { CircleDollarSign, Repeat } from 'lucide-react';

const linkClass = (isActive: boolean) =>
  `flex flex-col items-center space-y-1 ${
    isActive ? 'text-primary' : 'text-gray-700 hover:text-primary'
  }`;

export default function Footer() {
  return (
    <footer className="bg-white shadow-sm fixed bottom-0 z-10 w-full">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-around h-16">
          <NavLink to="/rates" className={({ isActive }) => linkClass(isActive)}>
            <CircleDollarSign size={18} />
            <span className="text-sm">Rates</span>
          </NavLink>

          <NavLink to="/convert" className={({ isActive }) => linkClass(isActive)}>
            <Repeat size={18} />
            <span className="text-sm">Convert</span>
          </NavLink>
        </nav>
      </div>
    </footer>
  );
}
