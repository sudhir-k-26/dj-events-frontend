import React from 'react';
import Link from 'next/link';
import { useContext } from 'react';
import styles from '@/styles/Header.module.css';
import Search from './Search';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import AuthContext from '@/context/AuthContext';
export default function Header() {
  const { user, logout } = useContext(AuthContext);
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href='/'>DJ Events</Link>
      </div>
      <Search />
      <nav>
        <ul>
          <li>
            <Link href='/events'>Events</Link>
          </li>
          {user ? (
            <>
              <li>
                <Link href='/events/add'>Add Event</Link>
              </li>
              <li>
                <Link href='/account/dashboard'>Dashboard</Link>
              </li>
              <li>
                <button className='btn btn-secondary' onClick={() => logout()}>
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href='/account/login' className='btn-secondary btn-icon'>
                  <FaSignInAlt /> Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
