'use client';
import dynamic from 'next/dynamic';

// Use dynamic import with ssr: false to prevent Supabase issues during build
const Dashboard = dynamic(() => import("./Dashboard/page"), { 
  ssr: false,
  loading: () => <div className="p-5 text-center"><div className="spinner-border text-primary"></div></div>
});

export default function HomePage() {
  return (
    <div className="container text-center py-5">
      <Dashboard readOnly={true} />
    </div>
  );
}
