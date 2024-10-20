"use client"; // Mark as client component

import React, { useEffect } from "react";
import SideNav from "./_components/SideNav";
import DashboardHeader from "./_components/DashboardHeader";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

function DashboardLayout({ children }) {
  const { isSignedIn, user } = useUser();  // Using useUser to check authentication
  const router = useRouter();

  useEffect(() => {
    // If the user is not signed in, redirect to sign-in page
    if (!isSignedIn) {
      router.replace("/sign-in");
    }
  }, [isSignedIn, router]);

  if (!isSignedIn) {
    // Optional: Add a loading state or skeleton UI until the check is done
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="fixed md:w-64 hidden md:block ">
        <SideNav />
      </div>
      <div className="md:ml-64 ">
        <DashboardHeader />
        {children} {/* Children passed here will render the content of nested pages */}
      </div>
    </div>
  );
}

export default DashboardLayout;
