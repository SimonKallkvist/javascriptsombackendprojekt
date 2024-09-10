'use client';

import List from '@/components/List/List';
import Navbar from '@/components/navBar/Navbar';
import { useAuth } from '@/contexts/auth';
import ItemForm from '@/components/ItemForm/ItemForm';
// const { useAuth } = require('@/contexts/auth');

import Image from 'next/image';
import React from 'react';
import './globals.css';

const Home = () => {
  const auth = useAuth();

  if (!auth.isLoggedIn) {
    return null;
  }

  return (
    <>
      <Navbar />
      <main className='w-full'>
        {/* <ItemForm /> */}
        <List />
      </main>
    </>
  );
};

export default Home;
