'use client';

import { TypingText } from '../components';

import styles from '../styles';

const About = () => (
  <section className={`${styles.paddings} relative z-10`}>
    <div className="gradient-02 z-0" />
    <div className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}>
      <TypingText title="| About GODOT" textStyles="text-center" />

      <p className="mt-[8px] font-normal sm:text-[32px] text-[20px] text-center text-secondary-white">
        <span className="font-extrabold text-white">GODOT</span> token is a cryptocurrency token that powers the
        GodotNetwork DeFi Ecosystem. The automated buyback function
        strenthens{' '} the{' '}
        <span className="font-extrabold text-white">GodotNetwork</span> liquidity pools while protecting all holders.
        Future of Godot is bright our aim to provide more than the expection of the holders. We envision an
        industry where godot holders have access to widest
        possible markets while being able to provide
        assurances that their holdings are secure.
      </p>

      <img
        src="/arrow-down.svg"
        alt="arrow down"
        className="w-[18px] h-[28px] object-contain mt-[28px]"
      />
    </div>
  </section>
);

export default About;