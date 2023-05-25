'use client';

import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '../styles';

const Navbar = () => {
  const { push } = useRouter();
  const [active, setActive] = useState(false);

  return (
    <nav className={`${styles.xPaddings} py-8 relative`}>
      <div className={active ? 'navbar-slider showw' : 'navbar-slider'}>
        <div className={active ? 'slider show' : 'slider'}>
          <div className="close" onClick={() => { setActive(!active); }} style={{ marginBottom: '3rem' }}>
            <svg style={{ cursor: 'pointer' }} xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" viewBox="0 0 24 24" fill="none">
              <path d="M19 5L5 19M5.00001 5L19 19" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <ul>
            <li onClick={() => { push('/register'); }}>Sign Up</li>
            <li onClick={() => { push('/login'); }}>Log In</li>
          </ul>
        </div>
      </div>
      <div className="absolute w-[50%] inset-0 " />
      <div className={`${styles.innerWidth} mx-auto flex justify-between gap-8`}>
        <img
          src="/1.png"
          alt="logo"
          className="w-[5rem] h-[5rem] object-contain"
          style={{ cursor: "pointer" }}
        />
        <img
          src="/menu.svg"
          alt="menu"
          className="w-[24px] h-[24px] object-contain"
          style={{ cursor: 'pointer' }}
          onClick={() => { setActive(!active); }}
        />
      </div>
    </nav>
  );
};

export default Navbar;
