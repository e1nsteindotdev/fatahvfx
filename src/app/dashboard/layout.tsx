"use client"

import { useState, useEffect } from "react";
import { SignInForm } from "@/components/signin-form";
import { Toaster } from "@/components/ui/sonner";
import { ConvexReactClient } from "convex/react";
import { ConvexAuthProvider } from "@convex-dev/auth/react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    const authStatus = sessionStorage.getItem("dashboard_auth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <Toaster />
        <SignInForm onAuth={() => setIsAuthenticated(true)} />
      </>
    );
  }

  return (
    <ConvexAuthProvider client={convex}>
      <div className="min-h-screen bg-gray-50">
        <Toaster />
        {children}
      </div>
    </ConvexAuthProvider>
  );
}
