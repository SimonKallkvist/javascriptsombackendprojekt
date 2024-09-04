'use client';

import styles from './auth.module.css';
import { useRouter } from 'next/navigation';

const { useAuth } = require('@/contexts/auth');
const { useState, useEffect } = require('react');

const Auth = () => {
  const auth = useAuth();
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(true);

  const onSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    if (isRegister) {
      const name = e.target[2].value;
      auth.actions.register(email, password, name);
    } else {
      auth.actions.login(email, password);
    }
  };

  useEffect(() => {
    if (auth.isLoggedIn) {
      router.push('/');
    }
  }, [auth.isLoggedIn, router]);

  if (auth.isLoggedIn) {
    return null;
  }

  // if (auth.isLoggedIn) {
  //   return (
  //     <>
  //       <div className='flex flex-col items-center justify-center'>
  //         <h1>Welcome {auth.user?.name}</h1>
  //         <button onClick={auth.actions.logout}>Logout</button>
  //       </div>
  //     </>
  //   );
  // }

  return (
    <div className='h-screen flex flex-col items-center justify-center '>
      <h2 className={styles.welcome}>Welcome to the inventory LAB</h2>
      <form className={styles.formBox} onSubmit={onSubmit}>
        <div className={styles.flexBoxH}>
          <input
            type='email'
            placeholder='Email'
            className={styles.inputField}
          />
          <input
            type='password'
            placeholder='Password'
            className={styles.inputField}
          />
        </div>
        {isRegister && (
          <input type='text' placeholder='Name' className={styles.inputField} />
        )}
        <div className={styles.buttonBox}>
          <button type='submit' className={`${styles.btn} ${styles.primary}`}>
            {isRegister ? 'Register' : 'Login'}
          </button>
          <button
            type='button'
            className={`${styles.btn} ${styles.seconday}`}
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister
              ? 'Already have an account?'
              : 'Need to create a new Account?'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Auth;
