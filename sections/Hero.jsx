'use client';


import styles from '../styles';

const Hero = () => (
  <section className={`${styles.yPaddings} sm:pl-16 pl-6`}>
    <div className={`${styles.innerWidth} mx-auto flex flex-col`}>
      <div className="flex justify-center items-center flex-col relative z-10">
        <h1 className={styles.heroHeading}>
          GoDot
        </h1>
        <div className="flex flex-row justify-center items-center">
          <h1 className={styles.heroHeading}>NETWORK</h1>
        </div>
      </div>

      <div className="relative w-full md:-mt-[20px] -mt-[12px]">
        <div className="absolute w-full h-[300px] hero-gradient rounded-tl-[140px] z-[0] -top-[30px]" />

        <img
          src="/cover.png"
          alt="hero_cover"
          className="w-full sm:h-[500px] h-[350px] object-cover rounded-tl-[140px] z-10 relative"
        />

      </div>
    </div>
  </section>
);

export default Hero;