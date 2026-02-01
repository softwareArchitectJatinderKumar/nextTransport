'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleStaticLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // THE STATIC CHECK
    if (email === 'adminUser@gmail.com' && password === 'S3cr3tKey@#') {
      // Set auth token in localStorage
      localStorage.setItem('auth-token', 'authenticated');
      
      // Redirect to dashboard
      router.push('/Dashboard');
    } else {
      setError('Unauthorized: Invalid Email or Password');
    }
  };

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div className="card p-4 shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center mb-4">Admin Access</h3>
        {error && <div className="alert alert-danger p-2 small">{error}</div>}
        <form onSubmit={handleStaticLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login to Dashboard</button>
        </form>
      </div>
    </div>
  );
}
