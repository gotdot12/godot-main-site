'use client';


import styles from '../styles';

const Feedback = () => (
  <section className={`${styles.paddings}`}>
    <div className={`${styles.innerWidth} mx-auto flex lg:flex-row flex-col gap-6`}>
      <div className="flex-[0.5] lg:max-w-[370px] flex justify-end flex-col gradient-05 sm:p-8 p-4 rounded-[32px] border-[1px] border-[#6A6A6A] relative">
        <div className="feedback-gradient" />
        <div>
          <h4 className="font-bold sm:text-[32px] text-[26px] sm:leading-[40.32px] leading-[36.32px] text-white">
            Team GODOT
          </h4>
        </div>

        <p className="mt-[24px] font-normal sm:text-[24px] text-[18px] sm:leading-[45.6px] leading-[39.6px] text-white">
          “When think about the future of Godot, we envIsion a
          space where everyone can easily participate, while having
          peace of mind about their holdings. We envision an
          industry where godot holders have access to widest
          possible markets.”
        </p>
      </div>

      <div className="relative flex-1 flex justify-center items-center">
        <img
          src="/jhg.png"
          alt="planet-09"
          className="w-full lg:h-[610px] h-auto min-h-[210px] object-cover rounded-[40px]"
        />

      </div>
    </div>
  </section>
);

export default Feedback;