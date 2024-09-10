'use client';

import React from 'react';

import styles from './navbar.module.css';

import { useAuth } from '@/contexts/auth';

import LocalStorageKit from '@/utils/localStorageKit';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  //TODO Find the user
  const { user, isLoggedIn, actions } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    actions.logout();
    router.push('/');
  };

  return (
    <nav className={styles.navContainer}>
      <div className={styles.container}>
        <div className=''>{isLoggedIn ? `Welcome ${user.name}` : 'Navbar'}</div>
        {isLoggedIn && (
          <button
            className={`${styles.btn} ${styles.primary}`}
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
