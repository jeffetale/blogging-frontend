'use client';

import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('access_token');
    router.push('/signin');
    window.location.reload();
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
}