
'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { toast } from 'sonner';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  
  // Check if user is authenticated
  const isAuthenticated = () => {
    if (typeof window === 'undefined') return false;
    
    const userData = localStorage.getItem('user');
    if (!userData) return false;
    
    try {
      const user = JSON.parse(userData);
      return user && user.isAuthenticated;
    } catch (error) {
      return false;
    }
  };
  
  useEffect(() => {
    if (!isAuthenticated()) {
      toast.error('Please log in to continue');
      router.push(`/login?from=${encodeURIComponent(pathname)}`);
    }
  }, [pathname, router]);

  if (!isAuthenticated()) {
    // Rendering nothing until redirect happens
    return null;
  }

  // If authenticated, render the child routes
  return <>{children}</>;
};

export default ProtectedRoute;
