'use client'


import { AuthContext } from "@/auth/AuthProvider";
import Maincontainer from "@/components/socialFeed/MainContainer";
import { redirect } from "next/navigation";
import { useContext } from "react";

export default function Home() {
  const context = useContext(AuthContext)
   
  if(!context) throw new Error('Something is rong')
   const {user} = context;
   
  if(!user){
    redirect('/signin')
  }
   
  return (
    <>
       <Maincontainer/>
    </>
  );
}
