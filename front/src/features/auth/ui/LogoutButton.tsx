import { LogOut } from 'lucide-react';
import { useAppDispatch } from '@/hooks/redux';
import { logout } from '@/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export default function LogoutButton() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login', { replace: true });
  };

  return (
    <div className="space-x-4">
      <button onClick={handleLogout} title="Выйти">
        <LogOut size={22} className="text-primary hover:text-primary/80" />
      </button>
    </div>
  );
}
