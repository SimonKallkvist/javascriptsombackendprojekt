import Image from 'next/image';
import React from 'react';

const Home = () => {
  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <h1>Welcome</h1>
      <button>Logout</button>
    </div>
  );
};

export default Home;
