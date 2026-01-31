"use client"

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";

const HARDCODED_PASSWORD = "1234";

export function SignInForm({ onAuth }: { onAuth: () => void }) {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate a small delay for better UX
    setTimeout(() => {
      if (password === HARDCODED_PASSWORD) {
        // Store auth state in sessionStorage (cleared when tab closes)
        sessionStorage.setItem("dashboard_auth", "true");
        onAuth();
        toast.success("Welcome to the dashboard!");
      } else {
        toast.error("Invalid password. Please try again.");
      }
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-[320px] p-8 bg-white rounded-xl shadow-lg"
      >
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
          Dashboard Login
        </h1>
        <p className="text-sm text-gray-600 text-center mb-4">
          Enter password to access the content management dashboard
        </p>
        <Input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="py-2 text-gray-900"
          required
          autoFocus
        />
        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? "Verifying..." : "Access Dashboard"}
        </Button>
      </form>
    </div>
  );
}
