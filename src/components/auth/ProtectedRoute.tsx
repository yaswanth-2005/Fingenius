"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated from cookies
    const userData = Cookies.get("user");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        if (user?.isAuthenticated) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
    setLoading(false);
  }, [pathname]);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      toast.error("Please log in to continue");
      router.push("/login");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) return null; // Avoid flashing content

  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;
