'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Dashboard with loading state
const Dashboard = dynamic(() => import('./Dashboard/page'), {
  ssr: false,
  loading: () => <div className="p-5 text-center"><div className="spinner-border text-primary"></div></div>
});

export default function HomePage() {
  // Force re-render on client to ensure dynamic import works
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return <div className="p-5 text-center"><div className="spinner-border text-primary"></div></div>;
  }
  
  return <Dashboard readOnly={true} />;
}
