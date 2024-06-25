'use client'
import React from 'react'
import { signOut } from "next-auth/react";

  import { Button } from '@/components/ui/button';
const Cardfooter = () => {
  return (

    <Button variant="default" onClick={() => signOut({ callbackUrl: process.env.NEXT_PUBLIC_BASE_URL })}>
      Logout
    </Button>
  )
}

export default Cardfooter