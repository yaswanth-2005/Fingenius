'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X, LogIn, LogOut } from 'lucide-react';
import { toast } from 'sonner';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const pathname = usePathname();
  const router = useRouter();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkAuthStatus = () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          const user = JSON.parse(userData);
          setIsLoggedIn(user.isAuthenticated);
          setUserName(user.fullName || '');
        } catch (error) {
          setIsLoggedIn(false);
          setUserName('');
        }
      } else {
        setIsLoggedIn(false);
        setUserName('');
      }
    };
    checkAuthStatus();
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserName('');
    toast.success('Successfully logged out');
    router.push('/');
  };

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'Podcast', path: '/podcast' },
    { name: 'AI Chatbot', path: '/chatbot' },
    { name: 'Games', path: '/games' }
  ];

  const isActive = (path: string) => pathname === path ? 'text-primary' : 'text-foreground';

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-3 bg-background/80 backdrop-blur-md shadow-sm' : 'py-5 bg-transparent'}`}>
      <div className="container px-4 mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Fingenius
        </Link>

        <nav className="hidden md:flex items-center space-x-4">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.path} className={`nav-link ${isActive(link.path)}`}>{link.name}</Link>
          ))}
        </nav>

        <div className="hidden md:block">
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <span className="text-sm">Welcome, {userName}</span>
              <Button onClick={handleLogout} variant="outline">
                <LogOut className="h-4 w-4 mr-2" /> Logout
              </Button>
            </div>
          ) : (
            <Button onClick={() => router.push('/login')} variant="default" className="bg-primary text-white">
              <LogIn className="h-4 w-4 mr-2" /> Login / Sign Up
            </Button>
          )}
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2" aria-label="Toggle menu">
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div className={`md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-md shadow-md transition-all ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}> 
        <div className="container px-4 py-4 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.path} className={`text-lg font-medium ${isActive(link.path)}`}>{link.name}</Link>
          ))}
          {isLoggedIn ? (
            <>
              <div className="text-sm font-medium py-2 border-t">Welcome, {userName}</div>
              <Button onClick={handleLogout} variant="outline" className="w-full">
                <LogOut className="h-4 w-4 mr-2" /> Logout
              </Button>
            </>
          ) : (
            <Button onClick={() => router.push('/login')} variant="default" className="bg-primary text-white w-full mt-4">
              <LogIn className="h-4 w-4 mr-2" /> Login / Sign Up
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
