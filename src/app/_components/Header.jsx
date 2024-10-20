"use client"; // Mark this component as a client component
import React from "react";
import { Button } from "@/components/ui/button";
import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";

function Header() {
  const { user, isSignedIn } = useUser(); // Get the user and isSignedIn status

  return (
    <div className="fixed top-0 left-0 w-full z-50 p-5 flex justify-between items-center shadow-sm bg-black"> 
      {/* Fixed header */}
      <div className="flex flex-row items-center">
        <span className="text-blue-800 font-bold text-xl">finac</span>
      </div>
      
      {isSignedIn ? (
        <div className="flex gap-4 items-center">
          {/* Show Dashboard Button when signed in */}
          <Link href="/dashboard">
            <Button variant="outline" className="rounded-full">Dashboard</Button>
          </Link>
          <UserButton /> {/* Clerk's UserButton component to handle user actions like signing out */}
        </div>
      ) : (
        <div className="flex gap-4">
          <Link href="/sign-in">
            <Button variant="outline" className="rounded-full">Sign In</Button>
          </Link>
          
        </div>
      )}
    </div>
  );
}

export default Header;
