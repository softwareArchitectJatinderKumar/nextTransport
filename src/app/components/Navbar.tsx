'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const handleDashboardClick = (e: React.MouseEvent) => {
    const auth = localStorage.getItem('auth-token') === 'authenticated';
    if (!auth) {
      e.preventDefault();
      router.push('/login');
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Don't show navbar on login page
  if (pathname === '/login') return null;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand fw-bold" href="/">Transport-App</Link>
        
        {/* Mobile menu toggle button */}
        <button 
          className="navbar-toggler d-lg-none" 
          type="button" 
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        {/* Collapsible menu */}
        <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`}>
          <div className={`navbar-nav ms-auto ${isMobileMenuOpen ? 'd-flex flex-column gap-2 mt-3' : ''}`}>
            {!isAuthenticated ? (
              <>
                <Link 
                  className={`nav-link ${pathname === '/login' ? 'active' : ''}`} 
                  href="/login"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
                <Link className="nav-link" href="/" onClick={closeMobileMenu}>
                  Home
                </Link>
              </>
            ) : (
              <>
                <Link 
                  className={`nav-link ${pathname === '/Dashboard' ? 'active' : ''}`} 
                  href="/Dashboard"
                  onClick={handleDashboardClick}
                >
                  Dashboard
                </Link>
                <Link href="/"
                  className="nav-link text-danger " 
                  onClick={() => {
                    handleLogout();
                    closeMobileMenu();
                  }}
                >
                  Logout
                </Link >
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
