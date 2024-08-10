"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

// Define the User type
interface User {
  firstName: string;
  // Add other fields as necessary, e.g., lastName, email, etc.
}

const Navbar = () => {
  return (
    <div className="p-6 flex">
      <Link href="/">
        <h1 className="text-3xl font-bold text-purple-500">Forum</h1>
      </Link>

      <div className="ml-auto space-x-2">
        <SignedOut>
          <Button
            className="bg-purple-600 text-white rounded-xl hover:bg-purple-500"
            asChild
          >
            <Link href="/sign-up">Sign Up</Link>
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;
