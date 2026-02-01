'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check auth state on mount and when pathname changes
    const auth = localStorage.getItem('auth-token') === 'authenticated';
    setIsAuthenticated(auth);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    setIsAuthenticated(false);
    router.push('/login');
  };

  // Don't show navbar on login page
  if (pathname === '/login') return null;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand fw-bold" href="/">ARCH-APP</Link>
        
        <div className="navbar-nav ms-auto">
          {!isAuthenticated ? (
            <>
              <Link className={`nav-link ${pathname === '/login' ? 'active' : ''}`} href="/login">Login</Link>
              <Link className="nav-link" href="/">Home</Link>
            </>
          ) : (
            <>
              <Link className={`nav-link ${pathname === '/Dashboard' ? 'active' : ''}`} href="/Dashboard">Dashboard</Link>
              <Link className="nav-link" href="/settings">Settings</Link>
              <button className="btn btn-outline-danger btn-sm ms-3" onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
